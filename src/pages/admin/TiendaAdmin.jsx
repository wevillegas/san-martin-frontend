import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { obtenerProductos, eliminarProducto } from "../../services/productoService";

const TiendaAdmin = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const datos = await obtenerProductos();
            setProductos(datos);
            setCargando(false);
        } catch (error) {
            console.error("Error al cargar los productos", error);
            setCargando(false);
        }
    };

    const handleBorrar = async (id) => {
        if (window.confirm("¿Estás seguro de que querés borrar este producto de la tienda? Esta acción no se puede deshacer.")) {
            try {
                await eliminarProducto(id);
                cargarProductos(); // Recargamos la tabla
            } catch (error) {
                console.error("Error al borrar", error);
                alert("Hubo un error al intentar borrar el producto.");
            }
        }
    };

    if (cargando) return <div className="text-center mt-20 font-bold text-red-700">Cargando panel de la tienda...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">

                {/* Cabecera */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <Link to="/admin" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Volver al Dashboard principal
                        </Link>
                        <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider flex items-center gap-3">
                            <ShoppingBag className="w-8 h-8 text-red-700" />
                            Gestión de Tienda
                        </h1>
                    </div>

                    <Link
                        to="/admin/tienda/nuevo"
                        className="flex items-center justify-center gap-2 bg-red-700 text-white px-6 py-3 rounded-md font-bold hover:bg-red-800 transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Producto
                    </Link>
                </div>

                {/* Tabla de Productos */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                                    <th className="p-4 font-bold">Imagen</th>
                                    <th className="p-4 font-bold">Producto</th>
                                    <th className="p-4 font-bold">Categoría</th>
                                    <th className="p-4 font-bold">Precio</th>
                                    <th className="p-4 font-bold text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {productos.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-500">No hay productos publicados aún.</td>
                                    </tr>
                                ) : (
                                    productos.map((producto) => (
                                        <tr key={producto._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                                                    <img src={producto.imagenUrl} alt={producto.nombre} className="w-full h-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <p className="font-bold text-gray-800">{producto.nombre}</p>
                                                <div className="flex gap-2 mt-1">
                                                    {producto.destacado && <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">Destacado</span>}
                                                    {!producto.activo && <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">Oculto</span>}
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm font-medium text-gray-600">
                                                {producto.categoria}
                                            </td>
                                            <td className="p-4 font-black text-red-700">
                                                ${producto.precio.toLocaleString('es-AR')}
                                            </td>
                                            <td className="p-4 flex items-center justify-center gap-3">
                                                {/* El link a editar lo dejamos preparado para cuando armes EditarProducto.jsx */}
                                                <Link
                                                    to={`/admin/tienda/editar/${producto._id}`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleBorrar(producto._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                    title="Borrar"
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
        </div>
    );
};

export default TiendaAdmin;