import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight, ExternalLink } from "lucide-react";
import { obtenerProductos } from "../services/productoService";

const TiendaPreview = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        const cargarDestacados = async () => {
            try {
                const datos = await obtenerProductos();
                // Filtramos para traer SOLAMENTE los que tienen el tilde de destacado
                const destacados = datos.filter(p => p.activo && p.destacado);
                setProductos(destacados);
                setCargando(false);
            } catch (error) {
                console.error("Error al cargar productos destacados en la Home");
                setCargando(false);
            }
        };
        cargarDestacados();
    }, []);

    // Si está cargando o no hay productos destacados, el componente se oculta de forma silenciosa
    if (cargando || productos.length === 0) return null;

    const urlTiendaOficial = "https://tienda.clubatleticosanmartin.com.ar";

    return (
        <section className="bg-white py-16 overflow-hidden border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-4">

                <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 md:text-4xl uppercase tracking-wider">
                            Santo Store
                        </h2>
                        <p className="mt-2 text-gray-500 font-medium text-lg">
                            Descubrí los artículos destacados de la nueva temporada
                        </p>
                    </div>
                    <Link
                        to="/tienda"
                        className="flex items-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2.5 rounded-md transition-colors font-bold uppercase tracking-wider text-sm"
                    >
                        Ver Showroom Completo
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="relative group">
                    <div className="overflow-hidden rounded-xl" ref={emblaRef}>
                        <div className="flex gap-4 touch-pan-y">
                            {productos.map((producto) => (
                                <div key={producto._id} className="relative min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_23%]">

                                    <a
                                        href={producto.linkExterno || urlTiendaOficial}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block h-full group/card w-full text-left"
                                    >
                                        {/* Tarjeta con altura adaptada para indumentaria */}
                                        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition-all hover:shadow-xl">
                                            <img
                                                src={producto.imagenUrl}
                                                alt={producto.nombre}
                                                className="w-full h-full object-cover transition-all duration-500 group-hover/card:scale-105"
                                            />
                                            {/* Degradado oscuro para que el texto resalte */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black/20 to-transparent opacity-90" />

                                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                                <p className="text-xs font-bold text-gray-300 mb-1 uppercase tracking-widest">{producto.categoria}</p>
                                                <h3 className="text-lg font-black text-white uppercase tracking-wide leading-tight mb-2">
                                                    {producto.nombre}
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <p className="font-black text-red-400 text-xl">
                                                        ${producto.precio.toLocaleString('es-AR')}
                                                    </p>
                                                    <span className="text-white opacity-0 group-hover/card:opacity-100 transition-opacity transform translate-x-[-10px] group-hover/card:translate-x-0 duration-300">
                                                        <ExternalLink className="w-5 h-5" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={scrollPrev}
                        className="absolute -left-6 md:-left-16 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-red-700 shadow-2xl opacity-0 transition-all duration-300 hover:scale-110 hover:bg-gray-100 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0 hidden md:flex z-10 border border-gray-200"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="h-7 w-7 pr-1" />
                    </button>

                    <button
                        onClick={scrollNext}
                        className="absolute -right-6 md:-right-16 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-red-700 shadow-2xl opacity-0 transition-all duration-300 hover:scale-110 hover:bg-gray-100 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0 hidden md:flex z-10 border border-gray-200"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="h-7 w-7 pl-1" />
                    </button>

                </div>
            </div>
        </section>
    );
};

export default TiendaPreview;