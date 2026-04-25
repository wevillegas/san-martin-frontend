import api from './api'; // Asumiendo que tenés tu configuración de axios acá

export const obtenerCuerpoTecnico = async () => {
    const respuesta = await api.get('/cuerpo-tecnico');
    return respuesta.data;
};

export const obtenerMiembroPorId = async (id) => {
    const respuesta = await api.get(`/cuerpo-tecnico/${id}`);
    return respuesta.data;
};

export const crearMiembro = async (datos) => {
    // Mandamos los datos (que van a ser un FormData por la foto)
    const respuesta = await api.post('/cuerpo-tecnico', datos);
    return respuesta.data;
};

export const actualizarMiembro = async (id, datos) => {
    const respuesta = await api.put(`/cuerpo-tecnico/${id}`, datos);
    return respuesta.data;
};

export const eliminarMiembro = async (id) => {
    const respuesta = await api.delete(`/cuerpo-tecnico/${id}`);
    return respuesta.data;
};