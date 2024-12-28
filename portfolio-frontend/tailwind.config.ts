import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth:{
        "main-max-width": "1298px",
        "card-max-width": "416px"
      },
      backgroundColor:{
        "main-bg": "var(--main-bg-color)",
        "bg-color": "var(--primary-color)"
      },
      colors:{
        "primary-text-color": "var(--primary-color)"
      }
    },
  },
  plugins: [],
} satisfies Config;
