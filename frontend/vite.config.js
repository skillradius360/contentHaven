import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/users": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false, // Allow self-signed certificates if needed
      },
      "/videos": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
