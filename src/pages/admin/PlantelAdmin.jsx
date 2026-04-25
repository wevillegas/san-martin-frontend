import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, ArrowLeft, Eye } from "lucide-react";
import { obtenerJugadores, eliminarJugador } from "../../services/jugadorService";
import FichaJugadorModal from "../../components/FichaJugadorModal";

// 1. FUNCIÓN PARA ORDENAR POR POSICIÓN
const getPesoPosicion = (posicion) => {
    const pos = posicion ? posicion.toLowerCase() : "";
    if (pos.includes("arquero")) return 1;
    if (pos.includes("defensor") || pos.includes("defensa")) return 2;
    if (pos.includes("medio") || pos.includes("volante")) return 3;
    if (pos.includes("delantero") || pos.includes("ataque")) return 4;
    return 5;
};

// 2. FUNCIÓN PARA DARLE COLOR A LAS ETIQUETAS SEGÚN LA POSICIÓN
const getColorPosicion = (posicion) => {
    const pos = posicion ? posicion.toLowerCase() : "";
    if (pos.includes("arquero")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (pos.includes("defensor") || pos.includes("defensa")) return "bg-blue-100 text-blue-800 border-blue-200";
    if (pos.includes("medio") || pos.includes("volante")) return "bg-green-100 text-green-800 border-green-200";
    if (pos.includes("delantero") || pos.includes("ataque")) return "bg-red-100 text-red-800 border-red-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
};

const PlantelAdmin = () => {
    const [jugadores, setJugadores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

    useEffect(() => {
        cargarPlantel();
    }, []);

    const cargarPlantel = async () => {
        try {
            const datos = await obtenerJugadores();
            
            // APLICAMOS LA MAGIA DEL ORDENAMIENTO ACÁ
            const jugadoresOrdenados = datos.sort((a, b) => {
                const pesoA = getPesoPosicion(a.posicion);
                const pesoB = getPesoPosicion(b.posicion);

                if (pesoA !== pesoB) {
                    return pesoA - pesoB; // Ordena por línea (Arquero -> Delantero)
                }
                // Si están en la misma línea, los ordena por número de camiseta
                return (a.numeroCamiseta || 0) - (b.numeroCamiseta || 0);
            });

            setJugadores(jugadoresOrdenados);
            setCargando(false);
        } catch (error) {
            console.error("Error al cargar el plantel", error);
            setCargando(false);
        }
    };

    const handleBorrar = async (id) => {
        if (window.confirm("¿Estás seguro de que querés dar de baja a este jugador del sistema?")) {
            try {
                await eliminarJugador(id);
                cargarPlantel(); // Recargamos la tabla
            } catch (error) {
                console.error("Error al borrar", error);
                alert("Hubo un error al intentar eliminar al jugador.");
            }
        }
    };

    if (cargando) return <div className="text-center mt-20 font-bold text-red-700">Cargando plantel...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 relative">
            <div className="max-w-6xl mx-auto">

                {/* Cabecera */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <Link to="/admin" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Volver al Dashboard principal
                        </Link>
                        <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider">Gestión del Plantel</h1>
                    </div>

                    <Link
                        to="/admin/plantel/nuevo"
                        className="flex items-center justify-center gap-2 bg-red-700 text-white px-6 py-3 rounded-md font-bold hover:bg-red-800 transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        Agregar Jugador
                    </Link>
                </div>

                {/* Tabla de Jugadores */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative z-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                                    <th className="p-4 font-bold w-20 text-center">Dorsal</th>
                                    <th className="p-4 font-bold">Nombre</th>
                                    <th className="p-4 font-bold">Posición</th>
                                    <th className="p-4 font-bold text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {jugadores.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center text-gray-500">No hay jugadores registrados aún.</td>
                                    </tr>
                                ) : (
                                    jugadores.map((jugador) => (
                                        <tr key={jugador._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 flex justify-center">
                                                <span className="bg-red-700 text-white text-sm font-black w-9 h-9 flex items-center justify-center rounded-full shadow-md border-2 border-white">
                                                    {jugador.numeroCamiseta || "?"}
                                                </span>
                                            </td>
                                            <td className="p-4 font-bold text-gray-800">
                                                {jugador.nombre} {jugador.apellido}
                                            </td>
                                            <td className="p-4">
                                                {/* ETIQUETA DE COLOR PARA LA POSICIÓN */}
                                                <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full border ${getColorPosicion(jugador.posicion)}`}>
                                                    {jugador.posicion}
                                                </span>
                                            </td>
                                            <td className="p-4 flex items-center justify-center gap-3">

                                                <button
                                                    onClick={() => setJugadorSeleccionado(jugador)}
                                                    className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                                                    title="Ver Ficha Técnica"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>

                                                <Link
                                                    to={`/admin/plantel/editar/${jugador._id}`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>

                                                <button
                                                    onClick={() => handleBorrar(jugador._id)}
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

            {jugadorSeleccionado && (
                <FichaJugadorModal
                    jugador={jugadorSeleccionado}
                    onClose={() => setJugadorSeleccionado(null)}
                />
            )}

        </div>
    );
};

export default PlantelAdmin;