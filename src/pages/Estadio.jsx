import { useState } from "react";
import { MapPin, Users, Maximize, History, Lightbulb, Radio, ShieldCheck, Swords, Zap, Map } from "lucide-react";

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
    // Asegurate de nombrar tus 5 fotos así, o cambiá los nombres acá abajo:
    const fotosEvolucion = [
        "/images/ciudadela1932.jpg", // 1932
        "/images/ciudadela1932color.jpg", // Foto 2
        "/images/ciudadelablanco.jpg", // Foto 3
        "/images/ciudadelanoche.jpg", // Foto 4
        "/images/ciudadeladentro.jpg"       // Foto actual
    ];

    // Estado para controlar qué foto se ve en grande en la galería
    const [fotoActiva, setFotoActiva] = useState(0);

    return (
        <div className="min-h-screen font-sans">

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

                {/* Badges Flotantes de Datos Duros */}
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
            <div className="bg-white pt-32 pb-24">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Texto */}
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

                        {/* Galería Interactiva de Evolución */}
                        <div className="flex flex-col gap-3">
                            {/* Foto Principal (La Grande) */}
                            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
                                <img
                                    src={fotosEvolucion[fotoActiva] || "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=1000&auto=format&fit=crop"}
                                    alt="Evolución del estadio"
                                    className="w-full h-full object-cover transition-opacity duration-500"
                                />
                            </div>

                            {/* Miniaturas */}
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {fotosEvolucion.map((foto, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setFotoActiva(index)}
                                        className={`cursor-pointer relative w-24 h-16 shrink-0 rounded-lg overflow-hidden border-4 transition-all ${fotoActiva === index ? 'border-red-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
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
                SECCIÓN BANNER UBICACIÓN (ROJO BRILLANTE)
            ========================================== */}
            <div className="bg-red-800 py-5 shadow-inner">
                <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-white">
                    <Map className="w-10 h-10" />
                    <div className="text-center sm:text-left">
                        <p className="text-red-200 font-bold uppercase tracking-widest text-sm">Dirección</p>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider">
                            Bolívar 1960, San Miguel de Tucumán
                        </h2>
                    </div>
                </div>
            </div>


            {/* =========================================
                SECCIÓN 3: INFRAESTRUCTURA (FONDO ROJO OSCURO)
            ========================================== */}
            <div className="bg-red-800 py-24">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-white uppercase tracking-wider mb-4">Infraestructura</h2>
                        <div className="w-24 h-1.5 bg-red-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Tarjetas Blancas para generar mucho contraste */}
                        <div className="p-6 bg-white rounded-xl shadow-xl transform hover:-translate-y-2 transition-transform">
                            <ShieldCheck className="w-10 h-10 text-red-700 mb-4" />
                            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase">Sectores</h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-medium">
                                Cuatro imponentes tribunas de cemento: Calle Rondeau, Bolívar, Pellegrini y la histórica platea central por calle Matienzo.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-xl transform hover:-translate-y-2 transition-transform">
                            <Lightbulb className="w-10 h-10 text-red-700 mb-4" />
                            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase">Iluminación</h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-medium">
                                Sistema lumínico LED de última generación apto para transmisiones en HD, montado sobre cuatro torres principales.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-xl transform hover:-translate-y-2 transition-transform">
                            <Radio className="w-10 h-10 text-red-700 mb-4" />
                            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase">Prensa</h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-medium">
                                Cabinas de transmisión equipadas, sala de conferencias de prensa y zona mixta para el confort del periodismo nacional.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-xl transform hover:-translate-y-2 transition-transform">
                            <Zap className="w-10 h-10 text-red-700 mb-4" />
                            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase">Comodidades</h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-medium">
                                Palcos VIP, vestuarios modernos de primer nivel para local, visitante y árbitros, y un campo de juego con riego automático.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================
                SECCIÓN 4: PARTIDOS ICÓNICOS (FONDO GRIS CLARITO)
            ========================================== */}
            <div className="bg-gray-50 py-24">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-wider mb-4">momentos iconicos</h2>
                        <p className="text-gray-500 font-medium">Algunos de los momentos mas destacados sucedidos en ciudadela</p>
                    </div>

                    <div className="space-y-8">
                        {/* Tarjeta 0 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 flex flex-col md:flex-row hover:shadow-lg transition-shadow">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img
                                    src={img1932 || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop"}
                                    alt="San Martín vs Roma"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>NACIMIENTO DEL ESTADIO MAS CALIENTE DEL PAIS</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">INAUGURACION DE LA CIUDADELA</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    El 24 de marzo de 1932 marcó un antes y un después con la inauguración del mítico estadio en el predio donde se libró la Batalla de Tucumán. Este hito no solo dio un sentido de pertenencia inigualable, sino que convirtió a La Ciudadela en un símbolo de la resistencia y pasión del pueblo ciruja. La construcción de sus primeras tribunas cimentó el carácter de una fortaleza que, con el tiempo, se ganaría el respeto de todo el fútbol argentino. El estadio mas caliente del país
                                </p>
                            </div>
                        </div>
                        {/* Tarjeta 1 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 flex flex-col md:flex-row hover:shadow-lg transition-shadow">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img
                                    src={imgCosmos || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop"}
                                    alt="San Martín vs Roma"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>Argentina vs Cosmos - 1978</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">MARADONA EN LA CIUDADELA</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    El 4 de noviembre de 1978 en la Ciudadela la Selección Juvenil, dirida por Cesar Luis Menotti, derrotó 2-1 al Cosmos de Nueva York, con un golazo de tiro libre de Diego. Franz Beckenbauer jugaba en el equipo norteamericano.
                                </p>
                            </div>
                        </div>
                        {/* Tarjeta 2 - La Roma */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 flex flex-col md:flex-row hover:shadow-lg transition-shadow">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img
                                    src={imgRoma || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop"}
                                    alt="San Martín vs Roma"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>San Martín vs Roma - 1994</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">Victoria frente a la Roma</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    El Santo recibió a la poderosa Roma de Italia en un amistoso internacional que quedó grabado a fuego. En una Ciudadela repleta, San Martín se impuso por 1 a 0 con un gol inolvidable de Alfredo "Cachi" Zelaya.
                                </p>
                            </div>
                        </div>
                        {/* Tarjeta clasico 1 - 1991*/}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 flex flex-col md:flex-row hover:shadow-lg transition-shadow">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img
                                    src={imgClasico1 || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop"}
                                    alt="San Martín vs Roma"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>San Martín vs Atlético Tucumán - 1992</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">Clasificación en el clásico tucumano</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    En esta llave del Torneo Reducido, San Martín eliminó de forma directa a Atlético Tucumán tras igualar 1-1 en el Monumental y empatar 0-0 en La Ciudadela. El marcador global finalizó empatado, pero San Martín dejó afuera a su clásico rival gracias a la ventaja deportiva por su mejor ubicación en la tabla general. Este triunfo en el clásico impulsó al Santo a semifinales, camino a su posterior ascenso a Primera División.
                                </p>
                            </div>
                        </div>
                        {/* Tarjeta clasico 2 - 1994*/}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 flex flex-col md:flex-row hover:shadow-lg transition-shadow">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img
                                    src={imgClasico2 || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop"}
                                    alt="San Martín vs Roma"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>San Martín vs Atlético Tucumán - 1994</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">Otra clasificación en el clásico tucumano</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    Dos años después se repitió la historia y San Martín volvió a eliminar a Atlético en los cuartos de final por la misma vía. La ida en el estadio de Atlético terminó en un empate 1-1, mientras que la vuelta en La Ciudadela culminó en un tenso 0-0 que sentenció la serie. San Martín dejó en el camino a Atlético haciendo valer nuevamente la ventaja deportiva.
                                </p>
                            </div>
                        </div>
                        {/* Tarjeta 3 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 flex flex-col md:flex-row hover:shadow-lg transition-shadow">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img
                                    src={imgGuarani || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop"}
                                    alt="San Martín vs Roma"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>San Martín vs Guaraní Antonio Franco - 2016</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">GOL AGONICO Y ESTADIO COLAPSADO</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    El 22 de mayo de 2016 San Martín venció 2 a 1 a Guaraní Antonio Franco de Misiones por la vuelta de los cuartos de final del torneo Argentino A. Con gol de Briones y un gol agonico de Ivan Agudiak, San MartÍn ganó la serie y pasó a la semifinales del torneo, donde terminaria ascendiendo a la B Nacional.
                                </p>
                            </div>
                        </div>
                        {/* Tarjeta 4 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 flex flex-col md:flex-row hover:shadow-lg transition-shadow">
                            <div className="md:w-2/5 h-64 md:h-auto">
                                <img
                                    src={imgDalmine || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop"}
                                    alt="San Martín vs Roma"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 uppercase tracking-wider text-sm">
                                    <Swords className="w-5 h-5" />
                                    <span>San Martín vs Villa Dalmine - 2018</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">EMPATE AGONICO Y CLASIFICACION</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    El 6 de mayo de 2018 San Martín jugó contra Villa Dalmine por la vuelta de los cuartos de final del reducido de la B Nacional 2018. Con goles de Costa, Bieler y un gol agónico al último minuto de Galeano, San Martín empató 3 a 3 contra Villa Dalmine en la Ciudadela, lo que permitió la clasificacion por ventaja deportiva a las semifinales del reducido donde San Martín terminaria ascendiendo a la Superliga Argentina. Considerado uno de los partidos mas épicos de la historia del ascenso.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Estadio;