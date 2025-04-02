import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    require('flowbite-react/tailwind').content()
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#FFFAE1",
          100: "#FEF1B6",
          200: "#FDE98C",
          300: "#FBE061",
          400: "#FAD837",
          500: "#F9CF0C",
          600: "#EFC400",
          700: "#C4A107",
          800: "#9D8107",
          900: "#7D6604",
          950: "#4F4100",
        }
      },
    },
  },
  variants: {
    extend: {
      textColor: ['visited']
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('flowbite-react/tailwind').plugin(),
  ],
} satisfies Config;
