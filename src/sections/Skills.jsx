import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ===============================
   🔥 REAL ANALOG CLOCK (PREMIUM)
================================ */
const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 50); // smooth motion

    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds() + time.getMilliseconds() / 1000;
  const minutes = time.getMinutes() + seconds / 60;
  const hours = (time.getHours() % 12) + minutes / 60;

  const secDeg = seconds * 6;
  const minDeg = minutes * 6;
  const hourDeg = hours * 30;

  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">

      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 to-purple-500/10 blur-xl" />

      {/* Clock Body */}
      <div className="relative w-full h-full rounded-full 
        bg-gradient-to-br from-[#0f172a] to-[#020617]
        shadow-[inset_0_0_30px_rgba(255,255,255,0.05),0_0_40px_rgba(34,211,238,0.15)]
        border border-white/10 flex items-center justify-center">

        {/* Glass overlay */}
        <div className="absolute inset-0 rounded-full backdrop-blur-md bg-white/[0.02]" />

        {/* Numbers */}
        {[...Array(12)].map((_, i) => {
          const num = i + 1;
          const angle = num * 30;
          return (
            <div
              key={num}
              className="absolute text-xs text-white/70 font-mono"
              style={{
                transform: `rotate(${angle}deg) translateY(-110px) rotate(-${angle}deg)`
              }}
            >
              {num}
            </div>
          );
        })}

        {/* Hour Hand */}
        <div
          className="absolute w-[4px] h-[60px] bg-white rounded-full origin-bottom z-30"
          style={{
            transform: `rotate(${hourDeg}deg)`,
            bottom: "50%",
          }}
        />

        {/* Minute Hand */}
        <div
          className="absolute w-[2.5px] h-[85px] bg-cyan-400 rounded-full origin-bottom z-20"
          style={{
            transform: `rotate(${minDeg}deg)`,
            bottom: "50%",
          }}
        />

        {/* Second Hand */}
        <div
          className="absolute w-[1.5px] h-[100px] bg-red-500 rounded-full origin-bottom z-40"
          style={{
            transform: `rotate(${secDeg}deg)`,
            bottom: "50%",
          }}
        />

        {/* Center Dot */}
        <div className="absolute w-4 h-4 bg-white rounded-full z-50 border-2 border-cyan-400 shadow-lg" />

        {/* Digital Time */}
        <div className="absolute bottom-6 text-[10px] font-mono text-cyan-300 tracking-widest">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

/* ===============================
   🔹 SKILL NODE CARD
================================ */
const SkillNode = ({ id, title, skills }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="glass p-4 rounded-2xl border border-white/5 hover:border-cyan-400/30 transition-all max-w-[200px]"
  >
    <div className="text-[10px] font-mono text-cyan-400 mb-1 tracking-widest">
      ({id})
    </div>

    <h3 className="text-[12px] font-bold text-white mb-2 uppercase border-b border-white/10 pb-1">
      {title}
    </h3>

    <div className="flex flex-wrap gap-1">
      {skills.map((s, i) => (
        <span
          key={i}
          className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded"
        >
          {s}
        </span>
      ))}
    </div>
  </motion.div>
);

/* ===============================
   🚀 MAIN SKILLS SECTION
================================ */
export default function Skills() {
  return (
    <section
      className="min-h-[90vh] bg-[#020617] text-white py-16 px-6 relative overflow-hidden"
      id="skills"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase">
            MY <span className="text-cyan-400">SKILLS</span>
          </h2>
          <p className="font-mono text-xs text-cyan-400/60 tracking-widest mt-2">
            SYSTEM CHRONOS: ACTIVE
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">

          {/* LEFT */}
          <div className="flex flex-col gap-8 items-end">
            <SkillNode id="A" title="Frontend_Core" skills={["React", "Next.js", "Tailwind"]} />
            <SkillNode id="B" title="Backend_Exec" skills={["Node.js", "Express", "REST"]} />
          </div>

          {/* CENTER CLOCK */}
          <div className="flex flex-col items-center">
            <p className="font-mono text-[10px] text-white/40 mb-3 tracking-widest">
              MURALI_TIME_ENGINE
            </p>

            <AnalogClock />

            <div className="mt-4 font-mono text-xs text-cyan-400 border border-cyan-400/20 px-3 py-1 rounded-full">
              STATUS: RUNNING
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-8 items-start">
            <SkillNode id="C" title="AI_Intelligence" skills={["Python", "ML", "NLP"]} />
            <SkillNode id="D" title="Data_Infra" skills={["MongoDB", "Docker", "AWS"]} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 w-full flex justify-between border-t border-white/10 pt-6 font-mono text-[10px] text-white/30 uppercase tracking-widest">
          <p>Scan_Type: Atomic</p>
          <p className="text-cyan-400">Interface_Live</p>
        </div>
      </div>

      {/* Glass Effect */}
      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
        }
      `}</style>
    </section>
  );
}