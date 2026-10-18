import { useEffect, useRef } from "react";
import { X, Code, GraduationCap, MapPin, Layers, ShieldCheck, Database, Share2, Zap, Plug, Briefcase, Info } from "lucide-react";

// Cuando subas tu portfolio, pegá acá el link (por ejemplo "https://tu-portfolio.com").
// Mientras esté vacío, el botón se ve igual pero no lleva a ningún lado.
const URL_PORTFOLIO = "";

const STACK = [
    { titulo: "Frontend", items: ["React 19", "Vite 8", "Tailwind CSS 4", "React Router 7", "Axios", "Embla Carousel", "Lucide y React Icons"] },
    { titulo: "Backend", items: ["Node.js", "Express 5", "Mongoose 9", "JWT", "bcrypt", "Helmet", "Rate limiting", "Multer"] },
    { titulo: "Datos y servicios", items: ["MongoDB Atlas", "Cloudinary", "API pública de ESPN"] },
    { titulo: "Despliegue", items: ["Vercel (sitio y funciones serverless)", "Render (API)", "Git y GitHub"] },
    { titulo: "Diseño", items: ["Responsive mobile first", "Tipografías Oswald, Inter y Cinzel"] },
];

const DETALLES = [
    {
        icono: Layers,
        titulo: "Arquitectura",
        texto: "Aplicación de una sola página en React que consume una API REST propia. El frontend y el backend viven en repositorios independientes y se despliegan por separado.",
    },
    {
        icono: Database,
        titulo: "CMS y panel de administración",
        texto: "Gestión de noticias (con borradores y publicación programada), plantel, cuerpo técnico, tienda, autoridades y datos del club. Incluye auditoría de cambios con exportación a CSV y papelera con restauración.",
    },
    {
        icono: ShieldCheck,
        titulo: "Seguridad",
        texto: "Sesión con JWT que se renueva mientras se trabaja y se invalida al cambiar la clave o eliminar la cuenta. Roles de administrador y editor verificados en el servidor, claves con bcrypt, límite de intentos de login, Helmet, CORS restringido y validación de datos.",
    },
    {
        icono: Share2,
        titulo: "SEO y vista previa al compartir",
        texto: "Metadatos propios en cada página, sitemap dinámico y funciones serverless que arman la vista previa de cada noticia para WhatsApp, Facebook y X.",
    },
    {
        icono: Plug,
        titulo: "Integraciones",
        texto: "El fixture y los resultados de la Primera Nacional se obtienen de la API pública de ESPN, se procesan en el backend y se guardan en caché durante 2 horas.",
    },
    {
        icono: Zap,
        titulo: "Interfaz",
        texto: "Diseño responsive y animaciones en CSS (parallax, carta en 3D que se da vuelta, aparición al hacer scroll) que respetan la opción de reducir movimiento. Las imágenes de contenido se alojan en Cloudinary.",
    },
];

const botonBase = "flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[13px] md:text-sm font-bold transition-colors";

const Titulo = ({ children }) => (
    <h4 className="mb-3 flex items-center gap-2 font-titulo text-sm md:text-base font-black uppercase tracking-widest text-gray-800">
        <span className="h-4 w-1 rounded bg-red-700" />
        {children}
    </h4>
);

