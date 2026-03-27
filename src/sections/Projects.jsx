import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { PROJECTS } from '../constants';
import { ChevronRight, ChevronLeft, Github, ExternalLink, Download, Terminal } from 'lucide-react';
import { FiX, FiExternalLink as FiExtIcon } from 'react-icons/fi';

const Projects = () => {
  const [index, setIndex] = useState(0);
  const cur = PROJECTS[index];

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

  const nextProject = () => setIndex((prev) => (prev + 1) % PROJECTS.length);
  const prevProject = () => setIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  return (
    <section id="projects" className="py-12 sm:py-20 px-2 sm:px-6 min-h-screen flex flex-col justify-center relative overflow-hidden">
      
      {/* FORCED 2-COLUMN GRID ON MOBILE */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-2 gap-3 sm:gap-10 lg:gap-12 items-center">
        
        {/* LEFT: MOBILE MOCKUP - Locked to exact same height as terminal */}
        <div className="relative flex justify-center items-center h-[300px] sm:h-[580px] w-full">
          
          <div className="relative h-full aspect-[9/19] border-[4px] sm:border-[8px] border-slate-900 rounded-[1.5rem] sm:rounded-[3rem] bg-black shadow-[0_0_30px_rgba(99,102,241,0.2)] overflow-hidden shrink-0">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-32 h-3.5 sm:h-7 bg-slate-900 rounded-b-lg sm:rounded-b-2xl z-20" />
            
            <AnimatePresence mode="wait">
              <motion.img
                key={cur.id}
                src={cur.mockup}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent z-10" />
          </div>

          {/* Navigation Arrows */}
          <div className="absolute w-full max-w-[160px] sm:max-w-[350px] flex justify-between pointer-events-none z-30">
            <button onClick={prevProject} className="pointer-events-auto p-1.5 sm:p-3 glass rounded-full hover:bg-primary/20 hover:text-accent transition-all border border-white/10 group bg-black/50 backdrop-blur-md">
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform text-white" />
            </button>
            <button onClick={nextProject} className="pointer-events-auto p-1.5 sm:p-3 glass rounded-full hover:bg-primary/20 hover:text-accent transition-all border border-white/10 group bg-black/50 backdrop-blur-md">
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform text-white" />
            </button>
          </div>
        </div>

        {/* RIGHT: TERMINAL WINDOW - Locked to exact same height as mockup */}
        <div className="flex flex-col h-[300px] sm:h-[580px] w-full">
          
          <div className="glass rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl font-mono relative h-full flex flex-col">
            
            <div className="bg-white/5 px-2 sm:px-4 py-1.5 sm:py-3 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex gap-1 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-red-500/40" />
                <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/40" />
                <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-accent/40" />
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-[6px] sm:text-[10px] uppercase tracking-widest text-secondary/40 min-w-0">
                <Terminal className="shrink-0 w-2 h-2 sm:w-3 sm:h-3" />
                <span className="truncate">{cur.terminalTitle}</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-3 sm:p-8 flex-1 overflow-y-auto custom-scrollbar">
              <div className="text-accent mb-1 sm:mb-2 text-[8px] sm:text-base">murali@dev:~ $ <span className="text-white">sh run.sh</span></div>
              
              <TypeAnimation
                key={cur.id}
                sequence={[
                  `> Init ${cur.title}...`, 600,
                  `> Status: ACTIVE`, 800,
                ]}
                speed={70}
                cursor={true}
                className="text-secondary/80 block mb-2 sm:mb-6 italic text-[7px] sm:text-base"
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="space-y-2 sm:space-y-6"
              >
                <div className="inline-flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[6px] sm:text-[10px] font-bold">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full animate-pulse" />
                  {cur.status}
                </div>

                <h3 className="text-sm sm:text-2xl font-bold text-white tracking-tight leading-tight">{cur.title}</h3>
                
                <p className="text-secondary/60 leading-snug text-[8px] sm:text-base line-clamp-3 sm:line-clamp-none">
                  {cur.description}
                </p>

                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {cur.features.map(f => (
                    <span key={f} className="text-[6px] sm:text-[10px] font-mono border border-accent/20 px-1 sm:px-2 py-0.5 sm:py-1 rounded bg-accent/5 text-accent">
                      #{f.toLowerCase().replace(" ", "_")}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-6 pt-2 sm:pt-6 border-t border-white/5 mt-auto">
                  <a href={cur.github} target="_blank" className="flex items-center gap-1 sm:gap-2 text-[7px] sm:text-xs text-secondary/40 hover:text-accent transition-colors">
                    <Github className="w-2.5 h-2.5 sm:w-4 sm:h-4" /> branch: main
                  </a>
                  {cur.live && cur.live !== "#" && (
                    <a
                      href={cur.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 sm:gap-2 text-[7px] sm:text-xs text-secondary/40 hover:text-accent transition-colors"
                    >
                      <ExternalLink className="w-2.5 h-2.5 sm:w-4 sm:h-4" /> open_live
                    </a>
                  )}
                  
                  <motion.button 
                    onClick={() => setIsResumeOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1 sm:gap-2 text-[7px] sm:text-xs text-primary font-bold hover:text-accent transition-colors group cursor-pointer"
                  >
                    <Download className="w-2.5 h-2.5 sm:w-4 sm:h-4 group-hover:animate-bounce" />
                    SYSTEM_LOGS
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* RESUME MODAL */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-8 bg-black/80 backdrop-blur-md"
          >
            <div 
              className="absolute inset-0 cursor-pointer" 
              onClick={() => setIsResumeOpen(false)} 
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-[600px] h-[92vh] sm:h-[90vh] bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              <div className="flex justify-between items-center px-4 py-3 border-b border-white/10 bg-[#111] shrink-0">
                <h3 className="text-accent font-mono text-[10px] sm:text-sm tracking-widest uppercase">
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
                    <FiX size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 w-full relative bg-[#2a2a2a] flex items-center justify-center overflow-hidden rounded-b-xl overflow-y-auto -webkit-overflow-scrolling-touch">
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
                    Open Resume Fullscreen <FiExtIcon />
                  </a>
                </div>

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

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
        }
      `}</style>
    </section>
  );
};

export default Projects;