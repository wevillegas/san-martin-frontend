import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Upload, Image as ImageIcon } from "lucide-react";
import { obtenerProductoPorId, actualizarProducto } from "../../services/productoService";

const EditarProducto = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    // ESTADO PARA LA NUEVA IMAGEN (SI LA CAMBIAN) Y SU PREVIEW
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
        const cargarDatos = async () => {
            try {
                const producto = await obtenerProductoPorId(id);
                setFormData({
                    nombre: producto.nombre,
                    categoria: producto.categoria,
                    precio: producto.precio,
                    linkExterno: producto.linkExterno,
                    destacado: producto.destacado ?? false,
                    activo: producto.activo ?? true
                });

                // Si el producto ya tiene foto en Cloudinary, la mostramos en la vista previa
                if (producto.imagenUrl) {
                    setPreview(producto.imagenUrl);
                }

                setCargando(false);
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar la información del producto.");
                setCargando(false);
            }
        };
        cargarDatos();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === "checkbox" ? checked : value 
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
        setGuardando(true);
        setError("");

        // ARMAMOS EL PAQUETE (FormData)
        const submitData = new FormData();
        
        // Metemos los datos del formulario
        Object.keys(formData).forEach(key => submitData.append(key, formData[key]));
        
        // Si el admin eligió una nueva foto, la agregamos al paquete
        if (imagen) submitData.append("imagen", imagen);

        try {
            await actualizarProducto(id, submitData);
            navigate("/admin/tienda");
        } catch (err) {
            console.error(err);
            const errorBack = err.response?.data?.mensaje || "Error al guardar los cambios en el producto.";
            setError(errorBack);
            setGuardando(false);
        }
    };

    if (cargando) return <div className="text-center mt-20 text-red-700 font-bold">Cargando datos del producto...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
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

                        {/* VISTA PREVIA Y SUBIDA DE FOTO */}
                        <div className="flex flex-col md:flex-row gap-6 items-center bg-blue-50/30 p-6 rounded-lg border border-blue-100">
                            <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg border-4 border-white shadow-lg flex items-center justify-center overflow-hidden relative">
                                {preview ? (
                                    <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon className="w-10 h-10 text-gray-400" />
                                )}
                            </div>
                            <div className="flex-1 w-full text-center md:text-left">
                                <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-2">Foto del Producto</h3>
                                <p className="text-sm text-gray-500 mb-4">Elegí una nueva imagen si querés reemplazar la foto actual del artículo.</p>
                                <label className="cursor-pointer bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-md font-bold transition-colors inline-flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    Cambiar Imagen
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>
                                {imagen && <p className="text-xs text-green-600 font-bold mt-2">Nueva imagen lista: {imagen.name}</p>}
                            </div>
                        </div>

                        {/* SECCIÓN 1: Detalles del Artículo */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-4 border-b pb-2">Información del Artículo</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Nombre</label>
                                    <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Categoría</label>
                                    <select name="categoria" value={formData.categoria} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold">
                                        <option value="Indumentaria">Indumentaria</option>
                                        <option value="Accesorios">Accesorios</option>
                                        <option value="Entrenamiento">Entrenamiento</option>
                                        <option value="Salida">Salida</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Precio ($)</label>
                                    <input type="number" name="precio" required value={formData.precio} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                                </div>
                                <div className="lg:col-span-2">
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Link a la Tienda Oficial</label>
                                    <input type="url" name="linkExterno" required value={formData.linkExterno} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" />
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN 2: Configuración de Visibilidad */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex gap-8">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" name="destacado" checked={formData.destacado} onChange={handleChange} className="w-5 h-5 text-red-600 rounded focus:ring-red-500" />
                                <span className="font-bold text-gray-700 uppercase tracking-wide text-sm">Destacar en la Home</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" name="activo" checked={formData.activo} onChange={handleChange} className="w-5 h-5 text-red-600 rounded focus:ring-red-500" />
                                <span className="font-bold text-gray-700 uppercase tracking-wide text-sm">Producto Activo (Visible)</span>
                            </label>
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

export default EditarProducto;