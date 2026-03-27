import React from 'react';
import { motion } from 'framer-motion';

const TechStack = () => {
  // Restored your original theme colors for the bars
  const skills = [
    { label: "Interface Layer", value: 95, color: "bg-highlight", bg: "bg-highlight/10", icon: "✨" },
    { label: "Neural Engine", value: 92, color: "bg-accent", bg: "bg-accent/10", icon: "🧠" },
    { label: "Core Processing", value: 88, color: "bg-primary", bg: "bg-primary/10", icon: "⚡" },
    { label: "Deployment Sync", value: 80, color: "bg-primary", bg: "bg-primary/10", icon: "🚀" },
  ];

  const metrics = [
    { label: "Latency", value: "12ms" },
    { label: "Uptime", value: "99.9%" },
    { label: "Threads", value: "Multi" },
    { label: "Build", value: "Stable" }
  ];

  // Framer Motion variants for staggered rendering
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-background/50 relative overflow-hidden font-mono">
      {/* Background glow effect using your accent color */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          variants={container} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6"
        >
          {/* Header Card (Spans 8 cols) */}
          <motion.div variants={item} className="md:col-span-8 glass bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                {/* Kept the green ping for the universal "Online/Optimized" look from your original code */}
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs uppercase tracking-widest text-green-400 font-bold">System Optimized</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                Engineering <span className="text-secondary/60">Architecture</span>
              </h2>
              <p className="text-secondary/70 text-sm max-w-md leading-relaxed">
                Real-time signal strength across my core engineering layers. Focused on building fast, maintainable systems with clean UI and reliable deployments.
              </p>
            </div>
          </motion.div>

          {/* Metrics Grid (Spans 4 cols) */}
          <motion.div variants={item} className="md:col-span-4 grid grid-cols-2 gap-4 sm:gap-6">
            {metrics.map((metric, i) => (
              <div key={i} className="glass bg-white/5 border border-white/10 rounded-3xl p-4 flex flex-col justify-center items-center text-center hover:bg-white/10 transition-colors">
                <span className="text-secondary/50 text-[10px] uppercase tracking-widest mb-1">{metric.label}</span>
                <span className="text-white font-medium text-sm sm:text-base">{metric.value}</span>
              </div>
            ))}
          </motion.div>

          {/* Skills Bento Cards (Span 3 cols each) */}
          {skills.map((skill, i) => (
            <motion.div 
              key={skill.label} 
              variants={item}
              whileHover={{ y: -5 }}
              className="md:col-span-3 glass bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`w-10 h-10 rounded-xl ${skill.bg} flex items-center justify-center text-lg border border-white/5`}>
                  {skill.icon}
                </div>
                <span className="text-2xl font-light text-secondary/40 group-hover:text-white transition-colors">
                  {skill.value}<span className="text-sm text-secondary/60">%</span>
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white/90 mb-3">{skill.label}</h3>
                {/* Modern Progress Bar */}
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: "circOut" }}
                    className={`h-full ${skill.color} relative`}
                  >
                    {/* Tiny animated highlight on the bar */}
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;