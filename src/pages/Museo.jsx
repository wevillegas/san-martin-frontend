import { Trophy, Shirt, Clock, MapPin, Ticket, Award, History } from "lucide-react";

const Museo = () => {
    // Imágenes (Cargalas en public/images/ con estos nombres)
    const imgHero = "/images/museo-hero.jpg"; 
    const imgCopa44 = "/images/reliquia-copa.JPG";
    const imgCamiseta = "/images/reliquia-camiseta.png";
    const imgBotines = "/images/reliquia-nota.jpg";
    const imgInterior = "/images/museo-interior.jpg";

    const reliquias = [
        {
            titulo: "Copa de la República 1944",
            descripcion: "La máxima gloria nacional. El trofeo original ganado tras vencer a Newell's Old Boys por 3-1. Es el corazón de nuestra exposición.",
            imagen: imgCopa44,
            icono: <Trophy className="w-5 h-5 md:w-6 md:h-6 text-red-700" />
        },
        {
            titulo: "Camiseta mítica del ascenso 2008",
            descripcion: "Camiseta Kappa original utilizada en el partido ante Chacarita que nos dio el ascenso a la primera división en 2008.",
            imagen: imgCamiseta,
            icono: <Shirt className="w-5 h-5 md:w-6 md:h-6 text-red-700" />
        },
        {
            titulo: "Declaración de fundación",
            descripcion: "Entre aclamaciones de delirante entusiasmo, el 2 de noviembre de 1909 en casa de Secundino Dante Torossi, nacía el Club Atlético San Martín y Romelio Castro sería elegido como su Presidente.",
            imagen: imgBotines,
            icono: <Award className="w-5 h-5 md:w-6 md:h-6 text-red-700" />
        }
    ];

    return (
        <div className="min-h-screen font-sans bg-white">
            
            {/* =========================================
                SECCIÓN 1: CABECERA HERO UNIFICADA
            ========================================== */}
            <div className="relative w-full h-[450px] md:h-[600px]">
                <div className="absolute inset-0 w-full h-full z-0">
                    <img
                        src={imgHero || "https://images.unsplash.com/photo-1554941068-a252680d25d9?q=80&w=2000&auto=format&fit=crop"}
                        alt="Museo Juan Carlos Carol"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 md:bg-gradient-to-t md:from-black/90 md:via-black/50 md:to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 w-full">
                    <span className="bg-red-700 text-white text-xs md:text-sm font-black px-4 md:px-5 py-1.5 md:py-2 rounded-full uppercase tracking-widest mb-4 md:mb-6 shadow-lg border border-red-500">
                        Nuestra Memoria
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-2xl mb-2 md:mb-4">
                        Museo <br className="md:hidden"/> Juan Carlos Carol
                    </h1>
                    <p className="text-lg sm:text-xl md:text-3xl text-gray-200 font-bold uppercase tracking-widest drop-shadow-lg text-balance">
                        Un paseo por nuestra historia
                    </p>
                </div>
            </div>

            {/* =========================================
                SECCIÓN 2: INTRODUCCIÓN (Mismo estilo que Estadio)
            ========================================== */}
            <div className="bg-white pt-16 md:pt-32 pb-16 md:pb-24 border-b border-gray-100 w-full">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start w-full">
                        
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
                            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
                                <img 
                                    src={imgInterior || "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=1000&auto=format&fit=crop"} 
                                    alt="Interior del Museo" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* =========================================
                SECCIÓN 3: RELIQUIAS DESTACADAS (Fondo Rojo)
            ========================================== */}
            <div className="bg-red-800 py-16 md:py-24 w-full">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    <div className="text-center mb-10 md:mb-16 text-white w-full">
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-4">Tesoros Invaluables</h2>
                        <div className="w-20 md:w-24 h-1.5 bg-white mx-auto rounded-full mb-4"></div>
                        <p className="text-red-100 font-medium text-sm md:text-base">Algunas de las piezas de nuestra exhibición.</p>
                    </div>

                    {/* Espaciado responsivo para las tarjetas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                        {reliquias.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-300 flex flex-col min-w-0 w-full">
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
                            </div>
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
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                        <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md">
                            <Clock className="w-8 h-8 md:w-10 md:h-10 text-red-700 mb-3 md:mb-4 shrink-0" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-2 md:mb-3">Horarios</h3>
                            <p className="text-base md:text-lg font-black text-gray-900 leading-tight mb-1">Lunes a Viernes: 9:00 - 17:00</p>
                            <p className="text-base md:text-lg font-black text-gray-900 leading-tight">Sábado: 9:00 - 13:00</p>
                            <p className="text-red-700 font-bold mt-2 text-[13px] md:text-sm">Cerrado los Domingos y días de partido</p>
                        </div>
                        
                        <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md">
                            <MapPin className="w-8 h-8 md:w-10 md:h-10 text-red-700 mb-3 md:mb-4 shrink-0" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-2 md:mb-3">Ubicación</h3>
                            <p className="text-base md:text-lg font-black text-gray-900 leading-tight">Estadio La Ciudadela</p>
                            <p className="text-red-700 font-bold mt-2 text-[13px] md:text-sm leading-tight">Ingreso principal por zona de plateas (Calle Bolívar)</p>
                        </div>
                        
                        <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md sm:col-span-2 lg:col-span-1">
                            <Ticket className="w-8 h-8 md:w-10 md:h-10 text-red-700 mb-3 md:mb-4 shrink-0" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-2 md:mb-3">Entrada</h3>
                            <p className="text-base md:text-lg font-black text-gray-900 leading-tight">Libre y Gratuita</p>
                            <p className="text-red-700 font-bold mt-2 text-[13px] md:text-sm">Socios y público general</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Museo;