import { useState } from "react";
// Íconos conceptuales
import { MapPin, Users, Maximize, Flame, Waves, Trees, Trophy, Activity, Zap, ShieldCheck, Construction, House } from "lucide-react";

// ÍCONOS REALES DE DEPORTES
import {
    FaBasketballBall, FaFutbol, FaHockeyPuck, FaFistRaised,
    FaSkating, FaFootballBall, FaTableTennis, FaVolleyballBall
} from "react-icons/fa";
import { GiBoxingGlove } from "react-icons/gi";

const Complejo = () => {
    // 1. IMAGEN PRINCIPAL (Hero)
    const imgHero = "/images/mirkin.png";

    // 2. FOTOS PARA LA GALERÍA
    const fotosComplejo = [
        "/images/microestadio.png", // Nueva foto sugerida
        "/images/pileta.jpg", // Nueva foto sugerida
        "/images/pension.jpg",
        "/images/mirkin3.jpg",
        "/images/mirkin2.jpg",
    ];

    const [fotoActiva, setFotoActiva] = useState(0);

    // 3. DISCIPLINAS
    const disciplinas = [
        { nombre: "Básquet", icono: <FaBasketballBall className="w-8 h-8 text-white mb-3 opacity-90 group-hover:scale-110 transition-transform" /> },
        { nombre: "Futsal", icono: <FaFutbol className="w-8 h-8 text-white mb-3 opacity-90 group-hover:scale-110 transition-transform" /> },
        { nombre: "Hockey Femenino", icono: <FaHockeyPuck className="w-8 h-8 text-white mb-3 opacity-90 group-hover:scale-110 transition-transform" /> },
        { nombre: "Hockey Masculino", icono: <FaHockeyPuck className="w-8 h-8 text-white mb-3 opacity-90 group-hover:scale-110 transition-transform" /> },
        { nombre: "Karate", icono: <FaFistRaised className="w-8 h-8 text-white mb-3 opacity-90 group-hover:scale-110 transition-transform" /> },
        { nombre: "Patín", icono: <FaSkating className="w-8 h-8 text-white mb-3 opacity-90 group-hover:scale-110 transition-transform" /> },
        { nombre: "Rugby", icono: <FaFootballBall className="w-8 h-8 text-white mb-3 opacity-90 group-hover:scale-110 transition-transform" /> },
        { nombre: "Tenis", icono: <FaTableTennis className="w-8 h-8 text-white mb-3 opacity-90 group-hover:scale-110 transition-transform" /> },
        { nombre: "Voley", icono: <FaVolleyballBall className="w-8 h-8 text-white mb-3 opacity-90 group-hover:scale-110 transition-transform" /> },
        { nombre: "Boxeo", icono: <GiBoxingGlove className="w-8 h-8 text-white mb-3 opacity-90 group-hover:scale-110 transition-transform" /> }
    ];

    return (
        <div className="min-h-screen font-sans bg-white">

            {/* =========================================
                SECCIÓN 1: CABECERA HERO 
            ========================================== */}
            <div className="relative w-full h-[500px] md:h-[600px]">
                <img
                    src={imgHero || "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=2000&auto=format&fit=crop"}
                    alt="Complejo Natalio Mirkin"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20">
                    <span className="bg-red-700 text-white text-sm font-black px-5 py-2 rounded-full uppercase tracking-widest mb-6 shadow-lg border border-red-500">
                        Complejo polideportivo
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-2xl mb-4">
                        Natalio Mirkin
                    </h1>
                    <p className="text-xl md:text-3xl text-gray-200 font-bold uppercase tracking-widest drop-shadow-lg">
                        Nuestro corazón social y deportivo
                    </p>
                </div>

                <div className="absolute -bottom-10 left-0 w-full px-4 z-20">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl shadow-xl p-6 flex items-center gap-4 border-b-4 border-red-700">
                            <div className="bg-red-100 p-3 rounded-lg text-red-700">
                                <MapPin className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Ubicación</p>
                                <p className="text-2xl font-black text-gray-900">Yerba Buena</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-xl p-6 flex items-center gap-4 border-b-4 border-red-700">
                            <div className="bg-red-100 p-3 rounded-lg text-red-700">
                                <Activity className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Deportes</p>
                                <p className="text-2xl font-black text-gray-900">+10 Disciplinas</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-xl p-6 flex items-center gap-4 border-b-4 border-red-700">
                            <div className="bg-red-100 p-3 rounded-lg text-red-700">
                                <Maximize className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Extensión</p>
                                <p className="text-2xl font-black text-gray-900">+23 Hectáreas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================
                SECCIÓN 2: INTRODUCCIÓN e HISTORIA
            ========================================== */}
            <div className="bg-white pt-32 pb-24 border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Users className="w-8 h-8 text-red-700" />
                                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-wide">La segunda casa</h2>
                            </div>
                            <div className="w-20 h-1.5 bg-red-600 rounded-full mb-8"></div>
                            <p className="text-gray-600 leading-relaxed text-lg font-medium">
                                En los últimos años, el predio ha experimentado un crecimiento histórico en su infraestructura para el beneficio de todos los socios. Entre las obras más destacadas se encuentra la inauguración del nuevo Microestadio, equipado con piso de parquet profesional e iluminación LED de última generación para potenciar nuestras disciplinas bajo techo. Además, la apertura del moderno pórtico de acceso sobre la Avenida Perón no solo jerarquiza nuestra entrada principal, sino que brinda mayor comodidad, seguridad y un acceso estratégico a nuestra segunda casa. Tambien se fundó la pensión Eusebio Jacinto Roldán para que nuestros jovenes se desarrollen tanto personal como profesionalmente.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
                                <img
                                    src={fotosComplejo[fotoActiva]}
                                    alt="Instalaciones"
                                    className="w-full h-full object-cover transition-opacity duration-500"
                                />
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {fotosComplejo.map((foto, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setFotoActiva(index)}
                                        className={`cursor-pointer relative w-24 h-16 shrink-0 rounded-lg overflow-hidden border-4 transition-all ${fotoActiva === index ? 'border-red-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={foto} alt="Miniatura" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================
                SECCIÓN 4: DISCIPLINAS (FONDO ROJO)
            ========================================== */}
            <div className="bg-red-800 py-24">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-black uppercase tracking-wider mb-4 text-white">Nuestras Disciplinas</h2>
                    <div className="w-24 h-1.5 bg-white mx-auto rounded-full mb-12"></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {disciplinas.map((disciplina, index) => (
                            <div key={index} className="bg-white/10 border border-red-500/30 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-lg group">
                                {disciplina.icono}
                                <h3 className="text-white font-bold uppercase tracking-wider text-sm">{disciplina.nombre}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* =========================================
                SECCIÓN 5: UBICACIÓN Y MAPA
            ========================================== */}
            <div className="bg-white py-24">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-black text-gray-900 uppercase tracking-wider mb-4">Ubicación e Infraestructura</h2>
                    <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full mb-12"></div>

                    {/* MAPA DE GOOGLE MAPS INSERTADO (Reemplaza la tarjeta gigante) */}
                    <div className="w-full h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl mb-16 border border-gray-200 relative">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.1372628743566!2d-65.26384332381366!3d-26.803757688661516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d18b0ecb19d%3A0x77b230b729942662!2sClub%20Atl%C3%A9tico%20San%20Martin%20-%20Complejo%20Polideportivo%20Ingeniero%20Natalio%20Mirkin!5e0!3m2!1ses-419!2sar!4v1779398216892!5m2!1ses-419!2sar" className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación Complejo Natalio Mirkin"></iframe>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        <div className="p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md">
                            <Waves className="w-10 h-10 text-red-700 mx-auto mb-4" />
                            <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">Piletas</h3>
                            <p className="text-gray-700 text-sm font-medium">Olímpica e infantil.</p>
                        </div>
                        <div className="p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md">
                            <Flame className="w-10 h-10 text-red-700 mx-auto mb-4" />
                            <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">Asadores</h3>
                            <p className="text-gray-700 text-sm font-medium">Quinchos equipados.</p>
                        </div>
                        <div className="p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md">
                            <Construction className="w-10 h-10 text-red-700 mx-auto mb-4" />
                            <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">Canchas</h3>
                            <p className="text-gray-700 text-sm font-medium">Fútbol, básquet, tenis, rugby, voley.</p>
                        </div>
                        <div className="p-8 bg-white rounded-2xl border-t-4 border-red-700 shadow-md">
                            <Trees className="w-10 h-10 text-red-700 mx-auto mb-4" />
                            <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">Naturaleza</h3>
                            <p className="text-gray-700 text-sm font-medium">Predio parquizado.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Complejo;