import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['react-select'],     // ép pre-bundle
    // exclude: [],                 // nếu cần loại trừ gói nào đó
  },
  server: {
    // đổi port nếu cache lạ hoặc cổng bị chiếm
    port: 5174
  }
})
