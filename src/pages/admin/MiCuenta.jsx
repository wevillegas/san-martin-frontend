import { Link } from "react-router-dom";
import { ArrowLeft, UserCircle } from "lucide-react";
import CambiarMiClave from "../../components/CambiarMiClave";
import { usuarioActual } from "../../utils/sesion";

const ROLES = {
    administrador: "Administrador: puede todo.",
    editor: "Editor: crea y edita contenido. Eliminar y administrar es solo de los administradores.",
};

// Pantalla abierta a todos los usuarios del panel
const MiCuenta = () => {
    const yo = usuarioActual();

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-xl mx-auto space-y-6">
                <div>
                    <Link to="/admin" className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-medium mb-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al Dashboard principal
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-wider flex items-center gap-3">
                        <UserCircle className="w-8 h-8 text-red-700" />
                        Mi cuenta
                    </h1>
                </div>

                {yo && (
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6">
                        <p className="text-xs font-black uppercase tracking-widest text-gray-500">Sesión iniciada como</p>
                        <p className="mt-1 text-xl font-black text-gray-900">{yo.nombre}</p>
                        <p className="mt-2 text-sm text-gray-600">{ROLES[yo.rol]}</p>
                    </section>
                )}

                <CambiarMiClave />
            </div>
        </div>
    );
};

export default MiCuenta;
