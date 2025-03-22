import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        slideInLeft: "slideInLeft 1s ease-out", // Animation keyframe definition
      },
      keyframes: {
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" }, // Offscreen to the left
          "100%": { transform: "translateX(0)", opacity: "1" }, // Fully visible
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
