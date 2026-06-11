import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#070a14",
        navy: "#0a0f22",
        panel: "rgba(255,255,255,0.04)",
        neon: {
          purple: "#8b5cf6",
          blue: "#38bdf8",
          pink: "#e879f9",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(139,92,246,0.35)",
        "glow-sm": "0 0 18px rgba(56,189,248,0.25)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 60% 50% at 70% 35%, rgba(139,92,246,0.18), transparent 70%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(56,189,248,0.12), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
