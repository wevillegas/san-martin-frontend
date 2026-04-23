import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { obtenerNoticiaPorId } from "../services/noticiaService";

const NoticiaDetalle = () => {
    // useParams extrae el ":id" que vamos a configurar en la ruta
    const { id } = useParams();

    const [noticia, setNoticia] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const cargarNoticia = async () => {
            try {
                const datos = await obtenerNoticiaPorId(id);
                setNoticia(datos);
                setCargando(false);
            } catch (err) {
                console.error("Error al cargar la nota");
                setError(true);
                setCargando(false);
            }
        };
        cargarNoticia();
    }, [id]);

    if (cargando) return <div className="text-center mt-32 text-xl font-bold text-red-700">Cargando nota...</div>;
    if (error || !noticia) return <div className="text-center mt-32 text-xl text-gray-500">No se encontró la noticia.</div>;

    // Imagen genérica hasta que tengas imágenes reales
    const imagenPlaceholder = "https://images.unsplash.com/photo-1518605368461-1ee7e53023eb?q=80&w=2000&auto=format&fit=crop";

    return (
        <article className="min-h-screen bg-white pb-20">
            {/* Cabecera con Imagen */}
            <div className="relative w-full h-[400px] md:h-[500px]">
                <img
                    src={imagenPlaceholder}
                    alt={noticia.titulo}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute bottom-0 w-full">
                    <div className="max-w-4xl mx-auto px-4 pb-12">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-semibold uppercase tracking-wider"
                        >
                            <ArrowLeft className="w-4 h-4" /> Volver al inicio
                        </Link>

                        <br />
                        <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                            {noticia.etiqueta}
                        </span>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight text-balance">
                            {noticia.titulo}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Cuerpo de la noticia */}
            <div className="max-w-4xl mx-auto px-4 mt-8 md:mt-12">
                {/* Metadatos (Autor y Fecha) */}
                <div className="flex flex-wrap items-center gap-6 py-6 border-y border-gray-100 mb-10 text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-red-600" />
                        <span>Por <strong className="text-gray-900">{noticia.autor}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-red-600" />
                        <span>{new Date(noticia.createdAt).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>

                {/* Texto principal */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed mb-8">
                        {/* Si tuviéramos un resumen, iría acá. Por ahora usamos la primera parte del cuerpo como "bajada" */}
                        {noticia.cuerpo.substring(0, 150)}...
                    </p>
                    <p className="whitespace-pre-line">
                        {noticia.cuerpo}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default NoticiaDetalle;