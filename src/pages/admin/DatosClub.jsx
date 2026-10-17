import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Save } from "lucide-react";
import { obtenerDatosClub, guardarDatosClub } from "../../services/clubService";
import { mensajeDeError } from "../../utils/errores";

const CAMPOS = [
    { clave: "capacidadCiudadela", etiqueta: "Capacidad de La Ciudadela", ayuda: "Se muestra con un “+” en el inicio y en la página del estadio." },
    { clave: "cantidadSocios", etiqueta: "Cantidad de socios", ayuda: "Se muestra con un “+” en el inicio y en la página de socios." },
    { clave: "copasNacionales", etiqueta: "Copas nacionales oficiales", ayuda: "Cifra “Copa Nacional Oficial” del inicio." },
];

const DatosClub = () => {
    const [valores, setValores] = useState(null);
    const [aviso, setAviso] = useState(null);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        obtenerDatosClub()
            .then(setValores)
            .catch(() => setAviso({ ok: false, texto: "No se pudieron cargar los datos del club." }));
    }, []);

    const guardar = async (e) => {
        e.preventDefault();
        setGuardando(true);
        try {
            setValores(await guardarDatosClub(valores));
            setAviso({ ok: true, texto: "Listo. Los cambios ya se ven en el sitio." });
        } catch (err) {
            setAviso({ ok: false, texto: mensajeDeError(err, "No se pudo guardar") });
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <Link to="/admin" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al Dashboard principal
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-red-700" />
                        Datos del club
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium">Las cifras que aparecen en varias páginas. Los años de historia se calculan solos desde la fundación.</p>
                </div>

                {aviso && (
                    <p className={`rounded-md border-l-4 px-4 py-2 text-sm font-bold ${aviso.ok ? "border-green-500 bg-green-50 text-green-800" : "border-red-500 bg-red-50 text-red-700"}`}>
                        {aviso.texto}
                    </p>
                )}

                {valores && (
                    <form onSubmit={guardar} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                        {CAMPOS.map(({ clave, etiqueta, ayuda }) => (
                            <div key={clave}>
                                <label htmlFor={clave} className="block text-xs font-black text-gray-600 uppercase tracking-widest mb-1.5">{etiqueta}</label>
                                <input
                                    id={clave} type="number" min="0" required value={valores[clave]}
                                    onChange={(e) => setValores({ ...valores, [clave]: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none text-xl font-bold text-gray-800"
                                />
                                <p className="mt-1 text-sm text-gray-500">{ayuda}</p>
                            </div>
                        ))}
                        <button type="submit" disabled={guardando} className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-black px-6 py-3 rounded-lg uppercase tracking-widest disabled:opacity-50">
                            <Save className="w-5 h-5" /> {guardando ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default DatosClub;
