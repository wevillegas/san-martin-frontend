import { useState } from "react";
import { MapPin, Users, Maximize, History, Lightbulb, Radio, ShieldCheck, Swords, Zap } from "lucide-react";

const Estadio = () => {
    // 1. IMÁGENES
    const imgHero = "/images/portada.jpg";
    const imgRoma = "/images/roma.jpg";
    const img1932 = "/images/ciudadela1932.jpg";
    const imgCosmos = "/images/cosmos.jpg";
    const imgGuarani = "/images/guarani.jpg";
    const imgDalmine = "/images/dalmine.jpg";
    const imgClasico1 = "/images/1992clasico.jpg";
    const imgClasico2 = "/images/1994clasico.jpg";

    const fotosEvolucion = [
        "/images/ciudadela1932.jpg",
        "/images/ciudadela1932color.jpg",
        "/images/ciudadelablanco.jpg",
        "/images/ciudadelanoche.jpg",
        "/images/ciudadeladentro.jpg"
    ];

    const [fotoActiva, setFotoActiva] = useState(0);

    return (
        <div className="min-h-screen font-sans bg-white">

            {/* =========================================
                SECCIÓN 1: CABECERA HERO UNIFICADA
            ========================================== */}
            <div className="relative w-full h-[450px] md:h-[600px]">
                <div className="absolute inset-0 w-full h-full z-0">
                    <img
                        src={imgHero || "https://images.unsplash.com/photo-1518605368461-1e1e38ce8058?q=80&w=2000&auto=format&fit=crop"}
                        alt="Estadio La Ciudadela"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 md:bg-gradient-to-t md:from-black/90 md:via-black/50 md:to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-16 md:pb-0 z-10 w-full">
                    <span className="bg-red-700 text-white text-xs md:text-sm font-black px-4 md:px-5 py-1.5 md:py-2 rounded-full uppercase tracking-widest mb-4 md:mb-6 shadow-lg border border-red-500">LA FORTALEZA</span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-2xl mb-2 md:mb-4">
                        La Ciudadela
                    </h1>
                    <p className="text-lg sm:text-xl md:text-3xl text-gray-200 font-bold uppercase tracking-widest drop-shadow-lg text-balance">
                        El estadio más caliente del país
                    </p>
                </div>
            </div>

            {/* =========================================
                TARJETAS FLOTANTES
            ========================================== */}
            <div className="relative z-20 max-w-5xl mx-auto px-4 w-full -mt-20 md:-mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div className="bg-white rounded-xl shadow-xl p-5 md:p-6 flex items-center gap-4 border-b-4 border-red-700">
                        <div className="bg-red-100 p-3 rounded-lg text-red-700 shrink-0">
                            <History className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">Inauguración</p>
                            <p className="text-lg md:text-2xl font-black text-gray-900">24 de Mar 1932</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-xl p-5 md:p-6 flex items-center gap-4 border-b-4 border-red-700">
                        <div className="bg-red-100 p-3 rounded-lg text-red-700 shrink-0">
                            <Users className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">Capacidad</p>
                            <p className="text-lg md:text-2xl font-black text-gray-900">30.000</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-xl p-5 md:p-6 flex items-center gap-4 border-b-4 border-red-700">
                        <div className="bg-red-100 p-3 rounded-lg text-red-700 shrink-0">
                            <Maximize className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">Dimensiones</p>
                            <p className="text-lg md:text-2xl font-black text-gray-900">105 x 70 m</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================
                SECCIÓN 2: HISTORIA (LA ZONA DEL PROBLEMA)
            ========================================== */}
            <div className="bg-white pt-16 md:pt-32 pb-16 md:pb-24 border-b border-gray-100 w-full">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    {/* EL ARREGLO: grid-cols-1 explícito y min-w-0 en las columnas */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start w-full">
                        
                        {/* Columna de Texto */}
                        <div className="order-2 lg:order-1 w-full min-w-0">
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-red-700 shrink-0" />
                                {/* Título un toque más chico en cel para que no rompa la caja */}
                                <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-wide break-words">
                                    soy de ciudadela
                                </h2>
                            </div>
                            <div className="w-16 md:w-20 h-1.5 bg-red-600 rounded-full mb-6 md:mb-8"></div>
                            <p className="text-gray-600 leading-relaxed mb-6 text-[15px] md:text-lg font-medium break-words">
                                Emplazado en el barrio homónimo, el estadio se levanta exactamente en los terrenos donde se libró la histórica Batalla de Tucumán en 1812. Esa herencia de lucha y resistencia parece haber impregnado los cimientos de nuestra cancha.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-[15px] md:text-lg font-medium mb-8 break-words">
                                Desde sus primeras tribunas de madera construidas con el sudor de los propios hinchas y socios, hasta el gigante de cemento que es hoy, La Ciudadela es un estadio que respira fútbol. La cercanía de las tribunas al campo de juego genera un efecto "olla" que hace temblar a cualquier rival.
                            </p>
                        </div>

                        {/* Columna de Galería */}
                        <div className="flex flex-col gap-3 order-1 lg:order-2 w-full min-w-0">
                            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
                                <img
                                    src={fotosEvolucion[fotoActiva] || "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=1000&auto=format&fit=crop"}
                                    alt="Evolución del estadio"
                                    className="w-full h-full object-cover transition-opacity duration-500"
                                />
                            </div>
                            {/* EL ARREGLO CARRUSEL: max-w-full explícito */}
                            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide w-full max-w-full snap-x">
                                {fotosEvolucion.map((foto, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setFotoActiva(index)}
                                        /* Miniaturas más proporcionadas para celular (w-16 h-12) */
                                        className={`cursor-pointer snap-center relative w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 shrink-0 rounded-lg overflow-hidden border-4 transition-all ${fotoActiva === index ? 'border-red-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={foto || "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=1000&auto=format&fit=crop"} alt="Miniatura" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================
                SECCIÓN 3: MOMENTOS ICÓNICOS (FONDO ROJO)
            ========================================== */}
            <div className="bg-red-800 py-16 md:py-24 w-full">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    <div className="text-center mb-10 md:mb-16 text-white w-full">
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-4">momentos iconicos</h2>
                        <div className="w-20 md:w-24 h-1.5 bg-white mx-auto rounded-full mb-4"></div>
                        <p className="text-red-100 font-medium text-sm md:text-base">Algunos de los momentos mas destacados sucedidos en ciudadela</p>
                    </div>

                    <div className="space-y-6 md:space-y-8 w-full">
                        {/* Tarjeta 0 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300 w-full min-w-0">
                            <div className="md:w-2/5 h-48 sm:h-64 md:h-auto shrink-0 w-full md:max-w-[40%]">
                                <img src={img1932} alt="Inauguración" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center min-w-0">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-[10px] md:text-sm break-words">
                                    <Swords className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                    <span>NACIMIENTO DEL ESTADIO MAS CALIENTE DEL PAIS</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 uppercase break-words">INAUGURACION DE LA CIUDADELA</h3>
                                <p className="text-gray-600 leading-relaxed font-medium text-sm md:text-base break-words">
                                    El 24 de marzo de 1932 marcó un antes y un después con la inauguración del mítico estadio. Un símbolo de la resistencia y pasión del pueblo ciruja.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 1 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300 w-full min-w-0">
                            <div className="md:w-2/5 h-48 sm:h-64 md:h-auto shrink-0 w-full md:max-w-[40%]">
                                <img src={imgCosmos} alt="Maradona" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center min-w-0">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-[10px] md:text-sm break-words">
                                    <Swords className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                    <span>Argentina vs Cosmos - 1978</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 uppercase break-words">MARADONA EN LA CIUDADELA</h3>
                                <p className="text-gray-600 leading-relaxed font-medium text-sm md:text-base break-words">
                                    El 4 de noviembre de 1978 la Selección Juvenil derrotó 2-1 al Cosmos de Nueva York, con un golazo de tiro libre de Diego. Franz Beckenbauer jugaba para el equipo norteamericano.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 2 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300 w-full min-w-0">
                            <div className="md:w-2/5 h-48 sm:h-64 md:h-auto shrink-0 w-full md:max-w-[40%]">
                                <img src={imgRoma} alt="Roma" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center min-w-0">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-[10px] md:text-sm break-words">
                                    <Swords className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                    <span>San Martín vs Roma - 1994</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 uppercase break-words">Victoria frente a la Roma</h3>
                                <p className="text-gray-600 leading-relaxed font-medium text-sm md:text-base break-words">
                                    San Martín se impuso por 1 a 0 frente a la poderosa Roma de Italia con un gol inolvidable de Alfredo "Cachi" Zelaya en una Ciudadela repleta.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 3 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300 w-full min-w-0">
                            <div className="md:w-2/5 h-48 sm:h-64 md:h-auto shrink-0 w-full md:max-w-[40%]">
                                <img src={imgClasico1} alt="Clásico 92" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center min-w-0">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-[10px] md:text-sm break-words">
                                    <Swords className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                    <span>San Martín vs Atlético Tucumán - 1992</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 uppercase break-words">Clasificación en el clásico tucumano</h3>
                                <p className="text-gray-600 leading-relaxed font-medium text-sm md:text-base break-words">
                                    San Martín eliminó de forma directa a Atlético Tucumán tras igualar en el Monumental y empatar 0-0 en La Ciudadela, avanzando por ventaja deportiva camino al ascenso.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 4 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300 w-full min-w-0">
                            <div className="md:w-2/5 h-48 sm:h-64 md:h-auto shrink-0 w-full md:max-w-[40%]">
                                <img src={imgClasico2} alt="Clásico 94" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center min-w-0">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-[10px] md:text-sm break-words">
                                    <Swords className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                    <span>San Martín vs Atlético Tucumán - 1994</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 uppercase break-words">Otra clasificación en el clásico</h3>
                                <p className="text-gray-600 leading-relaxed font-medium text-sm md:text-base break-words">
                                    Dos años después se repitió la historia y el Santo volvió a eliminar a su clásico rival en cuartos de final haciendo valer nuevamente la ventaja deportiva tras dos empates.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 5 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300 w-full min-w-0">
                            <div className="md:w-2/5 h-48 sm:h-64 md:h-auto shrink-0 w-full md:max-w-[40%]">
                                <img src={imgGuarani} alt="Guarani" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center min-w-0">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-[10px] md:text-sm break-words">
                                    <Swords className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                    <span>San Martín vs Guaraní Antonio Franco - 2016</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 uppercase break-words">GOL AGONICO Y ESTADIO COLAPSADO</h3>
                                <p className="text-gray-600 leading-relaxed font-medium text-sm md:text-base break-words">
                                    Con un gol agónico de Iván Agudiak sobre el final, San Martín ganó la serie y pasó a semifinales del Federal A en una tarde de locura total en Tucumán.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 6 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300 w-full min-w-0">
                            <div className="md:w-2/5 h-48 sm:h-64 md:h-auto shrink-0 w-full md:max-w-[40%]">
                                <img src={imgDalmine} alt="Dalmine" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center min-w-0">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-[10px] md:text-sm break-words">
                                    <Swords className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                    <span>San Martín vs Villa Dalmine - 2018</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 uppercase break-words">EMPATE AGONICO Y CLASIFICACION</h3>
                                <p className="text-gray-600 leading-relaxed font-medium text-sm md:text-base break-words">
                                    Uno de los partidos más épicos del ascenso: gol al último minuto de Galeano para empatar 3-3 y clasificar a semifinales del reducido donde el Santo volvería a Primera.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================
                SECCIÓN 4: UBICACIÓN E INFRAESTRUCTURA (MAPA)
            ========================================== */}
            <div className="bg-white py-16 md:py-24 border-b border-gray-100 w-full">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-wider mb-4">Ubicación e Infraestructura</h2>
                        <div className="w-20 md:w-24 h-1.5 bg-red-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl mb-12 md:mb-16 border border-gray-200 relative">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.116847545089!2d-65.23240652381254!3d-26.836235590014113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c6553d78fdd%3A0x8f34dc03963cdf3f!2sEstadio%20La%20Ciudadela!5e0!3m2!1ses-419!2sar!4v1779401872210!5m2!1ses-419!2sar" className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación Complejo Natalio Mirkin"></iframe>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
                        <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md text-center">
                            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-red-700 mb-3 md:mb-4 shrink-0" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-2 md:mb-3">Sectores</h3>
                            <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                Cuatro imponentes tribunas de cemento: Rondeau, Bolívar, Pellegrini y la histórica Matienzo.
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md text-center">
                            <Lightbulb className="w-8 h-8 md:w-10 md:h-10 text-red-700 mb-3 md:mb-4 shrink-0" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-2 md:mb-3">Iluminación</h3>
                            <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                Sistema LED de última generación apto para transmisiones HD y competencias internacionales.
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md text-center">
                            <Radio className="w-8 h-8 md:w-10 md:h-10 text-red-700 mb-3 md:mb-4 shrink-0" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-2 md:mb-3">Prensa</h3>
                            <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                Cabinas de transmisión equipadas, sala de conferencias y zona mixta de alto nivel.
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md text-center">
                            <Zap className="w-8 h-8 md:w-10 md:h-10 text-red-700 mb-3 md:mb-4 shrink-0" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-2 md:mb-3">Comodidades</h3>
                            <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                Palcos VIP, vestuarios modernos y campo de juego con sistema de riego automático.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Estadio;