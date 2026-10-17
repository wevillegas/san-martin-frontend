import api from './api';

// Comisión Directiva. obtenerAutoridades es público; el resto requiere Token
export const obtenerAutoridades = async () => (await api.get('/autoridades')).data;

export const crearAutoridad = async (datos) => (await api.post('/autoridades', datos)).data;

export const actualizarAutoridad = async (id, datos) => (await api.put(`/autoridades/${id}`, datos)).data;

export const eliminarAutoridad = async (id) => (await api.delete(`/autoridades/${id}`)).data;

// ids en el orden nuevo
export const reordenarAutoridades = async (ids) => (await api.put('/autoridades/orden', { ids })).data;

// Carga la lista inicial (solo funciona si todavía no hay ninguna)
export const importarAutoridades = async (items) => (await api.post('/autoridades/importar', { items })).data;
