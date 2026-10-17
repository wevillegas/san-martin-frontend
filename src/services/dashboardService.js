import api from './api';

// Cifras y actividad reciente del panel principal (Requiere Token)
export const obtenerResumen = async () => (await api.get('/dashboard')).data;
