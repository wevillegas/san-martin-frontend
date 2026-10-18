import { useEffect } from "react";

const SITIO = "Club Atlético San Martín";
const TITULO_POR_DEFECTO = "Club Atlético San Martín de Tucumán";
const DESCRIPCION_POR_DEFECTO = "Página web del Club Atlético San Martín de Tucumán - El más grande del Norte.";
const IMAGEN_POR_DEFECTO = "/og-default.jpg";

// Cloudinary: pide la foto ya recortada a 1200x630 y liviana, que es lo que piden WhatsApp, Facebook y X
export const imagenParaCompartir = (url) =>
    url && url.includes("res.cloudinary.com") && url.includes("/upload/") && !/\/upload\/[a-z]_/.test(url)
        ? url.replace("/upload/", "/upload/c_fill,w_1200,h_630,q_auto,f_jpg/")
        : url;

const absoluta = (origen, ruta) => (/^https?:\/\//.test(ruta) ? ruta : `${origen}${ruta}`);

// Busca la etiqueta del <head> (o la crea) y le pone el valor
const fijar = (doc, tag, atributo, nombre, valorAtributo, valor) => {
    let el = doc.head.querySelector(`${tag}[${atributo}="${nombre}"]`);
    if (!el) {
        el = doc.createElement(tag);
        el.setAttribute(atributo, nombre);
        doc.head.appendChild(el);
    }
    el.setAttribute(valorAtributo, valor);
};

// Aplica título, descripción, vista previa para compartir, enlace canónico y si se indexa o no.
// Recibe el documento y el origen por parámetro para poder probarla sin navegador.
export const aplicarMetadatos = (doc, origen, ruta, { titulo, descripcion, imagen, tipo = "website", noindex = false } = {}) => {
    const tituloCompleto = titulo ? `${titulo} | ${SITIO}` : TITULO_POR_DEFECTO;
    const texto = descripcion || DESCRIPCION_POR_DEFECTO;
    const foto = absoluta(origen, imagenParaCompartir(imagen) || IMAGEN_POR_DEFECTO);
    const url = `${origen}${ruta}`;

    doc.title = tituloCompleto;
    fijar(doc, "meta", "name", "description", "content", texto);
    fijar(doc, "meta", "property", "og:title", "content", tituloCompleto);
    fijar(doc, "meta", "property", "og:description", "content", texto);
    fijar(doc, "meta", "property", "og:image", "content", foto);
    fijar(doc, "meta", "property", "og:url", "content", url);
    fijar(doc, "meta", "property", "og:type", "content", tipo);
    fijar(doc, "meta", "name", "twitter:title", "content", tituloCompleto);
    fijar(doc, "meta", "name", "twitter:description", "content", texto);
    fijar(doc, "meta", "name", "twitter:image", "content", foto);
    fijar(doc, "link", "rel", "canonical", "href", url);
    fijar(doc, "meta", "name", "robots", "content", noindex ? "noindex, nofollow" : "index, follow");
};

// Uso: usePagina({ titulo: "Plantel Profesional", descripcion: "..." }). Al salir de la página vuelve a lo general.
export const usePagina = (opciones = {}) => {
    const { titulo, descripcion, imagen, tipo, noindex } = opciones;

    useEffect(() => {
        const ruta = window.location.pathname;
        aplicarMetadatos(document, window.location.origin, ruta, { titulo, descripcion, imagen, tipo, noindex });
        return () => aplicarMetadatos(document, window.location.origin, window.location.pathname, {});
    }, [titulo, descripcion, imagen, tipo, noindex]);
};
