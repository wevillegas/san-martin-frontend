import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { esAdmin } from "../../utils/sesion";
import { ArrowLeft, Landmark, Plus, Pencil, Trash2, ArrowUp, ArrowDown, Check, X, Download } from "lucide-react";
import { obtenerAutoridades, crearAutoridad, actualizarAutoridad, eliminarAutoridad, reordenarAutoridades, importarAutoridades } from "../../services/autoridadService";
import { useAvisos } from "../../components/Avisos";
import { AUTORIDADES_POR_DEFECTO } from "../../data/autoridades";
import { mensajeDeError } from "../../utils/errores";

const input = "w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none text-gray-800";
const mensajeDe = (err) => mensajeDeError(err);

const AutoridadesAdmin = () => {
    const { confirmar } = useAvisos();
    const [lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [aviso, setAviso] = useState(null);
    const [nueva, setNueva] = useState({ cargo: "", nombre: "" });
    const [editando, setEditando] = useState(null); // { id, cargo, nombre }

    const cargar = async () => {
        try {
            setLista(await obtenerAutoridades());
        } catch (err) {
            setAviso({ ok: false, texto: mensajeDe(err) });
        } finally {
            setCargando(false);
        }
    };
    useEffect(() => { cargar(); }, []);

    const ejecutar = async (accion, textoOk) => {
        try {
            await accion();
            if (textoOk) setAviso({ ok: true, texto: textoOk });
            await cargar();
        } catch (err) {
            setAviso({ ok: false, texto: mensajeDe(err) });
        }
    };

    const agregar = (e) => {
        e.preventDefault();
        ejecutar(async () => { await crearAutoridad(nueva); setNueva({ cargo: "", nombre: "" }); }, "Autoridad agregada al final de la lista.");
    };

    const guardar = () =>
        ejecutar(async () => { await actualizarAutoridad(editando.id, { cargo: editando.cargo, nombre: editando.nombre }); setEditando(null); }, "Cambios guardados.");

    const borrar = async (a) => {
        if (!(await confirmar({ titulo: "Enviar a la papelera", mensaje: `¿Eliminar a ${a.nombre} (${a.cargo})? Va a la papelera, desde donde podés restaurarla.`, textoConfirmar: "Enviar a la papelera", peligro: true }))) return;
        ejecutar(() => eliminarAutoridad(a._id), `${a.nombre} fue enviada a la papelera.`);
    };

    // Intercambia con la vecina y guarda el orden completo
    const mover = (indice, delta) => {
        const nuevoOrden = [...lista];
        [nuevoOrden[indice], nuevoOrden[indice + delta]] = [nuevoOrden[indice + delta], nuevoOrden[indice]];
        setLista(nuevoOrden);
        ejecutar(() => reordenarAutoridades(nuevoOrden.map((a) => a._id)));
    };

    const importar = () =>
        ejecutar(() => importarAutoridades(AUTORIDADES_POR_DEFECTO), `Se cargó la lista actual del sitio (${AUTORIDADES_POR_DEFECTO.length} autoridades).`);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <Link to="/admin" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al Dashboard principal
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider flex items-center gap-3">
                        <Landmark className="w-8 h-8 text-red-700" />
                        Comisión Directiva
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium">Las autoridades que se muestran en la página del club, en este orden.</p>
                </div>

                {aviso && (
                    <p className={`rounded-md border-l-4 px-4 py-2 text-sm font-bold ${aviso.ok ? "border-green-500 bg-green-50 text-green-800" : "border-red-500 bg-red-50 text-red-700"}`}>
                        {aviso.texto}
                    </p>
                )}

                <form onSubmit={agregar} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-wrap gap-3 items-end">
                    <div className="flex-1 min-w-[12rem]">
                        <label className="block text-xs font-black text-gray-600 uppercase tracking-widest mb-1.5">Cargo</label>
                        <input required value={nueva.cargo} onChange={(e) => setNueva({ ...nueva, cargo: e.target.value })} className={input} placeholder="Ej: Vocal Titular 11" />
                    </div>
                    <div className="flex-1 min-w-[12rem]">
                        <label className="block text-xs font-black text-gray-600 uppercase tracking-widest mb-1.5">Nombre</label>
                        <input required value={nueva.nombre} onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })} className={input} />
                    </div>
                    <button type="submit" className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold px-5 py-2.5 rounded-lg text-sm uppercase tracking-wider">
                        <Plus className="w-4 h-4" /> Agregar
                    </button>
                </form>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    {cargando && <p className="p-8 text-center font-bold text-red-700">Cargando...</p>}

                    {!cargando && lista.length === 0 && (
                        <div className="p-8 text-center space-y-4">
                            <p className="text-gray-600 font-medium">
                                Todavía no cargaste autoridades desde el panel, así que el sitio muestra la lista original. Podés traerla acá para editarla.
                            </p>
                            <button onClick={importar} className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold px-5 py-2.5 rounded-lg text-sm uppercase tracking-wider">
                                <Download className="w-4 h-4" /> Cargar la lista actual ({AUTORIDADES_POR_DEFECTO.length})
                            </button>
                        </div>
                    )}

                    <ul className="divide-y divide-gray-100">
                        {lista.map((a, i) => (
                            <li key={a._id} className="flex flex-wrap items-center gap-3 p-4">
                                <div className="flex flex-col">
                                    <button onClick={() => mover(i, -1)} disabled={i === 0} aria-label="Subir" className="p-1 text-gray-400 hover:text-red-700 disabled:opacity-20"><ArrowUp className="w-4 h-4" /></button>
                                    <button onClick={() => mover(i, 1)} disabled={i === lista.length - 1} aria-label="Bajar" className="p-1 text-gray-400 hover:text-red-700 disabled:opacity-20"><ArrowDown className="w-4 h-4" /></button>
                                </div>

                                {editando?.id === a._id ? (
                                    <>
                                        <input value={editando.cargo} onChange={(e) => setEditando({ ...editando, cargo: e.target.value })} className={`${input} flex-1 min-w-[10rem]`} />
                                        <input value={editando.nombre} onChange={(e) => setEditando({ ...editando, nombre: e.target.value })} className={`${input} flex-1 min-w-[10rem]`} />
                                        <button onClick={guardar} aria-label="Guardar" className="p-2 rounded-md bg-green-600 text-white hover:bg-green-700"><Check className="w-4 h-4" /></button>
                                        <button onClick={() => setEditando(null)} aria-label="Cancelar" className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"><X className="w-4 h-4" /></button>
                                    </>
                                ) : (
                                    <>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{a.cargo}</p>
                                            <p className="font-black text-gray-900 uppercase break-words">{a.nombre}</p>
                                        </div>
                                        <button onClick={() => setEditando({ id: a._id, cargo: a.cargo, nombre: a.nombre })} aria-label={`Editar a ${a.nombre}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"><Pencil className="w-4 h-4" /></button>
                                        {esAdmin() && <button onClick={() => borrar(a)} aria-label={`Eliminar a ${a.nombre}`} className="p-2 text-red-600 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>}
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AutoridadesAdmin;
