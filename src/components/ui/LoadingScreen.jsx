import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    "Initializing Neural Engine...",
    "Loading MERN Stack Modules...",
    "Optimizing Latency...",
    "Syncing HIRE-ME AI Assets...",
    "Finalizing Interface Layer...",
    "System Operational."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Exit after 100%
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[999] bg-background flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-accent/50" />
          <span className="text-[10px] font-mono text-secondary/30 ml-2 uppercase tracking-widest">
            Boot_Sequence_v3.0.sh
          </span>
        </div>

        {/* Progress Display */}
        <div className="font-mono mb-8">
          <div className="text-4xl font-bold text-white mb-2">
            {percent}<span className="text-accent">%</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Loader */}
        <span className="loader" aria-hidden="true" />

        {/* Logs */}
        <div className="h-6">
          <AnimatePresence mode="wait">
            <motion.p 
              key={logIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs font-mono text-accent/70 uppercase tracking-tighter"
            >
              {`> ${logs[logIndex]}`}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;