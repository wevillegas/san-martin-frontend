import api from './api';

// Registro de actividad del panel (Requiere Token). filtros: { entidad, accion, usuario, pagina }
export const obtenerAuditoria = async (filtros = {}) => {
    const params = Object.fromEntries(Object.entries(filtros).filter(([, v]) => v));
    const response = await api.get('/auditoria', { params });
    return response.data;
};
