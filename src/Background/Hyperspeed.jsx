import { EffectComposer, RenderPass, SMAAEffect } from 'postprocessing';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import './Hyperspeed.css';

const DEFAULT_EFFECT_OPTIONS = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3
  }
};

const Hyperspeed = ({ effectOptions = DEFAULT_EFFECT_OPTIONS }) => {
  const hyperspeed = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (appRef.current) {
      appRef.current.dispose();
      appRef.current = null;
    }

    // --- UTILITIES ---
    const nsin = val => Math.sin(val) * 0.5 + 0.5;
    const random = base => Array.isArray(base) ? Math.random() * (base[1] - base[0]) + base[0] : Math.random() * base;
    const pickRandom = arr => Array.isArray(arr) ? arr[Math.floor(Math.random() * arr.length)] : arr;
    const lerp = (current, target, speed = 0.1, limit = 0.001) => {
      let change = (target - current) * speed;
      if (Math.abs(change) < limit) change = target - current;
      return change;
    };

    // --- SHADERS ---
    const carLightsFragment = `
      #define USE_FOG;
      ${THREE.ShaderChunk['fog_pars_fragment']}
      varying vec3 vColor;
      varying vec2 vUv; 
      uniform vec2 uFade;
      void main() {
        vec3 color = vec3(vColor);
        float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
        gl_FragColor = vec4(color, alpha);
        if (gl_FragColor.a < 0.0001) discard;
        ${THREE.ShaderChunk['fog_fragment']}
      }
    `;

    const carLightsVertex = `
      #define USE_FOG;
      ${THREE.ShaderChunk['fog_pars_vertex']}
      attribute vec3 aOffset;
      attribute vec3 aMetrics;
      attribute vec3 aColor;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec2 vUv; 
      varying vec3 vColor; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        float radius = aMetrics.r;
        float myLength = aMetrics.g;
        float speed = aMetrics.b;
        transformed.xy *= radius;
        transformed.z *= myLength;
        transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
        transformed.xy += aOffset.xy;
        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        vColor = aColor;
        ${THREE.ShaderChunk['fog_vertex']}
      }
    `;

    const sideSticksVertex = `
      #define USE_FOG;
      ${THREE.ShaderChunk['fog_pars_vertex']}
      attribute float aOffset;
      attribute vec3 aColor;
      attribute vec2 aMetrics;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec3 vColor;
      mat4 rotationY( in float angle ) {
        return mat4(cos(angle), 0, sin(angle), 0, 0, 1.0, 0, 0, -sin(angle), 0, cos(angle), 0, 0, 0, 0, 1);
      }
      #include <getDistortion_vertex>
      void main(){
        vec3 transformed = position.xyz;
        float width = aMetrics.x;
        float height = aMetrics.y;
        transformed.xy *= vec2(width, height);
        float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);
        transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;
        transformed.z += - uTravelLength + time;
        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);
        transformed.y += height / 2.;
        transformed.x += -width / 2.;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vColor = aColor;
        ${THREE.ShaderChunk['fog_vertex']}
      }
    `;

    const sideSticksFragment = `
      #define USE_FOG;
      ${THREE.ShaderChunk['fog_pars_fragment']}
      varying vec3 vColor;
      void main(){
        gl_FragColor = vec4(vColor,1.);
        ${THREE.ShaderChunk['fog_fragment']}
      }
    `;

    const roadMarkings_vars = `
      uniform float uLanes;
      uniform vec3 uBrokenLinesColor;
      uniform vec3 uShoulderLinesColor;
      uniform float uShoulderLinesWidthPercentage;
      uniform float uBrokenLinesWidthPercentage;
      uniform float uBrokenLinesLengthPercentage;
    `;

    const roadMarkings_fragment = `
      uv.y = mod(uv.y + uTime * 0.05, 1.);
      float laneWidth = 1.0 / uLanes;
      float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
      float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;
      float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));
      float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);
      brokenLines = mix(brokenLines, sideLines, uv.x);
    `;

    const roadBaseFragment = `
      #define USE_FOG;
      varying vec2 vUv; 
      uniform vec3 uColor;
      uniform float uTime;
      #include <roadMarkings_vars>
      ${THREE.ShaderChunk['fog_pars_fragment']}
      void main() {
        vec2 uv = vUv;
        vec3 color = vec3(uColor);
        #include <roadMarkings_fragment>
        gl_FragColor = vec4(color, 1.);
        ${THREE.ShaderChunk['fog_fragment']}
      }
    `;

    const roadVertex = `
      #define USE_FOG;
      uniform float uTime;
      ${THREE.ShaderChunk['fog_pars_vertex']}
      uniform float uTravelLength;
      varying vec2 vUv; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
        transformed.x += distortion.x;
        transformed.z += distortion.y;
        transformed.y += -1. * distortion.z;  
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        ${THREE.ShaderChunk['fog_vertex']}
      }
    `;

    // --- HELPER CLASSES ---
    class CarLights {
      constructor(webgl, options, colors, speed, fade) {
        this.webgl = webgl;
        this.options = options;
        this.colors = colors;
        this.speed = speed;
        this.fade = fade;
      }
      init() {
        const options = this.options;
        let curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
        let geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);
        let instanced = new THREE.InstancedBufferGeometry().copy(geometry);
        instanced.instanceCount = options.lightPairsPerRoadWay * 2;
        let laneWidth = options.roadWidth / options.lanesPerRoad;
        let aOffset = [], aMetrics = [], aColor = [];
        let colors = Array.isArray(this.colors) ? this.colors.map(c => new THREE.Color(c)) : new THREE.Color(this.colors);
        for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
          let radius = random(options.carLightsRadius), length = random(options.carLightsLength), speed = random(this.speed);
          let carLane = i % options.lanesPerRoad, laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;
          laneX += random(options.carShiftX) * laneWidth;
          let carWidth = random(options.carWidthPercentage) * laneWidth, offsetY = random(options.carFloorSeparation) + radius * 1.3, offsetZ = -random(options.length);
          aOffset.push(laneX - carWidth / 2, offsetY, offsetZ, laneX + carWidth / 2, offsetY, offsetZ);
          aMetrics.push(radius, length, speed, radius, length, speed);
          let c = pickRandom(colors);
          aColor.push(c.r, c.g, c.b, c.r, c.g, c.b);
        }
        instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3));
        instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3));
        instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3));
        this.mesh = new THREE.Mesh(instanced, new THREE.ShaderMaterial({
          fragmentShader: carLightsFragment, vertexShader: carLightsVertex, transparent: true,
          uniforms: Object.assign({ uTime: { value: 0 }, uTravelLength: { value: options.length }, uFade: { value: this.fade } }, this.webgl.fogUniforms, options.distortion.uniforms)
        }));
        this.mesh.material.onBeforeCompile = s => s.vertexShader = s.vertexShader.replace('#include <getDistortion_vertex>', options.distortion.getDistortion);
        this.mesh.frustumCulled = false;
        this.webgl.scene.add(this.mesh);
      }
      update(time) { if(this.mesh) this.mesh.material.uniforms.uTime.value = time; }
    }

    class LightsSticks {
      constructor(webgl, options) { this.webgl = webgl; this.options = options; }
      init() {
        const options = this.options;
        let instanced = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneGeometry(1, 1));
        instanced.instanceCount = options.totalSideLightSticks;
        let stickoffset = options.length / (options.totalSideLightSticks - 1), aOffset = [], aColor = [], aMetrics = [];
        let colors = Array.isArray(options.colors.sticks) ? options.colors.sticks.map(c => new THREE.Color(c)) : new THREE.Color(options.colors.sticks);
        for (let i = 0; i < options.totalSideLightSticks; i++) {
          aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());
          let c = pickRandom(colors);
          aColor.push(c.r, c.g, c.b);
          aMetrics.push(random(options.lightStickWidth), random(options.lightStickHeight));
        }
        instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1));
        instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3));
        instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2));
        this.mesh = new THREE.Mesh(instanced, new THREE.ShaderMaterial({
          fragmentShader: sideSticksFragment, vertexShader: sideSticksVertex, side: THREE.DoubleSide,
          uniforms: Object.assign({ uTravelLength: { value: options.length }, uTime: { value: 0 } }, this.webgl.fogUniforms, options.distortion.uniforms)
        }));
        this.mesh.material.onBeforeCompile = s => s.vertexShader = s.vertexShader.replace('#include <getDistortion_vertex>', options.distortion.getDistortion);
        this.mesh.frustumCulled = false;
        this.webgl.scene.add(this.mesh);
      }
      update(time) { if(this.mesh) this.mesh.material.uniforms.uTime.value = time; }
    }

    class Road {
      constructor(webgl, options) { this.webgl = webgl; this.options = options; this.uTime = { value: 0 }; }
      createPlane(side, width, isRoad) {
        const options = this.options;
        const geometry = new THREE.PlaneGeometry(isRoad ? options.roadWidth : options.islandWidth, options.length, 20, 100);
        let uniforms = { uTravelLength: { value: options.length }, uColor: { value: new THREE.Color(isRoad ? options.colors.roadColor : options.colors.islandColor) }, uTime: this.uTime };
        if (isRoad) Object.assign(uniforms, { uLanes: { value: options.lanesPerRoad }, uBrokenLinesColor: { value: new THREE.Color(options.colors.brokenLines) }, uShoulderLinesColor: { value: new THREE.Color(options.colors.shoulderLines) }, uShoulderLinesWidthPercentage: { value: options.shoulderLinesWidthPercentage }, uBrokenLinesLengthPercentage: { value: options.brokenLinesLengthPercentage }, uBrokenLinesWidthPercentage: { value: options.brokenLinesWidthPercentage } });
        const mat = new THREE.ShaderMaterial({
          fragmentShader: isRoad ? roadBaseFragment.replace('#include <roadMarkings_fragment>', roadMarkings_fragment).replace('#include <roadMarkings_vars>', roadMarkings_vars) : roadBaseFragment.replace('#include <roadMarkings_fragment>', '').replace('#include <roadMarkings_vars>', ''),
          vertexShader: roadVertex, side: THREE.DoubleSide, uniforms: Object.assign(uniforms, this.webgl.fogUniforms, options.distortion.uniforms)
        });
        mat.onBeforeCompile = s => s.vertexShader = s.vertexShader.replace('#include <getDistortion_vertex>', options.distortion.getDistortion);
        const mesh = new THREE.Mesh(geometry, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set((options.islandWidth / 2 + options.roadWidth / 2) * side, 0, -options.length / 2);
        this.webgl.scene.add(mesh);
      }
      init() { this.createPlane(-1, this.options.roadWidth, true); this.createPlane(1, this.options.roadWidth, true); this.createPlane(0, this.options.islandWidth, false); }
      update(time) { this.uTime.value = time; }
    }

    // --- MAIN APP CLASS ---
    class App {
      constructor(container, options = {}) {
        this.options = options; this.container = container; this.disposed = false;
        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);
        this.composer = new EffectComposer(this.renderer);
        container.append(this.renderer.domElement);
        this.camera = new THREE.PerspectiveCamera(options.fov, container.offsetWidth / container.offsetHeight, 0.1, 10000);
        this.camera.position.set(0, 8, -5);
        this.scene = new THREE.Scene();
        let fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);
        this.scene.fog = fog;
        this.fogUniforms = { fogColor: { value: fog.color }, fogNear: { value: fog.near }, fogFar: { value: fog.far } };
        this.elapsedTime = 0; this.lastTime = null; this.speedUp = 0; this.timeOffset = 0;
        this.road = new Road(this, options);
        this.leftCarLights = new CarLights(this, options, options.colors.leftCars, options.movingAwaySpeed, new THREE.Vector2(0, 1 - options.carLightsFade));
        this.rightCarLights = new CarLights(this, options, options.colors.rightCars, options.movingCloserSpeed, new THREE.Vector2(1, 0 + options.carLightsFade));
        this.leftSticks = new LightsSticks(this, options);
        this.tick = this.tick.bind(this);
        window.addEventListener('resize', this.onWindowResize.bind(this));
      }
      initPasses() {
        if (this.disposed || !this.renderer || !this.renderer.getContext()) return;
        const rp = new RenderPass(this.scene, this.camera);
        rp.renderToScreen = true;
        this.composer.addPass(rp);
      }
      init() { if (!this.disposed) { this.initPasses(); this.road.init(); this.leftCarLights.init(); this.leftCarLights.mesh.position.setX(-this.options.roadWidth / 2 - this.options.islandWidth / 2); this.rightCarLights.init(); this.rightCarLights.mesh.position.setX(this.options.roadWidth / 2 + this.options.islandWidth / 2); this.leftSticks.init(); this.leftSticks.mesh.position.setX(-(this.options.roadWidth + this.options.islandWidth / 2)); this.tick(); } }
      onWindowResize() {
        const w = this.container.offsetWidth, h = this.container.offsetHeight;
        this.renderer.setSize(w, h); this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
        if (this.composer) this.composer.setSize(w, h);
      }
      tick() {
        if (this.disposed) return;
        const now = performance.now();
        if (this.lastTime === null) this.lastTime = now;
        const delta = (now - this.lastTime) / 1000;
        this.lastTime = now; this.elapsedTime += delta;
        this.timeOffset += this.speedUp * delta;
        let time = this.elapsedTime + this.timeOffset;
        this.road.update(time); this.leftCarLights.update(time); this.rightCarLights.update(time); this.leftSticks.update(time);
        if (this.options.distortion.getJS) {
          const d = this.options.distortion.getJS(0.025, time);
          this.camera.lookAt(this.camera.position.x + d.x, this.camera.position.y + d.y, this.camera.position.z + d.z);
        }
        this.composer ? this.composer.render(delta) : this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.tick);
      }
      dispose() {
        this.disposed = true;
        window.removeEventListener('resize', this.onWindowResize);
        if (this.renderer) { this.renderer.dispose(); this.renderer.forceContextLoss(); if (this.renderer.domElement.parentNode) this.renderer.domElement.parentNode.removeChild(this.renderer.domElement); }
        if (this.composer) this.composer.dispose();
      }
    }

    // --- DISTORTIONS ---
    const turbulentUniforms = { uFreq: { value: new THREE.Vector4(4, 8, 8, 1) }, uAmp: { value: new THREE.Vector4(25, 5, 10, 10) } };
    const distortions = {
      turbulentDistortion: {
        uniforms: turbulentUniforms,
        getDistortion: `
          uniform vec4 uFreq; uniform vec4 uAmp;
          float nsin(float val){ return sin(val) * 0.5 + 0.5; }
          float getDistortionX(float progress){ return cos(3.14 * progress * uFreq.r + uTime) * uAmp.r + pow(cos(3.14 * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g; }
          float getDistortionY(float progress){ return -nsin(3.14 * progress * uFreq.b + uTime) * uAmp.b + -pow(nsin(3.14 * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a; }
          vec3 getDistortion(float progress){ return vec3(getDistortionX(progress) - getDistortionX(0.0125), getDistortionY(progress) - getDistortionY(0.0125), 0.); }
        `,
        getJS: (p, t) => {
          const f = turbulentUniforms.uFreq.value, a = turbulentUniforms.uAmp.value;
          const getX = _p => Math.cos(Math.PI * _p * f.x + t) * a.x + Math.pow(Math.cos(Math.PI * _p * f.y + t * (f.y / f.x)), 2) * a.y;
          const getY = _p => -nsin(Math.PI * _p * f.z + t) * a.z - Math.pow(nsin(Math.PI * _p * f.w + t / (f.z / f.w)), 5) * a.w;
          return new THREE.Vector3(getX(p) - getX(p + 0.007), getY(p) - getY(p + 0.007), 0).multiply(new THREE.Vector3(-2, -5, 0)).add(new THREE.Vector3(0, 0, -10));
        }
      }
    };

    const options = { ...DEFAULT_EFFECT_OPTIONS, ...effectOptions, distortion: distortions[effectOptions.distortion || 'turbulentDistortion'] };
    const myApp = new App(hyperspeed.current, options);
    appRef.current = myApp;
    myApp.init();

    return () => { if (appRef.current) { appRef.current.dispose(); appRef.current = null; } };
  }, [effectOptions]);

  return <div id="lights" ref={hyperspeed} className="absolute inset-0 z-0" />;
};

export default Hyperspeed;