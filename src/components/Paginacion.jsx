import { ChevronLeft, ChevronRight } from "lucide-react";
import { POR_PAGINA, rangoPaginas } from "../utils/paginacion";

const base = "h-9 min-w-8 rounded-lg border px-2 text-sm font-bold sm:min-w-9 sm:px-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-1";
const inactivo = "border-gray-300 bg-white text-gray-700 hover:border-red-700 hover:text-red-700";
const activo = "border-red-700 bg-red-700 text-white shadow-sm";
const deshabilitado = "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-300 disabled:hover:text-gray-700";

// Paginación de las tablas del panel. No se muestra mientras haya `porPagina` elementos o menos.
// total = cantidad de elementos; pagina empieza en 1; onCambio recibe el número de página nueva.
const Paginacion = ({ total, porPagina = POR_PAGINA, pagina, onCambio, className = "" }) => {
    if (total <= porPagina) return null;

    const totalPaginas = Math.ceil(total / porPagina);
    const desde = (pagina - 1) * porPagina + 1;
    const hasta = Math.min(pagina * porPagina, total);

    return (
        <nav aria-label="Paginación" className={`mt-5 flex flex-col items-center gap-3 md:flex-row md:justify-between ${className}`}>
            <p className="text-sm font-medium text-gray-500">
                Mostrando <strong className="text-gray-800">{desde}–{hasta}</strong> de <strong className="text-gray-800">{total}</strong>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-1.5">
                <button
                    onClick={() => onCambio(pagina - 1)}
                    disabled={pagina <= 1}
                    aria-label="Página anterior"
                    className={`${base} ${inactivo} ${deshabilitado} flex items-center gap-1`}
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Anterior</span>
                </button>

                {/* Celular: indicador compacto, siempre entra en una fila */}
                <span className="px-3 text-sm font-bold text-gray-700 sm:hidden" aria-live="polite">
                    Página <span className="text-red-700">{pagina}</span> de {totalPaginas}
                </span>

                {rangoPaginas(pagina, totalPaginas).map((p, i) =>
                    p === "…" ? (
                        <span key={`puntos-${i}`} className="hidden px-1 text-gray-400 sm:inline" aria-hidden="true">…</span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onCambio(p)}
                            aria-label={`Página ${p}`}
                            aria-current={p === pagina ? "page" : undefined}
                            className={`${base} ${p === pagina ? activo : inactivo} hidden sm:inline-block`}
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                    onClick={() => onCambio(pagina + 1)}
                    disabled={pagina >= totalPaginas}
                    aria-label="Página siguiente"
                    className={`${base} ${inactivo} ${deshabilitado} flex items-center gap-1`}
                >
                    <span className="hidden sm:inline">Siguiente</span>
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </nav>
    );
};

export default Paginacion;
