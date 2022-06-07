import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'example',
  plugins: [vue()],
  server: {
    port: 4321
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@example': path.resolve(__dirname, 'example'),
    }
  },
  build: {
    rollupOptions: {
      input: 'index.html'
    }
  }
})
