// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite acesso externo
    port: 5173, // Porta padrão do Vite
    proxy: {
      '/api': {
        target: 'http://localhost:5000', 
        // target: 'http://10.100.37.172:5000', // URL do backend
        changeOrigin: true,
        secure: false,
        // Remova o rewrite
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Erro de proxy:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Requisição:', req.method, req.url);
            // Adiciona headers úteis para debug
            proxyReq.setHeader('X-Forwarded-Proto', 'http');
          });
        }
      },
    },
  },
});
