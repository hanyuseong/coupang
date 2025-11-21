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
        coupang: {
          blue: "#0073e9",
          navy: "#032b5c",
          red: "#ff5452",
          yellow: "#ffe352",
          gray: "#f7f7f7",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        floating: "0 12px 40px rgba(3, 43, 92, 0.15)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
