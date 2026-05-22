// src/pages/Fixture.jsx
import { useState, useEffect } from "react";
import { Calendar, MapPin, AlertCircle, ShieldCheck, Trophy, Clock } from "lucide-react";

const Escudo = ({ src, alt, esSanMartin, size = "w-12 h-12" }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <div className={`${size} flex items-center justify-center relative drop-shadow-md`}>
            <img 
                src={src} 
                alt={alt} 
                className={`absolute w-full h-full object-contain transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                    setImageError(true);
                    setImageLoaded(false);
                }}
            />
            {(imageError || !imageLoaded) && (
                <ShieldCheck className={`absolute w-full h-full p-1 ${imageError ? 'opacity-100' : 'opacity-20'} ${esSanMartin ? 'text-white' : 'text-red-300/40'}`} />
            )}
        </div>
    );
};

const Fixture = () => {
    const [partidos, setPartidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const traerFixture = async () => {
            try {
                const respuesta = await fetch("https://san-martin-backend.onrender.com/api/fixture");
                if (!respuesta.ok) throw new Error("Error al conectar con el servidor");
                const data = await respuesta.json();
                setPartidos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };
        traerFixture();
    }, []);

    if (cargando) return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-700 mb-4"></div>
            <p className="text-gray-500 font-black uppercase tracking-widest">Cargando...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 py-16">
            <div className="max-w-5xl mx-auto px-4">
                
                {/* HEADER SEGÚN TUS DIBUJOS: LOGO + FIXTURE. + LÍNEA ROJA */}
                <div className="flex flex-col items-center justify-center mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        {/* Logo del Torneo */}
                        <img 
                            src="/public/images/pn.png" 
                            alt="Logo Primera Nacional" 
                            className="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-sm mt-3"
                        />
                        {/* Título Negro Sólido */}
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-900">
                            Fixture
                        </h1>
                    </div>
                    
                    {/* Línea Roja Divisoria (Igual a página de Socios) */}
                    <div className="w-24 h-1.5 bg-red-600 rounded-full shadow-sm"></div>
                    
                    <p className="mt-6 text-gray-500 font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
                        Primera Nacional • Temporada Actual
                    </p>
                </div>

                {/* LISTADO DE PARTIDOS CON CARDS ROJAS PROFUNDAS */}
                <div className="grid gap-6">
                    {partidos.map((partido, index) => {
                        const esProximo = partido.estado !== 'post' && (index === 0 || partidos[index - 1].estado === 'post');
                        
                        return (
                            <div 
                                key={partido.id}
                                className={`group relative rounded-3xl overflow-hidden border transition-all duration-300
                                    ${esProximo ? 'ring-4 ring-red-600/20 scale-[1.02] z-10 shadow-2xl' : 'shadow-md'}
                                    bg-gradient-to-br from-red-900 to-red-950 border-red-800`}
                            >
                                {/* Brillo estético para el próximo partido */}
                                {esProximo && <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>}

                                <div className="flex flex-col lg:flex-row items-center p-6 md:p-8 gap-8 relative z-10">
                                    
                                    {/* FECHA Y ESTADO */}
                                    <div className="flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-center w-full lg:w-40 gap-2">
                                        <div className="flex items-center gap-2 text-red-200/70 font-bold">
                                            <Calendar className="w-4 h-4 text-red-500" />
                                            <span className="text-sm text-white">{partido.fecha}</span>
                                        </div>
                                        <div className={`text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border
                                            ${partido.estado === 'post' 
                                                ? 'bg-black/30 border-white/10 text-gray-400' 
                                                : 'bg-red-600 text-white border-red-500 animate-pulse'}`}>
                                            {partido.descripcionEstado}
                                        </div>
                                    </div>

                                    {/* EL DUELO CENTRAL */}
                                    <div className="flex-grow flex items-center justify-between w-full max-w-2xl mx-auto">
                                        
                                        {/* LOCAL */}
                                        <div className="flex flex-col items-center gap-3 w-1/3 text-center">
                                            <Escudo src={partido.local.escudoUrl} alt={partido.local.nombre} esSanMartin={partido.local.esSanMartin} size="w-16 h-16 md:w-20 md:h-20" />
                                            <span className={`text-white font-black text-xs md:text-sm uppercase tracking-wide h-10 flex items-center leading-tight
                                                ${partido.local.esSanMartin ? 'text-white' : 'text-red-200/80'}`}>
                                                {partido.local.nombre}
                                            </span>
                                        </div>

                                        {/* MARCADOR BOX */}
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="bg-white text-gray-950 font-black text-3xl md:text-5xl px-6 py-3 rounded-2xl shadow-2xl tracking-tighter border-b-4 border-gray-300">
                                                {partido.local.goles}<span className="text-red-600 mx-1">:</span>{partido.visitante.goles}
                                            </div>
                                            {esProximo && (
                                                <div className="text-[10px] font-black text-white bg-red-600 px-3 py-0.5 rounded-sm animate-bounce mt-2 uppercase tracking-widest">
                                                    Próximo
                                                </div>
                                            )}
                                        </div>

                                        {/* VISITANTE */}
                                        <div className="flex flex-col items-center gap-3 w-1/3 text-center">
                                            <Escudo src={partido.visitante.escudoUrl} alt={partido.visitante.nombre} esSanMartin={partido.visitante.esSanMartin} size="w-16 h-16 md:w-20 md:h-20" />
                                            <span className={`text-white font-black text-xs md:text-sm uppercase tracking-wide h-10 flex items-center leading-tight
                                                ${partido.visitante.esSanMartin ? 'text-white' : 'text-red-200/80'}`}>
                                                {partido.visitante.nombre}
                                            </span>
                                        </div>
                                    </div>

                                    {/* UBICACIÓN */}
                                    <div className="w-full lg:w-40 flex items-center justify-center lg:justify-end">
                                        <div className="flex items-center gap-2 text-red-200/60 font-bold text-[10px] uppercase tracking-widest bg-black/20 px-4 py-2 rounded-xl border border-white/5 text-white">
                                            <MapPin className="w-4 h-4 text-red-500 text-white" />
                                            {partido.local.esSanMartin ? 'La Ciudadela' : 'Visitante'}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Fixture;