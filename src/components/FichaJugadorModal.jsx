import { useEffect, useRef, useState } from "react";
import { X, MapPin, RotateCw } from "lucide-react";

const calcularEdad = (fechaString) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaString);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad;
};

const formatearFecha = (fechaISO) => {
    const [year, month, day] = fechaISO.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
};

// --- Palos de la baraja española (dibujos simples en una grilla de 48x48) ---
const REALCE = "#fffbeb";

const Oro = ({ className }) => (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <circle cx="24" cy="24" r="21" fill="currentColor" />
        <circle cx="24" cy="24" r="16" fill="none" stroke={REALCE} strokeWidth="2" />
        <circle cx="24" cy="24" r="6" fill={REALCE} />
        <g stroke={REALCE} strokeWidth="2" strokeLinecap="round">
            <path d="M24 10v5M24 33v5M10 24h5M33 24h5M14 14l3.5 3.5M30.5 30.5L34 34M34 14l-3.5 3.5M17.5 30.5L14 34" />
        </g>
    </svg>
);

const Copa = ({ className }) => (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <path d="M8 7h32c0 14-7 21-16 21S8 21 8 7z" fill="currentColor" />
        <path d="M13 11h22" stroke={REALCE} strokeWidth="2" strokeLinecap="round" />
        <rect x="21.5" y="28" width="5" height="9" fill="currentColor" />
        <path d="M12 43c0-4 5-6 12-6s12 2 12 6z" fill="currentColor" />
    </svg>
);

const Espada = ({ className }) => (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <path d="M24 2l5 7v22H19V9z" fill="currentColor" />
        <path d="M24 8v21" stroke={REALCE} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="10" y="31" width="28" height="4.5" rx="2.25" fill="currentColor" />
        <rect x="21.5" y="35" width="5" height="8" fill="currentColor" />
        <circle cx="24" cy="45" r="2.5" fill="currentColor" />
    </svg>
);

const Basto = ({ className }) => (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <path d="M24 2c8 0 11 6 10 12-1 6-4 9-4 16l2 17H16l2-17c0-7-3-10-4-16C13 8 16 2 24 2z" fill="currentColor" />
        <g fill="none" stroke={REALCE} strokeWidth="1.5" strokeLinecap="round">
            <path d="M20 9c1-2 3-3 5-3M19 22c2 1 5 1 8 0M20 34h8" />
        </g>
    </svg>
);

// Palo según la posición: arquero oro, defensor basto, volante copa, delantero espada
const PALOS = {
    Arquero: { nombre: "Oro", Icono: Oro, color: "text-amber-500" },
    Defensor: { nombre: "Basto", Icono: Basto, color: "text-green-800" },
    Volante: { nombre: "Copa", Icono: Copa, color: "text-red-700" },
    Delantero: { nombre: "Espada", Icono: Espada, color: "text-sky-800" },
};

// Número y palo en la esquina, como en las cartas
const Indice = ({ numero, palo, className }) => (
    <div className={`absolute flex flex-col items-center leading-none ${className}`}>
        <span className="font-titulo text-3xl md:text-4xl font-black text-red-800">{numero}</span>
        <palo.Icono className={`mt-1 h-6 w-6 md:h-7 md:w-7 ${palo.color}`} />
    </div>
);

// Renglón del dorso con puntos guía entre la etiqueta y el valor
const Fila = ({ etiqueta, valor }) => (
    <li className="flex items-baseline gap-2">
        <span className="shrink-0 text-[11px] md:text-xs font-black uppercase tracking-widest text-red-800">{etiqueta}</span>
        <span className="flex-1 border-b border-dotted border-red-800/40" />
        <span className="text-right text-sm md:text-base font-bold text-gray-800">{valor}</span>
    </li>
);

