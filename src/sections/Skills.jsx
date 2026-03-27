import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink } from 'react-icons/fi';

/* ===============================
   🔥 REAL ANALOG CLOCK (PREMIUM HUD)
================================ */
const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds() + time.getMilliseconds() / 1000;
  const minutes = time.getMinutes() + seconds / 60;
  const hours = (time.getHours() % 12) + minutes / 60;

  const secDeg = seconds * 6;
  const minDeg = minutes * 6;
  const hourDeg = hours * 30;

  return (
    // Scaled down drastically for mobile (w-36 h-36), normal on desktop (w-72 h-72)
    <div className="relative w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 flex items-center justify-center [--clock-radius:65px] sm:[--clock-radius:110px] md:[--clock-radius:140px]">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 to-purple-500/10 blur-xl" />
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#0f172a] to-[#020617] shadow-[inset_0_0_30px_rgba(255,255,255,0.05),0_0_40px_rgba(34,211,238,0.15)] border border-white/10 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full backdrop-blur-md bg-white/[0.02]" />
        
        {/* Numbers */}
        {[...Array(12)].map((_, i) => {
          const num = i + 1;
          const angle = num * 30;
          return (
            <div
              key={num}
              className="absolute text-[8px] sm:text-xs text-white/70 font-mono"
              style={{ transform: `rotate(${angle}deg) translateY(calc(var(--clock-radius) * -1)) rotate(-${angle}deg)` }}
            >
              {num}
            </div>
          );
        })}
        
        {/* Hands scaled down for mobile */}
        <div className="absolute w-[2px] sm:w-[4px] h-[35px] sm:h-[60px] md:h-[72px] bg-white rounded-full origin-bottom z-30" style={{ transform: `rotate(${hourDeg}deg)`, bottom: "50%" }} />
        <div className="absolute w-[1.5px] sm:w-[2.5px] h-[50px] sm:h-[85px] md:h-[104px] bg-cyan-400 rounded-full origin-bottom z-20" style={{ transform: `rotate(${minDeg}deg)`, bottom: "50%" }} />
        <div className="absolute w-[1px] sm:w-[1.5px] h-[60px] sm:h-[100px] md:h-[124px] bg-red-500 rounded-full origin-bottom z-40" style={{ transform: `rotate(${secDeg}deg)`, bottom: "50%" }} />
        
        <div className="absolute w-2 h-2 sm:w-4 sm:h-4 bg-white rounded-full z-50 border sm:border-2 border-cyan-400 shadow-lg" />
        <div className="absolute bottom-4 sm:bottom-6 text-[8px] sm:text-[10px] font-mono text-cyan-300 tracking-widest">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

/* ===============================
   🔹 SKILL NODE CARD (MINIATURIZED)
================================ */
const SkillNode = ({ id, title, skills }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="glass w-full max-w-[150px] sm:max-w-[200px] p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 hover:border-cyan-400/30 transition-all flex flex-col"
  >
    <div className="text-[8px] sm:text-[10px] font-mono text-cyan-400 mb-0.5 sm:mb-1 tracking-widest">({id})</div>
    <h3 className="text-[9px] sm:text-[12px] font-bold text-white mb-1.5 sm:mb-2 uppercase border-b border-white/10 pb-1 truncate">{title}</h3>
    <div className="flex flex-wrap gap-1">
      {skills.map((s, i) => (
        <span key={i} className="text-[7px] sm:text-[10px] font-mono text-white/60 bg-white/5 px-1.5 py-0.5 rounded">{s}</span>
      ))}
    </div>
  </motion.div>
);

/* ===============================
   🚀 MAIN SKILLS SECTION
================================ */
export default function Skills() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

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
    <section className="min-h-screen bg-[#020617] text-white py-12 sm:py-16 px-3 sm:px-6 relative overflow-hidden flex flex-col justify-center" id="skills">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="max-w-6xl mx-auto w-full flex flex-col items-center relative z-10">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black italic uppercase">
            MY <span className="text-cyan-400">SKILLS</span>
          </h2>
          <p className="font-mono text-[8px] sm:text-xs text-cyan-400/60 tracking-widest mt-1 sm:mt-2">SYSTEM CHRONOS: ACTIVE</p>
        </div>

        {/* HUD LAYOUT GRID */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-20">
          
          {/* TOP ROW (Mobile) / LEFT COL (Desktop) */}
          <div className="w-full flex flex-row md:flex-col justify-between md:justify-end gap-2 md:gap-8 items-center md:items-end">
            <SkillNode id="A" title="Frontend_Core" skills={["React", "Next.js", "Tailwind"]} />
            <SkillNode id="B" title="Backend_Exec" skills={["Node.js", "Express", "REST"]} />
          </div>

          {/* CENTER CLOCK */}
          <div className="flex flex-col items-center shrink-0 my-2 md:my-0">
            <p className="font-mono text-[7px] sm:text-[10px] text-white/40 mb-2 sm:mb-3 tracking-widest">MURALI_TIME_ENGINE</p>
            <AnalogClock />
            <div className="mt-3 sm:mt-4 font-mono text-[8px] sm:text-xs text-cyan-400 border border-cyan-400/20 px-2 sm:px-3 py-1 rounded-full">STATUS: RUNNING</div>
          </div>

          {/* BOTTOM ROW (Mobile) / RIGHT COL (Desktop) */}
          <div className="w-full flex flex-row md:flex-col justify-between md:justify-start gap-2 md:gap-8 items-center md:items-start">
            <SkillNode id="C" title="AI_Intelligence" skills={["Python", "ML", "NLP"]} />
            <SkillNode id="D" title="Data_Infra" skills={["MongoDB", "Docker", "AWS"]} />
          </div>

        </div>

        {/* Footer */}
        <div className="mt-10 sm:mt-16 w-full flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10 pt-6 font-mono text-[8px] sm:text-[10px] text-white/30 uppercase tracking-widest">
          <p>Scan_Type: Atomic</p>
          <button 
            onClick={() => setIsResumeOpen(true)}
            className="text-cyan-400 hover:text-white transition-colors cursor-pointer border border-cyan-400/30 px-4 py-2 rounded-full hover:bg-cyan-400/10"
          >
            [ VIEW_DATA_LOGS ]
          </button>
        </div>
      </div>

      {/* RESUME MODAL */}
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
                <h3 className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
                  Resume Preview
                </h3>
                <div className="flex items-center gap-4 shrink-0">
                  <a href="/resume_murali.pdf" download className="hidden sm:block text-xs font-mono text-secondary/60 hover:text-white transition-colors">
                    [ Download ]
                  </a>
                  <button onClick={() => setIsResumeOpen(false)} className="text-white/70 hover:text-cyan-400 transition-colors p-1">
                    <FiX size={22} />
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full relative bg-[#2a2a2a] flex items-center justify-center overflow-hidden rounded-b-xl overflow-y-auto -webkit-overflow-scrolling-touch">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0 sm:hidden">
                  <p className="text-white/60 text-sm mb-6 font-light">
                    Your mobile browser is restricting the inline PDF view.
                  </p>
                  <a href="/resume_murali.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-cyan-400 text-black font-semibold rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                    Open Resume Fullscreen <FiExternalLink />
                  </a>
                </div>
                <object data="/resume_murali.pdf#toolbar=0&navpanes=0&view=FitH" type="application/pdf" className="w-full h-full relative z-10 bg-transparent rounded-b-xl" />
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
}