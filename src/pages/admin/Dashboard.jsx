import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, UserCog, Newspaper, LogOut, ShieldCheck, Plus, ArrowRight, ShoppingBag, ClipboardList, KeyRound, Trash2, Landmark, BarChart3 } from "lucide-react";
import { obtenerResumen } from "../../services/dashboardService";
import { usuarioActual } from "../../utils/sesion";
import { useAvisos } from "../../components/Avisos";

const icono = (Icono) => <Icono className="w-8 h-8 text-red-700" />;

const SECCIONES = { jugadores: "Plantel", "cuerpo-tecnico": "Cuerpo técnico", noticias: "Noticias", productos: "Tienda", autoridades: "Autoridades", usuarios: "Usuarios", club: "Datos del club", auth: "Accesos" };
const VERBOS = { crear: "creó", editar: "editó", eliminar: "eliminó", restaurar: "restauró", login: "inició sesión" };

const hace = (fecha) => {
    const min = Math.round((Date.now() - new Date(fecha)) / 60000);
    if (min < 1) return "recién";
    if (min < 60) return `hace ${min} min`;
    if (min < 60 * 24) return `hace ${Math.round(min / 60)} h`;
    return `hace ${Math.round(min / 1440)} d`;
};

const Dashboard = () => {
    const navigate = useNavigate();
    const { confirmar } = useAvisos();
    const [resumen, setResumen] = useState(null);
    const yo = usuarioActual();
    const esAdministrador = yo?.rol === "administrador";

    // Si falla (por ejemplo, servidor dormido) el panel funciona igual, solo sin cifras
    useEffect(() => {
        obtenerResumen().then(setResumen).catch(() => {});
    }, []);

    const handleLogout = async () => {
        if (await confirmar({ titulo: "Cerrar sesión", mensaje: "¿Seguro que querés cerrar sesión?", textoConfirmar: "Cerrar sesión" })) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    const modules = [
        {
            title: "Plantel Profesional",
            desc: "Gestioná altas, bajas, dorsales y fichas técnicas del primer equipo.",
            icon: icono(Users),
            cantidad: resumen && `${resumen.jugadores} jugadores`,
            linkList: "/admin/plantel",
            linkNew: "/admin/plantel/nuevo",
            btnNewText: "Nuevo Jugador"
        },
        {
            title: "Cuerpo Técnico",
            desc: "Administrá al DT, ayudantes, preparadores físicos y equipo médico.",
            icon: icono(UserCog),
            cantidad: resumen && `${resumen.cuerpoTecnico} integrantes`,
            linkList: "/admin/cuerpo-tecnico",
            linkNew: "/admin/cuerpo-tecnico/nuevo",
            btnNewText: "Nuevo Integrante"
        },
        {
            title: "Portal de Noticias",
            desc: "Redactá y publicá comunicados, crónicas y novedades institucionales.",
            icon: icono(Newspaper),
            cantidad: resumen && [`${resumen.noticias} publicadas`, resumen.borradores && `${resumen.borradores} borrador${resumen.borradores > 1 ? "es" : ""}`, resumen.programadas && `${resumen.programadas} programada${resumen.programadas > 1 ? "s" : ""}`].filter(Boolean).join(" · "),
            linkList: "/admin/noticias",
            linkNew: "/admin/noticias/nueva",
            btnNewText: "Redactar Nota"
        },
        {
            title: "Tienda Oficial",
            desc: "Administrá la vidriera de productos, precios y links de compra.",
            icon: icono(ShoppingBag),
            cantidad: resumen && `${resumen.productos} productos`,
            linkList: "/admin/tienda",
            linkNew: "/admin/tienda/nuevo",
            btnNewText: "Nuevo Producto"
        },
        {
            title: "Comisión Directiva",
            desc: "Editá las autoridades que se muestran en la página del club y su orden.",
            icon: icono(Landmark),
            cantidad: resumen && `${resumen.autoridades} autoridades`,
            linkList: "/admin/autoridades",
            btnListText: "Editar autoridades"
        },
        {
            title: "Datos del club",
            soloAdmin: true,
            desc: "Cambiá la capacidad del estadio, la cantidad de socios y otras cifras del sitio.",
            icon: icono(BarChart3),
            linkList: "/admin/club",
            btnListText: "Editar cifras"
        },
        {
            title: "Auditoría",
            soloAdmin: true,
            desc: "Mirá quién creó, editó o eliminó contenido y quién inició sesión.",
            icon: icono(ClipboardList),
            linkList: "/admin/auditoria"
        },
        {
            title: "Usuarios",
            soloAdmin: true,
            desc: "Creá cuentas de administrador y cambiá claves. Todos los admins tienen los mismos permisos.",
            icon: icono(KeyRound),
            cantidad: resumen && `${resumen.usuarios} administradores`,
            linkList: "/admin/usuarios",
            btnListText: "Gestionar usuarios"
        },
        {
            title: "Papelera",
            soloAdmin: true,
            desc: "Lo que eliminás queda acá: restauralo si te equivocaste o borralo para siempre.",
            icon: icono(Trash2),
            cantidad: resumen && (resumen.papelera ? `${resumen.papelera} elemento${resumen.papelera > 1 ? "s" : ""}` : "Vacía"),
            linkList: "/admin/papelera",
            btnListText: "Abrir papelera"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-red-700" />
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-wider">Panel de Control</h1>
                            <p className="text-gray-500 font-medium text-sm uppercase tracking-widest">
                                {yo?.nombre ? `${yo.nombre} · ${esAdministrador ? "Administrador" : "Editor"}` : "Administración Oficial"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-500 hover:text-red-700 px-4 py-2 font-bold transition-colors text-sm uppercase tracking-wider"
                    >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.filter((mod) => esAdministrador || !mod.soloAdmin).map((mod, idx) => (
                        <div key={idx} className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 border-t-4 border-t-red-700 hover:shadow-md transition-all flex flex-col h-full">
                            <div className="flex items-start justify-between gap-3 mb-4">
                                {mod.icon}
                                {mod.cantidad && (
                                    <span className="rounded-full bg-red-50 px-3 py-1 text-right text-xs font-black uppercase tracking-wider text-red-700">{mod.cantidad}</span>
                                )}
                            </div>
                            <h2 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-wide">{mod.title}</h2>
                            <p className="text-gray-500 text-sm mb-8 leading-relaxed">{mod.desc}</p>

                            <div className="mt-auto flex flex-col gap-3">
                                {mod.linkNew && (
                                    <Link to={mod.linkNew} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 rounded flex items-center justify-center gap-2 transition-colors text-sm uppercase tracking-wider shadow-sm">
                                        <Plus className="w-4 h-4" /> {mod.btnNewText}
                                    </Link>
                                )}
                                <Link to={mod.linkList} className="w-full bg-white hover:bg-gray-100 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-bold py-2.5 rounded flex items-center justify-center gap-2 transition-all text-sm uppercase tracking-wider">
                                    {mod.btnListText || "Ver Listado"} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actividad reciente */}
                {resumen?.actividad?.length > 0 && (
                    <section className="mt-10 bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Actividad reciente</h2>
                            <Link to="/admin/auditoria" className="text-sm font-bold uppercase tracking-wider text-red-700 hover:text-red-800">Ver todo</Link>
                        </div>
                        <ul className="divide-y divide-gray-100">
                            {resumen.actividad.map((a) => (
                                <li key={a._id} className="flex flex-wrap items-baseline justify-between gap-2 py-2.5 text-sm">
                                    <p className="text-gray-700">
                                        <strong className="text-gray-900">{a.usuarioNombre || "Alguien"}</strong> {VERBOS[a.accion] || a.accion}{" "}
                                        {SECCIONES[a.entidad]?.toLowerCase() || a.entidad}
                                        {a.detalle && <>: <span className="font-semibold">{a.detalle}</span></>}
                                    </p>
                                    <span className="text-xs font-medium text-gray-400">{hace(a.createdAt)}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
