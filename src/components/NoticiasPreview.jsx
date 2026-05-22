import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Star } from "lucide-react";

const NoticiasPreview = ({ noticiaPrincipal, ultimasNoticias }) => {
    const imagenPlaceholder = "https://images.unsplash.com/photo-1518605368461-1ee7e53023eb?q=80&w=1000&auto=format&fit=crop";

    if (!noticiaPrincipal) return null;

    return (
        <section className="bg-gray-50 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 md:text-4xl uppercase tracking-wider">
                            Últimas Noticias
                        </h2>
                        <p className="mt-1 text-gray-500 font-medium">Enterate de todo lo que pasa en el Santo</p>
                    </div>
                    <Link
                        to="/noticias"
                        className="flex items-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md transition-colors font-semibold"
                    >
                        Ver todas las noticias
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Noticia Principal */}
                    <Link to={`/noticias/${noticiaPrincipal._id}`} className="group">
                        <div className="h-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-xl flex flex-col relative">
                            
                            {noticiaPrincipal.destacado && (
                                <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                    <Star className="w-3 h-3 fill-yellow-900" />
                                    Destacado
                                </div>
                            )}

                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={noticiaPrincipal.imagenUrl ? `${noticiaPrincipal.imagenUrl}?t=${new Date().getTime()}` : imagenPlaceholder}
                                    alt={noticiaPrincipal.titulo}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className="mb-2 inline-block bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">{noticiaPrincipal.etiqueta}</span>
                                    <h3 className="text-balance text-2xl font-bold text-white md:text-3xl leading-tight">{noticiaPrincipal.titulo}</h3>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <p className="mb-4 line-clamp-3 text-gray-600">{noticiaPrincipal.resumen || noticiaPrincipal.cuerpo}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(noticiaPrincipal.createdAt).toLocaleDateString('es-AR')}</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Lista de Noticias Secundarias */}
                    <div className="flex flex-col gap-4">
                        {ultimasNoticias.map((noticia) => (
                            <Link key={noticia._id} to={`/noticias/${noticia._id}`} className="group">
                                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
                                    <div className="flex gap-4 p-4">
                                        <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg">
                                            <img
                                                src={noticia.imagenUrl ? `${noticia.imagenUrl}?t=${new Date().getTime()}` : imagenPlaceholder}
                                                alt={noticia.titulo}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-center">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className="inline-block bg-gray-100 text-gray-800 text-xs font-bold px-2 py-0.5 rounded-full w-fit uppercase">
                                                    {noticia.etiqueta}
                                                </span>
                                                {noticia.destacado && (
                                                    <span className="flex items-center gap-1 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                                                        <Star className="w-3 h-3 fill-yellow-900" />
                                                        Destacado
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="line-clamp-2 text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">{noticia.titulo}</h3>
                                            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 font-medium">
                                                <Calendar className="h-4 w-4" />
                                                <span>{new Date(noticia.createdAt).toLocaleDateString('es-AR')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NoticiasPreview;