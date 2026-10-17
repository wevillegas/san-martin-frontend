import api from './api';

// Cifras del club mostradas en el sitio
export const obtenerDatosClub = async () => (await api.get('/club')).data;

export const guardarDatosClub = async (datos) => (await api.put('/club', datos)).data;
