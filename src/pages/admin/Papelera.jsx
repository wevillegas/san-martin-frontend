import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Undo2, XCircle } from "lucide-react";
import { obtenerPapelera, restaurarElemento, eliminarDefinitivo } from "../../services/papeleraService";
import { imagenPlaceholder } from "../../constants/placeholders";

const SECCIONES = { noticias: "Noticia", jugadores: "Jugador", "cuerpo-tecnico": "Cuerpo técnico", productos: "Producto", autoridades: "Autoridad" };

const Papelera = () => {
    const [items, setItems] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [filtro, setFiltro] = useState("");
    const [aviso, setAviso] = useState(null);

    const cargar = async () => {
        try {
            setItems(await obtenerPapelera());
        } catch {
            setAviso({ ok: false, texto: "No se pudo cargar la papelera. Probá iniciar sesión de nuevo." });
        } finally {
            setCargando(false);
        }
    };
    useEffect(() => { cargar(); }, []);

    const ejecutar = async (accion, item, textoOk) => {
        try {
            await accion(item.tipo, item.id);
            setAviso({ ok: true, texto: textoOk });
            cargar();
        } catch (err) {
            setAviso({ ok: false, texto: err.response?.data?.mensaje || "No se pudo completar la acción" });
        }
    };

    const restaurar = (item) => ejecutar(restaurarElemento, item, `"${item.titulo}" volvió a su lugar.`);
    const borrar = (item) => {
        if (!window.confirm(`¿Eliminar "${item.titulo}" para siempre? También se borra su foto y no se puede recuperar.`)) return;
        ejecutar(eliminarDefinitivo, item, `"${item.titulo}" se eliminó definitivamente.`);
    };

    const visibles = filtro ? items.filter((i) => i.tipo === filtro) : items;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <Link to="/admin" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-2 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Volver al Dashboard principal
                </Link>
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider flex items-center gap-3">
                    <Trash2 className="w-8 h-8 text-red-700" />
                    Papelera
                </h1>
                <p className="text-gray-500 mt-1 mb-6 font-medium">
                    Lo que se elimina del panel queda acá, oculto en el sitio. Podés restaurarlo o borrarlo para siempre.
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                    {[["", "Todo"], ...Object.entries(SECCIONES)].map(([valor, texto]) => (
                        <button
                            key={valor}
                            onClick={() => setFiltro(valor)}
                            className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${filtro === valor ? "border-red-700 bg-red-700 text-white" : "border-gray-300 bg-white text-gray-600 hover:border-red-700"}`}
                        >
                            {texto}
                        </button>
                    ))}
                </div>

                {aviso && (
                    <p className={`mb-4 rounded-md border-l-4 px-4 py-2 text-sm font-bold ${aviso.ok ? "border-green-500 bg-green-50 text-green-800" : "border-red-500 bg-red-50 text-red-700"}`}>
                        {aviso.texto}
                    </p>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    {cargando && <p className="p-8 text-center font-bold text-red-700">Cargando...</p>}
                    {!cargando && visibles.length === 0 && <p className="p-8 text-center font-medium text-gray-500">La papelera está vacía.</p>}
                    <ul className="divide-y divide-gray-100">
                        {visibles.map((item) => (
                            <li key={`${item.tipo}-${item.id}`} className="flex flex-wrap items-center gap-4 p-4">
                                <img src={item.imagenUrl || imagenPlaceholder} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover bg-gray-100" />
                                <div className="min-w-0 flex-1">
                                    <p className="font-bold text-gray-900 break-words">{item.titulo}</p>
                                    <p className="text-xs text-gray-500">
                                        <span className="mr-2 rounded-full bg-gray-100 px-2 py-0.5 font-bold uppercase text-gray-600">{SECCIONES[item.tipo]}</span>
                                        Eliminado el {new Date(item.eliminadoEn).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" })}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => restaurar(item)} className="flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-green-700">
                                        <Undo2 className="w-4 h-4" /> Restaurar
                                    </button>
                                    <button onClick={() => borrar(item)} className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:border-red-700 hover:bg-red-700 hover:text-white">
                                        <XCircle className="w-4 h-4" /> Borrar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Papelera;
