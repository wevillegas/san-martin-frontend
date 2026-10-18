// Cuántas filas se muestran por página en las tablas del panel
export const POR_PAGINA = 10;

// Devuelve la página pedida (corregida si quedó fuera de rango, por ejemplo al borrar el último elemento de la última página)
export const paginar = (items, pagina, porPagina = POR_PAGINA) => {
    const totalPaginas = Math.max(1, Math.ceil(items.length / porPagina));
    const actual = Math.min(Math.max(1, pagina), totalPaginas);
    return { actual, totalPaginas, filas: items.slice((actual - 1) * porPagina, actual * porPagina) };
};

// Números de página a mostrar, con "…" cuando hay muchas: 1 … 4 5 6 … 20
export const rangoPaginas = (actual, total) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const paginas = [1];
    if (actual > 3) paginas.push("…");
    for (let p = Math.max(2, actual - 1); p <= Math.min(total - 1, actual + 1); p++) paginas.push(p);
    if (actual < total - 2) paginas.push("…");
    paginas.push(total);
    return paginas;
};
