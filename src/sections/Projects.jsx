import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { PROJECTS } from '../constants';
import { ChevronRight, ChevronLeft, Github, ExternalLink, Download, Terminal } from 'lucide-react';

const Projects = () => {
  const [index, setIndex] = useState(0);
  const cur = PROJECTS[index];

  const nextProject = () => setIndex((prev) => (prev + 1) % PROJECTS.length);
  const prevProject = () => setIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  return (
    <section id="projects" className="py-20 px-6 min-h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT: MOBILE MOCKUP (Exactly like the video) */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-[280px] h-[580px] border-[8px] border-slate-900 rounded-[3rem] bg-black shadow-[0_0_50px_rgba(99,102,241,0.2)] overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-2xl z-20" />
            
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

            {/* Subtle Screen Glare */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent z-10" />
          </div>

          {/* Navigation Arrows */}
          <div className="absolute w-[350px] flex justify-between pointer-events-none">
            <button onClick={prevProject} className="pointer-events-auto p-3 glass rounded-full hover:bg-primary/20 hover:text-accent transition-all border border-white/10 group">
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextProject} className="pointer-events-auto p-3 glass rounded-full hover:bg-primary/20 hover:text-accent transition-all border border-white/10 group">
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* RIGHT: TERMINAL WINDOW */}
        <div className="flex flex-col h-full justify-center">
          <div className="glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl font-mono relative">
            
            {/* Terminal Top Bar */}
            <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-accent/40" />
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-secondary/40">
                <Terminal size={12} />
                {cur.terminalTitle}
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-8 text-sm md:text-base leading-relaxed h-[420px] overflow-y-auto custom-scrollbar">
              <div className="text-accent mb-2">murali@dev:~ $ <span className="text-white">sh run_showcase.sh</span></div>
              
              <TypeAnimation
                key={cur.id}
                sequence={[
                  `> Initializing ${cur.title}...`, 600,
                  `> Loading dependencies... DONE`, 400,
                  `> Status: ACTIVE`, 800,
                ]}
                speed={70} // Faster typing speed
                cursor={true}
                className="text-secondary/80 block mb-6 italic"
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  {cur.status}
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">{cur.title}</h3>
                <p className="text-secondary/60 leading-relaxed max-w-md">
                  {cur.description}
                </p>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2">
                  {cur.features.map(f => (
                    <span key={f} className="text-[10px] font-mono border border-accent/20 px-2 py-1 rounded bg-accent/5 text-accent">
                      #{f.toLowerCase().replace(" ", "_")}
                    </span>
                  ))}
                </div>

                {/* THEMATIC ACTIONS */}
                <div className="flex flex-wrap gap-6 pt-6 border-t border-white/5">
                  <a href={cur.github} target="_blank" className="flex items-center gap-2 text-xs text-secondary/40 hover:text-accent transition-colors">
                    <Github size={14} /> git_branch: main
                  </a>
                  
                  {/* DOWNLOAD LOGS (RESUME TRIGGER) */}
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    href="/assets/resume_murali.pdf"
                    download
                    className="flex items-center gap-2 text-xs text-primary font-bold hover:text-accent transition-colors group cursor-pointer"
                  >
                    <Download size={14} className="group-hover:animate-bounce" />
                    DOWNLOAD_SYSTEM_LOGS.PDF
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;