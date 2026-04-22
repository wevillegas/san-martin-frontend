import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-red-700 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo / Título */}
                <Link to="/" className="text-2xl font-black tracking-wider uppercase">
                    San Martín
                </Link>

                {/* Enlaces de navegación */}
                <div className="space-x-6 font-semibold">
                    <Link to="/" className="hover:text-red-200 transition-colors">Inicio</Link>
                    <Link to="/plantel" className="hover:text-red-200 transition-colors">Plantel</Link>
                    <Link to="/login" className="bg-white text-red-700 px-4 py-2 rounded shadow hover:bg-gray-100 transition-colors">
                        Ingresar
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar