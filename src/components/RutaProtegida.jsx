import { Navigate } from "react-router-dom";
import SesionAdmin from "./SesionAdmin";
import { leerToken, esAdmin, etiquetaPanel } from "../utils/sesion";
import { usePagina } from "../hooks/usePagina";

// soloAdmin: la pantalla es solo para administradores; un editor vuelve al panel principal
const RutaProtegida = ({ children, soloAdmin = false }) => {
    usePagina({ titulo: etiquetaPanel() === "Panel Editor" ? "Panel de edición" : "Panel de administración", noindex: true });
    const vence = leerToken()?.exp;
    const vigente = Boolean(vence) && vence * 1000 > Date.now();

    if (!vigente) {
        // Borramos el token vencido o dañado para no confundir al sistema y lo mandamos al login
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }

    if (soloAdmin && !esAdmin()) return <Navigate to="/admin" replace />;

    return (
        <>
            <SesionAdmin />
            {children}
        </>
    );
};

export default RutaProtegida;
