import { useEffect, useRef, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { renovarSesion } from "../services/authService";

const AVISO = 5 * 60 * 1000; // avisa cuando faltan 5 minutos
const AUTORENOVAR = 15 * 60 * 1000; // si hay actividad y faltan menos de 15 minutos, renueva sola
const ACTIVO = 2 * 60 * 1000; // "activo" = hizo algo en los últimos 2 minutos

const vencimiento = () => {
    try {
        return JSON.parse(atob(localStorage.getItem("token").split(".")[1])).exp * 1000;
    } catch {
        return 0;
    }
};

// Cuida la sesión del panel: renueva sola mientras se trabaja y avisa antes de que venza,
// para no perder lo escrito en un formulario.
const SesionAdmin = () => {
    const [restante, setRestante] = useState(Infinity);
    const ultimaActividad = useRef(Date.now());
    const renovando = useRef(false);

    const renovar = async () => {
        if (renovando.current) return;
        renovando.current = true;
        try {
            const { token } = await renovarSesion();
            localStorage.setItem("token", token);
            setRestante(vencimiento() - Date.now());
        } catch {
            /* si falla (sesión ya vencida), el aviso rojo explica cómo seguir */
        } finally {
            renovando.current = false;
        }
    };

    useEffect(() => {
        const marcar = () => { ultimaActividad.current = Date.now(); };
        const eventos = ["keydown", "click", "mousemove", "scroll", "touchstart"];
        eventos.forEach((e) => window.addEventListener(e, marcar, { passive: true }));

        const revisar = () => {
            const r = vencimiento() - Date.now();
            setRestante(r);
            if (r > 0 && r < AUTORENOVAR && Date.now() - ultimaActividad.current < ACTIVO) renovar();
        };
        revisar();
        const intervalo = setInterval(revisar, 15000);

        return () => {
            clearInterval(intervalo);
            eventos.forEach((e) => window.removeEventListener(e, marcar));
        };
    }, []);

    if (restante > AVISO) return null;

    const vencida = restante <= 0;
    return (
        <div
            role="alert"
            className={`fixed bottom-4 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col gap-3 rounded-xl border p-4 shadow-2xl sm:flex-row sm:items-center ${vencida ? "border-red-300 bg-red-50 text-red-900" : "border-amber-300 bg-amber-50 text-amber-900"}`}
        >
            {vencida ? <AlertTriangle className="h-6 w-6 shrink-0" /> : <Clock className="h-6 w-6 shrink-0" />}
            <p className="flex-1 text-sm font-semibold">
                {vencida
                    ? "Tu sesión venció. Iniciá sesión en otra pestaña y volvé acá: lo que escribiste no se pierde."
                    : `Tu sesión vence en ${Math.max(1, Math.ceil(restante / 60000))} min.`}
            </p>
            {vencida ? (
                <a href="/login" target="_blank" rel="noopener noreferrer" className="rounded-md bg-red-700 px-4 py-2 text-center text-sm font-bold text-white hover:bg-red-800">
                    Iniciar sesión
                </a>
            ) : (
                <button onClick={renovar} className="rounded-md bg-amber-600 px-4 py-2 text-sm font-bold text-white hover:bg-amber-700">
                    Seguir conectado
                </button>
            )}
        </div>
    );
};

export default SesionAdmin;
