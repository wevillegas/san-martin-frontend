// Lee el contenido del token guardado. Sirve solo para decidir qué mostrar: el servidor es quien valida de verdad.
export const leerToken = () => {
    try {
        const base64 = localStorage.getItem("token").split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        return JSON.parse(new TextDecoder().decode(bytes)); // UTF-8: respeta tildes y eñes
    } catch {
        return null;
    }
};

export const usuarioActual = () => {
    const datos = leerToken()?.usuario;
    return datos ? { id: datos.id, nombre: datos.nombre, rol: datos.rol || "administrador" } : null;
};

export const esAdmin = () => usuarioActual()?.rol === "administrador";

// El editor ve "Panel Editor" y el administrador "Panel Admin" (navbar, pie de página y título de la pestaña)
export const etiquetaPanel = () => (usuarioActual()?.rol === "editor" ? "Panel Editor" : "Panel Admin");
