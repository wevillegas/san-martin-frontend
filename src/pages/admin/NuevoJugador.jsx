import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, AlertCircle } from "lucide-react";
import { crearJugador } from "../../services/jugadorService";

const NuevoJugador = () => {
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        numeroCamiseta: "",
        posicion: "Delantero", // Asegurate de que coincida con tu enum
        fechaNacimiento: "",
        lugarNacimiento: "",
        altura: "",
        procedencia: "",
        debutEnClub: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError("");

        try {
            await crearJugador(formData);
            navigate("/admin/plantel");
        } catch (err) {
            console.error(err);
            const errorBack = err.response?.data?.mensaje || "Error al registrar el jugador.";
            setError(errorBack);
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <Link to="/admin/plantel" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-4 w-max transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al Plantel
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider">Nuevo Jugador</h1>
                    <p className="text-gray-500 font-medium">Completá la ficha técnica del nuevo refuerzo.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 font-bold">
                                <AlertCircle className="w-5 h-5" /> {error}
                            </div>
                        )}

                        {/* SECCIÓN 1: Datos Básicos */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-4 border-b pb-2">Datos Principales</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Nombre</label>
                                    <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Apellido</label>
                                    <input type="text" name="apellido" required value={formData.apellido} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Dorsal</label>
                                    <input type="number" name="numeroCamiseta" required value={formData.numeroCamiseta} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Posición</label>
                                    <select name="posicion" value={formData.posicion} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none font-bold">
                                        <option value="Arquero">Arquero</option>
                                        <option value="Defensor">Defensor</option>
                                        <option value="Volante">Volante</option>
                                        <option value="Delantero">Delantero</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN 2: Ficha Técnica */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-4 border-b pb-2">Ficha Técnica</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Fecha de Nacimiento</label>
                                    <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Lugar de Nacimiento</label>
                                    <input type="text" name="lugarNacimiento" value={formData.lugarNacimiento} onChange={handleChange} placeholder="Ej: Lules, Tucumán" className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Altura (Mts)</label>
                                    <input type="number" step="0.01" name="altura" value={formData.altura} onChange={handleChange} placeholder="Ej: 1.85" className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none font-bold" />
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN 3: Trayectoria */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-4 border-b pb-2">Trayectoria</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Procedencia</label>
                                    <input type="text" name="procedencia" value={formData.procedencia} onChange={handleChange} placeholder="Ej: Inferiores / Agropecuario" className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Debut en San Martín</label>
                                    <input type="text" name="debutEnClub" value={formData.debutEnClub} onChange={handleChange} placeholder="Ej: vs Gimnasia (J) - 03/02/2024" className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none font-bold" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button type="submit" disabled={cargando} className="bg-red-700 hover:bg-red-800 text-white font-black px-8 py-3 rounded-lg uppercase tracking-widest flex items-center gap-2 transition-all shadow active:scale-95 disabled:opacity-50">
                                {cargando ? "Guardando..." : <><UserPlus className="w-5 h-5" /> Fichar Jugador</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NuevoJugador;