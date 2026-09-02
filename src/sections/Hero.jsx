import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiX, FiExternalLink } from 'react-icons/fi';

const Hero = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    if (isResumeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isResumeOpen]);

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
    <section className="relative min-h-[100svh] md:h-screen w-full flex items-center justify-center overflow-hidden py-24 md:py-0">

      {/* OVERLAY - Subtle fade so the global Hyperspeed background shows through clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent z-[1] pointer-events-none" />

      {/* MAIN GRID - Stacked on mobile, 2 columns on desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12 md:mt-0">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-left flex flex-col items-center md:items-start order-2 md:order-1"
        >
          {/* BADGE */}
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur text-primary text-[10px] sm:text-xs font-mono tracking-widest whitespace-nowrap">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            OPEN TO WORK
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-[1.1] text-center md:text-left">
            Murali<span className="text-primary">.</span>
          </h1>
          
          <h2 className="mt-4 text-sm sm:text-lg md:text-xl text-secondary/90 font-light leading-relaxed text-center md:text-left max-w-lg">
            I engineer reliable solutions combining <span className="text-primary font-medium">software development</span>,
            <span className="text-primary font-medium"> machine learning</span>, and
            <span className="text-primary font-medium"> user-centered design</span>.
          </h2>
          
          <div className="mt-4 sm:mt-6 text-xs sm:text-base md:text-lg text-primary/80 h-6 sm:h-10 font-mono text-center md:text-left">
            <TypeAnimation
              sequence={[
                '> MERN Stack Developer', 1500,
                '> Machine Learning Builder', 1500,
                '> Creating Real World Projects', 1500
              ]}
              repeat={Infinity}
            />
          </div>
          
          {/* BUTTONS */}
          <div className="mt-8 sm:mt-10 flex flex-row gap-4 justify-center md:justify-start w-full">
            <motion.button
              onClick={() => setIsResumeOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all text-sm sm:text-base cursor-pointer"
            >
              View Resume
            </motion.button>
            <motion.button
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-white/20 text-white rounded-full backdrop-blur-md hover:bg-white/5 transition-all text-sm sm:text-base cursor-pointer"
            >
              View Projects
            </motion.button>
          </div>
          
          <p className="mt-8 sm:mt-12 text-[10px] sm:text-xs text-secondary/40 font-mono tracking-widest uppercase">
            Based in India • Building Daily
          </p>
        </motion.div>

        {/* RIGHT PROFILE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center md:justify-end order-1 md:order-2"
        >
          <div className="relative group">
            {/* IMAGE CONTAINER */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-[#0F172A]"
            >
              <img
                src="https://res.cloudinary.com/dkpjimiip/image/upload/v1774292342/lv_0_20260309225650_qun5wv.jpg"
                alt="Murali"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-[#0F172A]/95 backdrop-blur-md border border-white/10 rounded-full text-xs font-mono text-accent tracking-widest whitespace-nowrap shadow-lg">
              MERN + ML
            </div>
          </div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] sm:w-[2px] h-8 sm:h-16 bg-gradient-to-b from-accent to-transparent"
        />
      </div>

      {/* RESUME MODAL */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
          >
            <div 
              className="absolute inset-0 cursor-pointer" 
              onClick={() => setIsResumeOpen(false)} 
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-[600px] h-[85vh] sm:h-[90vh] bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-4 py-3 border-b border-white/10 bg-[#111] shrink-0">
                <h3 className="text-accent font-mono text-sm tracking-widest uppercase">
                  Resume Preview
                </h3>
                <div className="flex items-center gap-4 shrink-0">
                  <a 
                    href="/resume_murali.pdf" 
                    download 
                    className="hidden sm:block text-xs font-mono text-secondary/60 hover:text-white transition-colors"
                  >
                    [ Download ]
                  </a>
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="text-white/70 hover:text-accent transition-colors p-1"
                  >
                    <FiX size={22} />
                  </button>
                </div>
              </div>
              
              {/* Modal Body / PDF Viewer */}
              <div className="flex-1 w-full relative bg-[#2a2a2a] flex items-center justify-center overflow-hidden rounded-b-xl">
                
                {/* 1. Mobile Custom Fallback UI */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0 sm:hidden">
                  <p className="text-white/60 text-sm mb-6 font-light">
                    Your mobile browser is restricting the inline PDF view.
                  </p>
                  <a
                    href="/resume_murali.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-accent text-black font-semibold rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                  >
                    Open Resume Fullscreen <FiExternalLink />
                  </a>
                </div>

                {/* 2. Desktop & Supported Devices PDF Viewer */}
                <object
                  data="/resume_murali.pdf#toolbar=0&navpanes=0&view=FitH"
                  type="application/pdf"
                  className="w-full h-full relative z-10 bg-transparent rounded-b-xl"
                >
                </object>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;