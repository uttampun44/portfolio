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
        "main-max-width": "1298px"
      },
      backgroundColor:{
        "main-bg": "var(--main-bg-color)"
      }
    },
  },
  plugins: [],
} satisfies Config;
