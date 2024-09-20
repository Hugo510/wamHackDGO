// src/lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '192.168.1.168', // Reemplaza con la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
