import { useState, useEffect } from "react";
// Importamos useLocation para poder "leer" la URL
import { Link, useLocation } from "react-router-dom";
import { obtenerJugadores } from "../services/jugadorService";
// IMPORTAMOS EL SERVICIO DEL CUERPO TÉCNICO
import { obtenerCuerpoTecnico } from "../services/cuerpoTecnicoService";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import FichaJugadorModal from "../components/FichaJugadorModal";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const imagenPlaceholder = "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=1000&auto=format&fit=crop";

// --- COMPONENTES VISUALES ---

const PlayerCard = ({ player, onSelectPlayer }) => (
    <button
        onClick={() => onSelectPlayer(player)}
        className="group block w-full text-left cursor-pointer"
    >
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                    src={player.imagenUrl ? `${player.imagenUrl}?t=${new Date().getTime()}` : imagenPlaceholder}
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

// ACTUALIZAMOS STAFFCARD PARA QUE LEA LOS DATOS REALES (nombre, apellido, rol, imagenUrl)
const StaffCard = ({ staff }) => (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
            <img
                src={staff.imagenUrl ? `${staff.imagenUrl}?t=${new Date().getTime()}` : imagenPlaceholder}
                alt={`${staff.nombre} ${staff.apellido}`}
                // CHAU GRIS: Ahora la imagen es a todo color desde el principio
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Degradado idéntico al de los jugadores */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                <h3 className="text-xl font-black text-white uppercase leading-tight tracking-wide">
                    {staff.nombre} <br /> {staff.apellido}
                </h3>
                {/* Bajada de rol en rojo para mantener la estética de las tarjetas de jugadores */}
                <p className="text-sm font-bold text-red-400 mt-1 uppercase tracking-widest">{staff.rol}</p>
            </div>
        </div>
    </div>
);

// --- COMPONENTE PRINCIPAL ---
const Plantel = () => {
    const location = useLocation(); // Hook para leer la URL actual
    const [jugadores, setJugadores] = useState([]);

    // NUEVO ESTADO: Guardamos el cuerpo técnico real de la base de datos
    const [cuerpoTecnico, setCuerpoTecnico] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [activeTab, setActiveTab] = useState("jugadores");
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

    // EFECTO 1: Para setear la pestaña inicial según la URL (Navbar)
    useEffect(() => {
        // Si el usuario entró a "localhost:5173/plantel/cuerpo-tecnico", activamos esa pestaña.
        // Si entró a "/plantel", activamos "jugadores".
        if (location.pathname.includes("cuerpo-tecnico")) {
            setActiveTab("cuerpo-tecnico");
        } else {
            setActiveTab("jugadores");
        }
    }, [location]); // Se vuelve a ejecutar si la URL cambia

    // EFECTO 2: Cargar ambos conjuntos de datos desde la Base de Datos
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Promise.all nos permite buscar ambas cosas a la vez para que cargue más rápido
                const [datosJugadores, datosCT] = await Promise.all([
                    obtenerJugadores(),
                    obtenerCuerpoTecnico()
                ]);

                setJugadores(datosJugadores);
                setCuerpoTecnico(datosCT);
                setCargando(false);
            } catch (error) {
                console.error("Error al cargar los datos del plantel y CT");
                setCargando(false);
            }
        };
        cargarDatos();
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
                    <h1 className="text-3xl font-black text-white md:text-5xl uppercase tracking-wider">Plantel Profesional</h1>
                    <p className="mt-3 text-red-100 font-medium text-lg">
                        Conocé a los jugadores y cuerpo técnico de San Martín para la temporada 2026
                    </p>
                </div>
            </section>

            <section className="py-10">
                <div className="mx-auto max-w-7xl px-4">

                    <div className="flex space-x-2 border-b border-gray-300 mb-8 overflow-x-auto">
                        {/* Usamos Link en lugar de button para cambiar la URL y que se active el useEffect */}
                        <Link
                            to="/plantel"
                            className={cn(
                                "px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap",
                                activeTab === "jugadores"
                                    ? "border-b-4 border-red-600 text-red-700 bg-red-50/50"
                                    : "text-gray-500 hover:text-red-600 hover:bg-gray-100"
                            )}
                        >
                            Jugadores
                        </Link>
                        <Link
                            to="/plantel/cuerpo-tecnico"
                            className={cn(
                                "px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap",
                                activeTab === "cuerpo-tecnico"
                                    ? "border-b-4 border-red-600 text-red-700 bg-red-50/50"
                                    : "text-gray-500 hover:text-red-600 hover:bg-gray-100"
                            )}
                        >
                            Cuerpo Técnico
                        </Link>
                    </div>

                    {activeTab === "jugadores" && (
                        <div className="space-y-12 relative z-0">
                            {jugadores.length === 0 && (
                                <p className="text-gray-500 text-center py-10">Todavía no hay jugadores cargados en la base de datos.</p>
                            )}

                            {arqueros.length > 0 && (
                                <div>
                                    <h2 className="mb-6 flex items-center gap-3 text-2xl font-black uppercase text-gray-800 tracking-wider">
                                        <span className="h-6 w-2 rounded bg-red-600"></span> Arqueros
                                    </h2>
                                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {arqueros.map((player) => (
                                            <PlayerCard key={player._id} player={player} onSelectPlayer={setJugadorSeleccionado} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {defensores.length > 0 && (
                                <div>
                                    <h2 className="mb-6 flex items-center gap-3 text-2xl font-black uppercase text-gray-800 tracking-wider">
                                        <span className="h-6 w-2 rounded bg-red-600"></span> Defensores
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
                                        <span className="h-6 w-2 rounded bg-red-600"></span> Mediocampistas
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
                                        <span className="h-6 w-2 rounded bg-red-600"></span> Delanteros
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
                        <div className="space-y-12 relative z-0">
                            {cuerpoTecnico.length === 0 ? (
                                <p className="text-gray-500 text-center py-10 font-medium">Todavía no hay miembros del cuerpo técnico cargados.</p>
                            ) : (
                                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {cuerpoTecnico.map((staff) => (
                                        <StaffCard key={staff._id} staff={staff} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </section>

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