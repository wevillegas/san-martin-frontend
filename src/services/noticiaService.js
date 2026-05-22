import axios from "axios";

const API_URL = "https://san-martin-backend.onrender.com/api/noticias";

// Traer todas las noticias
export const obtenerNoticias = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Traer UNA sola noticia por su ID (La que borramos sin querer)
export const obtenerNoticiaPorId = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Crear nueva noticia (Requiere Token)
export const crearNoticia = async (datosNoticia) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(API_URL, datosNoticia, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Actualizar noticia existente (Requiere Token)
export const actualizarNoticia = async (id, datosNoticia) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/${id}`, datosNoticia, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Borrar una noticia (Requiere Token)
export const eliminarNoticia = async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};