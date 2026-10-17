import axios from 'axios';

// Dirección del backend: la variable VITE_API_URL manda; si no está, en desarrollo (npm run dev) se usa el backend local
// y en producción (build) el de Render. Así no hay que cambiar nada al pasar de una rama a otra.
const URL_API = import.meta.env.VITE_API_URL
    || (import.meta.env.DEV ? 'http://localhost:5000' : 'https://san-martin-backend.onrender.com');

const api = axios.create({
    baseURL: `${URL_API}/api`
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