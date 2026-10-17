import { useState, useEffect } from "react";
import Reveal from "../components/Reveal";
import { obtenerAutoridades } from "../services/autoridadService";
import { AUTORIDADES_POR_DEFECTO } from "../data/autoridades";
import EscudosFondo from "../components/EscudosFondo";

import PageBanner from "../components/PageBanner";


const Autoridades = () => {
    const [autoridades, setAutoridades] = useState(AUTORIDADES_POR_DEFECTO);

    // La lista se edita desde el panel; si todavía está vacía o falla, se muestra la inicial
    useEffect(() => {
        obtenerAutoridades()
            .then((datos) => datos.length && setAutoridades(datos))
            .catch(() => {});
    }, []);

    return (
        <div className="relative min-h-screen bg-gray-50 font-sans isolate">
            <EscudosFondo cantidad={20} />
            <PageBanner
                title="Comisión Directiva"
                subtitle="Las autoridades encargadas de guiar el destino institucional y deportivo del Club Atlético San Martín."
            />
            <div className="max-w-6xl mx-auto px-4 py-16">

                {/* Grilla de Tarjetas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {autoridades.map((autoridad, index) => (
                        <Reveal
                            key={autoridad._id || index}
                            className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-red-700 flex flex-col items-center text-center card-santo"
                        >
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                {autoridad.cargo}
                            </h3>
                            <p className="text-lg font-black text-gray-900 uppercase">
                                {autoridad.nombre}
                            </p>
                        </Reveal>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Autoridades;