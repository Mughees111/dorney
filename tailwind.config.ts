import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#AF3336",
        secondary: "#2D3748",
        accent: "#D4AF37",
        bgLight: "#FDFDFD",
        dark: "#111827",
        neutral: "#6B7280",
        muted: "#9CA3AF",
        charcoal: "#111827",
        gold: "#D4AF37",
      },
      fontFamily: {
        cookie: ["var(--font-cookie)", "cursive"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #AF3336 0%, #FF8F00 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #FF8F00 0%, #FFC107 100%)",
        "gradient-trust":
          "linear-gradient(135deg, #111827 0%, #1F2937 100%)",
        "gradient-cta":
          "linear-gradient(135deg, #AF3336 0%, #111827 100%)",
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
        "count-up": "countUp 2s ease-out forwards",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        borderGlow: "borderGlow 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        borderGlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
