import api from './api';

// Traer todas las noticias
// Con { todas: true } y sesión de administrador también trae borradores y programadas
export const obtenerNoticias = async ({ todas = false } = {}) => {
    const response = await api.get('/noticias', { params: todas ? { todas: 1 } : {} });
    return response.data;
};

// Traer UNA sola noticia por su ID
export const obtenerNoticiaPorId = async (id) => {
    const response = await api.get(`/noticias/${id}`);
    return response.data;
};

// Crear nueva noticia (Requiere Token)
export const crearNoticia = async (datosNoticia) => {
    const response = await api.post('/noticias', datosNoticia);
    return response.data;
};

// Actualizar noticia existente (Requiere Token)
export const actualizarNoticia = async (id, datosNoticia) => {
    const response = await api.put(`/noticias/${id}`, datosNoticia);
    return response.data;
};

// Borrar una noticia (Requiere Token)
export const eliminarNoticia = async (id) => {
    const response = await api.delete(`/noticias/${id}`);
    return response.data;
};