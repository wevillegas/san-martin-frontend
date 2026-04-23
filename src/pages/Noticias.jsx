import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
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

                // Ordenamos las noticias de más nueva a más vieja usando la fecha de creación
                const noticiasOrdenadas = datos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setNoticias(noticiasOrdenadas);
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

    // Extraemos las categorías (etiquetas) únicas de la base de datos para armar los botones
    const categoriasUnicas = ["Todas", ...new Set(noticias.map((n) => n.etiqueta))];

    // Filtramos las noticias según el botón que el usuario haya tocado
    const noticiasMostradas = filtroActivo === "Todas"
        ? noticias
        : noticias.filter((n) => n.etiqueta === filtroActivo);

    const imagenPlaceholder = "https://images.unsplash.com/photo-1518605368461-1ee7e53023eb?q=80&w=1000&auto=format&fit=crop";

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pb-20">

            {/* Cabecera de la página */}
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

                    {/* Barra de Filtros (Categorías) */}
                    <div className="flex flex-wrap gap-2 border-b border-gray-300 pb-6 mb-8">
                        {categoriasUnicas.map((categoria) => (
                            <button
                                key={categoria}
                                onClick={() => setFiltroActivo(categoria)}
                                className={cn(
                                    "px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all",
                                    filtroActivo === categoria
                                        ? "bg-red-700 text-white shadow-md"
                                        : "bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-700"
                                )}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>

                    {/* Grilla de Noticias */}
                    {noticiasMostradas.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 font-medium text-lg">
                            No hay noticias publicadas en esta categoría.
                        </div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {noticiasMostradas.map((noticia) => (
                                <Link key={noticia._id} to={`/noticias/${noticia._id}`} className="group flex flex-col h-full">
                                    <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col">

                                        {/* Imagen */}
                                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                            <img
                                                src={imagenPlaceholder}
                                                alt={noticia.titulo}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {/* Etiqueta flotante */}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                                    {noticia.etiqueta}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Contenido */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">
                                                <Calendar className="h-4 w-4 text-red-600" />
                                                <span>{new Date(noticia.createdAt).toLocaleDateString('es-AR')}</span>
                                            </div>

                                            <h3 className="text-xl font-black text-gray-900 leading-tight mb-3 group-hover:text-red-700 transition-colors">
                                                {noticia.titulo}
                                            </h3>

                                            <p className="line-clamp-3 text-gray-600 mb-6 flex-1">
                                                {noticia.cuerpo}
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