import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Upload, Image as ImageIcon } from "lucide-react";
import { crearMiembro } from "../../services/cuerpoTecnicoService";

const NuevoMiembro = () => {
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        rol: "Ayudante de Campo",
        fechaNacimiento: ""
    });

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
        setCargando(true);
        setError("");

        const submitData = new FormData();
        Object.keys(formData).forEach(key => submitData.append(key, formData[key]));
        if (imagen) submitData.append("imagen", imagen);

        try {
            await crearMiembro(submitData);
            navigate("/admin/cuerpo-tecnico");
        } catch (err) {
            setError("Error al guardar el miembro del cuerpo técnico.");
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link to="/admin/cuerpo-tecnico" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-4 w-max">
                        <ArrowLeft className="w-4 h-4" /> Volver al listado
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider">Nuevo Integrante</h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 font-bold">
                                <AlertCircle className="w-5 h-5" /> {error}
                            </div>
                        )}

                        {/* SUBIDA DE FOTO */}
                        <div className="flex flex-col md:flex-row gap-6 items-center bg-gray-50/50 p-6 rounded-lg border border-gray-100">
                            <div className="w-32 h-32 flex-shrink-0 bg-gray-200 rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                                {preview ? (
                                    <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon className="w-10 h-10 text-gray-400" />
                                )}
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-2">Foto Oficial</h3>
                                <label className="cursor-pointer bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-md font-bold transition-colors inline-flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    Subir Imagen
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>
                            </div>
                        </div>

                        {/* DATOS */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Nombre</label>
                                <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Apellido</label>
                                <input type="text" name="apellido" required value={formData.apellido} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Rol en el equipo</label>
                                <select name="rol" value={formData.rol} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none">
                                    <option value="Director Técnico">Director Técnico</option>
                                    <option value="Ayudante de Campo">Ayudante de Campo</option>
                                    <option value="Preparador Físico">Preparador Físico</option>
                                    <option value="Entrenador de Arqueros">Entrenador de Arqueros</option>
                                    <option value="Cuerpo Médico">Cuerpo Médico</option>
                                    <option value="Utillero">Utillero</option>
                                    <option value="Analista de Video">Analista de Video</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Fecha de Nacimiento</label>
                                <input type="date" name="fechaNacimiento" required value={formData.fechaNacimiento} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none" />
                            </div>
                        </div>

                        <div className="pt-6 border-t flex justify-end">
                            <button type="submit" disabled={cargando} className="bg-red-700 hover:bg-red-800 text-white font-black px-8 py-3 rounded-lg uppercase tracking-widest flex items-center gap-2">
                                {cargando ? "Guardando..." : <><Save className="w-5 h-5" /> Fichar Miembro</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NuevoMiembro;