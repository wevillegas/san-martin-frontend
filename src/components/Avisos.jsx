import { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef } from "react";
import { CheckCircle2, AlertTriangle, Info, X, Trash2 } from "lucide-react";

const AvisosContext = createContext(null);

// avisar(texto, tipo = "ok" | "error" | "info", milisegundos)  -> cartel que desaparece solo
// confirmar({ titulo, mensaje, textoConfirmar, peligro })        -> Promise<boolean>, reemplaza a window.confirm
export const useAvisos = () => useContext(AvisosContext);

const ESTILOS = {
    ok: { clase: "border-green-300 bg-green-50 text-green-900", Icono: CheckCircle2 },
    error: { clase: "border-red-300 bg-red-50 text-red-900", Icono: AlertTriangle },
    info: { clase: "border-amber-300 bg-amber-50 text-amber-900", Icono: Info },
};

const Dialogo = ({ dialogo, onResponder }) => {
    const cancelarRef = useRef(null);

    // Esc cancela; el foco arranca en "Cancelar" para que Enter no confirme una baja por error
    useEffect(() => {
        cancelarRef.current?.focus();
        const onKey = (e) => e.key === "Escape" && onResponder(false);
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onResponder]);

    const { titulo = "¿Estás seguro?", mensaje, textoConfirmar = "Confirmar", peligro = false } = dialogo;

    return (
        <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onResponder(false)}
        >
            <div role="alertdialog" aria-modal="true" aria-labelledby="dialogo-titulo" aria-describedby="dialogo-mensaje" className="ficha-entrada w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className={`h-1.5 ${peligro ? "bg-red-700" : "bg-gray-800"}`} />
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        {peligro && (
                            <span className="rounded-full bg-red-100 p-2.5 text-red-700">
                                <Trash2 className="h-5 w-5" />
                            </span>
                        )}
                        <div>
                            <h2 id="dialogo-titulo" className="font-titulo text-xl font-black uppercase tracking-wide text-gray-900">{titulo}</h2>
                            <p id="dialogo-mensaje" className="mt-2 text-sm leading-relaxed text-gray-600">{mensaje}</p>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            ref={cancelarRef}
                            onClick={() => onResponder(false)}
                            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => onResponder(true)}
                            className={`rounded-lg px-5 py-2.5 text-sm font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${peligro ? "bg-red-700 hover:bg-red-800 focus-visible:ring-red-500" : "bg-gray-900 hover:bg-black focus-visible:ring-gray-500"}`}
                        >
                            {textoConfirmar}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const AvisosProvider = ({ children }) => {
    const [avisos, setAvisos] = useState([]);
    const [dialogo, setDialogo] = useState(null);
    const contador = useRef(0);

    const cerrarAviso = useCallback((id) => setAvisos((a) => a.filter((x) => x.id !== id)), []);

    const avisar = useCallback((texto, tipo = "ok", milisegundos = 4000) => {
        const id = ++contador.current;
        setAvisos((a) => [...a, { id, texto, tipo }]);
        setTimeout(() => cerrarAviso(id), milisegundos);
    }, [cerrarAviso]);

    const confirmar = useCallback((opciones) => new Promise((resolve) => setDialogo({ ...opciones, resolve })), []);

    const responder = useCallback((respuesta) => {
        setDialogo((actual) => {
            actual?.resolve(respuesta);
            return null;
        });
    }, []);

    const valor = useMemo(() => ({ avisar, confirmar }), [avisar, confirmar]);

    return (
        <AvisosContext.Provider value={valor}>
            {children}

            <div className="pointer-events-none fixed right-4 top-20 z-[85] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2" aria-live="polite">
                {avisos.map(({ id, texto, tipo }) => {
                    const { clase, Icono } = ESTILOS[tipo] || ESTILOS.ok;
                    return (
                        <div key={id} role="status" className={`ficha-entrada pointer-events-auto flex items-start gap-3 rounded-xl border p-3.5 shadow-lg ${clase}`}>
                            <Icono className="mt-0.5 h-5 w-5 shrink-0" />
                            <p className="flex-1 text-sm font-semibold">{texto}</p>
                            <button onClick={() => cerrarAviso(id)} aria-label="Cerrar aviso" className="opacity-60 hover:opacity-100">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {dialogo && <Dialogo dialogo={dialogo} onResponder={responder} />}
        </AvisosContext.Provider>
    );
};
