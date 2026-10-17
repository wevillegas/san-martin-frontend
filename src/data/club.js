// Datos del club usados en varias páginas: se editan acá una sola vez.

export const CAPACIDAD_CIUDADELA = 27000; // se muestra como "+27.000"
export const CANTIDAD_SOCIOS = 15000; // se muestra como "+15.000"

// Años cumplidos desde una fecha: suma uno recién al llegar al aniversario (mes 1-12)
export const aniversarios = (año, mes, dia) => {
    const hoy = new Date();
    const cumplido = hoy >= new Date(hoy.getFullYear(), mes - 1, dia);
    return hoy.getFullYear() - año - (cumplido ? 0 : 1);
};

// Fundación: 2 de noviembre de 1909
export const añosDeHistoria = () => aniversarios(1909, 11, 2);
