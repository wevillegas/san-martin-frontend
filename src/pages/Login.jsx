import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Herramienta de React Router para cambiar de página
    const navigate = useNavigate();

    const manejarSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
        setError(null);     // Limpiamos errores previos

        try {
            // Llamamos a nuestro servicio
            const datos = await loginUsuario(email, password);

            // ¡Acá está la clave! Guardamos el token en la memoria del navegador
            localStorage.setItem('tokenSanto', datos.token);

            // Si todo sale bien, lo mandamos al inicio
            navigate('/');
        } catch (err) {
            // Si tira error de credenciales, lo guardamos para mostrarlo en rojo
            setError(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-8 border-red-700">
                <h1 className="text-3xl font-black text-center text-gray-800 mb-6 uppercase">
                    Acceso Administrador
                </h1>

                {/* Si hay error, mostramos este cartel rojo */}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={manejarSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="admin@sanmartin.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Contraseña</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded transition-colors uppercase tracking-wide"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;