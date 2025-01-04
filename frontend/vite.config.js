// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://plataformas.icsf.com.br:5000', // URL do backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
