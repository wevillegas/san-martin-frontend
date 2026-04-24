import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { obtenerNoticias, eliminarNoticia } from "../../services/noticiaService";

const NoticiasAdmin = () => {
    const [noticias, setNoticias] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarNoticias();
    }, []);

    const cargarNoticias = async () => {
        try {
            const datos = await obtenerNoticias();
            // Ordenamos de más nueva a más vieja
            const noticiasOrdenadas = datos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setNoticias(noticiasOrdenadas);
            setCargando(false);
        } catch (error) {
            console.error("Error al cargar las noticias", error);
            setCargando(false);
        }
    };

    const handleBorrar = async (id) => {
        if (window.confirm("¿Estás seguro de que querés borrar esta noticia? Esta acción no se puede deshacer.")) {
            try {
                await eliminarNoticia(id);
                // Recargamos la tabla para que la noticia desaparezca de la pantalla
                cargarNoticias();
            } catch (error) {
                console.error("Error al borrar", error);
                alert("Hubo un error al intentar borrar la noticia.");
            }
        }
    };

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
                    </div>

                    <Link
                        to="/admin/noticias/nueva"
                        className="flex items-center justify-center gap-2 bg-red-700 text-white px-6 py-3 rounded-md font-bold hover:bg-red-800 transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        Redactar Nueva
                    </Link>
                </div>

                {/* Tabla de Noticias */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                                    <th className="p-4 font-bold">Fecha</th>
                                    <th className="p-4 font-bold">Título</th>
                                    <th className="p-4 font-bold">Categoría</th>
                                    <th className="p-4 font-bold text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {noticias.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center text-gray-500">No hay noticias publicadas aún.</td>
                                    </tr>
                                ) : (
                                    noticias.map((noticia) => (
                                        <tr key={noticia._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 text-sm text-gray-600">
                                                {new Date(noticia.createdAt).toLocaleDateString('es-AR')}
                                            </td>
                                            <td className="p-4 font-bold text-gray-800">
                                                {noticia.titulo}
                                            </td>
                                            <td className="p-4">
                                                <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                    {noticia.etiqueta}
                                                </span>
                                            </td>
                                            <td className="p-4 flex items-center justify-center gap-3">
                                                {/* Botón Editar (Ahora es un Link a la pantalla de edición) */}
                                                <Link
                                                    to={`/admin/noticias/editar/${noticia._id}`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>

                                                {/* Botón Borrar */}
                                                <button
                                                    onClick={() => handleBorrar(noticia._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                    title="Borrar"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NoticiasAdmin;