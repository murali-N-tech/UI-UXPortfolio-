import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { SKILLS } from "../constants";

import {
  FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJava,
} from "react-icons/fa";

import {
  SiMongodb, SiPostgresql, SiTensorflow, SiTailwindcss,
  SiJavascript, SiPython, SiExpress, SiNextdotjs,
} from "react-icons/si";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

// ===== ICON MAP (WITH COLORS) =====
const skillIcons = [
  { name: "React", icon: <FaReact />, color: "#61DBFB" },
  { name: "Node.js", icon: <FaNodeJs />, color: "#68A063" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#4DB33D" },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
  { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00" },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "#38BDF8" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
  { name: "Python", icon: <SiPython />, color: "#3776AB" },
  { name: "Express", icon: <SiExpress />, color: "#ffffff" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
  { name: "Git", icon: <FaGitAlt />, color: "#F1502F" },
  { name: "Docker", icon: <FaDocker />, color: "#0db7ed" },
  { name: "Java", icon: <FaJava />, color: "#f89820" },
];

// ===== RADAR =====
export default function Skills() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  const data = {
    labels: [
      "Programming",
      "Web",
      "Backend",
      "Databases",
      "ML / AI",
      "Tools",
    ],
    datasets: [
      {
        data: animate
          ? [4.8, 4.9, 4.6, 4.5, 4.6, 4.8]
          : [0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(56,189,248,0.12)",
        borderColor: "#38bdf8",
        pointBackgroundColor: "#38bdf8",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200 },
    scales: {
      r: {
        min: 0,
        max: 5,
        grid: { color: "#1f2937" },
        angleLines: { color: "#1f2937" },
        pointLabels: {
          color: "#cbd5f5",
          font: { size: 14, weight: "600" },
        },
        ticks: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <section className="min-h-screen bg-black text-white py-24 px-6 overflow-hidden">
      
      {/* Title */}
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
          Skill Intelligence
        </h2>
        <p className="text-gray-400 mt-3 font-mono text-sm tracking-widest">
          PREMIUM TECH STACK
        </p>
      </div>

      {/* Radar */}
      <div className="max-w-3xl mx-auto mb-24 h-[420px] relative">
        <div className="absolute inset-0 blur-3xl bg-cyan-500/10 rounded-full" />
        <div className="relative bg-[#020617] p-6 rounded-2xl border border-white/10 shadow-xl">
          <Radar data={data} options={options} />
        </div>
      </div>

      {/* ICON SCROLL (PREMIUM) */}
      <div className="overflow-hidden py-12 relative">
        
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10" />

        <div className="flex gap-16 whitespace-nowrap animate-scroll items-center">
          {[...skillIcons, ...skillIcons].map((skill, i) => (
            
            <div
              key={i}
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              
              {/* ICON */}
              <div
                className="text-5xl transition-all duration-500 transform group-hover:scale-125"
                style={{
                  color: skill.color,
                  textShadow: `0 0 15px ${skill.color}`,
                }}
              >
                {skill.icon}
              </div>

              {/* LABEL */}
              <span className="text-xs text-gray-400 group-hover:text-white transition">
                {skill.name}
              </span>

            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-scroll {
            animation: scroll 18s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
}