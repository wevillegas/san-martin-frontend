import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { obtenerJugadores } from "../services/jugadorService";
import PlayerCard from "./PlayerCard";

const getPesoPosicion = (posicion) => {
    const pos = posicion.toLowerCase();
    if (pos.includes("arquero")) return 1;
    if (pos.includes("defensor") || pos.includes("defensa")) return 2;
    if (pos.includes("medio") || pos.includes("volante")) return 3;
    if (pos.includes("delantero") || pos.includes("ataque")) return 4;
    return 5;
};

// AHORA RECIBE LA FUNCIÓN POR PROPS
const SquadPreview = ({ onSelectPlayer }) => {
    const [jugadores, setJugadores] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        const cargarPlantel = async () => {
            try {
                const datos = await obtenerJugadores();
                const jugadoresOrdenados = datos.sort((a, b) => {
                    return getPesoPosicion(a.posicion) - getPesoPosicion(b.posicion);
                });
                setJugadores(jugadoresOrdenados);
                setCargando(false);
            } catch (error) {
                console.error("Error al cargar el plantel para el inicio", error);
                setCargando(false);
            }
        };
        cargarPlantel();
    }, []);

    if (cargando || jugadores.length === 0) return null;

    return (
        <section className="bg-red-800 py-16 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4">

                <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
                    <div className="w-full text-center md:w-auto md:text-left">
                        <h2 className="text-3xl font-black text-white md:text-4xl uppercase tracking-wider">
                            Nuestro Plantel
                        </h2>
                        <p className="mt-2 text-red-100 font-medium text-lg">
                            Conocé a los jugadores de San Martín para la actual temporada.
                        </p>
                    </div>
                    <Link
                        to="/plantel"
                        className="flex items-center gap-2 bg-white text-red-700 hover:bg-red-50 px-5 py-2.5 rounded-md transition-colors font-bold uppercase tracking-wider text-sm shadow-md"
                    >
                        Ver plantel completo
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* EL ARREGLO ESTÁ ACÁ: Agregamos md:px-14 para crear el pasillo de las flechas */}
                <div className="relative group md:px-14">
                    <div className="overflow-hidden rounded-xl py-3" ref={emblaRef}>
                        <div className="flex gap-4 touch-pan-y">
                            {jugadores.map((player) => (
                                <div key={player._id} className="relative min-w-0 flex-[0_0_60%] min-[480px]:flex-[0_0_45%] sm:flex-[0_0_38%] md:flex-[0_0_30%] lg:flex-[0_0_23%]">

                                    <PlayerCard player={player} onSelectPlayer={onSelectPlayer} />

                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FLECHAS CORREGIDAS: left-0 / right-0 para ubicarse en el pasillo, y hidden md:flex para que desaparezcan en móvil */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-red-700 shadow-2xl opacity-0 transition-all duration-300 hover:scale-110 hover:bg-gray-100 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0 hidden md:flex z-10 border border-gray-200"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="h-7 w-7 pr-1" />
                    </button>

                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-red-700 shadow-2xl opacity-0 transition-all duration-300 hover:scale-110 hover:bg-gray-100 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0 hidden md:flex z-10 border border-gray-200"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="h-7 w-7 pl-1" />
                    </button>

                </div>
            </div>
        </section>
    );
};

export default SquadPreview;