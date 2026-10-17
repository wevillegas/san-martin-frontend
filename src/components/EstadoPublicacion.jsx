import { Send, FileEdit, CalendarClock } from "lucide-react";

const OPCIONES = [
    { modo: "ahora", titulo: "Publicar ahora", ayuda: "Se ve en el sitio apenas la guardes.", Icono: Send },
    { modo: "borrador", titulo: "Borrador", ayuda: "No se ve en el sitio. Podés seguir editándola.", Icono: FileEdit },
    { modo: "programar", titulo: "Programar", ayuda: "Se publica sola en la fecha y hora que elijas.", Icono: CalendarClock },
];

// ISO -> valor de <input type="datetime-local"> en la hora local
export const aInputLocal = (iso) => {
    const d = new Date(iso);
    return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

// Cómo está hoy una noticia ya guardada
export const modoInicial = (nota) =>
    nota.estado === "borrador" ? "borrador" : nota.publicarEn && new Date(nota.publicarEn) > new Date() ? "programar" : "ahora";

// Campos que se agregan al FormData. `original` = publicarEn que ya tenía (se conserva si ya estaba publicada)
export const camposDeEstado = (modo, fecha, original) => ({
    estado: modo === "borrador" ? "borrador" : "publicada",
    publicarEn: modo === "programar" ? new Date(fecha).toISOString() : original && new Date(original) <= new Date() ? original : "",
});

export const textoBoton = (modo, base) =>
    modo === "borrador" ? "Guardar Borrador" : modo === "programar" ? "Programar Publicación" : base;

const EstadoPublicacion = ({ modo, fecha, onModo, onFecha }) => (
    <fieldset>
        <legend className="mb-2 block text-sm font-black uppercase tracking-widest text-gray-700">Publicación</legend>
        <div className="grid gap-3 md:grid-cols-3">
            {OPCIONES.map(({ modo: m, titulo, ayuda, Icono }) => (
                <label
                    key={m}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${modo === m ? "border-red-600 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
                >
                    <input type="radio" name="modoPublicacion" value={m} checked={modo === m} onChange={() => onModo(m)} className="sr-only" />
                    <Icono className={`mt-0.5 h-5 w-5 shrink-0 ${modo === m ? "text-red-700" : "text-gray-400"}`} />
                    <span>
                        <span className="block font-bold text-gray-800">{titulo}</span>
                        <span className="block text-xs text-gray-500">{ayuda}</span>
                    </span>
                </label>
            ))}
        </div>
        {modo === "programar" && (
            <div className="mt-3">
                <label htmlFor="publicarEn" className="mb-1.5 block text-xs font-black uppercase tracking-widest text-gray-600">Fecha y hora de publicación</label>
                <input
                    id="publicarEn" type="datetime-local" required value={fecha} onChange={(e) => onFecha(e.target.value)}
                    min={aInputLocal(new Date())}
                    className="rounded-lg border border-gray-200 px-4 py-2.5 font-medium text-gray-800 outline-none focus:ring-2 focus:ring-red-500"
                />
            </div>
        )}
    </fieldset>
);

export default EstadoPublicacion;
