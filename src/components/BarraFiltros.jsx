import { Search } from "lucide-react";

// Para comparar sin importar mayúsculas ni tildes ("Peñarol" == "penarol")
export const normalizar = (texto = "") => String(texto).normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const selectClase = "border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500";

// Buscador y filtros para las listas del panel. filtros: [{ etiqueta, valor, onChange, opciones: ["a", { valor, texto }] }]
const BarraFiltros = ({ busqueda, onBusqueda, placeholder = "Buscar...", filtros = [], mostrados, total }) => (
    <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[14rem] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
                type="search"
                value={busqueda}
                onChange={(e) => onBusqueda(e.target.value)}
                placeholder={placeholder}
                aria-label={placeholder}
                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-gray-800 outline-none focus:ring-2 focus:ring-red-500"
            />
        </div>
        {filtros.map((f) => (
            <select key={f.etiqueta} aria-label={f.etiqueta} value={f.valor} onChange={(e) => f.onChange(e.target.value)} className={selectClase}>
                <option value="">{f.etiqueta}</option>
                {f.opciones.map((o) => {
                    const { valor, texto } = typeof o === "string" ? { valor: o, texto: o } : o;
                    return <option key={valor} value={valor}>{texto}</option>;
                })}
            </select>
        ))}
        <p className="text-sm font-medium text-gray-500">{mostrados} de {total}</p>
    </div>
);

export default BarraFiltros;