// Ventana "Acerca de este sitio" del pie de página
const AcercaDe = ({ abierto, onCerrar }) => {
    const cerrarRef = useRef(null);
    const onCerrarRef = useRef(onCerrar);
    onCerrarRef.current = onCerrar; // el pie pasa una función nueva en cada render: no hay que reiniciar el efecto por eso

    // Esc cierra, el fondo no scrollea mientras está abierta y el foco vuelve a donde estaba
    useEffect(() => {
        if (!abierto) return;
        const previo = document.activeElement;
        const onKey = (e) => e.key === "Escape" && onCerrarRef.current();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        cerrarRef.current?.focus();
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
            previo?.focus?.();
        };
    }, [abierto]);

    if (!abierto) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 md:p-4 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onCerrar()}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="acerca-titulo"
                className="ficha-entrada relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white text-gray-900 shadow-2xl md:max-h-[90vh]"
            >
                {/* Cabecera */}
                <div className="relative shrink-0 overflow-hidden bg-gradient-to-r from-red-900 via-red-800 to-red-700 px-5 py-5 text-white md:px-8 md:py-6">
                    <div className="banner-bastones absolute inset-0" aria-hidden="true" />
                    <div className="escudo-marca absolute right-14 top-1/2 hidden h-16 w-16 -translate-y-1/2 rotate-12 sm:block md:right-20 md:h-[4.5rem] md:w-[4.5rem]" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} aria-hidden="true" />
                    <button
                        ref={cerrarRef}
                        onClick={onCerrar}
                        aria-label="Cerrar"
                        className="absolute right-3 top-3 z-10 rounded-full bg-black/25 p-1.5 text-white transition-colors hover:bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-4 md:top-4"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <div className="relative flex items-center gap-4 pr-8">
                        <span className="rounded-xl bg-white/15 p-3"><Code className="h-7 w-7 md:h-8 md:w-8" /></span>
                        <div>
                            <h3 id="acerca-titulo" className="font-titulo text-2xl font-black uppercase leading-none tracking-wider md:text-3xl">Acerca de este sitio</h3>
                            <p className="mt-1.5 text-[11px] font-bold uppercase tracking-widest text-red-100 md:text-xs">Proyecto Full stack</p>
                        </div>
                    </div>
                </div>

                {/* Contenido */}
                <div className="space-y-6 overflow-y-auto p-5 md:space-y-7 md:p-8">

                    <div className="flex gap-3 rounded-r-lg border-l-4 border-red-600 bg-red-50 p-3 md:p-4">
                        <Info className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />
                        <p className="text-[13px] font-medium leading-snug text-red-900 md:text-sm">
                            <strong className="font-black uppercase tracking-wider">Aviso:</strong> Este sitio web no es la página oficial del Club Atlético San Martín de Tucumán. Es una aplicación web desarrollada exclusivamente con fines académicos y de demostración técnica.
                        </p>
                    </div>

                    <p className="text-[13px] leading-relaxed md:text-base">
                        La plataforma fue construida con arquitectura <strong>MERN</strong> (MongoDB, Express, React y Node.js): bases de datos no relacionales, una API REST propia, consumo de APIs externas (ESPN), un sistema de gestión de contenidos (CMS) hecho a medida y aplicación de Inteligencia Artificial en el desarrollo.
                    </p>

                    {/* Detalles técnicos */}
                    <section>
                        <Titulo>Cómo está construido</Titulo>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {DETALLES.map(({ icono: Icono, titulo, texto }) => (
                                <div key={titulo} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                    <div className="mb-2 flex items-center gap-2.5">
                                        <span className="rounded-lg bg-red-100 p-2 text-red-700"><Icono className="h-4 w-4" /></span>
                                        <h5 className="text-sm font-black uppercase tracking-wide text-gray-900">{titulo}</h5>
                                    </div>
                                    <p className="text-[13px] leading-relaxed text-gray-600">{texto}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Stack */}
                    <section>
                        <Titulo>Tecnologías</Titulo>
                        <div className="space-y-3.5">
                            {STACK.map(({ titulo, items }) => (
                                <div key={titulo}>
                                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 md:text-xs">{titulo}</p>
                                    <ul className="flex flex-wrap gap-1.5">
                                        {items.map((item) => (
                                            <li key={item} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-bold text-gray-700 shadow-sm md:text-xs">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Desarrollador */}
                    <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-white md:p-6">
                        <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 md:text-xs">
                            <Code className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
                            Desarrollo
                        </h4>
                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
                            <div className="flex-grow space-y-2">
                                <p className="font-titulo text-xl font-black uppercase tracking-tight md:text-2xl">Wenceslao José Villegas</p>
                                <div className="flex items-start gap-2 text-[13px] font-medium text-gray-300 md:text-sm">
                                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                                    <span>Estudiante de 5to año de Ingeniería Informática (UNSTA)</span>
                                </div>
                                <div className="flex items-start gap-2 text-[13px] font-medium text-gray-300 md:text-sm">
                                    <Code className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                                    <span>Egresado Fullstack - Rolling Code School</span>
                                </div>
                                <div className="flex items-start gap-2 text-[13px] text-gray-400 md:text-sm">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span>Yerba Buena, Tucumán, Argentina</span>
                                </div>
                            </div>

                            <div className="flex w-full flex-col gap-2 md:w-48 md:shrink-0">
                                <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                                    <a href="https://www.linkedin.com/in/wenceslaojosevillegas/" target="_blank" rel="noopener noreferrer" className={`${botonBase} bg-[#0A66C2] text-white hover:bg-blue-800`}>
                                        LinkedIn
                                    </a>
                                    <a href="https://github.com/wevillegas" target="_blank" rel="noopener noreferrer" className={`${botonBase} border border-white/15 bg-gray-950 text-white hover:bg-black`}>
                                        GitHub
                                    </a>
                                </div>
                                {/* Mismo botón con o sin link: sin URL queda listo pero no lleva a ningún lado */}
                                {URL_PORTFOLIO ? (
                                    <a href={URL_PORTFOLIO} target="_blank" rel="noopener noreferrer" className={`${botonBase} bg-red-700 text-white hover:bg-red-600`}>
                                        <Briefcase className="h-4 w-4" />
                                        Portfolio
                                    </a>
                                ) : (
                                    <button type="button" className={`${botonBase} bg-red-700 text-white hover:bg-red-600`}>
                                        <Briefcase className="h-4 w-4" />
                                        Portfolio
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AcercaDe;
