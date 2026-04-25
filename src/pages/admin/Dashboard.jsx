import { Link, useNavigate } from "react-router-dom";
import { Users, UserCog, Newspaper, LogOut, ShieldCheck, Plus, ArrowRight } from "lucide-react";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("¿Seguro que querés cerrar sesión?")) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    const modules = [
        {
            title: "Plantel Profesional",
            desc: "Gestioná altas, bajas, dorsales y fichas técnicas del primer equipo.",
            icon: <Users className="w-8 h-8 text-red-700 mb-4" />,
            linkList: "/admin/plantel",
            linkNew: "/admin/plantel/nuevo",
            btnNewText: "Nuevo Jugador"
        },
        {
            title: "Cuerpo Técnico",
            desc: "Administrá al DT, ayudantes, preparadores físicos y equipo médico.",
            icon: <UserCog className="w-8 h-8 text-red-700 mb-4" />,
            linkList: "/admin/cuerpo-tecnico",
            linkNew: "/admin/cuerpo-tecnico/nuevo",
            btnNewText: "Nuevo Integrante"
        },
        {
            title: "Portal de Noticias",
            desc: "Redactá y publicá comunicados, crónicas y novedades institucionales.",
            icon: <Newspaper className="w-8 h-8 text-red-700 mb-4" />,
            linkList: "/admin/noticias",
            linkNew: "/admin/noticias/nueva",
            btnNewText: "Redactar Nota"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-red-700" />
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-wider">Panel de Control</h1>
                            <p className="text-gray-500 font-medium text-sm uppercase tracking-widest">Administración Oficial</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-500 hover:text-red-700 px-4 py-2 font-bold transition-colors text-sm uppercase tracking-wider"
                    >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((mod, idx) => (
                        <div key={idx} className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 border-t-4 border-t-red-700 hover:shadow-md transition-all flex flex-col h-full">
                            {mod.icon}
                            <h2 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-wide">{mod.title}</h2>
                            <p className="text-gray-500 text-sm mb-8 leading-relaxed">{mod.desc}</p>
                            
                            <div className="mt-auto flex flex-col gap-3">
                                <Link to={mod.linkNew} className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 rounded flex items-center justify-center gap-2 transition-colors text-sm uppercase tracking-wider shadow-sm">
                                    <Plus className="w-4 h-4" /> {mod.btnNewText}
                                </Link>
                                <Link to={mod.linkList} className="w-full bg-white hover:bg-gray-100 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-bold py-2.5 rounded flex items-center justify-center gap-2 transition-all text-sm uppercase tracking-wider">
                                    Ver Listado <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;