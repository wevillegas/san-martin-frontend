import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Upload, Image as ImageIcon, ShoppingBag } from "lucide-react";
import { crearProducto } from "../../services/productoService"; // Importamos el servicio que creaste recién

const NuevoProducto = () => {
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    // ESTADO PARA LA IMAGEN Y SU VISTA PREVIA
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === "checkbox" ? checked : value 
        });
    };

    // FUNCIÓN PARA CAPTURAR LA FOTO CUANDO LA ELIGEN
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

        // LA MAGIA: Creamos el Paquete (FormData) igual que en Jugadores
        const submitData = new FormData();

        // Metemos todos los textos y booleanos adentro del paquete
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });

        // Metemos la imagen en el paquete (debe llamarse 'imagen' como espera el multer del back)
        if (imagen) {
            submitData.append("imagen", imagen);
        }

        try {
            // Mandamos el paquete completo usando tu servicio
            await crearProducto(submitData);
            navigate("/admin/tienda");
        } catch (err) {
            console.error(err);
            const errorBack = err.response?.data?.mensaje || "Error al publicar el producto. Revisá los datos.";
            setError(errorBack);
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <Link to="/admin/tienda" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-4 w-max transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver a la Tienda
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider">Nuevo Producto</h1>
                    <p className="text-gray-500 font-medium">Completá los datos del artículo y subí una foto de alta calidad.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 font-bold">
                                <AlertCircle className="w-5 h-5" /> {error}
                            </div>
                        )}

                        {/* --- SECCIÓN: FOTO DEL PRODUCTO --- */}
                        <div className="flex flex-col md:flex-row gap-6 items-center bg-red-50/30 p-6 rounded-lg border border-red-100">
                            {/* Círculo de Vista Previa */}
                            <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg border-4 border-white shadow-lg flex items-center justify-center overflow-hidden relative group">
                                {preview ? (
                                    <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon className="w-10 h-10 text-gray-400" />
                                )}
                            </div>

                            {/* Input para subir archivo */}
                            <div className="flex-1 w-full text-center md:text-left">
                                <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-2">Imagen del Artículo</h3>
                                <p className="text-sm text-gray-500 mb-4">Elegí una imagen en formato JPG o PNG. Preferentemente con fondo liso.</p>

                                <label className="cursor-pointer bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-md font-bold transition-colors inline-flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    Seleccionar Imagen
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>
                                {imagen && <p className="text-xs text-green-600 font-bold mt-2">Imagen seleccionada: {imagen.name}</p>}
                            </div>
                        </div>

                        {/* SECCIÓN 1: Datos Principales */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-4 border-b pb-2">Información del Producto</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Nombre del Artículo</label>
                                    <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} placeholder="Ej: Camiseta Titular Kombat" className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Categoría</label>
                                    <select name="categoria" value={formData.categoria} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none font-bold">
                                        <option value="Indumentaria">Indumentaria</option>
                                        <option value="Accesorios">Accesorios</option>
                                        <option value="Entrenamiento">Entrenamiento</option>
                                        <option value="Salida">Salida</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Precio ($)</label>
                                    <input type="number" name="precio" required value={formData.precio} onChange={handleChange} placeholder="Ej: 75000" className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none font-bold" />
                                </div>
                                <div className="lg:col-span-2">
                                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Link a la Tienda Oficial</label>
                                    <input type="url" name="linkExterno" required value={formData.linkExterno} onChange={handleChange} placeholder="https://tienda..." className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none font-bold text-sm" />
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN 2: Opciones Adicionales */}
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
                            <button type="submit" disabled={cargando} className="bg-red-700 hover:bg-red-800 text-white font-black px-8 py-3 rounded-lg uppercase tracking-widest flex items-center gap-2 transition-all shadow active:scale-95 disabled:opacity-50">
                                {cargando ? "Guardando y Subiendo Foto..." : <><ShoppingBag className="w-5 h-5" /> Publicar Producto</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NuevoProducto;