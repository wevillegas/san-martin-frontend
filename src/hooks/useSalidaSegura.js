import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAvisos } from "../components/Avisos";

// Avisa antes de perder lo escrito en un formulario.
// marcar: se pasa a onChange del <form>; limpiar: se llama al guardar; alVolver: onClick del enlace "Volver".
export const useSalidaSegura = (destino) => {
    const navigate = useNavigate();
    const { confirmar } = useAvisos();
    const [sucio, setSucio] = useState(false);

    // Al cerrar o recargar la pestaña el navegador muestra su propio aviso
    useEffect(() => {
        if (!sucio) return;
        const avisar = (e) => { e.preventDefault(); e.returnValue = ""; };
        window.addEventListener("beforeunload", avisar);
        return () => window.removeEventListener("beforeunload", avisar);
    }, [sucio]);

    const alVolver = async (e) => {
        if (!sucio) return;
        e.preventDefault();
        const salir = await confirmar({
            titulo: "Cambios sin guardar",
            mensaje: "Si salís ahora se pierde lo que escribiste o cambiaste.",
            textoConfirmar: "Salir sin guardar",
            peligro: true,
        });
        if (salir) navigate(destino);
    };

    return { marcar: () => setSucio(true), limpiar: () => setSucio(false), alVolver };
};
