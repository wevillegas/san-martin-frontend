import { Link } from "react-router-dom";
import { CreditCard, Info } from "lucide-react";

const AsociateBanner = () => {
    return (
        <section className="relative w-full py-24 overflow-hidden">
            {/* Imagen de fondo (Podés cambiar la URL por una foto de La Ciudadela que tengas en tu carpeta public) */}
            <div className="absolute inset-0">
                <img
                    src="/images/hinchada-socios.JPG" 
                    alt="Hinchada San Martín"
                    className="w-full h-full object-cover"
                />
                {/* Degradado oscuro para que el texto sea 100% legible */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-red-900/40" />
            </div>

            {/* Contenido */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 flex flex-col items-start justify-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4 max-w-3xl leading-tight drop-shadow-lg">
                    HACERTE SOCIO ES EL <br /> MAYOR ACTO DE AMOR
                </h2>
                <p className="text-lg text-gray-300 font-medium max-w-2xl mb-10 leading-relaxed drop-shadow-md">
                    Desde la página web oficial de socios del club San Martín podes gestionar todo. Podes comprar abonos, entradas, pagar la cuota, ver tu estado y mucho más. Hacerte socio es algo mas que los beneficios que te da el club, hacerte socio es un acto de amor al club.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    {/* Botón secundario (Borde blanco) */}
                    <Link
                        to="/socios" 
                        className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-sm text-white border-2 border-white/20 hover:border-white hover:bg-white/10 transition-all backdrop-blur-sm"
                    >
                        <Info className="w-5 h-5" />
                        MÁS INFORMACIÓN
                    </Link>
                    
                    {/* Botón principal (Rojo San Martín) */}
                    <Link
                        to="https://socios.casmt.ar/" 
                        className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-sm text-white bg-red-700 hover:bg-red-800 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all hover:-translate-y-1"
                        target="_blank"
                    >
                        <CreditCard className="w-5 h-5" />
                        Hacete Socio
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AsociateBanner;