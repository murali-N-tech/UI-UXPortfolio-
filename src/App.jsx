import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

// Components
import Navbar from './components/ui/Navbar';
import CustomCursor from './components/ui/CustomCursor';
import LoadingScreen from './components/ui/LoadingScreen'; // Corrected path

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import TechStack from './sections/TechStack';
import Contact from './sections/Contact';

// ... other imports

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-background text-secondary cursor-none overflow-x-hidden">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div key="content">
            <Navbar />
            
            {/* Sections */}
            <Hero /> {/* Hyperspeed is now INSIDE here */}
            
            <div className="relative bg-background">
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