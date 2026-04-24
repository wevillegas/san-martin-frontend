import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children }) => {
    // Buscamos si hay un token guardado en el navegador
    const token = localStorage.getItem("token"); // Que sea 'token' a secas

    // Si no hay token, lo mandamos directo a la página de login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si hay token, lo dejamos ver la página (children)
    return children;
};

export default RutaProtegida;