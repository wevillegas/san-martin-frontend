import api from './api';

const limpiar = (filtros) => Object.fromEntries(Object.entries(filtros).filter(([, v]) => v));

// Registro de actividad del panel (Requiere Token). filtros: { entidad, accion, usuario, desde, hasta, pagina }
export const obtenerAuditoria = async (filtros = {}) => {
    const response = await api.get('/auditoria', { params: limpiar(filtros) });
    return response.data;
};

// Descarga el CSV con el mismo filtro (sin paginar)
export const exportarAuditoria = async (filtros = {}) => {
    const { pagina, ...resto } = filtros;
    const response = await api.get('/auditoria/exportar', { params: limpiar(resto), responseType: 'blob' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(response.data);
    enlace.download = `auditoria-${new Date().toISOString().slice(0, 10)}.csv`;
    enlace.click();
    URL.revokeObjectURL(enlace.href);
};
