import { useState, useEffect } from 'react';
import { obtenerNoticias } from '../services/noticiaService';

const Home = () => {
    const [noticias, setNoticias] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarNoticias = async () => {
            try {
                const datos = await obtenerNoticias();
                setNoticias(datos);
                setCargando(false);
            } catch (error) {
                console.error("No se pudieron cargar las noticias");
                setCargando(false);
            }
        };

        cargarNoticias();
    }, []);

    if (cargando) {
        return <div className="text-center mt-20 text-xl font-bold text-red-700">Cargando novedades del club...</div>;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-black text-red-700 text-center mb-10 uppercase tracking-wider">
                Últimas Noticias
            </h1>

            <div className="space-y-6">
                {noticias.map((noticia) => (
                    <div key={noticia._id} className="bg-white p-6 rounded-xl shadow-md border-l-8 border-red-600">
                        <div className="flex justify-between items-center mb-2">
                            <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded uppercase">
                                {noticia.etiqueta}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">
                                {/* Formateamos la fecha para que se vea linda */}
                                {new Date(noticia.createdAt).toLocaleDateString('es-AR')}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mt-2">
                            {noticia.titulo}
                        </h2>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            {noticia.cuerpo}
                        </p>
                        <p className="mt-4 text-sm text-gray-400 text-right">
                            Por: {noticia.autor}
                        </p>
                    </div>
                ))}

                {noticias.length === 0 && (
                    <p className="text-center text-gray-500">
                        No hay noticias publicadas en este momento.
                    </p>
                )}
            </div>
        </div>
    )
}

export default Home;