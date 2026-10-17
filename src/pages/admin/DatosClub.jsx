import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Save, Plus, Trash2 } from "lucide-react";
import { obtenerDatosClub, guardarDatosClub } from "../../services/clubService";
import { mensajeDeError } from "../../utils/errores";
import { useAvisos } from "../../components/Avisos";

const CAMPOS = [
    { clave: "capacidadCiudadela", etiqueta: "Capacidad de La Ciudadela", ayuda: "Se muestra con un “+” en el inicio y en la página del estadio." },
    { clave: "cantidadSocios", etiqueta: "Cantidad de socios", ayuda: "Se muestra con un “+” en el inicio y en la página de socios." },
    { clave: "copasNacionales", etiqueta: "Copas nacionales oficiales", ayuda: "Cifra “Copa Nacional Oficial” del inicio." },
];

const MAX_CUOTAS = 6;
const input = "w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none text-gray-800";
const etiqueta = "block text-xs font-black text-gray-600 uppercase tracking-widest mb-1.5";
const botonGuardar = "flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-black px-6 py-3 rounded-lg uppercase tracking-widest disabled:opacity-50";

const Seccion = ({ titulo, descripcion, children }) => (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
            <h2 className="font-titulo text-xl font-black uppercase tracking-widest text-gray-800">{titulo}</h2>
            {descripcion && <p className="mt-1 text-sm text-gray-500">{descripcion}</p>}
        </div>
        {children}
    </section>
);

