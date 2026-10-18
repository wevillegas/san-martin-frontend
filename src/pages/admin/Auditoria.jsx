import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ClipboardList, Download } from "lucide-react";
import { obtenerAuditoria, exportarAuditoria } from "../../services/auditoriaService";
import Paginacion from "../../components/Paginacion";
import { POR_PAGINA } from "../../utils/paginacion";

const SECCIONES = { jugadores: "Plantel", "cuerpo-tecnico": "Cuerpo técnico", noticias: "Noticias", productos: "Tienda", usuarios: "Usuarios", autoridades: "Autoridades", club: "Datos del club", auth: "Accesos" };
const ACCIONES = {
    crear: { texto: "Creó", color: "bg-green-100 text-green-800" },
    editar: { texto: "Editó", color: "bg-blue-100 text-blue-800" },
    eliminar: { texto: "Eliminó", color: "bg-red-100 text-red-800" },
    restaurar: { texto: "Restauró", color: "bg-green-100 text-green-800" },
    login: { texto: "Inició sesión", color: "bg-gray-100 text-gray-700" },
};

const selectClase = "border border-gray-300 rounded-md px-3 py-2 text-sm font-medium bg-white focus:outline-none focus:border-red-700";

const Auditoria = () => {
    const [datos, setDatos] = useState({ registros: [], paginas: 0, total: 0, usuarios: [] });
    const [filtros, setFiltros] = useState({ entidad: "", accion: "", usuario: "", desde: "", hasta: "", pagina: 1, limite: POR_PAGINA });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setCargando(true);
        obtenerAuditoria(filtros)
            .then((d) => { setDatos(d); setError(false); })
            .catch(() => setError(true))
            .finally(() => setCargando(false));
    }, [filtros]);

    // Al cambiar un filtro se vuelve a la primera página
    const cambiar = (campo) => (e) => setFiltros({ ...filtros, [campo]: e.target.value, pagina: 1 });

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <Link to="/admin" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-2 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Volver al Dashboard principal
                </Link>
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider flex items-center gap-3 mb-6">
                    <ClipboardList className="w-8 h-8 text-red-700" />
                    Auditoría
                </h1>

                <div className="flex flex-wrap gap-3 mb-6">
                    <select value={filtros.entidad} onChange={cambiar("entidad")} className={selectClase}>
                        <option value="">Todas las secciones</option>
                        {Object.entries(SECCIONES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                    <select value={filtros.accion} onChange={cambiar("accion")} className={selectClase}>
                        <option value="">Todas las acciones</option>
                        {Object.entries(ACCIONES).map(([k, v]) => <option key={k} value={k}>{v.texto}</option>)}
                    </select>
                    <select value={filtros.usuario} onChange={cambiar("usuario")} className={selectClase}>
                        <option value="">Todos los usuarios</option>
                        {datos.usuarios.map((u) => <option key={u} value={u}>{u}</option>)}
                    </select>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        Desde
                        <input type="date" value={filtros.desde} max={filtros.hasta || undefined} onChange={cambiar("desde")} className={selectClase} />
                    </label>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        Hasta
                        <input type="date" value={filtros.hasta} min={filtros.desde || undefined} onChange={cambiar("hasta")} className={selectClase} />
                    </label>
                    <button
                        onClick={() => exportarAuditoria(filtros)}
                        className="ml-auto flex items-center gap-2 rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800"
                    >
                        <Download className="w-4 h-4" /> Exportar CSV
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-4 py-3">Fecha</th>
                                <th className="px-4 py-3">Usuario</th>
                                <th className="px-4 py-3">Acción</th>
                                <th className="px-4 py-3">Sección</th>
                                <th className="px-4 py-3">Elemento</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {datos.registros.map((r) => {
                                const accion = ACCIONES[r.accion] || { texto: r.accion, color: "bg-gray-100 text-gray-700" };
                                return (
                                    <tr key={r._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                                            {new Date(r.createdAt).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" })}
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-bold text-gray-900">{r.usuarioNombre || "—"}</p>
                                            <p className="text-xs text-gray-500">{r.usuarioEmail}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${accion.color}`}>{accion.texto}</span>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-700">{SECCIONES[r.entidad] || r.entidad}</td>
                                        <td className="px-4 py-3 text-gray-700">{r.detalle || "—"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {cargando && <p className="text-center py-8 font-bold text-red-700">Cargando...</p>}
                    {error && <p className="text-center py-8 font-bold text-red-700">No se pudo cargar la auditoría. Probá iniciar sesión de nuevo.</p>}
                    {!cargando && !error && datos.registros.length === 0 && (
                        <p className="text-center py-8 text-gray-500 font-medium">No hay actividad registrada con estos filtros.</p>
                    )}
                </div>

                <Paginacion total={datos.total} porPagina={POR_PAGINA} pagina={filtros.pagina} onCambio={(pagina) => setFiltros({ ...filtros, pagina })} />
            </div>
        </div>
    );
};

export default Auditoria;
