import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children }) => {
    const token = localStorage.getItem("token");

    // Función inteligente para revisar si el token está vigente
    const esTokenValido = (token) => {
        if (!token) return false;
        try {
            // Decodificamos la parte del medio del token (el Payload)
            const payload = JSON.parse(atob(token.split('.')[1]));
            // El backend manda la fecha de vencimiento (exp) en segundos. 
            // Date.now() está en milisegundos, por eso multiplicamos por 1000.
            if (payload.exp && payload.exp * 1000 < Date.now()) {
                return false; // ¡El token está vencido!
            }
            return true; // El token sigue vivo
        } catch (error) {
            return false; // Si el token está mal formado
        }
    };

    // Si no hay token, o si hay uno pero ya venció...
    if (!esTokenValido(token)) {
        // Borramos el token fantasma para no confundir al sistema
        localStorage.removeItem("token");
        // Lo mandamos al login
        return <Navigate to="/login" replace />;
    }

    // Si todo está en orden, lo dejamos pasar al panel
    return children;
};

export default RutaProtegida;