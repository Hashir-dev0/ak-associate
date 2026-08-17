import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#00a3e0", // AK Logo Primary Azure
          600: "#0284c7", // AK Logo Deep Cyan
          700: "#0369a1", // AK Logo Dark Blue
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        navy: {
          800: "#1e293b",
          900: "#17222c", // Design spec Dark Navy
          950: "#0f172a", // Deep Midnight
        },
        charcoal: {
          800: "#25292d", // Design spec Charcoal
          900: "#1a1d20",
          950: "#121416",
        },
        surface: {
          50: "#ffffff",
          100: "#f8fafc",
          200: "#f1f5f9", // Design spec Light Gray
          300: "#e2e8f0",
          400: "#cbd5e1",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "Oswald", "Roboto Condensed", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: ".2em",
        tighter: "-0.04em",
      },
      boxShadow: {
        'brand-glow': '0 0 25px -5px rgba(0, 163, 224, 0.4)',
        'card-hover': '0 20px 40px -15px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
};
export default config;
