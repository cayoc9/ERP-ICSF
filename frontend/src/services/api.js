// filepath: /root/ERP/frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Certifique-se de que o backend está rodando nesta URL e porta
});

// Interceptors para incluir tokens, se necessário
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Se estiver utilizando JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;