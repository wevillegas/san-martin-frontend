import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // O tu servicio de auth si ya lo tenés
import { LogIn, AlertCircle } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setCargando(true);

        try {
            // Cambiamos 'usuarios' por 'auth'
            const respuesta = await axios.post("https://san-martin-backend.onrender.com/api/auth/login", {
                email,
                password,
            });

            // Guardamos como 'token' para estandarizar (borrá el 'tokenSanto' de tu navegador para no confundirte)
            const token = respuesta.data.token;
            localStorage.setItem("token", token);

            navigate("/admin");

        } catch (err) {
            console.error(err);
            setError("Credenciales incorrectas o error en el servidor");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

                {/* Cabecera del Formulario */}
                <div className="bg-red-700 p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <img src="/images/escudo.png" alt="Escudo" className="w-10 h-10 object-contain" />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-wider">Acceso Staff</h2>
                    <p className="text-red-100 text-sm font-medium mt-1">Portal de Administración del Santo</p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 text-sm font-bold">
                            <AlertCircle className="w-5 h-5" />
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-medium"
                            placeholder="admin@sanmartin.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-medium"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={cargando}
                        className="w-full bg-red-700 hover:bg-red-800 text-white font-black py-4 rounded-lg uppercase tracking-widest transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {cargando ? "Verificando..." : (
                            <>
                                <LogIn className="w-5 h-5" />
                                Ingresar al Panel
                            </>
                        )}
                    </button>

                    <div className="text-center">
                        <Link to="/" className="text-sm font-bold text-gray-400 hover:text-red-700 transition-colors uppercase tracking-tighter">
                            Volver al sitio público
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;