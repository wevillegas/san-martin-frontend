import api from './api';

// Función para pedir la lista completa de jugadores
export const obtenerJugadores = async () => {
    try {
        const respuesta = await api.get('/jugadores');
        return respuesta.data;
    } catch (error) {
        console.error('Error al obtener jugadores desde el backend:', error);
        throw error;
    }
};

// Función para traer UN solo jugador por su ID
export const obtenerJugadorPorId = async (id) => {
    try {
        const respuesta = await api.get(`/jugadores/${id}`);
        return respuesta.data;
    } catch (error) {
        console.error('Error al obtener el jugador:', error);
        throw error;
    }
};

// Función para CREAR un nuevo jugador (Requiere Token)
export const crearJugador = async (datosJugador) => {
    try {
        // Obtenemos el token del localStorage
        const token = localStorage.getItem("token");
        
        // Hacemos el POST enviando los datos y el token en los headers
        const respuesta = await api.post('/jugadores', datosJugador, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return respuesta.data;
    } catch (error) {
        console.error('Error al crear el jugador:', error);
        throw error;
    }
};

// Función para ACTUALIZAR un jugador existente (Requiere Token)
export const actualizarJugador = async (id, datosJugador) => {
    try {
        const token = localStorage.getItem("token");
        
        const respuesta = await api.put(`/jugadores/${id}`, datosJugador, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return respuesta.data;
    } catch (error) {
        console.error('Error al actualizar el jugador:', error);
        throw error;
    }
};

// Función para ELIMINAR un jugador (Requiere Token)
export const eliminarJugador = async (id) => {
    try {
        const token = localStorage.getItem("token");
        
        const respuesta = await api.delete(`/jugadores/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return respuesta.data;
    } catch (error) {
        console.error('Error al eliminar el jugador:', error);
        throw error;
    }
};