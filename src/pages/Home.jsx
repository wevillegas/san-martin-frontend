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
        return <div className="text-center mt-20 text-xl font-bold text-red-700 min-h-screen">Cargando novedades del club...</div>;
    }

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

            {/* 2. Sección de Noticias (Solo se muestra si hay noticias) */}
            {noticias.length > 0 ? (
                <NoticiasPreview 
                    noticiaPrincipal={noticiaPrincipal} 
                    ultimasNoticias={ultimasNoticias} 
                />
            ) : (
                <div className="text-center py-20 text-gray-500 font-medium">No hay noticias publicadas.</div>
            )}

            {/* 3. Sección Plantel */}
            <SquadPreview onSelectPlayer={setJugadorSeleccionado} />
            {jugadorSeleccionado && (
                <FichaJugadorModal
                    jugador={jugadorSeleccionado}
                    onClose={() => setJugadorSeleccionado(null)}
                />
            )}

            {/* 4. Sección Tienda */}
            <TiendaPreview />

            {/* 5. Banner de Socios */}
            <AsociateBanner />

            {/* 6. Seccion de fixture */}
            <WidgetFixture />
        </div>
    );
};

export default Home;