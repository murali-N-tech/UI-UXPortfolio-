import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Mail, Linkedin, Github, ArrowRight } from 'lucide-react';
import { FiX, FiExternalLink as FiExtIcon } from 'react-icons/fi';

const Contact = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Prevent background scrolling when modal is open
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    // bg-transparent ensures the Hyperspeed background shows through
    <section id="contact" className="py-20 sm:py-32 px-3 sm:px-6 relative min-h-[90vh] flex flex-col justify-center bg-transparent">
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16 border-l-2 border-cyan-400 pl-4 md:pl-6"
        >
          <h2 className="text-[10px] md:text-xs font-mono text-cyan-400 tracking-[0.4em] uppercase mb-2 md:mb-3">
            Connection_Protocol
          </h2>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black italic uppercase text-white/90">
            Initiate <span className="text-cyan-400">Contact</span>
          </h1>
        </motion.div>

        {/* HUD LAYOUT */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
        >
          {/* LEFT: TERMINAL STATUS MSG (Spans 7 cols on desktop) */}
          <motion.div variants={itemVariants} className="glass md:col-span-7 p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl flex flex-col justify-between border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-6 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>System_Ready // Awaiting_Input</span>
              </div>
              
              <h3 className="text-xl sm:text-3xl md:text-4xl font-light text-white/90 leading-tight mb-4 sm:mb-6">
                Currently seeking opportunities to deploy <span className="text-cyan-400 font-medium">high-impact AI systems</span> and modern web architectures.
              </h3>
              
              <p className="text-xs sm:text-sm text-secondary/60 font-mono leading-relaxed max-w-md">
                Whether you have a project in mind, a role to fill, or just want to discuss the architecture of your next big idea, let's open a channel.
              </p>
            </div>

            <div className="mt-8 sm:mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[8px] sm:text-[10px] font-mono text-secondary/40 tracking-widest">
                STATUS: ONLINE
              </span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-cyan-400/30" />
                <div className="w-2 h-2 rounded-full bg-cyan-400/30" />
              </div>
            </div>
          </motion.div>

          {/* RIGHT: CONTACT LINKS (Spans 5 cols on desktop) */}
          <motion.div variants={itemVariants} className="md:col-span-5 flex flex-col gap-3 sm:gap-4">
            
            {/* Email Button */}
            <a 
              href="mailto:your-email@example.com" 
              className="glass p-5 sm:p-6 rounded-2xl md:rounded-3xl border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-white text-sm sm:text-base font-bold">Email Interface</h4>
                  <p className="text-secondary/50 font-mono text-[8px] sm:text-[10px] mt-1">DIRECT_MESSAGE</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-secondary/30 group-hover:text-cyan-400 group-hover:-rotate-45 transition-all" />
            </a>

            {/* LinkedIn Button */}
            <a 
              href="https://linkedin.com/in/murali" 
              target="_blank" rel="noreferrer"
              className="glass p-5 sm:p-6 rounded-2xl md:rounded-3xl border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-white text-sm sm:text-base font-bold">Professional Network</h4>
                  <p className="text-secondary/50 font-mono text-[8px] sm:text-[10px] mt-1">LINKEDIN_PROFILE</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-secondary/30 group-hover:text-blue-400 group-hover:-rotate-45 transition-all" />
            </a>

            {/* GitHub Button */}
            <a 
              href="https://github.com/your-github" 
              target="_blank" rel="noreferrer"
              className="glass p-5 sm:p-6 rounded-2xl md:rounded-3xl border border-white/10 hover:border-white/50 hover:bg-white/5 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-white text-sm sm:text-base font-bold">Code Repository</h4>
                  <p className="text-secondary/50 font-mono text-[8px] sm:text-[10px] mt-1">GITHUB_COMMITS</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-secondary/30 group-hover:text-white group-hover:-rotate-45 transition-all" />
            </a>

          </motion.div>
        </motion.div>

        {/* FOOTER */}
        <div className="mt-16 sm:mt-24 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-secondary/40 font-mono text-[8px] sm:text-xs gap-4 sm:gap-6">
          <p>© 2026 MURALI.SYS // ALL SYSTEMS OPERATIONAL</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <a href="https://github.com/your-github" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">GITHUB</a>
            
            {/* MODIFIED: Resume button triggers modal instead of linking */}
            <button onClick={() => setIsResumeOpen(true)} className="hover:text-cyan-400 transition-colors cursor-pointer uppercase">
              RESUME_DATA
            </button>
            
            <a href="#" className="hover:text-cyan-400 transition-colors">SOURCE_CODE</a>
          </div>
        </div>

      </div>

      {/* RESUME MODAL (Identical to other sections) */}
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
                <h3 className="text-cyan-400 font-mono text-[10px] sm:text-sm tracking-widest uppercase">
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
                    className="text-white/70 hover:text-cyan-400 transition-colors p-1"
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
                    className="flex items-center gap-2 px-6 py-3 bg-cyan-400 text-black font-semibold rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)]"
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

export default Contact;