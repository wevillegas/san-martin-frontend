import api from './api';

export const loginUsuario = async (email, password) => {
    try {
        // Hacemos el POST mandando el email y la contraseña
        const respuesta = await api.post('/auth/login', { email, password });
        return respuesta.data; // Esto nos va a devolver el { mensaje, token }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        // Si falla (ej. contraseña incorrecta), lanzamos el error para mostrarlo en pantalla
        throw error.response?.data?.mensaje || 'Error de conexión';
    }
};