import api from './api';

// Papelera (Requiere Token): lo eliminado queda acá hasta restaurarlo o borrarlo definitivamente
export const obtenerPapelera = async () => (await api.get('/papelera')).data;

export const restaurarElemento = async (tipo, id) => (await api.post(`/papelera/${tipo}/${id}/restaurar`)).data;

export const eliminarDefinitivo = async (tipo, id) => (await api.delete(`/papelera/${tipo}/${id}`)).data;
