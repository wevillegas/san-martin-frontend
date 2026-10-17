import api from './api';

// Administradores (Requiere Token)
export const listarUsuarios = async () => (await api.get('/usuarios')).data;

export const crearUsuario = async (datos) => (await api.post('/auth/register', datos)).data;

export const cambiarMiClave = async (actual, nueva) => (await api.put('/usuarios/me/password', { actual, nueva })).data;

export const restablecerClave = async (id, nueva) => (await api.put(`/usuarios/${id}/password`, { nueva })).data;

export const eliminarUsuario = async (id) => (await api.delete(`/usuarios/${id}`)).data;
