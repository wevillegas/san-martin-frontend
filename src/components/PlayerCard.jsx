import { imagenPlaceholder } from "../constants/placeholders";

// Tarjeta de jugador compartida por Plantel y el carrusel del inicio.
// Usa un grupo con nombre (group/card) para que el hover no se mezcle con el `group` del carrusel.
const PlayerCard = ({ player, onSelectPlayer }) => (
    <button
        onClick={() => onSelectPlayer(player)}
        aria-label={`${player.nombre} ${player.apellido}, ${player.posicion}${player.numeroCamiseta ? `, camiseta ${player.numeroCamiseta}` : ""}`}
        className="group/card block h-full w-full text-left cursor-pointer"
    >
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 card-santo">
            <img
                src={player.imagenUrl || imagenPlaceholder}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Dorsal gigante de fondo */}
            {player.numeroCamiseta && (
                <span
                    aria-hidden="true"
                    className="absolute -bottom-3 right-2 select-none pointer-events-none font-titulo font-black leading-none text-[8rem] text-white/20 transition-all duration-500 group-hover/card:-translate-y-1 group-hover/card:text-white/35"
                >
                    {player.numeroCamiseta}
                </span>
            )}

            <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="mb-1 text-xs font-bold text-red-300 uppercase tracking-widest">{player.posicion}</p>
                <p className="text-sm font-bold text-white/80 uppercase tracking-widest leading-none">{player.nombre}</p>
                <h3 className="font-titulo text-2xl md:text-3xl font-black text-white uppercase tracking-wide leading-tight break-words">
                    {player.apellido}
                </h3>
            </div>
        </div>
    </button>
);

export default PlayerCard;
