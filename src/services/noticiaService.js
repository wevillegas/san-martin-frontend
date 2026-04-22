import api from './api';

export const obtenerNoticias = async () => {
    try {
        const respuesta = await api.get('/noticias');
        return respuesta.data;
    } catch (error) {
        console.error('Error al obtener noticias:', error);
        throw error;
    }
};