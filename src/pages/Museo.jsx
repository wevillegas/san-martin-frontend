import { Trophy, Shirt, Clock, MapPin, Ticket, Award, History } from "lucide-react";

const Museo = () => {
    // Imágenes (Cargalas en public/images/ con estos nombres)
    const imgHero = "/images/museo-hero.jpg"; 
    const imgCopa44 = "/images/reliquia-copa.JPG";
    const imgCamiseta = "/images/reliquia-camiseta.jpg";
    const imgBotines = "/images/reliquia-botines.jpg";
    const imgInterior = "/images/museo-interior.jpg";

    const reliquias = [
        {
            titulo: "Copa de la República 1944",
            descripcion: "La máxima gloria nacional. El trofeo original ganado tras vencer a Newell's Old Boys por 3-1. Es el corazón de nuestra exposición.",
            imagen: imgCopa44,
            icono: <Trophy className="w-6 h-6 text-red-700" />
        },
        {
            titulo: "Manto Sagrado Histórico",
            descripcion: "Camiseta de lana tejida a mano utilizada en la década del 50. Conserva los colores intactos de la época dorada del club.",
            imagen: imgCamiseta,
            icono: <Shirt className="w-6 h-6 text-red-700" />
        },
        {
            titulo: "Botines del Ascenso 88",
            descripcion: "Los botines que pisaron la Bombonera en el histórico 6-1. Símbolos de uno de los ascensos más grandes de la historia del fútbol.",
            imagen: imgBotines,
            icono: <Award className="w-6 h-6 text-red-700" />
        }
    ];

    return (
        <div className="min-h-screen font-sans flex flex-col">
            
            {/* 1. CABECERA HERO (Imagen pura) */}
            <div className="relative w-full h-[500px] md:h-[600px] shrink-0">
                <img
                    src={imgHero || "https://images.unsplash.com/photo-1554941068-a252680d25d9?q=80&w=2000&auto=format&fit=crop"}
                    alt="Museo Juan Carlos Carol"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-10">
                    <span className="bg-red-700 text-white text-sm font-black px-5 py-2 rounded-full uppercase tracking-widest mb-6 shadow-lg border border-red-500">
                        Nuestra Memoria
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-2xl mb-4">
                        Museo Juan Carlos Carol
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 font-bold uppercase tracking-widest drop-shadow-lg">
                        Un paseo por nuestra historia
                    </p>
                </div>
            </div>

            {/* 2. INTRODUCCIÓN (Fondo Blanco) */}
            <div className="bg-white py-20 border-b border-gray-200 shrink-0">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <History className="w-8 h-8 text-red-700" />
                                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-wide">El Guardián de la Historia</h2>
                            </div>
                            <div className="w-20 h-1.5 bg-red-600 rounded-full mb-6"></div>
                            <p className="text-gray-600 leading-relaxed mb-6 text-lg font-medium">
                                Inaugurado para honrar a nuestras glorias, el Museo Juan Carlos Carol es un viaje en el tiempo al corazón del Pueblo Ciruja.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg font-medium">
                                No es solo una sala de trofeos; es un santuario donde las reliquias cobran vida. Desde documentos fundacionales de 1909 hasta la indumentaria de los ascensos más épicos, este espacio está diseñado para que cada hincha se reencuentre con su identidad.
                            </p>
                        </div>
                        {/* Imagen limpia sin efecto de sombra apilada */}
                        <div className="w-full">
                            <img 
                                src={imgInterior || "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=1000&auto=format&fit=crop"} 
                                alt="Interior del Museo" 
                                className="w-full h-[400px] object-cover rounded-xl shadow-lg border border-gray-200"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. RELIQUIAS DESTACADAS (Fondo Rojo) */}
            <div className="bg-red-800 py-24 shrink-0">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-white uppercase tracking-wider mb-4">Tesoros Invaluables</h2>
                        <div className="w-24 h-1.5 bg-white mx-auto rounded-full mb-4"></div>
                        <p className="text-red-100 font-medium">Las piezas más emblemáticas de nuestra exhibición.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {reliquias.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                                <div className="h-64 overflow-hidden relative bg-gray-100 border-b border-gray-100">
                                    <img 
                                        src={item.imagen || "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=1000&auto=format&fit=crop"} 
                                        alt={item.titulo}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-red-50 p-2 rounded-lg">
                                            {item.icono}
                                        </div>
                                        <h3 className="text-xl font-black uppercase text-gray-900">
                                            {item.titulo}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        {item.descripcion}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. INFORMACIÓN DE VISITA (Fondo Gris Claro / Tarjetas Limpias) */}
            <div className="bg-gray-50 py-20 shrink-0">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-wider mb-12">Vení a conocer el museo</h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md">
                            <Clock className="w-12 h-12 text-red-700 mb-4" />
                            <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500 mb-3">Horarios</h3>
                            <p className="text-xl font-black text-gray-900">Lunes a Viernes: 9:00 - 17:00</p>
                            <p className="text-xl font-black text-gray-900">Sábado: 9:00 - 13:00</p>
                            <p className="text-red-700 font-bold mt-1">Cerrado los Domingos y días de partido</p>
                        </div>
                        
                        <div className="flex flex-col items-center p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md">
                            <MapPin className="w-12 h-12 text-red-700 mb-4" />
                            <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500 mb-3">Ubicación</h3>
                            <p className="text-xl font-black text-gray-900">Estadio La Ciudadela</p>
                            <p className="text-red-700 font-bold mt-1">Ingreso principal por zona de plateas</p>
                            <p className="text-red-700 font-bold mt-1">Calle Bolívar</p>
                        </div>
                        
                        <div className="flex flex-col items-center p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md">
                            <Ticket className="w-12 h-12 text-red-700 mb-4" />
                            <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500 mb-3">Entrada</h3>
                            <p className="text-xl font-black text-gray-900">Libre y Gratuita</p>
                            <p className="text-red-700 font-bold mt-1">Socios y público general</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Museo;