import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { puedeModificar, nombreCreador } from "../../utils/sesion";
import { useAvisos } from "../../components/Avisos";
import { Plus, Edit, Trash2, ArrowLeft, Star, Eye } from "lucide-react";
import { obtenerNoticias, eliminarNoticia, actualizarNoticia } from "../../services/noticiaService";
import BarraFiltros, { normalizar } from "../../components/BarraFiltros";
import { mensajeDeError } from "../../utils/errores";
import Paginacion from "../../components/Paginacion";
import { usePaginacion } from "../../hooks/usePaginacion";

const MAX_DESTACADAS = 5; // el mismo tope que aplica el servidor: lo que llena "Últimas Noticias" del inicio
const ESTADOS = [
    { valor: "publicada", texto: "Publicadas" },
    { valor: "borrador", texto: "Borradores" },
    { valor: "programada", texto: "Programadas" },
];

// publicada, borrador o programada (publicada con fecha futura)
const estadoDe = (n) => (n.estado === "borrador" ? "borrador" : n.publicarEn && new Date(n.publicarEn) > new Date() ? "programada" : "publicada");

const formatoFecha = (f) => new Date(f).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" });

const NoticiasAdmin = () => {
    const { confirmar, avisar } = useAvisos();
    const [noticias, setNoticias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [creador, setCreador] = useState("");
    const [etiqueta, setEtiqueta] = useState("");
    const [estado, setEstado] = useState("");

    useEffect(() => {
        cargarNoticias();
    }, []);

    const cargarNoticias = async () => {
        try {
            const datos = await obtenerNoticias({ todas: true });
            setNoticias(datos);
            setCargando(false);
        } catch (error) {
            console.error("Error al cargar las noticias", error);
            setCargando(false);
        }
    };

    const handleBorrar = async (id) => {
        if (await confirmar({ titulo: "Enviar a la papelera", mensaje: "¿Estás seguro de que querés borrar esta noticia? Va a la papelera, desde donde podés restaurarla.", textoConfirmar: "Enviar a la papelera", peligro: true })) {
            try {
                await eliminarNoticia(id);
                avisar("Enviado a la papelera.");
                cargarNoticias();
            } catch (error) {
                console.error("Error al borrar", error);
                avisar(mensajeDeError(error, "Hubo un error al intentar borrar la noticia."), "error");
            }
        }
    };

    // Función rápida para cambiar el estado "Destacado" desde la tabla
    const toggleDestacado = async (noticia) => {
        if (!noticia.destacado && destacadas >= MAX_DESTACADAS) {
            avisar(`Ya hay ${MAX_DESTACADAS} noticias destacadas. Quitale la estrella a una antes de destacar otra.`, "error", 6000);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('destacado', !noticia.destacado);
            await actualizarNoticia(noticia._id, formData);
            cargarNoticias(); // Recarga para que se acomoden según el backend
        } catch (error) {
            console.error("Error al destacar", error);
            avisar(mensajeDeError(error, "No se pudo cambiar el estado de destacado."), "error");
        }
    };

    const filtradas = noticias.filter(
        (n) =>
            (!creador || nombreCreador(n) === creador) &&
            (!etiqueta || n.etiqueta === etiqueta) &&
            (!estado || estadoDe(n) === estado) &&
            (!busqueda || normalizar(`${n.titulo} ${n.autor}`).includes(normalizar(busqueda)))
    );
    const { filas, paginacion } = usePaginacion(filtradas, [creador, busqueda, etiqueta, estado]);
    const creadores = [...new Set(noticias.map(nombreCreador).filter(Boolean))].sort();
    const etiquetas = [...new Set(noticias.map((n) => n.etiqueta))].sort();
    const destacadas = noticias.filter((n) => n.destacado).length;

    if (cargando) return <div className="text-center mt-20 font-bold text-red-700">Cargando panel...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">

                {/* Cabecera */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <Link to="/admin" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Volver al Dashboard principal
                        </Link>
                        <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider">Gestión de Noticias</h1>
                        <p
                            className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${destacadas >= MAX_DESTACADAS ? "bg-yellow-100 text-yellow-900" : "bg-gray-100 text-gray-600"}`}
                            title="Las destacadas son las que se muestran primero en el inicio"
                        >
                            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                            Destacadas: {destacadas} de {MAX_DESTACADAS}
                        </p>
                    </div>

                    <Link
                        to="/admin/noticias/nueva"
                        className="flex items-center justify-center gap-2 bg-red-700 text-white px-6 py-3 rounded-md font-bold hover:bg-red-800 transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        Redactar Nueva
                    </Link>
                </div>

                <BarraFiltros
                    busqueda={busqueda}
                    onBusqueda={setBusqueda}
                    placeholder="Buscar por título o autor..."
                    mostrados={filtradas.length}
                    total={noticias.length}
                    filtros={[
                        { etiqueta: "Todas las categorías", valor: etiqueta, onChange: setEtiqueta, opciones: etiquetas },
                        { etiqueta: "Todos los estados", valor: estado, onChange: setEstado, opciones: ESTADOS }, { etiqueta: "Todos los usuarios", valor: creador, onChange: setCreador, opciones: creadores }]}
                />

                {/* Tabla de Noticias */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                                    <th className="p-4 font-bold text-center w-16">Dest.</th>
                                    <th className="p-4 font-bold">Fecha</th>
                                    <th className="p-4 font-bold">Título</th>
                                    <th className="p-4 font-bold">Categoría</th>
                                    <th className="p-4 font-bold">Creado por</th>
                                    <th className="p-4 font-bold text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtradas.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-500">
                                            {noticias.length ? "Ninguna noticia coincide con la búsqueda." : "No hay noticias publicadas aún."}
                                        </td>
                                    </tr>
                                ) : (
                                    filas.map((noticia) => {
                                        const est = estadoDe(noticia);
                                        return (
                                            <tr key={noticia._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4 text-center">
                                                    <button
                                                        onClick={() => toggleDestacado(noticia)}
                                                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                                        title={noticia.destacado ? "Quitar de destacados" : "Destacar noticia"}
                                                    >
                                                        <Star className={`w-5 h-5 ${noticia.destacado ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                                                    </button>
                                                </td>
                                                <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                                                    {new Date(est === "programada" ? noticia.publicarEn : noticia.createdAt).toLocaleDateString('es-AR')}
                                                </td>
                                                <td className="p-4 font-bold text-gray-800">
                                                    {noticia.titulo}
                                                    {est === "borrador" && (
                                                        <span className="ml-2 rounded-full bg-gray-200 px-2.5 py-0.5 align-middle text-[11px] font-black uppercase tracking-wider text-gray-700">Borrador</span>
                                                    )}
                                                    {est === "programada" && (
                                                        <span className="ml-2 rounded-full bg-blue-100 px-2.5 py-0.5 align-middle text-[11px] font-black uppercase tracking-wider text-blue-800">
                                                            Se publica el {formatoFecha(noticia.publicarEn)}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                                                        {noticia.etiqueta}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm font-medium text-gray-700">{nombreCreador(noticia) || "—"}</td>
                                                <td className="p-4 flex items-center justify-center gap-3">
                                                    <a
                                                        href={`/noticias/${noticia._id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                                        title="Ver cómo queda en el sitio"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </a>
                                                    {puedeModificar(noticia) && (
                                                    <Link
                                                        to={`/admin/noticias/editar/${noticia._id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                        title="Editar"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </Link>
                                                    )}
                                                    {puedeModificar(noticia) && (<button
                                                        onClick={() => handleBorrar(noticia._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                        title="Borrar"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>)}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Paginacion {...paginacion} />

            </div>
        </div>
    );
};

export default NoticiasAdmin;
