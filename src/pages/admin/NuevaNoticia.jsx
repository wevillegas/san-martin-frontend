import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Upload, Image as ImageIcon } from "lucide-react";
import { crearNoticia } from "../../services/noticiaService";

const NuevaNoticia = () => {
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    // ESTADO PARA LA IMAGEN
    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        titulo: "",
        resumen: "", // Agregamos el resumen
        cuerpo: "",
        etiqueta: "Primer Equipo",
        autor: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
        setCargando(true);
        setError("");

        // Usamos FormData para empaquetar texto + archivo
        const submitData = new FormData();
        Object.keys(formData).forEach(key => submitData.append(key, formData[key]));
        if (imagen) submitData.append("imagen", imagen);

        try {
            await crearNoticia(submitData);
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
                <div className="mb-8">
                    <Link to="/admin/noticias" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-4 transition-colors w-max">
                        <ArrowLeft className="w-4 h-4" /> Volver a Noticias
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider">Redactar Noticia</h1>
                    <p className="text-gray-500 mt-1 font-medium">Publicá una nueva novedad en el portal del club.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 font-bold rounded-r-md">
                                <AlertCircle className="w-5 h-5" />
                                {error}
                            </div>
                        )}

                        {/* SECCIÓN IMAGEN */}
                        <div className="flex flex-col md:flex-row gap-6 items-center bg-red-50/30 p-6 rounded-lg border border-red-100">
                            <div className="w-full md:w-64 aspect-video flex-shrink-0 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative">
                                {preview ? (
                                    <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center text-gray-400 p-4">
                                        <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Sin Imagen</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 w-full text-center md:text-left">
                                <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-2">Imagen de Portada</h3>
                                <p className="text-sm text-gray-500 mb-4">Esta imagen aparecerá en el inicio. Formato apaisado (16:9) recomendado.</p>
                                <label className="cursor-pointer bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-md font-bold transition-colors inline-flex items-center gap-2 shadow-sm">
                                    <Upload className="w-4 h-4" />
                                    Subir Imagen
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>
                                {imagen && <p className="text-xs text-green-600 font-bold mt-2">Archivo seleccionado: {imagen.name}</p>}
                            </div>
                        </div>

                        {/* Fila 1: Título */}
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Título de la Noticia</label>
                            <input
                                type="text" name="titulo" required value={formData.titulo} onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-bold text-gray-800 text-lg"
                                placeholder="Ej: San Martín golea en La Ciudadela"
                            />
                        </div>

                        {/* Fila Nueva: Resumen */}
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Resumen (Copete)</label>
                            <textarea
                                name="resumen" required rows="2" value={formData.resumen} onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-700 font-medium resize-y"
                                placeholder="Un texto corto y gancho para mostrar en las tarjetas de la página principal..."
                            ></textarea>
                        </div>

                        {/* Fila 2: Categoría y Autor */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Categoría</label>
                                <select
                                    name="etiqueta" value={formData.etiqueta} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all font-bold text-gray-700 cursor-pointer bg-gray-50"
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
                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Autor</label>
                                <input
                                    type="text" name="autor" required value={formData.autor} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all font-bold text-gray-700 bg-gray-50"
                                    placeholder="Ej: Dpto. de Prensa"
                                />
                            </div>
                        </div>

                        {/* Fila 3: Cuerpo */}
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Cuerpo de la Noticia</label>
                            <textarea
                                name="cuerpo" required rows="8" value={formData.cuerpo} onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-700 leading-relaxed resize-y"
                                placeholder="Escribí acá todo el desarrollo de la noticia..."
                            ></textarea>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit" disabled={cargando}
                                className="bg-red-700 hover:bg-red-800 text-white font-black px-8 py-3 rounded-lg uppercase tracking-widest transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                            >
                                {cargando ? "Publicando..." : <><Save className="w-5 h-5" /> Publicar Noticia</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NuevaNoticia;