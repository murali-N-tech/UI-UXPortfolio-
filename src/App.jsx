import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

// Components
import Navbar from './components/ui/Navbar';
import CustomCursor from './components/ui/CustomCursor';
import LoadingScreen from './components/ui/LoadingScreen';
import Hyperspeed from './Background/Hyperspeed'; // ADDED HYPERSPEED IMPORT

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import TechStack from './sections/TechStack';
import Contact from './sections/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // ADDED HYPERSPEED OPTIONS TO APP.JSX
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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false
    });

    window.__lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = undefined;
    };
  }, []);

  return (
    <main className="text-secondary cursor-auto md:cursor-none overflow-x-hidden relative min-h-screen">
      <CustomCursor />

      {/* GLOBAL FIXED BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-70 pointer-events-none bg-black">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div key="content" className="relative z-10">
            <Navbar />
            
            {/* Sections */}
            <Hero />
            
            {/* Removed solid bg-background so the global background shows through */}
            <div className="relative">
               <About />
               <Skills />
               <Projects />
               <TechStack />
               <Contact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;