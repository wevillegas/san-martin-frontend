import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Star } from "lucide-react";
import { obtenerNoticias } from "../services/noticiaService";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [filtroActivo, setFiltroActivo] = useState("Todas");

    useEffect(() => {
        const cargarNoticias = async () => {
            try {
                const datos = await obtenerNoticias();
                setNoticias(datos);
                setCargando(false);
            } catch (error) {
                console.error("No se pudieron cargar las noticias");
                setCargando(false);
            }
        };
        cargarNoticias();
    }, []);

    if (cargando) {
        return <div className="text-center mt-32 text-xl font-bold text-red-700 min-h-screen">Cargando el portal de noticias...</div>;
    }

    // Agregamos "Destacados" de forma manual a la lista de categorías
    const categoriasUnicas = ["Todas", "Destacados", ...new Set(noticias.map((n) => n.etiqueta))];
    
    // Lógica para filtrar las noticias dependiendo del botón que tocaste
    const noticiasMostradas = 
        filtroActivo === "Todas" 
            ? noticias 
            : filtroActivo === "Destacados"
                ? noticias.filter((n) => n.destacado) // Si tocás "Destacados", filtra por el booleano
                : noticias.filter((n) => n.etiqueta === filtroActivo); // Si tocás otra, filtra por etiqueta

    const imagenPlaceholder = "https://images.unsplash.com/photo-1518605368461-1ee7e53023eb?q=80&w=1000&auto=format&fit=crop";

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
            <section className="bg-red-800 py-12 border-b-4 border-red-900">
                <div className="mx-auto max-w-7xl px-4">
                    <h1 className="text-3xl font-black text-white md:text-5xl uppercase tracking-wider ">
                        Noticias
                    </h1>
                    <p className="mt-3 text-red-100 font-medium text-lg">
                        Toda la actualidad del Club Atlético San Martín
                    </p>
                </div>
            </section>

            <section className="py-10">
                <div className="mx-auto max-w-7xl px-4">
                    
                    {/* BARRA DE FILTROS */}
                    <div className="flex flex-wrap gap-2 border-b border-gray-300 pb-6 mb-8">
                        {categoriasUnicas.map((categoria) => (
                            <button
                                key={categoria}
                                onClick={() => setFiltroActivo(categoria)}
                                className={cn(
                                    "px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2",
                                    filtroActivo === categoria
                                        ? "bg-red-700 text-white shadow-md"
                                        : "bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-700",
                                    // Le damos un toque especial visual si el botón es "Destacados" y está activo
                                    categoria === "Destacados" && filtroActivo === categoria ? "bg-yellow-500 text-yellow-900 border-yellow-500" : ""
                                )}
                            >
                                {/* Si el botón es "Destacados", le metemos la estrellita adentro */}
                                {categoria === "Destacados" && <Star className={cn("w-4 h-4", filtroActivo === categoria ? "fill-yellow-900" : "text-gray-400")} />}
                                {categoria}
                            </button>
                        ))}
                    </div>

                    {noticiasMostradas.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 font-medium text-lg">
                            No hay noticias publicadas en esta categoría.
                        </div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {noticiasMostradas.map((noticia) => (
                                <Link key={noticia._id} to={`/noticias/${noticia._id}`} className="group flex flex-col h-full relative">
                                    <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col">
                                        
                                        {/* CARTELITO DE DESTACADO */}
                                        {noticia.destacado && (
                                            <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                                <Star className="w-3 h-3 fill-yellow-900" />
                                                Destacado
                                            </div>
                                        )}

                                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                            <img
                                                src={noticia.imagenUrl ? `${noticia.imagenUrl}?t=${new Date().getTime()}` : imagenPlaceholder}
                                                alt={noticia.titulo}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                                    {noticia.etiqueta}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">
                                                <Calendar className="h-4 w-4 text-red-600" />
                                                <span>{new Date(noticia.createdAt).toLocaleDateString('es-AR')}</span>
                                            </div>

                                            <h3 className="text-xl font-black text-gray-900 leading-tight mb-3 group-hover:text-red-700 transition-colors">
                                                {noticia.titulo}
                                            </h3>

                                            <p className="line-clamp-3 text-gray-600 mb-6 flex-1">
                                                {noticia.resumen || noticia.cuerpo}
                                            </p>

                                            <div className="mt-auto flex items-center gap-2 text-red-600 font-bold uppercase text-sm tracking-wider">
                                                Leer Nota Completa
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Noticias;