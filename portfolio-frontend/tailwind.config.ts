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
        "main-max-width": "1199px",
        "card-max-width": "416px"
      },
      backgroundColor:{
        "main-bg": "var(--main-bg-color)",
        "bg-color": "var(--primary-color)",
        "bg-secondary": "var(--secondary-color)",
        "bg-card": "var(--third-color)",
        "bg-fourth": "var(--fourth-color)",
        "bg-dashboard": "var(--bg-dashboard)",
        "bg-backend-secondary-color": "var(--backend-secondary-color)",
      },
      colors:{
        "primary-text-color": "var(--primary-color)",
        "backend-primary-text-color": "var(--backend-text-primary-color)",
      },
      fontFamily:{
        'poppins': "var(--primary-font)",
      },
      fontWeight:{
        "poppins-bold": "var(--font-bold)",
        "poppins-light": "var(--font-light)",
        "poppins-semi-bold": "var(--semi-bold)"
      }
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
