import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { obtenerCuerpoTecnico, eliminarMiembro } from "../../services/cuerpoTecnicoService";

// Función para darle color a las etiquetas según el rol
const getColorRol = (rol) => {
    const r = rol ? rol.toLowerCase() : "";
    if (r.includes("técnico")) return "bg-red-100 text-red-800 border-red-200";
    if (r.includes("ayudante")) return "bg-orange-100 text-orange-800 border-orange-200";
    if (r.includes("físico")) return "bg-blue-100 text-blue-800 border-blue-200";
    if (r.includes("arquero")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (r.includes("médico")) return "bg-green-100 text-green-800 border-green-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
};

const CuerpoTecnicoAdmin = () => {
    const [cuerpoTecnico, setCuerpoTecnico] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarCT();
    }, []);

    const cargarCT = async () => {
        try {
            const datos = await obtenerCuerpoTecnico();
            setCuerpoTecnico(datos);
            setCargando(false);
        } catch (error) {
            console.error("Error al cargar el cuerpo técnico", error);
            setCargando(false);
        }
    };

    const handleBorrar = async (id) => {
        if (window.confirm("¿Estás seguro de que querés dar de baja a este miembro del sistema?")) {
            try {
                await eliminarMiembro(id);
                cargarCT(); // Recargamos la tabla
            } catch (error) {
                console.error("Error al borrar", error);
                alert("Hubo un error al intentar eliminar.");
            }
        }
    };

    if (cargando) return <div className="text-center mt-20 font-bold text-red-700">Cargando datos...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 relative">
            <div className="max-w-6xl mx-auto">

                {/* Cabecera */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <Link to="/admin" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Volver al Dashboard principal
                        </Link>
                        <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider">Cuerpo Técnico</h1>
                    </div>

                    <Link
                        to="/admin/cuerpo-tecnico/nuevo"
                        className="flex items-center justify-center gap-2 bg-red-700 text-white px-6 py-3 rounded-md font-bold hover:bg-red-800 transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        Agregar Miembro
                    </Link>
                </div>

                {/* Tabla */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                                    <th className="p-4 font-bold">Nombre</th>
                                    <th className="p-4 font-bold">Rol</th>
                                    <th className="p-4 font-bold text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {cuerpoTecnico.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="p-8 text-center text-gray-500">No hay miembros registrados aún.</td>
                                    </tr>
                                ) : (
                                    cuerpoTecnico.map((miembro) => (
                                        <tr key={miembro._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-bold text-gray-800">
                                                {miembro.nombre} {miembro.apellido}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full border ${getColorRol(miembro.rol)}`}>
                                                    {miembro.rol}
                                                </span>
                                            </td>
                                            <td className="p-4 flex items-center justify-center gap-3">
                                                <Link
                                                    to={`/admin/cuerpo-tecnico/editar/${miembro._id}`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleBorrar(miembro._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                    title="Dar de baja"
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

export default CuerpoTecnicoAdmin;