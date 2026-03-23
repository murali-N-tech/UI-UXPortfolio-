import { motion } from 'framer-motion';
import { NAV_LINKS } from '../../constants';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 inset-x-0 z-[100] w-[95%] max-w-4xl mx-auto" // Bug fix: Uses inset-x-0 and mx-auto
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

        {/* NAV LINKS - Bug fix: Added hidden on small screens + gap control */}
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
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/assets/resume_murali.pdf"
            className="px-4 py-2 bg-primary/10 border border-primary/50 text-primary rounded-full text-[10px] font-mono hover:bg-primary hover:text-white transition-all whitespace-nowrap"
          >
            EXEC_RESUME
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;