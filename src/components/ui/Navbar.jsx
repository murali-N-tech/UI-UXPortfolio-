import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink } from 'react-icons/fi';
import { NAV_LINKS } from '../../constants';

const Navbar = () => {
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

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-6 inset-x-0 z-[100] w-[95%] max-w-4xl mx-auto"
      >
        <div className="glass px-5 py-3 rounded-full flex items-center justify-between border border-white/10 shadow-2xl">
          
          {/* LOGO */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </div>
            <span className="font-mono text-sm tracking-[0.2em] font-bold text-white whitespace-nowrap">
              MURALI<span className="text-primary">.SYS</span>
            </span>
          </div>

          {/* NAV LINKS */}
          <ul className="hidden lg:flex items-center gap-6 mx-4">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`}
                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary/60 hover:text-accent transition-colors"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            {/* Changed from <a> to <motion.button> */}
            <motion.button
              onClick={() => setIsResumeOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary/10 border border-primary/50 text-primary rounded-full text-[10px] font-mono hover:bg-primary hover:text-white transition-all whitespace-nowrap cursor-pointer"
            >
              EXEC_RESUME
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* RESUME MODAL */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
          >
            {/* Clickable background to close */}
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
                
                {/* Mobile Custom Fallback UI */}
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

                {/* Desktop & Supported Devices PDF Viewer */}
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
    </>
  );
};

export default Navbar;