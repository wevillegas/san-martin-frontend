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

// NUEVA FUNCIÓN: Trae una sola noticia buscando por su ID
export const obtenerNoticiaPorId = async (id) => {
    try {
        const respuesta = await api.get(`/noticias/${id}`);
        return respuesta.data;
    } catch (error) {
        console.error('Error al obtener la noticia:', error);
        throw error;
    }
};