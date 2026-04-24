import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { obtenerJugadores } from "../services/jugadorService";

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
                console.error("Error al cargar el plantel para el inicio");
                setCargando(false);
            }
        };
        cargarPlantel();
    }, []);

    if (cargando || jugadores.length === 0) return null;

    const imagenPlaceholder = "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=800&auto=format&fit=crop";

    return (
        <section className="bg-red-700 py-16 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4">

                <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h2 className="text-3xl font-black text-white md:text-4xl uppercase tracking-wider">
                            Nuestro Plantel
                        </h2>
                        <p className="mt-2 text-red-100 font-medium text-lg">
                            Conocé a los jugadores del Santo
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

                <div className="relative group">
                    <div className="overflow-hidden rounded-xl" ref={emblaRef}>
                        <div className="flex gap-4 touch-pan-y">
                            {jugadores.map((player) => (
                                <div key={player._id} className="relative min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_23%]">

                                    {/* ACÁ ESTÁ LA MAGIA: Cambiamos Link por button */}
                                    <button
                                        onClick={() => onSelectPlayer(player)}
                                        className="block h-full group/card w-full text-left"
                                    >
                                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-red-500 bg-red-800 transition-all hover:shadow-2xl">
                                            <img
                                                src={imagenPlaceholder}
                                                alt={`${player.nombre} ${player.apellido}`}
                                                className="w-full h-full object-cover grayscale opacity-80 transition-all duration-500 group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-black/20 to-transparent" />

                                            <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-lg font-black text-white shadow-lg border-2 border-red-400">
                                                {player.numeroCamiseta || "-"}
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                                <p className="text-xs font-bold text-red-300 mb-1 uppercase tracking-widest">{player.posicion}</p>
                                                <h3 className="text-xl font-black text-white uppercase tracking-wide leading-none">
                                                    {player.nombre} <br /> {player.apellido}
                                                </h3>
                                            </div>
                                        </div>
                                    </button>

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

export default SquadPreview;