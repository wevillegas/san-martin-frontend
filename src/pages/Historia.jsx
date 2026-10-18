import { useEffect, useRef, useState } from "react";
import { Calendar, Trophy, Star, ArrowUpCircle, Church } from "lucide-react";
import Reveal from "../components/Reveal";
import EscudosFondo from "../components/EscudosFondo";
import { HITOS_HISTORICOS } from "../data/historia";
import { usePagina } from "../hooks/usePagina";

const imagenPlaceholder = "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=1000&auto=format&fit=crop";

const ICONOS = {
    calendario: <Calendar className="w-6 h-6 text-white" />,
    trofeo: <Trophy className="w-6 h-6 text-white" />,
    estrella: <Star className="w-6 h-6 text-white" />,
    ascenso: <ArrowUpCircle className="w-6 h-6 text-white" />,
    iglesia: <Church className="w-6 h-6 text-white" />,
};

const hitosHistoricos = HITOS_HISTORICOS.map((h) => ({ ...h, icono: ICONOS[h.icono] }));


// Año corto para el fondo de la tarjeta: "1919-1931" -> "1919"
const anioCorto = (año) => año.split(/[\s-]/)[0];

const Icono = ({ hito, activo, className }) => (
    <div className={`${className} rounded-full border-4 border-white shadow-xl flex items-center justify-center transition-all duration-500 ${activo ? `${hito.color} scale-110 ring-4 ring-red-200/70` : "bg-gray-400"}`}>
        {hito.icono}
    </div>
);

const TarjetaTexto = ({ hito, derecha }) => {
    const d = hito.destacado;
    return (
        <div className={`relative overflow-hidden p-6 md:p-8 rounded-2xl shadow-xl border-t-4 card-santo ${d ? "bg-gradient-to-br from-red-800 to-red-950 border-yellow-400" : "bg-white border-red-700"} ${derecha ? "text-left md:text-right" : "text-left"}`}>
            <span
                aria-hidden="true"
                className={`absolute -bottom-6 select-none pointer-events-none font-titulo font-black leading-none text-[7rem] md:text-[9rem] ${derecha ? "md:left-3 right-3 md:right-auto" : "right-3"} ${d ? "text-white/10" : "text-red-700/[0.06]"}`}
            >
                {anioCorto(hito.año)}
            </span>
            {d && (
                <div className="relative mb-3">
                    <span className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                        <Star className="w-3 h-3 fill-yellow-900" />
                        Hito histórico
                    </span>
                </div>
            )}
            <span
                className={`relative inline-block text-3xl md:text-4xl font-black font-titulo mb-2 ${d ? "text-transparent" : "text-red-100"}`}
                style={{ WebkitTextStroke: `1px ${d ? "#facc15" : "#b91c1c"}` }}
            >
                {hito.año}
            </span>
            <h3 className={`relative uppercase tracking-wide mb-3 font-black ${d ? "text-2xl md:text-3xl text-white" : "text-xl md:text-2xl text-gray-800"}`}>
                {hito.titulo}
            </h3>
            <p className={`relative leading-relaxed text-sm md:text-base ${d ? "text-red-100" : "text-gray-600"}`}>
                {hito.descripcion}
            </p>
        </div>
    );
};

const TarjetaFoto = ({ hito }) => (
    <div className={`overflow-hidden rounded-2xl shadow-xl aspect-video w-full bg-white border border-gray-100 foto-zoom ${hito.destacado ? "ring-4 ring-yellow-400" : ""}`}>
        <img
            src={hito.imagenUrl || imagenPlaceholder}
            alt={hito.titulo}
            className="w-full h-full object-cover"
        />
    </div>
);

