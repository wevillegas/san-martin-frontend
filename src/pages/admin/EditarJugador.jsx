import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Upload, Image as ImageIcon } from "lucide-react";
import { obtenerJugadorPorId, actualizarJugador } from "../../services/jugadorService";

const EditarJugador = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        numeroCamiseta: "",
        posicion: "Delantero",
        fechaNacimiento: "",
        lugarNacimiento: "",
        altura: "",
        procedencia: "",
        debutEnClub: ""
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const jugador = await obtenerJugadorPorId(id);
                setFormData({
                    nombre: jugador.nombre,
                    apellido: jugador.apellido,
                    numeroCamiseta: jugador.numeroCamiseta,
                    posicion: jugador.posicion,
                    // Formateamos la fecha para que el input type="date" la lea
                    fechaNacimiento: jugador.fechaNacimiento ? jugador.fechaNacimiento.split('T')[0] : "",
                    lugarNacimiento: jugador.lugarNacimiento || "",
                    altura: jugador.altura || "",
                    procedencia: jugador.procedencia || "",
                    debutEnClub: jugador.debutEnClub || ""
                });

                // Si el jugador ya tiene foto en la BD, la mostramos en la vista previa
                if (jugador.imagenUrl) {
                    setPreview(jugador.imagenUrl);
                }

                setCargando(false);
            } catch (err) {
                setError("No se pudo cargar la información del jugador.");
                setCargando(false);
            }
        };
        cargarDatos();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setError("");

        const submitData = new FormData();
        Object.keys(formData).forEach(key => submitData.append(key, formData[key]));
        if (imagen) submitData.append("imagen", imagen);

        try {
            await actualizarJugador(id, submitData);
            navigate("/admin/plantel");
        } catch (err) {
            const errorBack = err.response?.data?.mensaje || "Error al guardar los cambios.";
            setError(errorBack);
            setGuardando(false);
        }
    };

    if (cargando) return <div className="text-center mt-20 text-red-700 font-bold">Cargando datos...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <Link to="/admin/plantel" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-4 w-max">
                        <ArrowLeft className="w-4 h-4" /> Volver al Plantel
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider">Editar Jugador</h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 font-bold">
                                <AlertCircle className="w-5 h-5" /> {error}
                            </div>
                        )}

                        {/* VISTA PREVIA Y SUBIDA DE FOTO */}
                        <div className="flex flex-col md:flex-row gap-6 items-center bg-blue-50/30 p-6 rounded-lg border border-blue-100">
                            <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden relative">
                                {preview ? (
                                    <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon className="w-10 h-10 text-gray-400" />
                                )}
                            </div>
                            <div className="flex-1 w-full text-center md:text-left">
                                <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-2">Foto del Jugador</h3>
                                <p className="text-sm text-gray-500 mb-4">Elegí una nueva imagen si querés actualizar la actual.</p>
                                <label className="cursor-pointer bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-md font-bold transition-colors inline-flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    Cambiar Imagen
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>
                                {imagen && <p className="text-xs text-green-600 font-bold mt-2">Nueva imagen lista: {imagen.name}</p>}
                            </div>
                        </div>

                        {/* SECCIÓN 1: Datos Principales */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-4 border-b pb-2">Datos Principales</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Nombre</label>
                                    <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Apellido</label>
                                    <input type="text" name="apellido" required value={formData.apellido} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Dorsal</label>
                                    <input type="number" name="numeroCamiseta" required value={formData.numeroCamiseta} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Posición</label>
                                    <select name="posicion" value={formData.posicion} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold">
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
                                    <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Lugar de Nacimiento</label>
                                    <input type="text" name="lugarNacimiento" value={formData.lugarNacimiento} onChange={handleChange} placeholder="Ej: Lules, Tucumán" className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Altura (Mts)</label>
                                    <input type="number" step="0.01" name="altura" value={formData.altura} onChange={handleChange} placeholder="Ej: 1.85" className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN 3: Trayectoria */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-4 border-b pb-2">Trayectoria</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Procedencia</label>
                                    <input type="text" name="procedencia" value={formData.procedencia} onChange={handleChange} placeholder="Ej: Inferiores" className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Debut en San Martín</label>
                                    <input type="text" name="debutEnClub" value={formData.debutEnClub} onChange={handleChange} placeholder="Ej: vs Gimnasia (J) - 03/02/2024" className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button type="submit" disabled={guardando} className="bg-red-700 hover:bg-red-800 text-white font-black px-8 py-3 rounded-lg uppercase tracking-widest flex items-center gap-2 transition-all shadow active:scale-95 disabled:opacity-50">
                                {guardando ? "Guardando..." : <><Save className="w-5 h-5" /> Guardar Cambios</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditarJugador;