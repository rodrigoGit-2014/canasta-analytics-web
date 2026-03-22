import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/v1/analysis": "http://localhost:8002",
      "/api/v1/transactions": "http://localhost:8002",
      "/api/v1/recommendations": "http://localhost:8002",
      "/api": "http://localhost:8000",
    },
  },
})
