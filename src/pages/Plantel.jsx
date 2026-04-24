import { useState, useEffect } from "react";
// Ya no necesitamos 'Link' porque abriremos un modal, pero lo dejamos por si lo usas en el navbar
import { Link } from "react-router-dom";
import { obtenerJugadores } from "../services/jugadorService";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// IMPORTAMOS EL MODAL DE LA FICHA TÉCNICA
import FichaJugadorModal from "../components/FichaJugadorModal";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Datos estáticos temporales para el Cuerpo Técnico
const cuerpoTecnico = [
    { id: 100, name: "Roberto Sosa", role: "Director Técnico" },
    { id: 101, name: "Marcelo Vega", role: "Ayudante de Campo" },
    { id: 102, name: "Daniel Acosta", role: "Preparador Físico" },
    { id: 103, name: "Jorge Mendoza", role: "Entrenador de Arqueros" },
];

const imagenPlaceholder = "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=1000&auto=format&fit=crop";

// --- COMPONENTES VISUALES DE LAS TARJETAS ---
// Ahora PlayerCard recibe la función onSelectPlayer
const PlayerCard = ({ player, onSelectPlayer }) => (
    // Cambiamos el <Link> por un <button> que ejecuta la función al hacer clic
    <button
        onClick={() => onSelectPlayer(player)}
        className="group block w-full text-left"
    >
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                    src={imagenPlaceholder}
                    alt={`${player.nombre} ${player.apellido}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-xl font-black text-white shadow-lg border-2 border-red-800">
                    {player.numeroCamiseta || "-"}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-black text-white uppercase tracking-wide leading-tight">
                        {player.nombre} <br /> {player.apellido}
                    </h3>
                    <p className="text-sm font-bold text-red-400 mt-1 uppercase tracking-widest">{player.posicion}</p>
                </div>
            </div>
        </div>
    </button>
);

const StaffCard = ({ staff }) => (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
            <img
                src={imagenPlaceholder}
                alt={staff.name}
                className="w-full h-full object-cover grayscale transition-transform duration-500 hover:grayscale-0 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                <h3 className="text-lg font-black text-white uppercase">{staff.name}</h3>
                <p className="text-sm font-bold text-red-400 uppercase tracking-widest">{staff.role}</p>
            </div>
        </div>
    </div>
);

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
const Plantel = () => {
    const [jugadores, setJugadores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [activeTab, setActiveTab] = useState("jugadores");

    // NUEVO ESTADO: Controla qué jugador está seleccionado para mostrar el Modal
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

    useEffect(() => {
        const cargarJugadores = async () => {
            try {
                const datos = await obtenerJugadores();
                setJugadores(datos);
                setCargando(false);
            } catch (error) {
                console.error("Error al cargar el plantel");
                setCargando(false);
            }
        };
        cargarJugadores();
    }, []);

    const arqueros = jugadores.filter(j => j.posicion.toLowerCase().includes("arquero"));
    const defensores = jugadores.filter(j => j.posicion.toLowerCase().includes("defensor") || j.posicion.toLowerCase().includes("defensa"));
    const mediocampistas = jugadores.filter(j => j.posicion.toLowerCase().includes("medio") || j.posicion.toLowerCase().includes("volante"));
    const delanteros = jugadores.filter(j => j.posicion.toLowerCase().includes("delantero") || j.posicion.toLowerCase().includes("ataque"));

    if (cargando) {
        return <div className="text-center mt-32 text-xl font-bold text-red-700 min-h-screen">Cargando plantel profesional...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pb-20 relative">
            <section className="bg-red-800 py-12 border-b-4 border-red-900">
                <div className="mx-auto max-w-7xl px-4">
                    <h1 className="text-3xl font-black text-white md:text-5xl uppercase tracking-wider shadow-sm">Plantel Profesional</h1>
                    <p className="mt-3 text-red-100 font-medium text-lg">
                        Conocé a los jugadores que defienden la camiseta del Santo esta temporada
                    </p>
                </div>
            </section>

            <section className="py-10">
                <div className="mx-auto max-w-7xl px-4">

                    <div className="flex space-x-2 border-b border-gray-300 mb-8 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab("jugadores")}
                            className={cn(
                                "px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap",
                                activeTab === "jugadores"
                                    ? "border-b-4 border-red-600 text-red-700 bg-red-50/50"
                                    : "text-gray-500 hover:text-red-600 hover:bg-gray-100"
                            )}
                        >
                            Jugadores
                        </button>
                        <button
                            onClick={() => setActiveTab("cuerpo-tecnico")}
                            className={cn(
                                "px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap",
                                activeTab === "cuerpo-tecnico"
                                    ? "border-b-4 border-red-600 text-red-700 bg-red-50/50"
                                    : "text-gray-500 hover:text-red-600 hover:bg-gray-100"
                            )}
                        >
                            Cuerpo Técnico
                        </button>
                    </div>

                    {activeTab === "jugadores" && (
                        <div className="space-y-12 relative z-0">
                            {jugadores.length === 0 && (
                                <p className="text-gray-500 text-center py-10">Todavía no hay jugadores cargados en la base de datos.</p>
                            )}

                            {arqueros.length > 0 && (
                                <div>
                                    <h2 className="mb-6 flex items-center gap-3 text-2xl font-black uppercase text-gray-800 tracking-wider">
                                        <span className="h-6 w-2 rounded bg-red-600"></span>
                                        Arqueros
                                    </h2>
                                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {/* Pasamos la función setJugadorSeleccionado al componente de la tarjeta */}
                                        {arqueros.map((player) => (
                                            <PlayerCard key={player._id} player={player} onSelectPlayer={setJugadorSeleccionado} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {defensores.length > 0 && (
                                <div>
                                    <h2 className="mb-6 flex items-center gap-3 text-2xl font-black uppercase text-gray-800 tracking-wider">
                                        <span className="h-6 w-2 rounded bg-red-600"></span>
                                        Defensores
                                    </h2>
                                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {defensores.map((player) => (
                                            <PlayerCard key={player._id} player={player} onSelectPlayer={setJugadorSeleccionado} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {mediocampistas.length > 0 && (
                                <div>
                                    <h2 className="mb-6 flex items-center gap-3 text-2xl font-black uppercase text-gray-800 tracking-wider">
                                        <span className="h-6 w-2 rounded bg-red-600"></span>
                                        Mediocampistas
                                    </h2>
                                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {mediocampistas.map((player) => (
                                            <PlayerCard key={player._id} player={player} onSelectPlayer={setJugadorSeleccionado} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {delanteros.length > 0 && (
                                <div>
                                    <h2 className="mb-6 flex items-center gap-3 text-2xl font-black uppercase text-gray-800 tracking-wider">
                                        <span className="h-6 w-2 rounded bg-red-600"></span>
                                        Delanteros
                                    </h2>
                                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {delanteros.map((player) => (
                                            <PlayerCard key={player._id} player={player} onSelectPlayer={setJugadorSeleccionado} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "cuerpo-tecnico" && (
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {cuerpoTecnico.map((staff) => (
                                <StaffCard key={staff.id} staff={staff} />
                            ))}
                        </div>
                    )}

                </div>
            </section>

            {/* --- RENDERIZAMOS EL MODAL AL FINAL (SÓLO SI HAY SELECCIONADO) --- */}
            {jugadorSeleccionado && (
                <FichaJugadorModal
                    jugador={jugadorSeleccionado}
                    onClose={() => setJugadorSeleccionado(null)}
                />
            )}
        </div>
    );
}

export default Plantel;