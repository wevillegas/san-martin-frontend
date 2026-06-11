// src/components/WidgetFixture.jsx
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, MapPin, Trophy, Clock, ShieldCheck } from "lucide-react";

// COMPONENTE INTERNO: Escudo con Fallback inteligente y LIMPIO
const Escudo = ({ src, alt, esSanMartin }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <div className="w-12 h-12 flex items-center justify-center relative drop-shadow-md">
            <img
                src={src}
                alt={alt}
                className={`absolute w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                    setImageError(true);
                    setImageLoaded(false);
                }}
            />
            {imageError && (
                <ShieldCheck className={`absolute w-full h-full p-1 bg-gray-50 rounded-full ${esSanMartin ? 'text-red-700' : 'text-gray-800'}`} />
            )}
            {!imageLoaded && !imageError && (
                <div className="absolute w-full h-full bg-red-950/20 rounded-full animate-pulse-slow"></div>
            )}
        </div>
    );
};

const WidgetFixture = () => {
    const [partidos, setPartidos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        const obtenerFixture = async () => {
            try {
                const respuesta = await fetch("http://localhost:5000/api/fixture");
                if (respuesta.ok) {
                    const data = await respuesta.json();
                    setPartidos(data);
                }
            } catch (error) {
                console.error("Error al cargar el fixture en la Home:", error);
            } finally {
                setCargando(false);
            }
        };
        obtenerFixture();
    }, []);

    useEffect(() => {
        if (emblaApi && partidos.length > 0) {
            const indexProximo = partidos.findIndex(p => p.estado !== 'post');
            if (indexProximo !== -1) {
                emblaApi.scrollTo(indexProximo);
            }
        }
    }, [emblaApi, partidos]);

    if (cargando || partidos.length === 0) return null;

    return (
        <section className="bg-white py-16 overflow-hidden border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-4">

                <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 md:text-4xl uppercase tracking-wider">
                            Fixture Oficial
                        </h2>
                        <p className="mt-2 text-gray-500 font-medium text-lg">
                            Repasá el calendario completo de la Primera Nacional
                        </p>
                    </div>
                    <Link
                        to="/fixture"
                        className="flex items-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2.5 rounded-md transition-colors font-bold uppercase tracking-wider text-sm"
                    >
                        Ver Calendario Completo
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* ACÁ ESTÁ LA MAGIA APLICADA: md:px-14 para crear el pasillo lateral */}
                <div className="relative group md:px-14">
                    <div className="overflow-hidden rounded-xl" ref={emblaRef}>
                        <div className="flex gap-4 touch-pan-y">
                            {partidos.map((partido, index) => {
                                const esProximo = partido.estado !== 'post' && (index === 0 || partidos[index - 1].estado === 'post');

                                return (
                                    <div key={partido.id} className="relative min-w-0 flex-[0_0_90%] sm:flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_30%]">

                                        <div className={`h-full flex flex-col bg-gradient-to-br from-red-900 to-red-950 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl overflow-hidden border
                                            ${esProximo ? 'border-red-500 shadow-xl' : 'border-red-800'}`}>

                                            <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-red-700/20 rounded-full blur-3xl" />

                                            <div className="relative z-10 flex justify-between items-center mb-5 border-b border-white/10 pb-3 font-bold uppercase tracking-widest text-[10px]">
                                                <div className="flex items-center gap-1.5 text-white">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {partido.fecha}
                                                </div>

                                                {partido.estado === 'post' ? (
                                                    <span className="text-white flex items-center gap-1">
                                                        {partido.descripcionEstado}
                                                    </span>
                                                ) : esProximo ? (
                                                    <span className="text-white bg-red-600 px-2.5 py-1 rounded-sm flex items-center gap-1 animate-pulse border border-red-500 shadow-sm">
                                                        <Clock className="w-3 h-3" /> PRÓXIMO PARTIDO
                                                    </span>
                                                ) : (
                                                    <span className="text-red-400 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {partido.descripcionEstado}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="relative z-10 flex-grow flex items-center justify-between gap-3 my-3">

                                                <div className="flex flex-col items-center w-2/5 text-center gap-2">
                                                    <Escudo src={partido.local.escudoUrl} alt={partido.local.nombre} esSanMartin={partido.local.esSanMartin} />
                                                    <p className={`font-black text-xs md:text-sm tracking-tight leading-tight line-clamp-2 ${partido.local.esSanMartin ? 'text-white' : 'text-white'}`}>
                                                        {partido.local.nombre}
                                                    </p>
                                                </div>

                                                <div className="bg-white text-gray-950 font-black text-xl md:text-2xl px-4 py-2 rounded-xl min-w-[5rem] text-center tracking-widest shadow-inner border border-red-800/40">
                                                    {partido.local.goles}<span className="text-red-600 mx-1">:</span>{partido.visitante.goles}
                                                </div>

                                                <div className="flex flex-col items-center w-2/5 text-center gap-2">
                                                    <Escudo src={partido.visitante.escudoUrl} alt={partido.visitante.nombre} esSanMartin={partido.visitante.esSanMartin} />
                                                    <p className={`font-black text-xs md:text-sm tracking-tight leading-tight line-clamp-2 ${partido.visitante.esSanMartin ? 'text-white' : 'text-white'}`}>
                                                        {partido.visitante.nombre}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="relative z-10 mt-5 pt-3 border-t border-white/10 flex justify-center">
                                                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                                                    <MapPin className="w-3.5 h-3.5 text-white" />
                                                    {partido.local.esSanMartin ? 'La Ciudadela' : 'Visitante'}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* FLECHAS CON LA LÓGICA CORRECTA: left-0 y right-0 combinadas con el padding superior */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-red-700 shadow-xl opacity-0 transition-all duration-300 hover:scale-110 hover:bg-gray-50 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0 hidden md:flex z-10 border border-gray-200"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="h-7 w-7 pr-1" />
                    </button>

                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-red-700 shadow-xl opacity-0 transition-all duration-300 hover:scale-110 hover:bg-gray-50 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0 hidden md:flex z-10 border border-gray-200"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="h-7 w-7 pl-1" />
                    </button>

                </div>
            </div>
        </section>
    );
};

export default WidgetFixture;