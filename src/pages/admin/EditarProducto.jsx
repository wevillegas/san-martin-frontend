import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Upload, Image as ImageIcon } from "lucide-react";
// Asegurate de tener estas funciones en tu servicio de productos
import { obtenerProductoPorId, actualizarProducto } from "../../services/productoService";

const EditarProducto = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        nombre: "",
        categoria: "Indumentaria",
        precio: "",
        linkExterno: "",
        destacado: false,
        activo: true
    });

    useEffect(() => {
        const cargarProducto = async () => {
            try {
                const prod = await obtenerProductoPorId(id);
                setFormData({
                    nombre: prod.nombre,
                    categoria: prod.categoria || "Indumentaria",
                    precio: prod.precio || "",
                    linkExterno: prod.linkExterno || "",
                    destacado: prod.destacado || false,
                    activo: prod.activo !== undefined ? prod.activo : true
                });
                if (prod.imagenUrl) setPreview(prod.imagenUrl);
                setCargando(false);
            } catch (error) {
                console.error(error);
                setError("No se pudo cargar el producto.");
                setCargando(false);
            }
        };
        cargarProducto();
    }, [id]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
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
            await actualizarProducto(id, submitData);
            navigate("/admin/tienda");
        } catch (err) {
            console.error(err);
            setError("Error al guardar los cambios.");
            setGuardando(false);
        }
    };

    if (cargando) return <div className="text-center mt-20 font-bold text-red-700">Cargando producto...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link to="/admin/tienda" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-4 w-max">
                        <ArrowLeft className="w-4 h-4" /> Volver a Tienda
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider">Editar Producto</h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 font-bold">
                                <AlertCircle className="w-5 h-5" /> {error}
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row gap-6 items-center bg-blue-50/30 p-6 rounded-lg border border-blue-100">
                            <div className="w-full md:w-64 aspect-square flex-shrink-0 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative">
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
                                <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-2">Imagen del Producto</h3>
                                <p className="text-sm text-gray-500 mb-4">Seleccioná una imagen nueva si deseás reemplazar la actual.</p>
                                <label className="cursor-pointer bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-md font-bold transition-colors inline-flex items-center gap-2 shadow-sm">
                                    <Upload className="w-4 h-4" />
                                    Cambiar Imagen
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>
                                {imagen && <p className="text-xs text-green-600 font-bold mt-2">Nuevo archivo: {imagen.name}</p>}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Nombre del Producto</label>
                                <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none font-bold" />
                            </div>

                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Categoría</label>
                                <select name="categoria" value={formData.categoria} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none">
                                    <option value="Indumentaria">Indumentaria</option>
                                    <option value="Accesorios">Accesorios</option>
                                    <option value="Calzado">Calzado</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Precio ($)</label>
                                <input type="number" name="precio" required value={formData.precio} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none font-bold text-green-700" placeholder="Ej: 45000" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Link Externo (Tienda Oficial)</label>
                            <input type="url" name="linkExterno" value={formData.linkExterno} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none" placeholder="https://tienda.clubatleticosanmartin.com.ar/..." />
                            <p className="text-xs text-gray-500 mt-1">Dejá este campo vacío si no hay un link externo.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                            {/* CHECKBOX DESTACADO */}
                            <div className="flex items-center gap-3 flex-1">
                                <input 
                                    type="checkbox" 
                                    id="destacado" 
                                    name="destacado" 
                                    checked={formData.destacado} 
                                    onChange={handleChange}
                                    className="w-5 h-5 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer"
                                />
                                <label htmlFor="destacado" className="font-bold text-gray-800 cursor-pointer select-none">
                                    Destacar en Home
                                </label>
                            </div>

                            {/* CHECKBOX ACTIVO */}
                            <div className="flex items-center gap-3 flex-1">
                                <input 
                                    type="checkbox" 
                                    id="activo" 
                                    name="activo" 
                                    checked={formData.activo} 
                                    onChange={handleChange}
                                    className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
                                />
                                <label htmlFor="activo" className="font-bold text-gray-800 cursor-pointer select-none">
                                    Producto Activo (Visible)
                                </label>
                            </div>
                        </div>

                        <div className="pt-6 border-t flex justify-end">
                            <button type="submit" disabled={guardando} className="bg-red-700 hover:bg-red-800 text-white font-black px-8 py-3 rounded-lg uppercase tracking-widest transition-all shadow-md flex items-center gap-2 disabled:opacity-50">
                                {guardando ? "Guardando..." : <><Save className="w-5 h-5" /> Guardar Cambios</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditarProducto;