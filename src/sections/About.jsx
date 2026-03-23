import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget } from 'react-icons/fi';
import { PROJECTS } from '../constants';
import Stack from './Stack';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
  };

  const fallbackImages = [
    'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format'
  ];

  return (
    <section className="min-h-screen bg-background text-white py-20 px-6 md:px-20 relative overflow-hidden" id="about">
      
      {/* Background Grid */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:40px_40px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <motion.div {...fadeIn} className="mb-16 border-l-4 border-accent pl-6">
          <h2 className="text-sm font-mono text-accent tracking-[0.5em] uppercase mb-2">
            About_Me
          </h2>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
            Who <span className="text-accent">I Am</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-8">
            
            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="glass p-8 rounded-3xl border border-white/5 relative">
              
              {/* Personal Tag */}
              <div className="absolute top-4 right-6 font-mono text-[10px] text-secondary/30 uppercase tracking-widest">
                Built by Murali
              </div>

              {/* MAIN TEXT */}
              <p className="text-lg md:text-xl leading-relaxed text-secondary/90 font-light">
                I’m a developer who genuinely enjoys building things — especially when I can mix logic, creativity, and real-world impact.
              </p>

              <p className="mt-4 text-secondary/70 leading-relaxed font-mono text-sm">
                I started with web development and gradually moved deeper into the MERN stack, working on full projects where I can handle both frontend and backend. Along the way, I got interested in machine learning, so now I try to combine both whenever I can.  

                Most of my projects come from curiosity — whether it’s prediction models, recommendation systems, or computer vision ideas. I don’t just build them to finish tasks, I like understanding how things work and improving them step by step.  

                I also focus a lot on UI and user experience, because I believe a project should not only work well but also feel good to use.  

                I’m still learning, still improving, and that’s the part I enjoy the most.
              </p>
            </motion.div>

            {/* SKILLS */}
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="grid md:grid-cols-2 gap-4">
              
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h4 className="text-accent font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FiTarget className="text-lg" /> Core_Skills
                </h4>
                <p className="text-xs text-secondary/60 leading-loose uppercase tracking-tighter">
                  MongoDB • Express • React • Node • Tailwind • Machine Learning • Computer Vision
                </p>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
                <div className="text-[10px] font-mono text-secondary/40 uppercase mb-2">
                  Growth_Level
                </div>

                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    whileInView={{ width: '92%' }} 
                    transition={{ duration: 1.5 }}
                    className="h-full bg-accent shadow-[0_0_10px_#22D3EE]" 
                  />
                </div>

                <div className="flex justify-between mt-2 font-mono text-[9px] text-accent">
                  <span>LEARNING & BUILDING</span>
                  <span>92%</span>
                </div>
              </div>

            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono text-secondary/40 uppercase tracking-[0.3em] mb-4">
              What I Focus On
            </h3>

            {[
              { label: "Problem Solving", desc: "Strong DSA & Logical Thinking", color: "from-blue-500" },
              { label: "AI + Development", desc: "Combining ML with Web Apps", color: "from-accent" },
              { label: "UI/UX", desc: "Clean, Interactive Interfaces", color: "from-purple-500" },
            ].map((skill, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="glass p-4 rounded-xl border border-white/5 flex items-center gap-4"
              >
                <div className={`w-1 h-10 bg-gradient-to-b ${skill.color} to-transparent`} />
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">{skill.label}</p>
                  <p className="text-[10px] text-secondary/40 font-mono mt-0.5">{skill.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* PROJECT STACK */}
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.25 }}
              className="glass p-6 rounded-2xl border border-white/5 mt-6"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <h4 className="text-accent font-mono text-xs uppercase tracking-widest">
                  My_Work
                </h4>
                <div className="text-[10px] font-mono text-secondary/40 uppercase tracking-widest">
                  Drag / Click
                </div>
              </div>

              <div className="w-full max-w-[420px] mx-auto aspect-square">
                <Stack
                  randomRotation={false}
                  sensitivity={200}
                  sendToBackOnClick={true}
                  autoplay={false}
                  autoplayDelay={3000}
                  pauseOnHover={false}
                  cards={(PROJECTS?.length ? PROJECTS : fallbackImages).slice(0, 6).map((p, i) => {
                    const src = typeof p === 'string' ? p : (p.mockup || fallbackImages[i % fallbackImages.length]);
                    const title = typeof p === 'string' ? `project-${i + 1}` : (p.title || `project-${i + 1}`);

                    return (
                      <div key={typeof p === 'string' ? i : (p.id || i)} className="w-full h-full relative">
                        <img
                          src={src}
                          alt={title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallbackImages[i % fallbackImages.length];
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                          <div className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                            {title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* FOOTER */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center border-t border-white/5 pt-12"
        >
          <p className="text-xl md:text-3xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight italic">
            I just want to keep building things that are useful, meaningful, and a little better than what I made yesterday.
          </p>
        </motion.div>

      </div>

      <style>{`
        .glass { 
          background: rgba(255, 255, 255, 0.02); 
          backdrop-filter: blur(12px); 
        }
      `}</style>
    </section>
  );
};

export default About;