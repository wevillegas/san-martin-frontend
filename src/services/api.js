import axios from 'axios';

const api = axios.create({
    baseURL: 'https://san-martin-backend.onrender.com/api'
});

// "Interceptor": Este código se ejecuta automáticamente ANTES de que salga cualquier petición
api.interceptors.request.use((config) => {
    // Buscamos si tenemos un token guardado en la memoria del navegador
    const token = localStorage.getItem('token');
    
    // Si hay token, se lo pegamos en la cabecera (Header) a la petición
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;