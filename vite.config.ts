import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api/finance': {
        target: 'https://api.hgbrasil.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/finance/, '/finance'),
      },
    },
  },
})
