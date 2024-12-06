import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/elements/*.stories.ts",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.3" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      animation: {
        ripple: "ripple 1.6s linear",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
