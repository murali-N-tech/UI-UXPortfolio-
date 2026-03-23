import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Hyperspeed from '../Background/Hyperspeed';

const Hero = () => {
  // Memoize options to keep the 3D scene stable
  const hyperspeedOptions = useMemo(() => ({
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
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
    carLightsLength: [12, 80],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0x6366F1, 0xA78BFA, 0x6366F1], 
      rightCars: [0x22D3EE, 0x0e5ea5, 0x22D3EE],
      sticks: 0x22D3EE
    }
  }), []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      
      {/* 🏎️ BACKGROUND ANIMATION (Limited to Hero Only) */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>

      {/* Subtle Overlay to make text pop */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/20 to-background" />

      {/* CONTENT LAYER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="z-10 text-center px-6"
      >
        <h2 className="text-accent font-mono mb-4 tracking-[0.5em] uppercase text-xs md:text-sm">
          System Initialized
        </h2>
        
        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter text-white">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Murali</span> 👋
        </h1>

        <div className="text-lg md:text-2xl font-light text-secondary/80 h-10">
          <TypeAnimation
            sequence={[
              'AI / ML Engineer', 1500,
              'MERN Stack Developer', 1500,
              'Architecting Intelligence', 1500,
            ]}
            repeat={Infinity}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,102,241,0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 px-10 py-4 bg-primary text-white font-bold rounded-full transition-all duration-300"
        >
          Initialize Portfolio
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-30">
        <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
};

export default Hero;