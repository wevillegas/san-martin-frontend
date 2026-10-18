import { useState } from "react";
import { KeyRound } from "lucide-react";
import { cambiarMiClave } from "../services/usuarioService";
import { mensajeDeError } from "../utils/errores";

const MIN_CLAVE = 8;
const input = "w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-800";
const etiqueta = "block text-xs font-black text-gray-600 uppercase tracking-widest mb-1.5";

// Formulario para que cualquier usuario del panel (editor o administrador) cambie su propia clave
const CambiarMiClave = () => {
    const [valores, setValores] = useState({ actual: "", nueva: "", repetir: "" });
    const [aviso, setAviso] = useState(null);
    const [guardando, setGuardando] = useState(false);

    const guardar = async (e) => {
        e.preventDefault();
        if (valores.nueva !== valores.repetir) return setAviso({ ok: false, texto: "Las claves nuevas no coinciden" });
        setGuardando(true);
        try {
            const { token } = await cambiarMiClave(valores.actual, valores.nueva);
            if (token) localStorage.setItem("token", token); // al cambiar la clave se cierran las demás sesiones; esta sigue
            setAviso({ ok: true, texto: "Listo, cambiaste tu clave." });
            setValores({ actual: "", nueva: "", repetir: "" });
        } catch (err) {
            setAviso({ ok: false, texto: mensajeDeError(err) });
        } finally {
            setGuardando(false);
        }
    };

    const cambiar = (campo) => (e) => setValores({ ...valores, [campo]: e.target.value });

    return (
        <form onSubmit={guardar} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6 space-y-4">
            <h2 className="font-titulo text-xl font-black uppercase tracking-widest text-gray-800 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-red-700" /> Cambiar mi clave
            </h2>
            {aviso && (
                <p role="status" className={`rounded-md border-l-4 px-4 py-2 text-sm font-bold ${aviso.ok ? "border-green-500 bg-green-50 text-green-800" : "border-red-500 bg-red-50 text-red-700"}`}>
                    {aviso.texto}
                </p>
            )}
            <div>
                <label className={etiqueta}>Clave actual</label>
                <input required type="password" autoComplete="current-password" value={valores.actual} onChange={cambiar("actual")} className={input} />
            </div>
            <div>
                <label className={etiqueta}>Clave nueva (mínimo {MIN_CLAVE})</label>
                <input required minLength={MIN_CLAVE} type="password" autoComplete="new-password" value={valores.nueva} onChange={cambiar("nueva")} className={input} />
            </div>
            <div>
                <label className={etiqueta}>Repetir la clave nueva</label>
                <input required type="password" autoComplete="new-password" value={valores.repetir} onChange={cambiar("repetir")} className={input} />
            </div>
            <button type="submit" disabled={guardando} className="bg-red-700 hover:bg-red-800 text-white font-bold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 text-sm uppercase tracking-wider">
                {guardando ? "Guardando..." : "Guardar clave"}
            </button>
        </form>
    );
};

export default CambiarMiClave;
