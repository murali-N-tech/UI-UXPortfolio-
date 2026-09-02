import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiCode, FiCpu, FiLayout, FiMapPin, FiBookOpen } from 'react-icons/fi';
import { PROJECTS } from '../constants';
import Stack from './Stack';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fallbackImages = [
    'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format'
  ];

  const focusAreas = [
    { label: "Problem Solving", desc: "Data Structures & Algorithms", icon: FiCode, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "AI Integration", desc: "Machine Learning Models", icon: FiCpu, color: "text-accent", bg: "bg-accent/10" },
    { label: "UI/UX Design", desc: "Interactive Interfaces", icon: FiLayout, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  const skills = [
    "MongoDB", "Express.js", "React", "Node.js", "Python", "Java", 
    "Machine Learning", "Computer Vision", "Tailwind CSS", "NLP"
  ];

  return (
    // FIX: Changed padding for edge-to-edge mobile cards
    <section className="min-h-screen bg-transparent text-white py-20 px-0 sm:px-6 md:px-12 lg:px-20 relative overflow-hidden" id="about">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:32px_32px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12 border-l-2 border-primary pl-4 md:pl-6 ml-4 sm:ml-0"
        >
          <h2 className="text-[10px] md:text-xs font-mono text-primary tracking-[0.4em] uppercase mb-2 md:mb-3">
            About_Me
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white/90">
            Who <span className="text-primary">I Am</span>
          </h1>
        </motion.div>

        {/* BENTO GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-1 sm:gap-6"
        >
          
          {/* CARD 1: MAIN BIO */}
          <motion.div variants={itemVariants} className="glass mobile-edge col-span-1 md:col-span-7 p-6 md:p-10 flex flex-col justify-between group hover:border-white/[0.15] transition-colors">
            <div>
              <div className="flex flex-wrap gap-1.5 md:gap-3 mb-4 md:mb-8">
                <span className="inline-flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1 rounded-full bg-white/5 border border-white/10 text-[6px] md:text-[10px] font-mono text-secondary/70">
                  <FiBookOpen className="text-primary text-[8px] md:text-base" /> B.Tech AI & DS
                </span>
                <span className="inline-flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1 rounded-full bg-white/5 border border-white/10 text-[6px] md:text-[10px] font-mono text-secondary/70">
                  <FiMapPin className="text-primary text-[8px] md:text-base" /> Bhimavaram
                </span>
              </div>

              <h3 className="text-[12px] sm:text-lg md:text-2xl font-light text-white/90 leading-snug mb-3 md:mb-6">
                I’m a developer who genuinely enjoys building things — mixing <span className="text-primary font-medium">logic</span>, <span className="text-primary font-medium">creativity</span>, and <span className="text-primary font-medium">real-world impact</span>.
              </h3>

              <div className="space-y-2 md:space-y-4 text-[7px] sm:text-xs md:text-sm text-secondary/60 leading-relaxed font-mono">
                <p>
                  I started with web development and gradually moved deeper into the MERN stack. Along the way, my curiosity drew me into ML and AI, so now I actively combine predictive models with web apps.
                </p>
                <p className="hidden sm:block">
                  Most of my projects are driven by curiosity. I obsess over understanding how things work beneath the surface and ensuring the final UI feels effortless.
                </p>
              </div>
            </div>

            {/* Growth Bar */}
            <div className="mt-4 md:mt-10 pt-3 md:pt-6 border-t border-white/5">
              <div className="flex justify-between mb-1.5 md:mb-2 font-mono text-[6px] md:text-[10px] text-accent tracking-widest">
                <span>CONSTANT LEARNING</span>
                <span>92%</span>
              </div>
              <div className="w-full h-[2px] md:h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  whileInView={{ width: '92%' }} 
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary to-accent shadow-[0_0_15px_#22D3EE]" 
                />
              </div>
            </div>
          </motion.div>

          {/* CARD 2: FOCUS AREAS */}
          <motion.div variants={itemVariants} className="glass mobile-edge col-span-1 md:col-span-5 p-6 md:p-8 flex flex-col justify-center">
            <h4 className="text-[7px] md:text-xs font-mono text-secondary/40 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-8">
              Core Focus
            </h4>
            <div className="space-y-2 md:space-y-5">
              {focusAreas.map((area, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-5 p-1.5 md:p-3 rounded-xl md:rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <div className={`w-6 h-6 md:w-12 md:h-12 rounded-full ${area.bg} flex items-center justify-center shrink-0`}>
                    <area.icon className={`text-[10px] md:text-xl ${area.color}`} />
                  </div>
                  <div>
                    <h5 className="text-[8px] md:text-sm font-bold text-white/90 tracking-wide leading-tight">{area.label}</h5>
                    <p className="text-[6px] md:text-[11px] text-secondary/50 font-mono mt-0.5 md:mt-1 hidden sm:block">{area.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CARD 3: TECH STACK */}
          <motion.div variants={itemVariants} className="glass mobile-edge col-span-1 md:col-span-6 p-6 md:p-8">
            <h4 className="flex items-center gap-1.5 md:gap-2 text-primary font-mono text-[7px] md:text-xs uppercase tracking-widest mb-3 md:mb-6">
              <FiTarget className="text-[8px] md:text-sm" /> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5 md:gap-3">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 md:px-4 md:py-2 rounded-md md:rounded-lg bg-white/5 border border-white/10 text-[6px] md:text-xs font-mono text-secondary/80 hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-all cursor-default whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CARD 4: VISUAL WORK */}
          <motion.div variants={itemVariants} className="glass mobile-edge col-span-1 md:col-span-6 p-6 md:p-8 flex flex-row items-center justify-between gap-4 md:gap-8 overflow-hidden">
            <div className="flex-1">
              <h4 className="text-primary font-mono text-[7px] md:text-xs uppercase tracking-widest mb-1 md:mb-2">
                My_Work
              </h4>
              <p className="text-[8px] md:text-[10px] text-secondary/50 font-mono leading-relaxed max-w-[100px] md:max-w-[200px]">
                A glimpse into the interfaces I've built. (Drag)
              </p>
            </div>
            
            {/* Shrunk stack size for mobile */}
            <div className="w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] md:w-[180px] md:h-[180px] shrink-0">
              <Stack
                randomRotation={false}
                sensitivity={200}
                sendToBackOnClick={true}
                autoplay={false}
                cards={(PROJECTS?.length ? PROJECTS : fallbackImages).slice(0, 6).map((p, i) => {
                  const src = typeof p === 'string' ? p : (p.mockup || fallbackImages[i % fallbackImages.length]);
                  return (
                    <div key={typeof p === 'string' ? i : (p.id || i)} className="w-full h-full rounded-md md:rounded-xl overflow-hidden border border-white/20 shadow-xl">
                      <img
                        src={src}
                        alt={`Project ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = fallbackImages[i % fallbackImages.length];
                        }}
                      />
                    </div>
                  );
                })}
              />
            </div>
          </motion.div>

        </motion.div>

        {/* FOOTER QUOTE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 md:mt-20 text-center border-t border-white/5 pt-8 md:pt-12 relative"
        >
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-2 md:px-4 text-accent text-lg md:text-2xl">"</span>
          <p className="text-sm sm:text-lg md:text-2xl font-light tracking-wide text-secondary/80 max-w-2xl mx-auto leading-relaxed italic px-4">
            I just want to keep building things that are useful, meaningful, and a little better than what I made yesterday.
          </p>
        </motion.div>

      </div>

    </section>
  );
};

export default About;