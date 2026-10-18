import { useState, useEffect } from "react";
import { paginar, POR_PAGINA } from "../utils/paginacion";

// Pagina una lista en el navegador. `reiniciarCon`: valores (búsqueda, filtros) que al cambiar vuelven a la página 1.
// Devuelve las filas de la página actual y las props para <Paginacion />.
export const usePaginacion = (items, reiniciarCon = [], porPagina = POR_PAGINA) => {
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
        setPagina(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, reiniciarCon);

    const { actual, filas } = paginar(items, pagina, porPagina);
    return { filas, paginacion: { total: items.length, porPagina, pagina: actual, onCambio: setPagina } };
};
