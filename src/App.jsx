import { useEffect } from 'react';
import EditarProducto from './pages/admin/EditarProducto';
import TiendaAdmin from './pages/admin/TiendaAdmin';
import NuevoProducto from './pages/admin/NuevoProducto';
import Tienda from './pages/Tienda'
import Socios from './pages/Socios'
import Autoridades from './pages/Autoridades';
import Museo from './pages/Museo'
import Estadio from './pages/Estadio';
import Historia from './pages/Historia';
import NuevoMiembro from './pages/admin/NuevoMiembro';
import EditarMiembro from './pages/admin/EditarMiembro';
import CuerpoTecnicoAdmin from './pages/admin/CuerpoTecnicoAdmin';
import NuevoJugador from './pages/admin/NuevoJugador';
import EditarJugador from './pages/admin/EditarJugador';
import PlantelAdmin from './pages/admin/PlantelAdmin';
import EditarNoticia from './pages/admin/EditarNoticia';
import NuevaNoticia from './pages/admin/NuevaNoticia';
import NoticiasAdmin from './pages/admin/NoticiasAdmin';
import RutaProtegida from './components/RutaProtegida';
import Dashboard from './pages/admin/Dashboard';
import Noticias from './pages/Noticias';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Plantel from './pages/Plantel';
import Login from './pages/Login';
import NoticiaDetalle from './pages/NoticiaDetalle';
import Complejo from './pages/Complejo';

// --- COMPONENTE SCROLL VIGÍA ---
// Se encarga de mandar la vista arriba de todo cada vez que cambiás de ruta
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      {/* Acá ubicamos el componente silencioso.
        Debe ir sí o sí dentro del BrowserRouter para poder leer la URL.
      */}
      <ScrollToTop />

      {/* min-h-screen: Ocupa al menos el 100% del alto de la pantalla
        flex flex-col: Nos permite empujar el footer hacia abajo
        bg-gray-50: Color de fondo general de la página
      */}
      <div className="min-h-screen flex flex-col bg-gray-50">

        {/* La barra de navegación superior */}
        <Navbar />

        {/* w-full: Ocupa todo el ancho
          flex-1: Esta es la clase mágica. Le dice al main que crezca y ocupe 
          todo el espacio sobrante, empujando al Footer hacia el fondo.
        */}
        <main className="w-full flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plantel" element={<Plantel />} />
            <Route path="/plantel/cuerpo-tecnico" element={<Plantel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/socios" element={<Socios />} />
            <Route path="/noticias/:id" element={<NoticiaDetalle />} />
            <Route path="/club/historia" element={<Historia />} />
            <Route path="/club/estadio" element={<Estadio />} />
            <Route path="/club/museo" element={<Museo />} />
            <Route path="/club/autoridades" element={<Autoridades />} />
            <Route path="/club/complejo" element={<Complejo />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route
              path="/admin"
              element={
                <RutaProtegida>
                  <Dashboard />
                </RutaProtegida>
              }
            />
            <Route
              path="/admin/noticias"
              element={
                <RutaProtegida>
                  <NoticiasAdmin />
                </RutaProtegida>
              }
            />
            <Route
              path="/admin/noticias/nueva"
              element={
                <RutaProtegida>
                  <NuevaNoticia />
                </RutaProtegida>
              }
            />
            <Route
              path="/admin/noticias/editar/:id"
              element={
                <RutaProtegida>
                  <EditarNoticia />
                </RutaProtegida>
              }
            />
            <Route
              path="/admin/plantel"
              element={
                <RutaProtegida>
                  <PlantelAdmin />
                </RutaProtegida>
              }
            />
            <Route
              path="/admin/plantel/editar/:id"
              element={
                <RutaProtegida>
                  <EditarJugador />
                </RutaProtegida>
              }
            />
            <Route
              path="/admin/plantel/nuevo"
              element={
                <RutaProtegida>
                  <NuevoJugador />
                </RutaProtegida>} />
            <Route
              path="/admin/cuerpo-tecnico"
              element={
                <RutaProtegida>
                  <CuerpoTecnicoAdmin />
                </RutaProtegida>
              }
            />
            <Route
              path="/admin/cuerpo-tecnico/nuevo"
              element={
                <RutaProtegida>
                  <NuevoMiembro />
                </RutaProtegida>
              }
            />
            <Route
              path="/admin/cuerpo-tecnico/editar/:id"
              element={
                <RutaProtegida>
                  <EditarMiembro />
                </RutaProtegida>
              }
            />
            <Route
              path="/admin/tienda"
              element={
                <RutaProtegida>
                  <TiendaAdmin />
                </RutaProtegida>
              }
            />
            <Route
              path="/admin/tienda/nuevo"
              element={
                <RutaProtegida>
                  <NuevoProducto />
                </RutaProtegida>
              }
            />
            <Route
              path="/admin/tienda/editar/:id"
              element={
                <RutaProtegida>
                  <EditarProducto />
                </RutaProtegida>
              }
            />
          </Routes>
        </main>

        {/* El pie de página */}
        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App;