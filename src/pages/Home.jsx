import { useState, useEffect } from "react";
import { obtenerNoticias } from "../services/noticiaService";

// Importamos todos los componentes visuales
import WidgetFixture from '../components/WidgetFixture';
import HeroSection from "../components/HeroSection";
import NoticiasPreview from "../components/NoticiasPreview"; // <-- Nuestro nuevo componente
import SquadPreview from "../components/SquadPreview";
import TiendaPreview from "../components/TiendaPreview";
import AsociateBanner from "../components/AsociateBanner";
import FichaJugadorModal from "../components/FichaJugadorModal";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import Reveal from "../components/Reveal";
import Contador from "../components/Contador";

// Años cumplidos desde una fecha: suma uno recién al llegar al aniversario (mes 1-12)
const aniversarios = (año, mes, dia) => {
    const hoy = new Date();
    const cumplido = hoy >= new Date(hoy.getFullYear(), mes - 1, dia);
    return hoy.getFullYear() - año - (cumplido ? 0 : 1);
};

const datosClub = [
    { valor: aniversarios(1909, 11, 2), etiqueta: "Años de historia" },
    { valor: 27000, prefijo: "+", etiqueta: "Capacidad de La Ciudadela" },
    { valor: 15000, prefijo: "+", etiqueta: "Socios" },
    { valor: 1, etiqueta: "Copa Nacional Oficial" },
];

const Home = () => {
    const [noticias, setNoticias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

    useEffect(() => {
        const cargarNoticias = async () => {
            try {
                const datos = await obtenerNoticias();
                setNoticias(datos);
                setCargando(false);
            } catch (error) {
                console.error("No se pudieron cargar las noticias", error);
                setError(true);
                setCargando(false);
            }
        };
        cargarNoticias();
    }, []);

    if (cargando) return <Loader texto="Cargando novedades del club..." />;
    if (error) return <ErrorState texto="No pudimos cargar las novedades del club. Probá recargar la página." />;

    // LÓGICA DE DISTRIBUCIÓN
    // El Hero agarra las 3 primeras (destacadas o recientes)
    const noticiasHero = noticias.slice(0, 3);
    
    // El Preview de abajo agarra desde la segunda en adelante (para no repetir tanto)
    const noticiaPrincipal = noticias[0]; 
    const ultimasNoticias = noticias.slice(1, 5);

    return (
        <div className="relative">
            {/* 1. Slider Cabecera */}
            <HeroSection noticiasHero={noticiasHero} />

            {/* Datos del club con contadores */}
            <section className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 border-y-4 border-red-950">
                <div className="max-w-6xl mx-auto px-4 py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-0 md:divide-x divide-red-600/50 text-center text-white">
                    {datosClub.map(({ valor, prefijo, etiqueta }) => (
                        <div key={etiqueta} className="px-4">
                            <p className="text-4xl md:text-6xl font-black tracking-tight" style={{ fontFamily: "Oswald, sans-serif" }}>
                                <Contador valor={valor} prefijo={prefijo} />
                            </p>
                            <p className="mt-1 text-xs md:text-sm font-bold uppercase tracking-widest text-red-200">{etiqueta}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. Sección de Noticias (Solo se muestra si hay noticias) */}
            <Reveal>
                {noticias.length > 0 ? (
                    <NoticiasPreview
                        noticiaPrincipal={noticiaPrincipal}
                        ultimasNoticias={ultimasNoticias}
                    />
                ) : (
                    <div className="text-center py-20 text-gray-500 font-medium">No hay noticias publicadas.</div>
                )}
            </Reveal>

            {/* 3. Sección Plantel */}
            <Reveal>
                <SquadPreview onSelectPlayer={setJugadorSeleccionado} />
            </Reveal>
            {jugadorSeleccionado && (
                <FichaJugadorModal
                    jugador={jugadorSeleccionado}
                    onClose={() => setJugadorSeleccionado(null)}
                />
            )}

            {/* 4. Sección Tienda */}
            <Reveal>
                <TiendaPreview />
            </Reveal>

            {/* 5. Banner de Socios */}
            <Reveal>
                <AsociateBanner />
            </Reveal>

            {/* 6. Seccion de fixture */}
            <Reveal>
                <WidgetFixture />
            </Reveal>
        </div>
    );
};

export default Home;