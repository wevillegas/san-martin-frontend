// sitemap.xml: las páginas del sitio más cada noticia publicada (así Google encuentra las notas nuevas sin que nadie lo avise).

const API = process.env.API_URL || process.env.VITE_API_URL || "https://san-martin-backend.onrender.com";

const PAGINAS = [
    "/", "/noticias", "/plantel", "/plantel/cuerpo-tecnico", "/fixture", "/tienda", "/socios",
    "/club/historia", "/club/estadio", "/club/museo", "/club/complejo", "/club/autoridades",
];

const xml = (texto) => String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export default async function handler(req, res) {
    const host = req.headers["x-forwarded-host"] || req.headers.host || "sanmartintucuman.vercel.app";
    const origen = `https://${host}`;

    let noticias = [];
    const control = new AbortController();
    const corte = setTimeout(() => control.abort(), 8000);
    try {
        const r = await fetch(`${API}/api/noticias`, { signal: control.signal });
        if (r.ok) noticias = await r.json();
    } catch {
        /* si el servidor no responde, el mapa lleva solo las páginas fijas */
    } finally {
        clearTimeout(corte);
    }

    const filas = [
        ...PAGINAS.map((ruta) => `  <url><loc>${xml(origen + ruta)}</loc></url>`),
        ...noticias
            .filter((n) => /^[a-f0-9]{24}$/i.test(n._id))
            .map((n) => `  <url><loc>${xml(`${origen}/noticias/${n._id}`)}</loc>${n.updatedAt ? `<lastmod>${xml(String(n.updatedAt).slice(0, 10))}</lastmod>` : ""}</url>`),
    ];

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${filas.join("\n")}\n</urlset>\n`);
}
