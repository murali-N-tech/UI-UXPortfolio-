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
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-[1]" />

      {/* MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >

        {/* STATUS BADGE */}
        <div className="mb-6 inline-block px-4 py-1 rounded-full border border-accent/30 bg-accent/10 backdrop-blur text-accent text-xs font-mono tracking-widest">
          OPEN TO WORK
        </div>

        {/* NAME */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-tight">
          Murali
        </h1>

        {/* SUB HEADING */}
        <h2 className="mt-4 text-lg md:text-2xl text-secondary/80 font-light">
          I build things that combine <span className="text-accent">code</span>,
          <span className="text-accent"> intelligence</span>, and
          <span className="text-accent"> design</span>.
        </h2>

        {/* TYPE ANIMATION */}
        <div className="mt-6 text-base md:text-xl text-secondary/70 h-10 font-mono">
          <TypeAnimation
            sequence={[
              'MERN Stack Developer', 1500,
              'Machine Learning Builder', 1500,
              'Creating Real World Projects', 1500
            ]}
            repeat={Infinity}
          />
        </div>

        {/* CTA BUTTONS */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">

          <motion.button
            type="button"
            onClick={scrollToProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-accent text-black font-semibold rounded-full shadow-[0_0_20px_#22D3EE] transition"
          >
            View Projects
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume_murali.pdf"
            download
            className="px-8 py-3 border border-white/20 text-white rounded-full backdrop-blur hover:bg-white/10 transition inline-flex items-center justify-center"
          >
            Download Resume
          </motion.a>

        </div>

        {/* SMALL PERSONAL TOUCH */}
        <p className="mt-8 text-xs text-secondary/40 font-mono">
          Based in India • Always Learning • Building Daily
        </p>

      </motion.div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[2px] h-16 bg-gradient-to-b from-accent to-transparent"
        />
      </div>

    </section>
  );
};

export default Hero;