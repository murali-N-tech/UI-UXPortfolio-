import { motion } from 'framer-motion';

const TechStack = () => {
  const stats = [
    { label: "Neural Engine (AI/ML)", value: 92, color: "bg-accent" },
    { label: "Core Processing (Backend)", value: 88, color: "bg-primary" },
    { label: "Interface Layer (Frontend)", value: 95, color: "bg-highlight" },
    { label: "Deployment Sync (DevOps)", value: 80, color: "bg-indigo-400" },
  ];

  return (
    <section className="py-20 px-6 bg-background/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto glass p-10 rounded-[2rem] border-white/5 relative">
        
        {/* Decorative Scanner Line */}
        <motion.div 
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent z-0"
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-2xl font-mono uppercase tracking-[0.3em] text-secondary/80">
              System Diagnostics
            </h2>
          </div>

          <div className="space-y-8">
            {stats.map((stat, i) => (
              <div key={i} className="group">
                <div className="flex justify-between mb-2 font-mono text-sm">
                  <span className="text-secondary/60 group-hover:text-white transition-colors">
                    {stat.label}
                  </span>
                  <span className="text-accent">{stat.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.value}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: "circOut" }}
                    className={`h-full ${stat.color} shadow-[0_0_15px_rgba(34,211,238,0.5)]`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
            {["Latency: 12ms", "Uptime: 99.9%", "Threads: Multi", "Status: Optimized"].map((text, i) => (
              <div key={i} className="text-[10px] font-mono text-secondary/40 uppercase tracking-widest text-center">
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;