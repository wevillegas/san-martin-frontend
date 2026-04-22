import api from './api';

// Función para pedir la lista completa de jugadores (Hace un GET a /api/jugadores)
export const obtenerJugadores = async () => {
    try {
        const respuesta = await api.get('/jugadores');
        return respuesta.data; // Devuelve el arreglo con los jugadores
    } catch (error) {
        console.error('Error al obtener jugadores desde el backend:', error);
        throw error;
    }
};