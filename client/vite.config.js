import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        offwhite: "#F0F0F0",
        charcoal: "#2B2B2B",
        newsred: "#ED2939",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Comfortaa", "sans-serif"],
      },
    },
  },
  plugins: [react(),
    tailwindcss(),
  ],
})
