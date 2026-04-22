import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Plantel from './pages/Plantel';
import Login from './pages/Login';

function App() {
  return (
    // BrowserRouter envuelve toda la app para habilitar la navegación
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* El Navbar queda fuera de las Routes para que se vea en TODAS las páginas */}
        <Navbar />
        
        {/* Routes es el espacio donde van cambiando las páginas */}
        <main className="container mx-auto mt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plantel" element={<Plantel />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App