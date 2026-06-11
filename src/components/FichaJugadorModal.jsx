import { X, Calendar, MapPin, Ruler, Shield, ArrowUpRight } from "lucide-react";

const FichaJugadorModal = ({ jugador, onClose }) => {
    if (!jugador) return null;

    const calcularEdad = (fechaString) => {
        if (!fechaString) return "N/D";
        const hoy = new Date();
        const nacimiento = new Date(fechaString);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    };

    const formatearFecha = (fechaISO) => {
        if (!fechaISO) return "-";
        const [year, month, day] = fechaISO.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 md:p-4 backdrop-blur-sm transition-all">
            
            {/* 1. CONTENEDOR PRINCIPAL FIJO (El marco del cuadro) */}
            <div className="bg-white w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] rounded-2xl shadow-2xl relative flex flex-col animate-in fade-in zoom-in-95 duration-200 overflow-hidden">

                {/* BOTÓN CERRAR: Absoluto al marco, SIEMPRE visible */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 md:top-4 md:right-4 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors z-[60]"
                >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* 2. CONTENEDOR INTERNO SCROLLEABLE (Acá adentro fluye el contenido) */}
                <div className="w-full h-full overflow-y-auto flex flex-col md:flex-row">

                    {/* COLUMNA IZQUIERDA: Área Visual */}
                    <div className="md:w-2/5 bg-gradient-to-b from-red-800 to-red-950 text-white p-6 pt-12 md:p-8 flex flex-col items-center justify-center relative shrink-0">
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-700 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>

                        <div className="relative z-10 flex flex-col items-center">
                            {/* FOTO: Más chica en celular (w-32) y grande en PC (md:w-48) */}
                            <div className="w-32 h-32 md:w-48 md:h-48 bg-white/10 border-4 border-white/20 rounded-full flex items-center justify-center mb-4 md:mb-6 overflow-hidden backdrop-blur-sm shadow-xl">
                                {jugador.imagenUrl ? (
                                    <img src={jugador.imagenUrl} alt={jugador.nombre} className="w-full h-full object-cover" />
                                ) : (
                                    <UserSilhouette />
                                )}
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black uppercase text-center tracking-tight mb-1">
                                {jugador.nombre} <br /> {jugador.apellido}
                            </h2>
                            <p className="text-red-200 font-bold tracking-widest uppercase text-xs md:text-sm border-b border-red-500/50 pb-2 mb-4">
                                {jugador.posicion}
                            </p>

                            <div className="flex items-center justify-center gap-2">
                                <span className="text-xs md:text-sm font-bold text-red-200 uppercase tracking-widest">Dorsal</span>
                                <span className="text-4xl md:text-5xl font-black bg-white text-red-900 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-inner">
                                    {jugador.numeroCamiseta}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Información Técnica */}
                    <div className="md:w-3/5 p-5 md:p-8 bg-gray-50 flex flex-col justify-start">

                        <div className="mb-6">
                            <h3 className="text-lg md:text-xl font-black text-gray-800 uppercase tracking-widest border-b-2 border-red-700 pb-2 inline-block mb-4">
                                Ficha Técnica
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-y-6 md:gap-x-4">
                                <div className="flex gap-3 items-start">
                                    <Calendar className="w-5 h-5 text-red-700 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Nacimiento (Edad)</p>
                                        <p className="font-bold text-sm md:text-base text-gray-800">
                                            {formatearFecha(jugador.fechaNacimiento)}
                                            <span className="text-red-700 ml-1">({calcularEdad(jugador.fechaNacimiento)} años)</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <MapPin className="w-5 h-5 text-red-700 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Lugar</p>
                                        <p className="font-bold text-sm md:text-base text-gray-800">{jugador.lugarNacimiento || 'N/D'}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <Ruler className="w-5 h-5 text-red-700 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Altura</p>
                                        <p className="font-bold text-sm md:text-base text-gray-800">{jugador.altura ? `${jugador.altura} m` : 'N/D'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg md:text-xl font-black text-gray-800 uppercase tracking-widest border-b-2 border-red-700 pb-2 inline-block mb-4">
                                Trayectoria
                            </h3>

                            <div className="space-y-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex gap-3 items-start">
                                    <ArrowUpRight className="w-5 h-5 text-red-700 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Procedencia</p>
                                        <p className="font-bold text-sm md:text-base text-gray-800">{jugador.procedencia || 'N/D'}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <Shield className="w-5 h-5 text-red-700 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Debut en San Martín</p>
                                        <p className="font-bold text-sm md:text-base text-gray-800">{jugador.debutEnClub || 'N/D'}</p>
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-20 h-20 md:w-24 md:h-24 text-white/50" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export default FichaJugadorModal;