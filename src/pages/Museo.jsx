import { Trophy, Shirt, Clock, MapPin, Ticket, Award, History } from "lucide-react";
import Reveal from "../components/Reveal";
import { RELIQUIAS } from "../data/museo";
import { useDatosClub } from "../data/club";
import PageHero from "../components/PageHero";
import { usePagina } from "../hooks/usePagina";

const ICONOS = {
    trofeo: <Trophy className="w-5 h-5 md:w-6 md:h-6 text-red-700" />,
    camiseta: <Shirt className="w-5 h-5 md:w-6 md:h-6 text-red-700" />,
    premio: <Award className="w-5 h-5 md:w-6 md:h-6 text-red-700" />,
};

const Museo = () => {
    usePagina({"titulo": "Museo Juan Carlos Carol", "descripcion": "El museo del Club Atlético San Martín de Tucumán: reliquias, horarios y cómo visitarlo."});
    const { horariosMuseo } = useDatosClub();
    // Imágenes (Cargalas en public/images/ con estos nombres)
    const imgHero = "/images/museo-hero.jpg"; 
    const imgInterior = "/images/museo-interior.jpg";

    const reliquias = RELIQUIAS.map((r) => ({ ...r, icono: ICONOS[r.icono] }));

    return (
        <div className="min-h-screen font-sans bg-white">
            
            {/* =========================================
                SECCIÓN 1: CABECERA HERO UNIFICADA
            ========================================== */}
            <PageHero
                img={imgHero}
                alt="Museo Juan Carlos Carol"
                badge="Nuestra Memoria"
                title={<>Museo <br className="md:hidden" /> Juan Carlos Carol</>}
                subtitle="Un paseo por nuestra historia"
            />

            {/* =========================================
                TARJETAS FLOTANTES (Margen Negativo)
            ========================================== */}
            <Reveal className="relative z-20 max-w-5xl mx-auto px-4 w-full -mt-20 md:-mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6 flex items-center gap-4 border-b-4 border-red-700 card-santo">
                        <div className="bg-red-100 p-3 rounded-lg text-red-700 shrink-0">
                            <Ticket className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">Entrada</p>
                            <p className="text-lg md:text-2xl font-black text-gray-900 font-titulo">Libre y gratuita</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6 flex items-center gap-4 border-b-4 border-red-700 card-santo">
                        <div className="bg-red-100 p-3 rounded-lg text-red-700 shrink-0">
                            <Clock className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">Horarios</p>
                            <p className="text-lg md:text-2xl font-black text-gray-900 font-titulo">{horariosMuseo.resumen}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6 flex items-center gap-4 border-b-4 border-red-700 card-santo">
                        <div className="bg-red-100 p-3 rounded-lg text-red-700 shrink-0">
                            <Trophy className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">Reliquia estrella</p>
                            <p className="text-lg md:text-2xl font-black text-gray-900 font-titulo">Copa 1944</p>
                        </div>
                    </div>
                </div>
            </Reveal>

            {/* =========================================
                SECCIÓN 2: INTRODUCCIÓN (Mismo estilo que Estadio)
            ========================================== */}
            <div className="bg-white pt-16 md:pt-32 pb-16 md:pb-24 border-b border-gray-100 w-full">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    
                    <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start w-full">
                        
                        {/* Columna de Texto */}
                        <div className="order-2 lg:order-1 w-full min-w-0">
                            <div className="flex items-center gap-3 mb-4">
                                <History className="w-6 h-6 md:w-8 md:h-8 text-red-700 shrink-0" />
                                {/* Título responsivo igual que "Soy de Ciudadela" */}
                                <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-wide break-words">
                                    El Guardián de la Historia
                                </h2>
                            </div>
                            <div className="w-16 md:w-20 h-1.5 bg-red-600 rounded-full mb-6 md:mb-8"></div>
                            
                            {/* Textos reducidos a 15px en móvil, 18px en PC (Estándar Estadio) */}
                            <p className="text-gray-600 leading-relaxed mb-6 text-[15px] md:text-lg font-medium break-words">
                                Inaugurado para honrar a nuestras glorias, el Museo Juan Carlos Carol es un viaje en el tiempo al corazón del Pueblo Ciruja.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-[15px] md:text-lg font-medium break-words">
                                No es solo una sala de trofeos; es un santuario donde las reliquias cobran vida. Desde documentos fundacionales de 1909 hasta la indumentaria de los ascensos más épicos, este espacio está diseñado para que cada hincha se reencuentre con su identidad.
                            </p>
                        </div>

                        {/* Columna de Imagen */}
                        <div className="flex flex-col gap-3 order-1 lg:order-2 w-full min-w-0">
                            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg foto-zoom border border-gray-200 bg-gray-100">
                                <img 
                                    src={imgInterior || "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=1000&auto=format&fit=crop"} 
                                    alt="Interior del Museo" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                    </Reveal>
                </div>
            </div>

            {/* =========================================
                SECCIÓN 3: RELIQUIAS DESTACADAS (Fondo Rojo)
            ========================================== */}
            <div className="bg-red-800 py-16 md:py-24 w-full">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    <Reveal className="text-center mb-10 md:mb-16 text-white w-full">
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-4">Tesoros Invaluables</h2>
                        <div className="w-20 md:w-24 h-1.5 bg-white mx-auto rounded-full mb-4"></div>
                        <p className="text-red-100 font-medium text-sm md:text-base">Algunas de las piezas de nuestra exhibición.</p>
                    </Reveal>

                    {/* Espaciado responsivo para las tarjetas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                        {reliquias.map((item, index) => (
                            <Reveal key={index} className="bg-white rounded-2xl overflow-hidden shadow-xl card-santo foto-zoom flex flex-col min-w-0 w-full">
                                {/* Altura de la imagen responsiva */}
                                <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative bg-gray-100 border-b border-gray-100 w-full shrink-0">
                                    <img 
                                        src={item.imagen || "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=1000&auto=format&fit=crop"} 
                                        alt={item.titulo}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-grow min-w-0">
                                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                        <div className="bg-red-50 p-2 rounded-lg shrink-0">
                                            {item.icono}
                                        </div>
                                        {/* Título más responsivo para evitar que desborde */}
                                        <h3 className="text-lg md:text-xl font-black uppercase text-gray-900 break-words leading-tight">
                                            {item.titulo}
                                        </h3>
                                    </div>
                                    {/* Texto descriptivo ajustado para móvil */}
                                    <p className="text-gray-600 text-[14px] md:text-base leading-relaxed break-words">
                                        {item.descripcion}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* =========================================
                SECCIÓN 4: INFORMACIÓN DE VISITA
            ========================================== */}
            <div className="bg-white py-16 md:py-24 border-t border-gray-100 w-full">
                <div className="max-w-6xl mx-auto px-4 text-center w-full">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-wider mb-4">Vení a conocer el museo</h2>
                    <div className="w-20 md:w-24 h-1.5 bg-red-600 mx-auto rounded-full mb-10 md:mb-12"></div>

                    <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                        <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md card-santo">
                            <Clock className="w-8 h-8 md:w-10 md:h-10 text-red-700 mb-3 md:mb-4 shrink-0" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-2 md:mb-3">Horarios</h3>
                            {horariosMuseo.lineas.map((linea) => (
                                <p key={linea} className="text-base md:text-lg font-black text-gray-900 leading-tight mb-1">{linea}</p>
                            ))}
                            {horariosMuseo.aviso && <p className="text-red-700 font-bold mt-2 text-[13px] md:text-sm">{horariosMuseo.aviso}</p>}
                        </div>
                        
                        <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md card-santo">
                            <MapPin className="w-8 h-8 md:w-10 md:h-10 text-red-700 mb-3 md:mb-4 shrink-0" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-2 md:mb-3">Ubicación</h3>
                            <p className="text-base md:text-lg font-black text-gray-900 leading-tight">Estadio La Ciudadela</p>
                            <p className="text-red-700 font-bold mt-2 text-[13px] md:text-sm leading-tight">Ingreso principal por zona de plateas (Calle Bolívar)</p>
                        </div>
                        
                        <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md sm:col-span-2 lg:col-span-1 card-santo">
                            <Ticket className="w-8 h-8 md:w-10 md:h-10 text-red-700 mb-3 md:mb-4 shrink-0" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-2 md:mb-3">Entrada</h3>
                            <p className="text-base md:text-lg font-black text-gray-900 leading-tight">Libre y Gratuita</p>
                            <p className="text-red-700 font-bold mt-2 text-[13px] md:text-sm">Socios y público general</p>
                        </div>
                    </Reveal>
                </div>
            </div>

        </div>
    );
};

export default Museo;