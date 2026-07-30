/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FAFAF8",
          dark: "#101216",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#171A1F",
        },
        ink: {
          DEFAULT: "#1B1C20",
          dim: "#6B6E76",
          faint: "#A5A8B0",
          dark: "#F4F4F5",
        },
        line: {
          DEFAULT: "#EAE9E5",
          dark: "#262930",
        },
        cobalt: {
          50: "#EEF0FF",
          100: "#DFE2FF",
          300: "#AEB4FF",
          500: "#4C56E8",
          600: "#3B44D1",
          700: "#2E36A8",
        },
        kiln: {
          50: "#FDF3E8",
          200: "#F2CE9E",
          400: "#E3A257",
          500: "#D68C3A",
          600: "#B5722A",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl2: "16px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 20, 24, 0.04), 0 1px 1px rgba(20,20,24,0.03)",
        "card-hover": "0 20px 40px -12px rgba(20, 20, 24, 0.18), 0 4px 12px -4px rgba(20,20,24,0.08)",
        popup: "0 24px 60px -16px rgba(20,20,24,0.35)",
        panel: "0 1px 0 rgba(20,20,24,0.04)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.18s ease-out",
      },
    },
  },
  plugins: [],
};
