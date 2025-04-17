import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: "/vite-gsap-demo-everyday-agency",
  build: {
      outDir: 'dist', // Ensure this is set correctly
  },
})