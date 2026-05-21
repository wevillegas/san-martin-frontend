import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { obtenerNoticias } from "../services/noticiaService";
import HeroSection from "../components/HeroSection";
import SquadPreview from "../components/SquadPreview";
import TiendaPreview from "../components/TiendaPreview";
import AsociateBanner from "../components/AsociateBanner";
import FichaJugadorModal from "../components/FichaJugadorModal";

const Home = () => {
    const [noticias, setNoticias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

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

    if (noticias.length === 0) {
        return (
            <div className="relative">
                <HeroSection noticiasHero={[]} />
                <div className="text-center mt-20 text-gray-500">No hay noticias publicadas.</div>
                <SquadPreview onSelectPlayer={setJugadorSeleccionado} />
                {jugadorSeleccionado && (
                    <FichaJugadorModal jugador={jugadorSeleccionado} onClose={() => setJugadorSeleccionado(null)} />
                )}
            </div>
        );
    }

    // --- LÓGICA SIMPLIFICADA ---
    // Como el backend ya manda las destacadas primero, agarramos la lista tal cual.
    
    // El Hero muestra las primeras 3 (serán destacadas si hay, sino las más nuevas)
    const noticiasHero = noticias.slice(0, 3);
    
    // La sección de abajo muestra exactamente el mismo orden:
    // La 1° va grande, y de la 2° a la 5° van en la lista de la derecha.
    const noticiaPrincipal = noticias[0]; 
    const ultimasNoticias = noticias.slice(1, 5);
    
    const imagenPlaceholder = "https://images.unsplash.com/photo-1518605368461-1ee7e53023eb?q=80&w=1000&auto=format&fit=crop";

    return (
        <div className="relative">
            <HeroSection noticiasHero={noticiasHero} />

            <section className="bg-gray-50 py-12 md:py-16 min-h-screen">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 md:text-4xl uppercase tracking-wider">
                                Últimas Noticias
                            </h2>
                            <p className="mt-1 text-gray-500 font-medium">Enterate de todo lo que pasa en el Santo</p>
                        </div>
                        <Link
                            to="/noticias"
                            className="flex items-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md transition-colors font-semibold"
                        >
                            Ver todas las noticias
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Noticia Principal (De la grilla inferior) */}
                        <Link to={`/noticias/${noticiaPrincipal._id}`} className="group">
                            <div className="h-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-xl flex flex-col">
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={noticiaPrincipal.imagenUrl ? `${noticiaPrincipal.imagenUrl}?t=${new Date().getTime()}` : imagenPlaceholder}
                                        alt={noticiaPrincipal.titulo}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="mb-2 inline-block bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">{noticiaPrincipal.etiqueta}</span>
                                        <h3 className="text-balance text-2xl font-bold text-white md:text-3xl leading-tight">{noticiaPrincipal.titulo}</h3>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <p className="mb-4 line-clamp-3 text-gray-600">{noticiaPrincipal.resumen || noticiaPrincipal.cuerpo}</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(noticiaPrincipal.createdAt).toLocaleDateString('es-AR')}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Lista de Noticias Secundarias */}
                        <div className="flex flex-col gap-4">
                            {ultimasNoticias.map((noticia) => (
                                <Link key={noticia._id} to={`/noticias/${noticia._id}`} className="group">
                                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
                                        <div className="flex gap-4 p-4">
                                            <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg">
                                                <img
                                                    src={noticia.imagenUrl ? `${noticia.imagenUrl}?t=${new Date().getTime()}` : imagenPlaceholder}
                                                    alt={noticia.titulo}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col justify-center">
                                                <span className="mb-2 inline-block bg-gray-100 text-gray-800 text-xs font-bold px-2 py-0.5 rounded-full w-fit uppercase">{noticia.etiqueta}</span>
                                                <h3 className="line-clamp-2 text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">{noticia.titulo}</h3>
                                                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 font-medium">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{new Date(noticia.createdAt).toLocaleDateString('es-AR')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <SquadPreview onSelectPlayer={setJugadorSeleccionado} />
            {jugadorSeleccionado && (
                <FichaJugadorModal
                    jugador={jugadorSeleccionado}
                    onClose={() => setJugadorSeleccionado(null)}
                />
            )}

            <TiendaPreview />
            <AsociateBanner />
        </div>
    );
};

export default Home;