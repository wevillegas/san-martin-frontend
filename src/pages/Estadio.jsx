import { useState } from "react";
import { MapPin, Users, Maximize, History, Lightbulb, Radio, ShieldCheck, Swords, Zap, Map, Clock } from "lucide-react";

const Estadio = () => {
    // 1. IMAGEN PRINCIPAL (Hero) y PARTIDOS
    const imgHero = "/public/images/portada.jpg";
    const imgRoma = "/public/images/roma.jpg";
    const img1932 = "/public/images/ciudadela1932.jpg";
    const imgCosmos = "/public/images/cosmos.jpg";
    const imgGuarani = "/public/images/guarani.jpg";
    const imgDalmine = "/public/images/dalmine.jpg";
    const imgClasico1 = "/public/images/1992clasico.jpg";
    const imgClasico2 = "/public/images/1994clasico.jpg";

    // 2. FOTOS PARA LA GALERÍA DE EVOLUCIÓN
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
                SECCIÓN 1: CABECERA HERO 
            ========================================== */}
            <div className="relative w-full h-[600px] md:h-[700px]">
                <img
                    src={imgHero || "https://images.unsplash.com/photo-1518605368461-1e1e38ce8058?q=80&w=2000&auto=format&fit=crop"}
                    alt="Estadio La Ciudadela"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-2xl mb-4">
                        La Ciudadela
                    </h1>
                    <p className="text-xl md:text-3xl text-gray-200 font-bold uppercase tracking-widest drop-shadow-lg">
                        El estadio más caliente del país
                    </p>
                </div>

                {/* Badges Flotantes */}
                <div className="absolute -bottom-10 left-0 w-full px-4 z-20">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl shadow-xl p-6 flex items-center gap-4 border-b-4 border-red-700">
                            <div className="bg-red-100 p-3 rounded-lg text-red-700">
                                <History className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Inauguración</p>
                                <p className="text-2xl font-black text-gray-900">24 de Marzo 1932</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-xl p-6 flex items-center gap-4 border-b-4 border-red-700">
                            <div className="bg-red-100 p-3 rounded-lg text-red-700">
                                <Users className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Capacidad</p>
                                <p className="text-2xl font-black text-gray-900">30.000</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-xl p-6 flex items-center gap-4 border-b-4 border-red-700">
                            <div className="bg-red-100 p-3 rounded-lg text-red-700">
                                <Maximize className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Dimensiones</p>
                                <p className="text-2xl font-black text-gray-900">105 x 70 m</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================
                SECCIÓN 2: HISTORIA (FONDO BLANCO)
            ========================================== */}
            <div className="bg-white pt-32 pb-24 border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="w-8 h-8 text-red-700" />
                                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-wide">soy de ciudadela</h2>
                            </div>
                            <div className="w-20 h-1.5 bg-red-600 rounded-full mb-8"></div>
                            <p className="text-gray-600 leading-relaxed mb-6 text-lg font-medium">
                                Emplazado en el barrio homónimo, el estadio se levanta exactamente en los terrenos donde se libró la histórica Batalla de Tucumán en 1812. Esa herencia de lucha y resistencia parece haber impregnado los cimientos de nuestra cancha.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg font-medium mb-8">
                                Desde sus primeras tribunas de madera construidas con el sudor de los propios hinchas y socios, hasta el gigante de cemento que es hoy, La Ciudadela es un estadio que respira fútbol. La cercanía de las tribunas al campo de juego genera un efecto "olla" que hace temblar a cualquier rival.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
                                <img
                                    src={fotosEvolucion[fotoActiva] || "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=1000&auto=format&fit=crop"}
                                    alt="Evolución del estadio"
                                    className="w-full h-full object-cover transition-opacity duration-500"
                                />
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {fotosEvolucion.map((foto, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setFotoActiva(index)}
                                        className={`cursor-pointer relative w-24 h-16 shrink-0 rounded-lg overflow-hidden border-4 transition-all ${fotoActiva === index ? 'border-red-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
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
                SECCIÓN 4: MOMENTOS ICÓNICOS (FONDO ROJO)
            ========================================== */}
            <div className="bg-red-800 py-24">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16 text-white">
                        <h2 className="text-3xl font-black uppercase tracking-wider mb-4">momentos iconicos</h2>
                        <div className="w-24 h-1.5 bg-white mx-auto rounded-full mb-4"></div>
                        <p className="text-red-100 font-medium">Algunos de los momentos mas destacados sucedidos en ciudadela</p>
                    </div>

                    <div className="space-y-8">
                        {/* Tarjeta 0 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img src={img1932} alt="Inauguración" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>NACIMIENTO DEL ESTADIO MAS CALIENTE DEL PAIS</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">INAUGURACION DE LA CIUDADELA</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    El 24 de marzo de 1932 marcó un antes y un después con la inauguración del mítico estadio. Un símbolo de la resistencia y pasión del pueblo ciruja.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 1 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img src={imgCosmos} alt="Maradona" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>Argentina vs Cosmos - 1978</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">MARADONA EN LA CIUDADELA</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    El 4 de noviembre de 1978 la Selección Juvenil derrotó 2-1 al Cosmos de Nueva York, con un golazo de tiro libre de Diego. Franz Beckenbauer jugaba para el equipo norteamericano.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 2 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img src={imgRoma} alt="Roma" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>San Martín vs Roma - 1994</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">Victoria frente a la Roma</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    San Martín se impuso por 1 a 0 frente a la poderosa Roma de Italia con un gol inolvidable de Alfredo "Cachi" Zelaya en una Ciudadela repleta.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 3 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img src={imgClasico1} alt="Clásico 92" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>San Martín vs Atlético Tucumán - 1992</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">Clasificación en el clásico tucumano</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    San Martín eliminó de forma directa a Atlético Tucumán tras igualar en el Monumental y empatar 0-0 en La Ciudadela, avanzando por ventaja deportiva camino al ascenso.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 4 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img src={imgClasico2} alt="Clásico 94" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>San Martín vs Atlético Tucumán - 1994</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">Otra clasificación en el clásico</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    Dos años después se repitió la historia y el Santo volvió a eliminar a su clásico rival en cuartos de final haciendo valer nuevamente la ventaja deportiva tras dos empates.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 5 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img src={imgGuarani} alt="Guarani" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>San Martín vs Guaraní Antonio Franco - 2016</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">GOL AGONICO Y ESTADIO COLAPSADO</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    Con un gol agónico de Iván Agudiak sobre el final, San Martín ganó la serie y pasó a semifinales del Federal A en una tarde de locura total en Tucumán.
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 6 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img src={imgDalmine} alt="Dalmine" className="w-full h-full object-cover" />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>San Martín vs Villa Dalmine - 2018</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">EMPATE AGONICO Y CLASIFICACION</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    Uno de los partidos más épicos del ascenso: gol al último minuto de Galeano para empatar 3-3 y clasificar a semifinales del reducido donde el Santo volvería a Primera.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================
                SECCIÓN 3: UBICACIÓN E INFRAESTRUCTURA (ESTILO MUSEO)
            ========================================== */}
            <div className="bg-white py-24 border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-wider mb-4">Ubicación e Infraestructura</h2>
                        <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Tarjeta de Ubicación Principal */}
                    <div className="flex flex-col items-center p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md mb-12 text-center max-w-3xl mx-auto">
                        <MapPin className="w-12 h-12 text-red-700 mb-4" />
                        <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500 mb-3">Dirección Oficial</h3>
                        <p className="text-2xl md:text-3xl font-black text-gray-900 uppercase">Bolívar 1960, San Miguel de Tucumán</p>
                        <p className="text-red-700 font-bold mt-2 uppercase tracking-wider text-sm">Barrio Ciudadela</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md text-center">
                            <ShieldCheck className="w-10 h-10 text-red-700 mb-4" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-3">Sectores</h3>
                            <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                Cuatro imponentes tribunas de cemento: Rondeau, Bolívar, Pellegrini y la histórica Matienzo.
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md text-center">
                            <Lightbulb className="w-10 h-10 text-red-700 mb-4" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-3">Iluminación</h3>
                            <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                Sistema LED de última generación apto para transmisiones HD y competencias internacionales.
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md text-center">
                            <Radio className="w-10 h-10 text-red-700 mb-4" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-3">Prensa</h3>
                            <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                Cabinas de transmisión equipadas, sala de conferencias y zona mixta de alto nivel.
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md text-center">
                            <Zap className="w-10 h-10 text-red-700 mb-4" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-3">Comodidades</h3>
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