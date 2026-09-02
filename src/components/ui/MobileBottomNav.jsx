import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code2, FolderGit2, Mail } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'skills', icon: Code2, label: 'Skills' },
  { id: 'projects', icon: FolderGit2, label: 'Projects' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

const MobileBottomNav = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // Simple scroll spy for active state
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="md:hidden fixed bottom-6 inset-x-4 z-[100]">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-nav rounded-full p-2 flex justify-around items-center border border-white/[0.08]"
      >
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const isActive = activeSection === id;
          
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(id);
              }}
              className="relative flex flex-col items-center justify-center p-2 w-16"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-2xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon 
                size={22} 
                className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-accent' : 'text-secondary/60'}`} 
              />
              <span className={`relative z-10 text-[10px] mt-1 font-medium transition-all duration-300 ${isActive ? 'text-accent opacity-100' : 'text-secondary/60 opacity-0 h-0 overflow-hidden'}`}>
                {label}
              </span>
              {isActive && (
                 <div className="absolute -top-1 w-1 h-1 bg-accent rounded-full shadow-[0_0_8px_#22D3EE]" />
              )}
            </a>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default MobileBottomNav;
