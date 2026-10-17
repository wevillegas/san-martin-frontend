import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, KeyRound, UserPlus, Trash2, Eye, EyeOff, Dices } from "lucide-react";
import { listarUsuarios, crearUsuario, cambiarMiClave, restablecerClave, eliminarUsuario } from "../../services/usuarioService";

const MIN_CLAVE = 8;
const input = "w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-800";
const etiqueta = "block text-xs font-black text-gray-600 uppercase tracking-widest mb-1.5";
const boton = "bg-red-700 hover:bg-red-800 text-white font-bold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 text-sm uppercase tracking-wider";

const mensajeDe = (err) => err.response?.data?.mensaje || "No se pudo completar la acción";

// Clave aleatoria de 12 caracteres sin letras que se confunden (0/O, 1/l/I)
const generarClave = () => {
    const letras = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bytes = crypto.getRandomValues(new Uint8Array(12));
    return Array.from(bytes, (b) => letras[b % letras.length]).join("");
};

const Aviso = ({ aviso }) =>
    aviso ? (
        <p className={`rounded-md border-l-4 px-4 py-2 text-sm font-bold ${aviso.ok ? "border-green-500 bg-green-50 text-green-800" : "border-red-500 bg-red-50 text-red-700"}`}>
            {aviso.texto}
        </p>
    ) : null;

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [avisoLista, setAvisoLista] = useState(null);

    const [nuevo, setNuevo] = useState({ nombre: "", email: "", password: "" });
    const [verClave, setVerClave] = useState(false);
    const [avisoNuevo, setAvisoNuevo] = useState(null);

    const [mia, setMia] = useState({ actual: "", nueva: "", repetir: "" });
    const [avisoMia, setAvisoMia] = useState(null);

    const [editando, setEditando] = useState(null); // id del usuario al que se le restablece la clave
    const [claveOtro, setClaveOtro] = useState("");

    const cargar = async () => {
        try {
            setUsuarios(await listarUsuarios());
        } catch (err) {
            setAvisoLista({ ok: false, texto: mensajeDe(err) });
        } finally {
            setCargando(false);
        }
    };
    useEffect(() => { cargar(); }, []);

    const crear = async (e) => {
        e.preventDefault();
        try {
            await crearUsuario(nuevo);
            setAvisoNuevo({ ok: true, texto: `Se creó la cuenta de ${nuevo.nombre}. Pasale la clave por un canal seguro.` });
            setNuevo({ nombre: "", email: "", password: "" });
            cargar();
        } catch (err) {
            setAvisoNuevo({ ok: false, texto: mensajeDe(err) });
        }
    };

    const cambiarMia = async (e) => {
        e.preventDefault();
        if (mia.nueva !== mia.repetir) return setAvisoMia({ ok: false, texto: "Las claves nuevas no coinciden" });
        try {
            await cambiarMiClave(mia.actual, mia.nueva);
            setAvisoMia({ ok: true, texto: "Listo, cambiaste tu clave." });
            setMia({ actual: "", nueva: "", repetir: "" });
        } catch (err) {
            setAvisoMia({ ok: false, texto: mensajeDe(err) });
        }
    };

    const restablecer = async (usuario) => {
        try {
            await restablecerClave(usuario._id, claveOtro);
            setAvisoLista({ ok: true, texto: `Se cambió la clave de ${usuario.nombre}.` });
            setEditando(null);
            setClaveOtro("");
        } catch (err) {
            setAvisoLista({ ok: false, texto: mensajeDe(err) });
        }
    };

    const borrar = async (usuario) => {
        if (!window.confirm(`¿Eliminar la cuenta de ${usuario.nombre} (${usuario.email})? Ya no va a poder entrar al panel.`)) return;
        try {
            await eliminarUsuario(usuario._id);
            setAvisoLista({ ok: true, texto: `Se eliminó la cuenta de ${usuario.nombre}.` });
            cargar();
        } catch (err) {
            setAvisoLista({ ok: false, texto: mensajeDe(err) });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <div>
                    <Link to="/admin" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al Dashboard principal
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider flex items-center gap-3">
                        <KeyRound className="w-8 h-8 text-red-700" />
                        Usuarios
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium">Quién puede entrar al panel. Todos los administradores tienen los mismos permisos.</p>
                </div>

                {/* LISTA */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6 space-y-4">
                    <Aviso aviso={avisoLista} />
                    {cargando ? (
                        <p className="font-bold text-red-700">Cargando...</p>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {usuarios.map((u) => (
                                <li key={u._id} className="py-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="min-w-0 flex-1">
                                            <p className="font-bold text-gray-900">
                                                {u.nombre}
                                                {u.esActual && <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-black uppercase text-red-700">Vos</span>}
                                            </p>
                                            <p className="text-sm text-gray-500 break-all">{u.email}</p>
                                            <p className="text-xs text-gray-400">Alta: {new Date(u.createdAt).toLocaleDateString("es-AR")}</p>
                                        </div>
                                        {!u.esActual && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => { setEditando(editando === u._id ? null : u._id); setClaveOtro(""); }}
                                                    className="rounded-md border border-gray-300 px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-700 hover:border-red-700 hover:text-red-700"
                                                >
                                                    Cambiar clave
                                                </button>
                                                <button
                                                    onClick={() => borrar(u)}
                                                    aria-label={`Eliminar a ${u.nombre}`}
                                                    className="rounded-md border border-gray-300 p-2 text-gray-500 hover:border-red-700 hover:bg-red-700 hover:text-white"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {editando === u._id && (
                                        <div className="mt-3 flex flex-wrap items-end gap-3 rounded-lg bg-gray-50 p-3">
                                            <div className="flex-1 min-w-[12rem]">
                                                <label className={etiqueta}>Clave nueva (mínimo {MIN_CLAVE})</label>
                                                <input type="text" value={claveOtro} onChange={(e) => setClaveOtro(e.target.value)} className={input} autoComplete="off" />
                                            </div>
                                            <button type="button" onClick={() => setClaveOtro(generarClave())} className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2.5 text-xs font-bold uppercase text-gray-700 hover:border-red-700">
                                                <Dices className="w-4 h-4" /> Generar
                                            </button>
                                            <button onClick={() => restablecer(u)} disabled={claveOtro.length < MIN_CLAVE} className={boton}>Guardar</button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* NUEVO ADMIN */}
                    <form onSubmit={crear} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6 space-y-4">
                        <h2 className="font-titulo text-xl font-black uppercase tracking-widest text-gray-800 flex items-center gap-2">
                            <UserPlus className="w-5 h-5 text-red-700" /> Nuevo administrador
                        </h2>
                        <Aviso aviso={avisoNuevo} />
                        <div>
                            <label className={etiqueta}>Nombre</label>
                            <input required value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} className={input} />
                        </div>
                        <div>
                            <label className={etiqueta}>Correo</label>
                            <input required type="email" value={nuevo.email} onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })} className={input} />
                        </div>
                        <div>
                            <label className={etiqueta}>Clave (mínimo {MIN_CLAVE} caracteres)</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        required minLength={MIN_CLAVE} type={verClave ? "text" : "password"} autoComplete="new-password"
                                        value={nuevo.password} onChange={(e) => setNuevo({ ...nuevo, password: e.target.value })} className={`${input} pr-11`}
                                    />
                                    <button type="button" onClick={() => setVerClave(!verClave)} aria-label={verClave ? "Ocultar clave" : "Mostrar clave"} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                                        {verClave ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <button type="button" onClick={() => { setNuevo({ ...nuevo, password: generarClave() }); setVerClave(true); }} className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 text-xs font-bold uppercase text-gray-700 hover:border-red-700">
                                    <Dices className="w-4 h-4" /> Generar
                                </button>
                            </div>
                        </div>
                        <button type="submit" className={boton}>Crear cuenta</button>
                    </form>

                    {/* MI CLAVE */}
                    <form onSubmit={cambiarMia} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6 space-y-4">
                        <h2 className="font-titulo text-xl font-black uppercase tracking-widest text-gray-800 flex items-center gap-2">
                            <KeyRound className="w-5 h-5 text-red-700" /> Cambiar mi clave
                        </h2>
                        <Aviso aviso={avisoMia} />
                        <div>
                            <label className={etiqueta}>Clave actual</label>
                            <input required type="password" autoComplete="current-password" value={mia.actual} onChange={(e) => setMia({ ...mia, actual: e.target.value })} className={input} />
                        </div>
                        <div>
                            <label className={etiqueta}>Clave nueva (mínimo {MIN_CLAVE})</label>
                            <input required minLength={MIN_CLAVE} type="password" autoComplete="new-password" value={mia.nueva} onChange={(e) => setMia({ ...mia, nueva: e.target.value })} className={input} />
                        </div>
                        <div>
                            <label className={etiqueta}>Repetir la clave nueva</label>
                            <input required type="password" autoComplete="new-password" value={mia.repetir} onChange={(e) => setMia({ ...mia, repetir: e.target.value })} className={input} />
                        </div>
                        <button type="submit" className={boton}>Guardar clave</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Usuarios;
