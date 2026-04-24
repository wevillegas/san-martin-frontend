import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { crearNoticia } from "../../services/noticiaService";

const NuevaNoticia = () => {
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    // 1. AHORA SÍ: Coincide exactamente con tu Backend
    const [formData, setFormData] = useState({
        titulo: "",
        cuerpo: "",
        etiqueta: "Primer Equipo",
        autor: "" // Agregamos el campo faltante
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError("");

        try {
            // 2. Enviamos el objeto limpio, sin inventar datos
            await crearNoticia(formData);

            navigate("/admin/noticias");
        } catch (err) {
            console.error("Error del servidor:", err.response?.data);
            setError("Hubo un error al publicar la noticia. Verificá tu conexión o sesión.");
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">

                {/* Cabecera */}
                <div className="mb-8">
                    <Link to="/admin/noticias" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-4 transition-colors w-max">
                        <ArrowLeft className="w-4 h-4" /> Volver a Noticias
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider">Redactar Noticia</h1>
                    <p className="text-gray-500 mt-1 font-medium">Publicá una nueva novedad en el portal del club.</p>
                </div>

                {/* Tarjeta del Formulario */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 font-bold rounded-r-md">
                                <AlertCircle className="w-5 h-5" />
                                {error}
                            </div>
                        )}

                        {/* Fila 1: Título */}
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                                Título de la Noticia
                            </label>
                            <input
                                type="text"
                                name="titulo"
                                required
                                value={formData.titulo}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-bold text-gray-800 text-lg"
                                placeholder="Ej: San Martín golea en La Ciudadela"
                            />
                        </div>

                        {/* Fila 2: Categoría y Autor divididos en dos columnas */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                                    Categoría
                                </label>
                                <select
                                    name="etiqueta"
                                    value={formData.etiqueta}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-bold text-gray-700 cursor-pointer bg-gray-50"
                                >
                                    <option value="Primer Equipo">Primer Equipo</option>
                                    <option value="Primera Nacional">Primera Nacional</option>
                                    <option value="Liga Tucumana">Liga Tucumana</option>
                                    <option value="Juveniles">Juveniles</option>
                                    <option value="Institucional">Institucional</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Socios">Socios</option>
                                </select>
                            </div>

                            {/* NUEVO CAMPO: Autor */}
                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                                    Autor
                                </label>
                                <input
                                    type="text"
                                    name="autor"
                                    required
                                    value={formData.autor}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-bold text-gray-700 bg-gray-50"
                                    placeholder="Ej: Dpto. de Prensa"
                                />
                            </div>
                        </div>

                        {/* Fila 3: Cuerpo */}
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                                Cuerpo de la Noticia
                            </label>
                            <textarea
                                name="cuerpo"
                                required
                                rows="8"
                                value={formData.cuerpo}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-700 leading-relaxed resize-y"
                                placeholder="Escribí acá todo el desarrollo de la noticia..."
                            ></textarea>
                        </div>

                        {/* Botonera */}
                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={cargando}
                                className="bg-red-700 hover:bg-red-800 text-white font-black px-8 py-3 rounded-lg uppercase tracking-widest transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                            >
                                {cargando ? "Publicando..." : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Publicar Noticia
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default NuevaNoticia;