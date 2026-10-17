import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Star, Link2, Check, Eye } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { obtenerNoticiaPorId, obtenerNoticias } from "../services/noticiaService";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { imagenPlaceholder } from "../constants/placeholders";
import Reveal from "../components/Reveal";
import PageHero from "../components/PageHero";
import EscudoMarca from "../components/EscudoMarca";

const formatearFecha = (fecha) =>
    new Date(fecha).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" });

// Unas 200 palabras por minuto
const minutosDeLectura = (texto) => Math.max(1, Math.round(texto.trim().split(/\s+/).length / 200));

const botonCompartir = "inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm transition-colors hover:border-red-700 hover:bg-red-700 hover:text-white";

const NoticiaDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [noticia, setNoticia] = useState(null);
    const [relacionadas, setRelacionadas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [copiado, setCopiado] = useState(false);

    // "default" significa que se entró directo al link: no hay página anterior dentro del sitio
    const veniaDelSitio = location.key !== "default";

    useEffect(() => {
        setCargando(true);
        setError(false);
        const cargarNoticia = async () => {
            try {
                const datos = await obtenerNoticiaPorId(id);
                setNoticia(datos);
                setCargando(false);

                // Relacionadas: misma etiqueta primero y, si faltan, las más recientes
                const todas = (await obtenerNoticias()).filter((n) => n._id !== id);
                const mismas = todas.filter((n) => n.etiqueta === datos.etiqueta);
                const otras = todas.filter((n) => n.etiqueta !== datos.etiqueta);
                setRelacionadas([...mismas, ...otras].slice(0, 3));
            } catch (err) {
                console.error("Error al cargar la nota", err);
                setError(true);
                setCargando(false);
            }
        };
        cargarNoticia();
    }, [id]);

    if (cargando) return <Loader texto="Cargando nota..." />;
    if (error || !noticia) return <ErrorState texto="No se encontró la noticia que buscás." />;

    // Solo los administradores llegan acá con una nota que todavía no es pública
    const sinPublicar = noticia.estado === "borrador" ? "es un borrador" : noticia.publicarEn && new Date(noticia.publicarEn) > new Date() ? `se publica el ${new Date(noticia.publicarEn).toLocaleString("es-AR", { dateStyle: "long", timeStyle: "short" })}` : null;

    const parrafos = noticia.cuerpo.split(/\n+/).filter((p) => p.trim());
    const url = window.location.href;
    const textoCompartir = `${noticia.titulo} - Club Atlético San Martín`;

    const copiarEnlace = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2000);
        } catch {
            window.prompt("Copiá el enlace:", url);
        }
    };

    return (
        <>
            {sinPublicar && (
                <div role="status" className="flex items-center justify-center gap-2 bg-amber-100 px-4 py-2.5 text-sm font-bold text-amber-900">
                    <Eye className="h-4 w-4 shrink-0" /> Vista previa: esta nota {sinPublicar} y todavía no la ve el público.
                </div>
            )}
            <article className="bg-white pb-16">
                <PageHero
                    img={noticia.imagenUrl || imagenPlaceholder}
                    alt={noticia.titulo}
                    badge={noticia.etiqueta}
                    title={noticia.titulo}
                    subtitle={formatearFecha(noticia.publicarEn || noticia.createdAt)}
                    height="h-[450px] md:h-[550px]"
                    contentClassName="pb-14 md:pb-10"
                    titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl text-balance leading-tight"
                    subtitleClassName="text-sm md:text-lg uppercase tracking-widest"
                />

                <Reveal className="max-w-2xl mx-auto px-4 mt-6 md:mt-10">
                    <button
                        onClick={() => (veniaDelSitio ? navigate(-1) : navigate("/noticias"))}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-red-700 mb-6 transition-colors text-sm font-bold uppercase tracking-wider"
                    >
                        <ArrowLeft className="w-4 h-4" /> {veniaDelSitio ? "Volver" : "Todas las noticias"}
                    </button>

                    {/* Datos de la nota */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-5 border-y border-gray-100 mb-10 text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-red-600" />
                            <span>Por <strong className="text-gray-900">{noticia.autor}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-red-600" />
                            <span>{minutosDeLectura(noticia.cuerpo)} min de lectura</span>
                        </div>
                        {noticia.destacado && (
                            <span className="flex items-center gap-1 bg-yellow-400 text-yellow-900 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                <Star className="w-3 h-3 fill-yellow-900" />
                                Nota destacada
                            </span>
                        )}
                    </div>

                    {/* Bajada */}
                    {noticia.resumen && (
                        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed mb-10 border-l-4 border-red-600 pl-4 italic">
                            {noticia.resumen}
                        </p>
                    )}

                    {/* Texto: columna angosta, párrafos separados y capitular en el primero */}
                    <div className="space-y-6 text-lg leading-8 text-gray-700">
                        {parrafos.map((p, i) => (
                            <p
                                key={i}
                                className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-titulo first-letter:text-6xl first-letter:font-black first-letter:leading-[0.85] first-letter:text-red-700" : ""}
                            >
                                {p}
                            </p>
                        ))}
                    </div>

                    {/* Compartir */}
                    <div className="mt-14 border-t border-gray-100 pt-8">
                        <p className="mb-4 font-titulo text-lg font-black uppercase tracking-widest text-gray-800">Compartir esta nota</p>
                        <div className="flex flex-wrap gap-3">
                            <a href={`https://wa.me/?text=${encodeURIComponent(`${textoCompartir} ${url}`)}`} target="_blank" rel="noopener noreferrer" className={botonCompartir}>
                                <FaWhatsapp className="w-4 h-4" /> WhatsApp
                            </a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className={botonCompartir}>
                                <FaFacebookF className="w-4 h-4" /> Facebook
                            </a>
                            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(textoCompartir)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className={botonCompartir}>
                                <FaXTwitter className="w-4 h-4" /> X
                            </a>
                            <button onClick={copiarEnlace} className={botonCompartir}>
                                {copiado ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                                {copiado ? "¡Copiado!" : "Copiar enlace"}
                            </button>
                        </div>
                    </div>
                </Reveal>
            </article>

            {/* Noticias relacionadas */}
            {relacionadas.length > 0 && (
                <section className="bg-gray-50 border-t border-gray-200 py-14 md:py-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-gray-800 uppercase tracking-wider">Seguí leyendo</h2>
                                <div className="w-20 h-1.5 bg-red-700 rounded-full mt-3" />
                            </div>
                            <Link to="/noticias" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-700 hover:text-red-800">
                                Ver todas las noticias <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {relacionadas.map((n) => (
                                <Reveal key={n._id} className="h-full">
                                    <Link to={`/noticias/${n._id}`} className="group block h-full">
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white card-santo foto-zoom">
                                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                                <img src={n.imagenUrl || imagenPlaceholder} alt={n.titulo} className="h-full w-full object-cover" />
                                                <span className="absolute left-3 top-3 rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-bold uppercase text-white shadow">{n.etiqueta}</span>
                                            </div>
                                            <div className="relative flex flex-1 flex-col justify-between p-5 pr-24">
                                                <EscudoMarca className="right-4 top-1/2 -translate-y-1/2 h-16 w-16" />
                                                <h3 className="relative line-clamp-3 text-lg font-bold text-gray-900 transition-colors group-hover:text-red-700">{n.titulo}</h3>
                                                <div className="relative mt-4 flex items-center gap-2 text-xs font-medium text-gray-500">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{new Date(n.createdAt).toLocaleDateString("es-AR")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default NoticiaDetalle;
