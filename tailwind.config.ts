import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pink50: "#FEF1F3",
        pink100: "#FFE3E8",
        pink200: "#FFCBD7",
        pink300: "#FFA1B5",
        pink400: "#FF6C8F",
        pink500: "#FB386C",
        pink600: "#EA1E5E",
        pink700: "#C40D4A",
        pink800: "#A40C45",
        pink900: "#8C0E41",
        pink950: "#4F011F",
      },
    },
  },
  plugins: [],
} satisfies Config;
