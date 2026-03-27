import { motion } from 'framer-motion';

const TechStack = () => {
  const stats = [
    { label: "Neural Engine (AI/ML)", value: 92, color: "bg-accent" },
    { label: "Core Processing (Backend)", value: 88, color: "bg-primary" },
    { label: "Interface Layer (Frontend)", value: 95, color: "bg-highlight" },
    { label: "Deployment Sync (DevOps)", value: 80, color: "bg-primary" },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-background/50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl font-mono relative">
          {/* Terminal Top Bar */}
          <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/40" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
              <div className="w-3 h-3 rounded-full bg-accent/40" />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-secondary/40">
              TECH_STACK [ diagnostics ]
            </div>
          </div>

          {/* Body */}
          <div className="relative p-6 sm:p-8">
            {/* Decorative Scanner Line */}
            <motion.div
              aria-hidden
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"
            />

            <div className="relative">
              <div className="text-accent mb-3 text-[11px]">
                murali@dev:~ $ <span className="text-white">run system_diagnostics</span>
              </div>

              <div className="flex items-start justify-between gap-4 mb-8">
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    System Diagnostics
                  </h2>
                  <p className="text-secondary/60 text-xs sm:text-sm mt-1 leading-relaxed">
                    Real-time signal strength across my core engineering layers.
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-[10px] text-secondary/40 uppercase tracking-widest">Status</div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-bold mt-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    OPTIMIZED
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Stats */}
                <div className="space-y-6">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="group">
                      <div className="flex justify-between gap-4 mb-2 text-xs sm:text-sm">
                        <span className="text-secondary/70 group-hover:text-white transition-colors">
                          {stat.label}
                        </span>
                        <span className="text-accent shrink-0">{stat.value}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, delay: i * 0.12, ease: "circOut" }}
                          className={`h-full ${stat.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Readout */}
                <div className="space-y-4">
                  <div className="glass rounded-xl border border-white/10 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-secondary/40">Readout</div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {[
                        "Latency: 12ms",
                        "Uptime: 99.9%",
                        "Threads: Multi",
                        "Build: Stable"
                      ].map((text) => (
                        <div key={text} className="text-[10px] text-secondary/60 uppercase tracking-widest">
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass rounded-xl border border-white/10 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-secondary/40">Notes</div>
                    <p className="mt-2 text-xs text-secondary/60 leading-relaxed">
                      I focus on building fast, maintainable systems with clean UI and reliable deployments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;