// Cifra de la franja roja de datos personales (edad, altura)
const Cifra = ({ etiqueta, valor, detalle }) => (
    <div className="px-2 text-center">
        <p className="text-[10px] md:text-xs font-bold text-red-200 uppercase tracking-widest">{etiqueta}</p>
        <p className="font-titulo text-3xl md:text-4xl font-black leading-tight">{valor}</p>
        {detalle && <p className="text-xs font-semibold text-red-200">{detalle}</p>}
    </div>
);

// Paso de la trayectoria: punto sobre la línea vertical
const Paso = ({ etiqueta, valor, actual }) => (
    <li className="relative">
        <span className={`absolute -left-[33px] top-1 h-4 w-4 rounded-full border-4 border-gray-50 ${actual ? "bg-red-700 scale-125" : "bg-gray-400"}`} />
        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">{etiqueta}</p>
        <p className="font-bold text-base md:text-lg text-gray-800">{valor}</p>
    </li>
);

const botonRojo = "rounded-full border border-red-500/60 bg-red-800 text-white shadow-md transition-colors hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white";

const FichaJugadorModal = ({ jugador, onClose }) => {
    const cerrarRef = useRef(null);
    const dialogRef = useRef(null);
    const [girada, setGirada] = useState(false);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose; // evita reiniciar el efecto si el padre pasa una función nueva en cada render

    // Esc cierra, el fondo no scrollea y el foco vuelve a donde estaba al cerrar
    useEffect(() => {
        if (!jugador) return;
        setGirada(false);
        const previo = document.activeElement;
        const onKey = (e) => e.key === "Escape" && onCloseRef.current();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        cerrarRef.current?.focus();
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
            previo?.focus?.();
        };
    }, [jugador]);

    if (!jugador) return null;

    // Posición del cursor dentro del cuadro (-1 a 1) en variables CSS: inclina el cuadro y mueve foto y dorsal con profundidad
    const fijarCursor = (x, y) => {
        dialogRef.current?.style.setProperty("--px", x);
        dialogRef.current?.style.setProperty("--py", y);
    };
    const moverCursor = (e) => {
        const r = dialogRef.current.getBoundingClientRect();
        fijarCursor(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const girar = () => setGirada((g) => !g);

    const palo = PALOS[jugador.posicion] || PALOS.Delantero;
    const edad = jugador.fechaNacimiento ? calcularEdad(jugador.fechaNacimiento) : null;
    const altura = jugador.altura ? `${Number(jugador.altura).toFixed(2).replace(".", ",")} m` : null;
    const cifras = [
        edad !== null && <Cifra key="edad" etiqueta="Edad" valor={`${edad} años`} detalle={formatearFecha(jugador.fechaNacimiento)} />,
        altura && <Cifra key="altura" etiqueta="Altura" valor={altura} />,
    ].filter(Boolean);
    const hayDatos = cifras.length > 0 || jugador.lugarNacimiento;
    const hayTrayectoria = jugador.procedencia || jugador.debutEnClub;

    return (
        <div
            className="ficha-fondo fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 md:p-4 backdrop-blur-sm"
            style={{ perspective: "1600px" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                ref={dialogRef}
                onMouseMove={moverCursor}
                onMouseLeave={() => fijarCursor(0, 0)}
                role="dialog"
                aria-modal="true"
                aria-label={`Ficha de ${jugador.nombre} ${jugador.apellido}`}
                className="ficha-entrada ficha-tilt relative w-full max-w-5xl rounded-t-3xl md:rounded-2xl shadow-2xl"
            >
                <div className="ficha-giro relative" style={{ transform: girada ? "rotateY(180deg)" : "none" }}>

                    {/* ================= FRENTE ================= */}
                    <div
                        onClick={girar}
                        inert={girada}
                        className="cara relative flex flex-col md:flex-row overflow-hidden rounded-t-3xl md:rounded-2xl bg-gray-50 max-h-[92vh] md:max-h-[88vh] md:min-h-[28rem] cursor-pointer"
                    >
                        <div className="ficha-brillo absolute inset-0 z-10 pointer-events-none" aria-hidden="true" />

                        {/* Botones del frente: viajan con la cara cuando la carta gira */}
                        <button
                            onClick={(e) => { e.stopPropagation(); girar(); }}
                            aria-label="Dar vuelta la carta"
                            className={`absolute top-2 right-12 z-20 flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold ${botonRojo}`}
                        >
                            <RotateCw className="w-4 h-4" />
                            <span className="hidden sm:inline">Dar vuelta</span>
                        </button>
                        <button
                            ref={cerrarRef}
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            aria-label="Cerrar ficha"
                            className={`absolute top-2 right-2 z-20 p-1.5 ${botonRojo}`}
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* FOTO A SANGRE con dorsal gigante y nombre */}
                        <div className="relative h-72 md:h-auto md:w-2/5 shrink-0 overflow-hidden bg-gradient-to-b from-red-800 to-red-950">
                            {jugador.imagenUrl ? (
                                <img src={jugador.imagenUrl} alt="" className="ficha-foto absolute inset-0 h-full w-full object-cover object-top" />
                            ) : (
                                <UserSilhouette />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-red-950/40 to-transparent" />

                            {jugador.numeroCamiseta && (
                                <span aria-hidden="true" className="ficha-dorsal absolute -bottom-4 right-2 select-none pointer-events-none font-titulo font-black leading-none text-[10rem] md:text-[14rem] text-white/20">
                                    {jugador.numeroCamiseta}
                                </span>
                            )}

                            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                                <span className="inline-block mb-2 rounded-full bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-widest text-white shadow-md">
                                    {jugador.posicion}
                                </span>
                                <p className="text-sm md:text-base font-bold text-white/80 uppercase tracking-widest leading-none">{jugador.nombre}</p>
                                <h2 className="font-titulo text-4xl md:text-5xl font-black text-white uppercase leading-none break-words">{jugador.apellido}</h2>
                            </div>
                        </div>

                        {/* DATOS */}
                        <div className="relative flex flex-col justify-center md:w-3/5 overflow-y-auto p-5 md:p-6">
                            {/* El escudo sobresale del panel: se recorta en un contenedor para que no genere scroll */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                                <div className="escudo-marca-roja absolute bottom-3 -right-4 h-32 w-32 md:h-44 md:w-44 rotate-12" />
                            </div>

                            <div className="relative space-y-6">
                                {hayDatos && (
                                    <section className="rounded-2xl bg-gradient-to-r from-red-800 to-red-950 p-4 md:p-5 text-white shadow-md">
                                        {cifras.length > 0 && (
                                            <div className={`grid divide-x divide-red-500/50 ${cifras.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                                                {cifras}
                                            </div>
                                        )}
                                        {jugador.lugarNacimiento && (
                                            <p className={`flex items-center justify-center gap-2 text-sm font-semibold ${cifras.length > 0 ? "mt-3 border-t border-red-500/50 pt-3" : ""}`}>
                                                <MapPin className="h-4 w-4 shrink-0 text-red-300" />
                                                {jugador.lugarNacimiento}
                                            </p>
                                        )}
                                    </section>
                                )}

                                {hayTrayectoria && (
                                    <section>
                                        <h3 className="inline-block mb-4 border-b-2 border-red-700 pb-1 font-titulo text-lg md:text-xl font-black uppercase tracking-widest text-gray-800">
                                            Trayectoria
                                        </h3>
                                        <ol className="ml-3 space-y-5 border-l-2 border-red-200 pl-6">
                                            {jugador.procedencia && <Paso etiqueta="Procedencia" valor={jugador.procedencia} />}
                                            {jugador.debutEnClub && <Paso etiqueta="Debut en San Martín" valor={jugador.debutEnClub} actual />}
                                        </ol>
                                    </section>
                                )}

                                {!hayDatos && !hayTrayectoria && (
                                    <p className="text-gray-500 font-medium">Todavía no hay datos cargados de este jugador.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ================= DORSO: CARTA DE TRUCO ================= */}
                    <div
                        onClick={girar}
                        inert={!girada}
                        style={{ transform: "rotateY(180deg)" }}
                        className="cara absolute inset-0 overflow-hidden rounded-t-3xl md:rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 p-2.5 md:p-4 cursor-pointer"
                    >
                        {/* Cerrar en el dorso: dentro del marco, sobre el papel */}
                        <button
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            aria-label="Cerrar ficha"
                            className={`absolute top-8 right-8 md:top-9 md:right-9 z-20 p-1.5 ${botonRojo}`}
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="h-full rounded-xl border-[5px] border-red-800 p-1.5">
                            <div className="relative h-full overflow-hidden rounded-lg border-2 border-amber-600/70 bg-[radial-gradient(circle,rgba(180,83,9,0.10)_1.5px,transparent_1.5px)] [background-size:16px_16px]">

                                <Indice numero={jugador.numeroCamiseta} palo={palo} className="left-3 top-2" />
                                <Indice numero={jugador.numeroCamiseta} palo={palo} className="right-3 bottom-2 rotate-180" />

                                <div className="flex h-full flex-col items-center justify-center gap-4 overflow-y-auto px-14 py-6 md:flex-row md:gap-10 md:px-28">
                                    {/* Medallón con el palo (solo en pantallas grandes) */}
                                    <div className="hidden shrink-0 flex-col items-center gap-3 md:flex">
                                        <div className="flex h-44 w-44 items-center justify-center rounded-full border-4 border-double border-amber-600/70 bg-amber-50 shadow-inner lg:h-52 lg:w-52">
                                            <palo.Icono className={`h-24 w-24 lg:h-28 lg:w-28 drop-shadow ${palo.color}`} />
                                        </div>
                                        <p className="font-titulo text-lg font-black uppercase tracking-widest text-red-800">
                                            {jugador.numeroCamiseta ? `${jugador.numeroCamiseta} de ${palo.nombre}` : palo.nombre}
                                        </p>
                                    </div>

                                    <div className="w-full min-w-0 max-w-md">
                                        <div className="flex items-center gap-3">
                                            <img src="/images/escudo.png" alt="" className="h-10 w-10 shrink-0 object-contain" />
                                            <div className="min-w-0 flex-1 text-center">
                                                <p className="text-xs font-bold uppercase tracking-widest leading-none text-gray-600">{jugador.nombre}</p>
                                                <h2 className="font-titulo text-3xl md:text-4xl font-black uppercase leading-none text-red-800 break-words">{jugador.apellido}</h2>
                                            </div>
                                            <palo.Icono className={`h-10 w-10 shrink-0 ${palo.color}`} />
                                        </div>

                                        {/* Adorno */}
                                        <div className="my-3 flex items-center gap-3" aria-hidden="true">
                                            <span className="h-px flex-1 bg-amber-600/60" />
                                            <palo.Icono className={`h-4 w-4 ${palo.color}`} />
                                            <span className="h-px flex-1 bg-amber-600/60" />
                                        </div>

                                        <ul className="space-y-2.5">
                                            <Fila etiqueta="Posición" valor={jugador.posicion} />
                                            {edad !== null && <Fila etiqueta="Edad" valor={`${edad} años`} />}
                                            {altura && <Fila etiqueta="Altura" valor={altura} />}
                                            {jugador.lugarNacimiento && <Fila etiqueta="Nació en" valor={jugador.lugarNacimiento} />}
                                            {jugador.procedencia && <Fila etiqueta="Viene de" valor={jugador.procedencia} />}
                                            {jugador.debutEnClub && <Fila etiqueta="Debut" valor={jugador.debutEnClub} />}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserSilhouette = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 -translate-y-1/2 text-white/30" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export default FichaJugadorModal;