const DatosClub = () => {
    const { avisar } = useAvisos();
    const [datos, setDatos] = useState(null);
    const [guardando, setGuardando] = useState("");
    const [error, setError] = useState("");

    // Las ventajas se editan como texto, un renglón por ventaja
    const aFormulario = (d) => ({
        ...d,
        cuotas: d.cuotas.map((c) => ({ ...c, ventajas: c.ventajas.join("\n") })),
        horariosMuseo: { ...d.horariosMuseo, lineas: d.horariosMuseo.lineas.join("\n") },
    });
    const porRenglon = (texto) => texto.split("\n").map((l) => l.trim()).filter(Boolean);

    useEffect(() => {
        obtenerDatosClub()
            .then((d) => setDatos(aFormulario(d)))
            .catch((err) => setError(mensajeDeError(err, "No se pudieron cargar los datos del club.")));
    }, []);

    // Guarda solo una sección; el servidor responde con todo y se refresca el formulario
    const guardar = (seccion, cuerpo) => async (e) => {
        e.preventDefault();
        setGuardando(seccion);
        try {
            setDatos(aFormulario(await guardarDatosClub(cuerpo)));
            avisar("Listo. Los cambios ya se ven en el sitio.");
        } catch (err) {
            avisar(mensajeDeError(err, "No se pudo guardar"), "error", 6000);
        } finally {
            setGuardando("");
        }
    };

    const cambiarCuota = (i, cambios) => setDatos({ ...datos, cuotas: datos.cuotas.map((c, j) => (j === i ? { ...c, ...cambios } : c)) });

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <Link to="/admin" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al Dashboard principal
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-red-700" />
                        Datos del club
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium">Lo que cambia de vez en cuando y se muestra en el sitio. Los años de historia se calculan solos desde la fundación.</p>
                </div>

                {error && <p className="rounded-md border-l-4 border-red-500 bg-red-50 px-4 py-2 text-sm font-bold text-red-700">{error}</p>}

                {datos && (
                    <>
                        {/* CIFRAS */}
                        <form onSubmit={guardar("cifras", Object.fromEntries(CAMPOS.map(({ clave }) => [clave, datos[clave]])))}>
                            <Seccion titulo="Cifras">
                                {CAMPOS.map(({ clave, etiqueta: texto, ayuda }) => (
                                    <div key={clave}>
                                        <label htmlFor={clave} className={etiqueta}>{texto}</label>
                                        <input
                                            id={clave} type="number" min="0" required value={datos[clave]}
                                            onChange={(e) => setDatos({ ...datos, [clave]: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none text-xl font-bold text-gray-800"
                                        />
                                        <p className="mt-1 text-sm text-gray-500">{ayuda}</p>
                                    </div>
                                ))}
                                <button type="submit" disabled={guardando === "cifras"} className={botonGuardar}>
                                    <Save className="w-5 h-5" /> {guardando === "cifras" ? "Guardando..." : "Guardar cifras"}
                                </button>
                            </Seccion>
                        </form>

                        {/* CUOTAS */}
                        <form
                            onSubmit={guardar("cuotas", {
                                cuotas: datos.cuotas.map((c) => ({ ...c, precio: Number(c.precio), ventajas: porRenglon(c.ventajas) })),
                            })}
                        >
                            <Seccion titulo="Cuotas de socios" descripcion="Las tarjetas de “Categorías de Cuota” de la página de Socios. La marcada como destacada se muestra en rojo.">
                                {datos.cuotas.map((c, i) => (
                                    <div key={i} className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                        <div className="flex items-center justify-between">
                                            <p className="font-black uppercase tracking-wider text-gray-700">Cuota {i + 1}</p>
                                            <button
                                                type="button"
                                                onClick={() => setDatos({ ...datos, cuotas: datos.cuotas.filter((_, j) => j !== i) })}
                                                aria-label={`Quitar la cuota ${i + 1}`}
                                                className="rounded-md p-2 text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div>
                                                <label className={etiqueta}>Nombre</label>
                                                <input required maxLength={60} value={c.nombre} onChange={(e) => cambiarCuota(i, { nombre: e.target.value })} className={input} />
                                            </div>
                                            <div>
                                                <label className={etiqueta}>Quiénes entran</label>
                                                <input maxLength={80} value={c.edades} onChange={(e) => cambiarCuota(i, { edades: e.target.value })} className={input} placeholder="Ej: Mayores de 18 años" />
                                            </div>
                                            <div>
                                                <label className={etiqueta}>Precio por mes ($)</label>
                                                <input required type="number" min="0" value={c.precio} onChange={(e) => cambiarCuota(i, { precio: e.target.value })} className={input} />
                                            </div>
                                            <label className="flex items-center gap-3 self-end rounded-lg border border-gray-200 bg-white px-4 py-3 font-bold text-gray-700">
                                                <input type="checkbox" checked={c.destacada} onChange={(e) => cambiarCuota(i, { destacada: e.target.checked })} className="h-5 w-5 accent-red-700" />
                                                Destacada (en rojo)
                                            </label>
                                        </div>
                                        <div>
                                            <label className={etiqueta}>Ventajas (una por renglón)</label>
                                            <textarea rows={5} value={c.ventajas} onChange={(e) => cambiarCuota(i, { ventajas: e.target.value })} className={`${input} resize-y`} />
                                        </div>
                                    </div>
                                ))}
                                <div className="flex flex-wrap gap-3">
                                    {datos.cuotas.length < MAX_CUOTAS && (
                                        <button
                                            type="button"
                                            onClick={() => setDatos({ ...datos, cuotas: [...datos.cuotas, { nombre: "", edades: "", precio: 0, destacada: false, ventajas: "" }] })}
                                            className="flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-sm font-bold uppercase tracking-wider text-gray-700 hover:border-red-700 hover:text-red-700"
                                        >
                                            <Plus className="w-4 h-4" /> Agregar cuota
                                        </button>
                                    )}
                                    <button type="submit" disabled={guardando === "cuotas"} className={botonGuardar}>
                                        <Save className="w-5 h-5" /> {guardando === "cuotas" ? "Guardando..." : "Guardar cuotas"}
                                    </button>
                                </div>
                            </Seccion>
                        </form>

                        {/* HORARIOS DEL MUSEO */}
                        <form
                            onSubmit={guardar("museo", {
                                horariosMuseo: { ...datos.horariosMuseo, lineas: porRenglon(datos.horariosMuseo.lineas) },
                            })}
                        >
                            <Seccion titulo="Horarios del museo" descripcion="Se muestran en la página del Museo, en la cabecera y en “Vení a conocer el museo”.">
                                <div>
                                    <label className={etiqueta}>Horarios (uno por renglón)</label>
                                    <textarea
                                        rows={3} value={datos.horariosMuseo.lineas}
                                        onChange={(e) => setDatos({ ...datos, horariosMuseo: { ...datos.horariosMuseo, lineas: e.target.value } })}
                                        className={`${input} resize-y`}
                                    />
                                </div>
                                <div>
                                    <label className={etiqueta}>Aviso en rojo</label>
                                    <input
                                        maxLength={120} value={datos.horariosMuseo.aviso}
                                        onChange={(e) => setDatos({ ...datos, horariosMuseo: { ...datos.horariosMuseo, aviso: e.target.value } })}
                                        className={input} placeholder="Ej: Cerrado los domingos y días de partido"
                                    />
                                </div>
                                <div>
                                    <label className={etiqueta}>Resumen para la cabecera</label>
                                    <input
                                        maxLength={60} value={datos.horariosMuseo.resumen}
                                        onChange={(e) => setDatos({ ...datos, horariosMuseo: { ...datos.horariosMuseo, resumen: e.target.value } })}
                                        className={input} placeholder="Ej: Lun a Sáb desde las 9:00"
                                    />
                                </div>
                                <button type="submit" disabled={guardando === "museo"} className={botonGuardar}>
                                    <Save className="w-5 h-5" /> {guardando === "museo" ? "Guardando..." : "Guardar horarios"}
                                </button>
                            </Seccion>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default DatosClub;