const Historia = () => {
    usePagina({"titulo": "Nuestra historia", "descripcion": "Desde la fundación el 2 de noviembre de 1909 hasta hoy: los hitos del Club Atlético San Martín de Tucumán."});
    const imagenCabecera = "/images/copa-republica-color.jpg";
    const lineaRef = useRef(null);
    const [activos, setActivos] = useState(0);

    // La línea roja se rellena con el scroll y los íconos se encienden al alcanzarlos
    useEffect(() => {
        const cont = lineaRef.current;
        if (!cont) return;
        let raf = 0;
        const actualizar = () => {
            const rect = cont.getBoundingClientRect();
            const px = Math.max(0, Math.min(window.innerHeight * 0.6 - rect.top, rect.height));
            cont.style.setProperty("--progreso", px / rect.height);
            const escritorio = window.innerWidth >= 768;
            let n = 0;
            cont.querySelectorAll("[data-hito]").forEach((el) => {
                if (el.offsetTop + (escritorio ? el.offsetHeight / 2 : 20) <= px) n++;
            });
            setActivos(n);
        };
        const pedir = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(actualizar);
        };
        actualizar();
        window.addEventListener("scroll", pedir, { passive: true });
        window.addEventListener("resize", pedir);
        window.addEventListener("load", pedir);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", pedir);
            window.removeEventListener("resize", pedir);
            window.removeEventListener("load", pedir);
        };
    }, []);

    return (
        <div className="relative isolate overflow-hidden min-h-screen bg-gradient-to-b from-gray-200 via-gray-50 to-white pb-24">

            <EscudosFondo />

            {/* Cabecera Épica */}
            <div className="relative w-full h-[500px] md:h-[600px] shadow-xl">
                <img
                    src={imagenCabecera}
                    alt="Historia de San Martín de Tucumán"
                    className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-red-900/80 to-red-900/40" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <span className="bg-red-700 text-white text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-lg">
                        2 de noviembre de 1909
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-wider drop-shadow-lg">
                        Nuestra Historia
                    </h1>
                    <p className="mt-6 text-red-100 font-medium text-lg md:text-xl max-w-2xl text-balance drop-shadow-md">
                        Más de un siglo de pasión, lucha y gloria. El club más popular y convocante del norte argentino, forjado por el pueblo y para el pueblo. De Barrio Ciudadela para todo el país.
                    </p>
                </div>
            </div>

            {/* Contenido Principal - Línea de Tiempo */}
            <div className="max-w-6xl mx-auto px-4 mt-20 relative">

                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-800 uppercase tracking-wider mb-4 drop-shadow-sm">La línea de tiempo</h2>
                    <div className="w-24 h-1.5 bg-red-700 mx-auto rounded-full shadow-sm"></div>
                </div>

                <div ref={lineaRef} className="relative">
                    {/* Línea vertical (escritorio al centro, móvil a la izquierda): pista gris + relleno rojo que avanza con el scroll */}
                    {["hidden md:block left-1/2", "md:hidden left-8"].map((pos) => (
                        <div key={pos} className={`absolute ${pos} top-0 bottom-0 w-1 -translate-x-1/2 rounded-full bg-gray-300`}>
                            <div className="h-full w-full origin-top rounded-full bg-red-700" style={{ transform: "scaleY(var(--progreso, 0))" }} />
                        </div>
                    ))}

                    <div className="space-y-16 md:space-y-20">
                        {hitosHistoricos.map((hito, index) => {
                            const isEven = index % 2 === 0;
                            const activo = index < activos;

                            return (
                                <Reveal key={hito.año} data-hito className="relative flex flex-col md:flex-row items-center justify-between w-full">

                                    {/* Icono Flotante para Móviles */}
                                    <Icono hito={hito} activo={activo} className="md:hidden absolute left-8 -translate-x-1/2 w-10 h-10 z-20 top-0" />

                                    {/* Columna izquierda: texto si es par, foto si es impar */}
                                    <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? "order-2 md:order-1 mt-6 md:mt-0" : "order-1 md:order-1"}`}>
                                        {isEven ? <TarjetaTexto hito={hito} derecha /> : <TarjetaFoto hito={hito} />}
                                    </div>

                                    {/* Columna central: carril del ícono */}
                                    <div className="hidden md:flex w-2/12 justify-center items-center z-20 md:order-2">
                                        <Icono hito={hito} activo={activo} className="w-14 h-14" />
                                    </div>

                                    {/* Columna derecha: foto si es par, texto si es impar */}
                                    <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? "order-1 md:order-3" : "order-2 md:order-3 mt-6 md:mt-0"}`}>
                                        {isEven ? <TarjetaFoto hito={hito} /> : <TarjetaTexto hito={hito} />}
                                    </div>

                                </Reveal>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Historia;