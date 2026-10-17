import { useState, useEffect } from "react";
import { ShoppingBag, ExternalLink, Shirt, Tag, Truck } from "lucide-react";
import { obtenerProductos } from "../services/productoService";
import Reveal from "../components/Reveal";
import PageHero from "../components/PageHero";

const Tienda = () => {
    const urlTiendaOficial = "https://marathon.com.ar/collections/casm?filter.v.availability=1";

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const cargarProductosTienda = async () => {
            try {
                const datos = await obtenerProductos();
                const productosActivos = datos.filter(p => p.activo);
                setProductos(productosActivos);
                setCargando(false);
            } catch (error) {
                console.error("Error al cargar los productos en la vidriera:", error);
                setError(true);
                setCargando(false);
            }
        };
        cargarProductosTienda();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pb-0 font-sans">
            
            {/* 1. CABECERA HERO */}
            <PageHero
                img="/images/tiendahero.png"
                alt="Nueva Colección San Martín"
                badge={<><ShoppingBag className="w-4 h-4" />Tienda Oficial</>}
                title="SANTO STORE"
                subtitle="Llevá los colores del Santo a todos lados. Toda la indumentaria oficial, ropa de entrenamiento y accesorios los encontrarás en las páginas web oficiales de Marathon y Kappa."
                height="h-[550px] md:h-[600px]"
                overlay="bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                contentClassName="pt-10 pb-24 md:pb-16"
                titleClassName="text-5xl md:text-7xl"
                subtitleClassName="text-lg md:text-2xl max-w-2xl mb-8 md:mb-10"
                fill="text-gray-50"
            />

            {/* 2. VENTAJAS (Cuadro flotante) */}
            {/* ARREGLO: z-20, -mt-16, overflow-hidden y padding simétrico en los hijos */}
            <Reveal className="bg-white border border-gray-200 shadow-xl relative z-20 -mt-16 md:-mt-20 mx-4 md:mx-auto max-w-5xl rounded-2xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 text-center">
                    <div className="flex flex-col items-center p-8 md:p-10 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                        <Shirt className="w-8 h-8 text-red-700 mb-3" />
                        <span className="font-black text-gray-900 uppercase">100% Original</span>
                        <span className="text-sm text-gray-600 mt-1">Productos Kappa de la mejor calidad</span>
                    </div>
                    <div className="flex flex-col items-center p-8 md:p-10 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                        <Truck className="w-8 h-8 text-red-700 mb-3" />
                        <span className="font-black text-gray-900 uppercase">Envíos a todo el país</span>
                        <span className="text-sm text-gray-600 mt-1">Llegamos a cada rincón de Argentina</span>
                    </div>
                    <div className="flex flex-col items-center p-8 md:p-10 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                        <Tag className="w-8 h-8 text-red-700 mb-3" />
                        <span className="font-black text-gray-900 uppercase">Descuento Socios</span>
                        <span className="text-sm text-gray-600 mt-1">15% off con cuota al día en las sucursales de Santo Store</span>
                    </div>
                </div>
            </Reveal>

            {/* 3. SHOWROOM / DESTACADOS */}
            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
                
                {/* ARREGLO: items-center para celular, md:items-end para PC. Centrado perfecto. */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-12 gap-4 text-center md:text-left">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-wider mb-2">SANTO STORE</h2>
                    </div>
                    <a 
                        href={urlTiendaOficial}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-700 font-bold hover:text-red-800 flex items-center justify-center gap-2 uppercase tracking-widest text-sm md:text-base transition-colors"
                    >
                        Ver todo el catálogo <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                {cargando ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                                <div className="aspect-square bg-gray-200 animate-pulse" />
                                <div className="p-5 space-y-2">
                                    <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-12 text-gray-500 font-bold uppercase tracking-wide border-2 border-dashed border-gray-200 rounded-2xl">
                        No pudimos cargar los productos. Probá recargar la página.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {productos.map((producto) => (
                            <Reveal key={producto._id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group shadow-sm card-santo">
                                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                    <img 
                                        src={producto.imagenUrl} 
                                        alt={producto.nombre}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <a 
                                        href={producto.linkExterno || urlTiendaOficial}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <span className="bg-red-600 text-white font-bold uppercase tracking-widest px-6 py-2 rounded-full text-sm shadow-lg flex items-center gap-2">
                                            Comprar <ExternalLink className="w-4 h-4" />
                                        </span>
                                    </a>
                                </div>
                                <div className="p-5 border-t border-gray-100">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{producto.categoria}</p>
                                    <h3 className="font-black text-gray-900 uppercase mb-2 truncate">{producto.nombre}</h3>
                                    <p className="text-red-700 font-black text-xl">
                                        ${producto.precio.toLocaleString('es-AR')}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                )}

                {!cargando && !error && productos.length === 0 && (
                    <div className="text-center py-12 text-gray-500 font-bold uppercase tracking-wide border-2 border-dashed border-gray-200 rounded-2xl">
                        No hay productos cargados en este momento.
                    </div>
                )}
            </div>

            {/* 4. CTA FINAL */}
            <Reveal className="bg-gray-50 py-16 md:py-24 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-red-700 mx-auto mb-6 md:mb-8" />
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 mb-4 md:mb-6">
                        LAS COMPRAS NO SE REALIZAN EN ESTA PÁGINA
                    </h2>
                    <p className="text-base md:text-xl text-gray-600 font-bold max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
                        En esta página no se realizan compras ni transacciones. Las mismas se realizan a través de la página web de Marathon en la sección de Santo Store o a través de la página oficial de Kappa. Acá solo nos limitamos a mostrar el catálogo.
                    </p>
                    
                    <a 
                        href={urlTiendaOficial}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-red-700 hover:bg-red-800 text-white font-black uppercase tracking-widest text-[11px] sm:text-sm md:text-lg py-4 md:py-6 px-4 md:px-12 rounded-2xl shadow-md transition-all transform hover:-translate-y-1 hover:shadow-xl w-full sm:w-auto"
                    >
                        Ingresar a la Tienda Oficial De Marathon
                        <ExternalLink className="w-5 h-5 shrink-0" />
                    </a>
                </div>
            </Reveal>

        </div>
    );
};

export default Tienda;