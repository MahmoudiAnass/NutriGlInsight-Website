import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Brand = orange (matches the app). Used for logo, buttons, links, accents.
        brand: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA6A0E",
          700: "#C2560C",
          800: "#9A4A0F",
          900: "#7C3D10",
        },
        accent: {
          DEFAULT: "#F97316",
          soft: "#FB923C",
          deep: "#EA580C",
        },
        // Glycemic-load signal only (gauge + badges): low -> medium -> high.
        gl: {
          low: "#34C759",
          medium: "#F59E0B",
          high: "#EF4444",
        },
        ink: "#1A1A2E",
        paper: "#F7F7F8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontVariantNumeric: {
        tabular: "tabular-nums",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(16, 24, 40, 0.12)",
        glow: "0 0 0 1px rgba(249, 115, 22, 0.15), 0 20px 60px -20px rgba(249, 115, 22, 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
