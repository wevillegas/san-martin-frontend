// Traduce el error de una petición (axios) a un mensaje que se le pueda mostrar a quien usa el panel.
// `porDefecto` es lo que se muestra si no hay nada más preciso que decir.
export const mensajeDeError = (err, porDefecto = "No se pudo completar la acción") => {
    const respuesta = err?.response;

    // Sin respuesta: no hubo conexión con el servidor
    if (!respuesta) {
        return err?.request || err?.code === "ERR_NETWORK"
            ? "No se pudo conectar con el servidor. Revisá tu conexión; si estuvo un rato sin uso puede tardar en despertar, probá de nuevo en un minuto."
            : porDefecto;
    }

    const mensaje = typeof respuesta.data?.mensaje === "string" ? respuesta.data.mensaje.trim() : "";

    if (respuesta.status === 403) return mensaje || "Tu cuenta no tiene permiso para hacer esto.";
    if (respuesta.status === 401) return "Tu sesión venció. Iniciá sesión en otra pestaña y volvé a intentar: lo que escribiste no se pierde.";
    if (respuesta.status === 413) return "El archivo es demasiado pesado.";
    if (respuesta.status === 429) return mensaje || "Demasiados intentos seguidos. Esperá unos minutos.";
    if (respuesta.status >= 500) {
        return mensaje
            ? `${mensaje.replace(/\.$/, "")}. Es un problema del servidor, probá de nuevo en un momento.`
            : "El servidor tuvo un problema. Probá de nuevo en un momento.";
    }
    return mensaje || porDefecto;
};
