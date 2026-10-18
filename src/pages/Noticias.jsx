import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Star } from "lucide-react";
import { obtenerNoticias } from "../services/noticiaService";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import Reveal from "../components/Reveal";
import EscudosFondo from "../components/EscudosFondo";
import { imagenPlaceholder } from "../constants/placeholders";

import PageBanner from "../components/PageBanner";
import { usePagina } from "../hooks/usePagina";
import { usePaginacion } from "../hooks/usePaginacion";
import Paginacion from "../components/Paginacion";

const POR_PAGINA = 9; // 3 filas de 3
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Noticias = () => {
    usePagina({"titulo": "Noticias", "descripcion": "Toda la actualidad del Club Atlético San Martín de Tucumán: primer equipo, institucionales, juveniles y más."});
    const [noticias, setNoticias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [filtroActivo, setFiltroActivo] = useState("Todas");

    useEffect(() => {
        const cargarNoticias = async () => {
            try {
                const datos = await obtenerNoticias();
                setNoticias(datos);
                setCargando(false);
            } catch (error) {
                console.error("No se pudieron cargar las noticias", error);
                setError(true);
                setCargando(false);
            }
        };
        cargarNoticias();
    }, []);

    // Agregamos "Destacados" de forma manual a la lista de categorías
    const categoriasUnicas = ["Todas", "Destacados", ...new Set(noticias.map((n) => n.etiqueta))];
    
    // Lógica para filtrar las noticias dependiendo del botón que tocaste
    const noticiasMostradas = 
        filtroActivo === "Todas" 
            ? noticias 
            : filtroActivo === "Destacados"
                ? noticias.filter((n) => n.destacado) // Si tocás "Destacados", filtra por el booleano
                : noticias.filter((n) => n.etiqueta === filtroActivo); // Si tocás otra, filtra por etiqueta

    const { filas, paginacion } = usePaginacion(noticiasMostradas, [filtroActivo], POR_PAGINA);

    if (cargando) return <Loader texto="Cargando el portal de noticias..." />;
    if (error) return <ErrorState texto="No pudimos cargar las noticias. Probá recargar la página." />;

    return (
        <div className="relative flex flex-col min-h-screen bg-gray-50 pb-20 isolate">
            <EscudosFondo cantidad={18} />
            <PageBanner
                title="Noticias"
                subtitle="Toda la actualidad del Club Atlético San Martín"
            />

            <section className="py-10">
                <div className="mx-auto max-w-7xl px-4">
                    
                    {/* BARRA DE FILTROS */}
                    <div id="lista-noticias" className="flex flex-wrap gap-2 scroll-mt-24 border-b border-gray-300 pb-6 mb-8">
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
                            {filas.map((noticia) => (
                                <Reveal key={noticia._id}>
                                <Link to={`/noticias/${noticia._id}`} className="group flex flex-col h-full relative">
                                    <div className="flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white card-santo flex flex-col">
                                        
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
                                </Reveal>
                            ))}
                        </div>
                    )}

                    <Paginacion {...paginacion} onCambio={(p) => { paginacion.onCambio(p); document.getElementById("lista-noticias")?.scrollIntoView({ behavior: "smooth" }); }} />
                </div>
            </section>
        </div>
    );
};

export default Noticias;