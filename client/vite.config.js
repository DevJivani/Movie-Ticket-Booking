import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer';
import tailwindcssAnimate from 'tailwindcss-animate';


// // Your Tailwind config (from your original tailwind.config.js)
// const tailwindConfig = {
//   darkMode: ["class"],
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./index.html",
//     "*.{js,ts,jsx,tsx,mdx}",
//     "app/**/*.{ts,tsx}",
//     "components/**/*.{ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//         netflix: {
//           red: "#E50914",
//           black: "#141414",
//           gray: {
//             100: "#F5F5F1",
//             900: "#221F1F",
//           },
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       backgroundImage: {
//         "movie-collage": "url('/placeholder.svg?height=800&width=600')",
//       },
//     },
//   },
//   plugins: [tailwindcssAnimate],
// };


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})


// export default defineConfig({
//   plugins: [react()],
//   css: {
//     postcss: {
//       plugins: [
//         tailwindcss(tailwindConfig),
//         autoprefixer(),
//       ],
//     },
//   },
//   // Optional: watch these files to trigger rebuilds
//   server: {
//     watch: {
//       // You can add custom watch options here if needed
//     },
//   },
// });