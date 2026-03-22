import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/v1/association": "http://localhost:8001",
      "/api/v1/products": "http://localhost:8001",
      "/api": "http://localhost:8000",
    },
  },
})
