import { Link, useNavigate } from "react-router-dom";
import { LogOut, Newspaper, Users } from "lucide-react";

const Dashboard = () => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">

                {/* Cabecera del Panel */}
                <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm mb-8 border-l-4 border-red-700">
                    <div>
                        <h1 className="text-2xl font-black text-gray-800 uppercase tracking-wider">Panel de Control</h1>
                        <p className="text-gray-500 font-medium mt-1">Gestión interna del Club Atlético San Martín</p>
                    </div>
                    <button
                        onClick={cerrarSesion}
                        className="flex items-center gap-2 text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded-md transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>

                {/* Tarjetas de Acceso Rápido */}
                <div className="grid md:grid-cols-2 gap-6">

                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div className="bg-red-100 w-14 h-14 flex items-center justify-center rounded-lg mb-6">
                            <Newspaper className="w-8 h-8 text-red-700" />
                        </div>
                        <h2 className="text-xl font-black text-gray-800 mb-2">Gestión de Noticias</h2>
                        <p className="text-gray-500 mb-6">Publicá nuevas notas, editá las existentes o borrá contenido obsoleto.</p>
                        <Link to="/admin/noticias" className="bg-red-700 text-white font-bold px-6 py-2.5 rounded-md hover:bg-red-800 transition-colors inline-block">
                            Administrar Noticias
                        </Link>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div className="bg-red-100 w-14 h-14 flex items-center justify-center rounded-lg mb-6">
                            <Users className="w-8 h-8 text-red-700" />
                        </div>
                        <h2 className="text-xl font-black text-gray-800 mb-2">Gestión del Plantel</h2>
                        <p className="text-gray-500 mb-6">Agregá nuevos refuerzos, actualizá posiciones o da de baja jugadores.</p>
                        <Link to="/admin/plantel" className="bg-red-700 text-white font-bold px-6 py-2.5 rounded-md hover:bg-red-800 transition-colors inline-block">
                            Administrar Plantel
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;