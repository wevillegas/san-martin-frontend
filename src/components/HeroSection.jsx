import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Función utilitaria para manejar clases de Tailwind
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// 3 Imágenes espectaculares de relleno
const imagenesPlaceholder = [
    "https://images.unsplash.com/photo-1518605368461-1ee7e53023eb?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2000&auto=format&fit=crop"
];

const HeroSection = ({ noticiasHero }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Si no llegaron noticias, no dibujamos nada
    if (!noticiasHero || noticiasHero.length === 0) return null;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % noticiasHero.length);
        }, 6000); // Cambia cada 6 segundos
        return () => clearInterval(timer);
    }, [noticiasHero.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % noticiasHero.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + noticiasHero.length) % noticiasHero.length);

    return (
        <section className="relative h-[500px] overflow-hidden bg-gray-900 md:h-[600px] lg:h-[650px] mt-0">
            {/* Slides */}
            {noticiasHero.map((noticia, index) => (
                <div
                    key={noticia._id}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-700",
                        index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                >
                    {/* Imagen de Fondo y Sombra */}
                    <div className="absolute inset-0">
                        <img
                            src={imagenesPlaceholder[index % imagenesPlaceholder.length]}
                            alt={noticia.titulo}
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                    </div>

                    {/* Contenido (Textos) */}
                    <div className="relative flex h-full items-center">
                        <div className="mx-auto w-full max-w-7xl px-4">
                            <div className="max-w-xl">

                                <div className="mb-4 flex items-center gap-2 text-sm text-gray-300 font-medium">
                                    <Calendar className="h-4 w-4 text-red-500" />
                                    <span>{new Date(noticia.createdAt).toLocaleDateString('es-AR')}</span>
                                </div>

                                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-red-500 md:text-base">
                                    {noticia.etiqueta}
                                </p>

                                <h1 className="mb-4 text-balance text-4xl font-black text-white md:text-5xl lg:text-6xl leading-tight">
                                    {noticia.titulo}
                                </h1>

                                <p className="mb-8 text-pretty text-base text-gray-300 md:text-lg line-clamp-3">
                                    {noticia.cuerpo}
                                </p>

                                <Link
                                    to={`/noticias/${noticia._id}`}
                                    className="inline-flex items-center justify-center rounded-md text-sm font-bold uppercase tracking-wider transition-colors bg-red-600 text-white hover:bg-red-700 h-12 px-8 shadow-lg shadow-red-900/50"
                                >
                                    Leer Nota
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Flechas de Navegación */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-red-600 border border-white/10" aria-label="Anterior">
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-red-600 border border-white/10" aria-label="Siguiente">
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Puntos Inferiores */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
                {noticiasHero.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            index === currentSlide ? "w-10 bg-red-600" : "w-2 bg-white/50 hover:bg-white/80"
                        )}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;