// Vista previa de una noticia para los robots que no ejecutan JavaScript (WhatsApp, Facebook, X, Telegram...).
// vercel.json manda acá los pedidos de esos robots a /noticias/:id; las personas siguen viendo la página normal.

const API = process.env.API_URL || process.env.VITE_API_URL || "https://san-martin-backend.onrender.com";
const TITULO = "Club Atlético San Martín de Tucumán";
const DESCRIPCION = "Página web del Club Atlético San Martín de Tucumán - El más grande del Norte.";

const escapar = (texto = "") =>
    String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const resumir = (texto = "", max = 200) => {
    const limpio = texto.replace(/\s+/g, " ").trim();
    return limpio.length > max ? `${limpio.slice(0, max - 1).trim()}…` : limpio;
};

// Cloudinary: la foto ya recortada a 1200x630 y liviana
const imagenParaCompartir = (url) =>
    url && url.includes("res.cloudinary.com") && url.includes("/upload/") && !/\/upload\/[a-z]_/.test(url)
        ? url.replace("/upload/", "/upload/c_fill,w_1200,h_630,q_auto,f_jpg/")
        : url;

export default async function handler(req, res) {
    const id = String(req.query?.id || "");
    const host = req.headers["x-forwarded-host"] || req.headers.host || "sanmartintucuman.vercel.app";
    const origen = `https://${host}`;
    const idValido = /^[a-f0-9]{24}$/i.test(id);

    let noticia = null;
    if (idValido) {
        const control = new AbortController();
        const corte = setTimeout(() => control.abort(), 8000); // el servidor gratuito puede tardar en despertar
        try {
            const r = await fetch(`${API}/api/noticias/${id}`, { signal: control.signal });
            if (r.ok) noticia = await r.json();
        } catch {
            /* sin datos: se muestra la vista previa general del club */
        } finally {
            clearTimeout(corte);
        }
    }

    const titulo = noticia?.titulo ? `${noticia.titulo} | Club Atlético San Martín` : TITULO;
    const descripcion = noticia ? resumir(noticia.resumen || noticia.cuerpo) || DESCRIPCION : DESCRIPCION;
    const imagen = noticia?.imagenUrl ? imagenParaCompartir(noticia.imagenUrl) : `${origen}/og-default.jpg`;
    const url = noticia ? `${origen}/noticias/${id}` : origen;

    const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>${escapar(titulo)}</title>
<meta name="description" content="${escapar(descripcion)}" />
<link rel="canonical" href="${escapar(url)}" />
<meta property="og:type" content="${noticia ? "article" : "website"}" />
<meta property="og:site_name" content="Club Atlético San Martín" />
<meta property="og:locale" content="es_AR" />
<meta property="og:title" content="${escapar(titulo)}" />
<meta property="og:description" content="${escapar(descripcion)}" />
<meta property="og:image" content="${escapar(imagen)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${escapar(url)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapar(titulo)}" />
<meta name="twitter:description" content="${escapar(descripcion)}" />
<meta name="twitter:image" content="${escapar(imagen)}" />
</head>
<body><a href="${escapar(url)}">${escapar(titulo)}</a></body>
</html>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // Los robots guardan la vista previa un buen rato: que no despierte el servidor en cada compartida
    res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=86400");
    res.status(200).send(html);
}
