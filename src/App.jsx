import NuevoJugador from './pages/admin/NuevoJugador';
import EditarJugador from './pages/admin/EditarJugador';
import PlantelAdmin from './pages/admin/PlantelAdmin';
import EditarNoticia from './pages/admin/EditarNoticia';
import NuevaNoticia from './pages/admin/NuevaNoticia';
import NoticiasAdmin from './pages/admin/NoticiasAdmin';
import RutaProtegida from './components/RutaProtegida';
import Dashboard from './pages/admin/Dashboard';
import Noticias from './pages/Noticias';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Plantel from './pages/Plantel';
import Login from './pages/Login';
import NoticiaDetalle from './pages/NoticiaDetalle';

function App() {
  return (
    <BrowserRouter>
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
            <Route path="/login" element={<Login />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/noticias/:id" element={<NoticiaDetalle />} />
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
          </Routes>
        </main>

        {/* El pie de página */}
        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App;