import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { obtenerNoticiaPorId, actualizarNoticia } from "../../services/noticiaService";

const EditarNoticia = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Sacamos el ID de la URL

    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        titulo: "",
        cuerpo: "",
        etiqueta: "Primer Equipo",
        autor: ""
    });

    // Al cargar la página, buscamos la noticia por su ID
    useEffect(() => {
        const cargarNoticia = async () => {
            try {
                const nota = await obtenerNoticiaPorId(id);
                setFormData({
                    titulo: nota.titulo,
                    cuerpo: nota.cuerpo,
                    etiqueta: nota.etiqueta,
                    autor: nota.autor || ""
                });
                setCargando(false);
            } catch (error) {
                console.error(error);
                setError("No se pudo cargar la noticia.");
                setCargando(false);
            }
        };
        cargarNoticia();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setError("");

        try {
            await actualizarNoticia(id, formData);
            navigate("/admin/noticias"); // Volvemos a la tabla si hay éxito
        } catch (err) {
            console.error(err);
            setError("Error al guardar los cambios.");
            setGuardando(false);
        }
    };

    if (cargando) return <div className="text-center mt-20 font-bold text-red-700">Cargando noticia...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link to="/admin/noticias" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-4 w-max">
                        <ArrowLeft className="w-4 h-4" /> Volver a Noticias
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider">Editar Noticia</h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 font-bold">
                                <AlertCircle className="w-5 h-5" /> {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Título</label>
                            <input type="text" name="titulo" required value={formData.titulo} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Categoría</label>
                                <select name="etiqueta" value={formData.etiqueta} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none">
                                    <option value="Primer Equipo">Primer Equipo</option>
                                    <option value="Juveniles">Juveniles</option>
                                    <option value="Institucional">Institucional</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Socios">Socios</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Autor</label>
                                <input type="text" name="autor" required value={formData.autor} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Cuerpo</label>
                            <textarea name="cuerpo" required rows="8" value={formData.cuerpo} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none resize-y"></textarea>
                        </div>

                        <div className="pt-6 border-t flex justify-end">
                            <button type="submit" disabled={guardando} className="bg-blue-700 hover:bg-blue-800 text-white font-black px-8 py-3 rounded-lg uppercase tracking-widest flex items-center gap-2 disabled:opacity-50">
                                {guardando ? "Guardando..." : <><Save className="w-5 h-5" /> Guardar Cambios</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditarNoticia;