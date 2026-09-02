/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        primary: "#3B82F6",
        accent: "#F59E0B",
        highlight: "#10B981",
        secondary: "#F8FAFC",
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #6366F1, 0 0 10px #6366F1' },
          '100%': { boxShadow: '0 0 20px #22D3EE, 0 0 40px #22D3EE' },
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
      }
    },
  },
  plugins: [],
}