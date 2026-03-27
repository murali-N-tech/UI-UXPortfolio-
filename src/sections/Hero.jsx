import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Hyperspeed from '../Background/Hyperspeed';

const Hero = () => {
  const hyperspeedOptions = useMemo(() => ({
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
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

  const scrollToProjects = () => {
    const target = document.getElementById('projects');
    if (!target) return;

    const lenis = window.__lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(target);
      return;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-[100svh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-black py-24 md:py-0">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-[1]" />

      {/* MAIN GRID */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 sm:gap-10 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left"
        >

          {/* BADGE */}
          <div className="mb-6 inline-block px-4 py-1 rounded-full border border-accent/30 bg-accent/10 backdrop-blur text-accent text-xs font-mono tracking-widest">
            OPEN TO WORK
          </div>

          {/* NAME */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
            Murali
          </h1>

          {/* SUBTEXT */}
          <h2 className="mt-4 text-lg md:text-xl text-secondary/80 font-light">
            I build things that combine <span className="text-accent">code</span>,
            <span className="text-accent"> intelligence</span>, and
            <span className="text-accent"> design</span>.
          </h2>

          {/* TYPE ANIMATION */}
          <div className="mt-6 text-base md:text-lg text-secondary/70 h-10 font-mono">
            <TypeAnimation
              sequence={[
                'MERN Stack Developer', 1500,
                'Machine Learning Builder', 1500,
                'Creating Real World Projects', 1500
              ]}
              repeat={Infinity}
            />
          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row md:flex-row gap-4 md:justify-start justify-center">

            <motion.button
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent text-black font-semibold rounded-full shadow-[0_0_20px_#22D3EE]"
            >
              View Projects
            </motion.button>

            <motion.a
              href="/resume_murali.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-white/20 text-white rounded-full backdrop-blur hover:bg-white/10 text-center"
            >
              Download Resume
            </motion.a>

          </div>

          {/* FOOT TEXT */}
          <p className="mt-8 text-xs text-secondary/40 font-mono">
            Based in India • Always Learning • Building Daily
          </p>

        </motion.div>

        {/* RIGHT PROFILE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative group">

            {/* GLOW */}
            <div className="absolute inset-0 rounded-full blur-2xl opacity-60 bg-gradient-to-r from-primary via-accent to-primary animate-pulse" />

            {/* IMAGE */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5 shadow-[0_0_40px_rgba(34,211,238,0.3)]"
            >
              <img
                src="https://res.cloudinary.com/dkpjimiip/image/upload/v1774292342/lv_0_20260309225650_qun5wv.jpg"
                alt="Murali"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* FLOAT BADGE */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/60 backdrop-blur border border-white/10 rounded-full text-[10px] font-mono text-accent tracking-widest">
              MERN + ML
            </div>

          </div>
        </motion.div>

      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[2px] h-12 sm:h-16 bg-gradient-to-b from-accent to-transparent"
        />
      </div>

    </section>
  );
};

export default Hero;