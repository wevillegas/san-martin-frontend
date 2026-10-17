import { useEffect, useRef } from "react";

// Cabecera compartida: foto con parallax suave, contenido centrado y borde inferior curvo.
// `fill` es la clase de color (text-*) del fondo de la sección siguiente, para que la curva se funda con ella.
const PageHero = ({
    img,
    alt,
    badge,
    title,
    subtitle,
    children,
    height = "h-[450px] md:h-[600px]",
    overlay = "bg-black/50 md:bg-gradient-to-t md:from-black/90 md:via-black/50 md:to-transparent",
    contentClassName = "pb-16 md:pb-0",
    titleClassName = "text-4xl sm:text-5xl md:text-7xl lg:text-8xl",
    subtitleClassName = "text-lg sm:text-xl md:text-3xl uppercase tracking-widest",
    fill = "text-white",
}) => {
    const imgRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                // La imagen mide 130% y arranca en -15%: 0.15 * scroll nunca deja ver el borde (tope en 15% del alto)
                const el = imgRef.current;
                if (el) el.style.transform = `translateY(${Math.min(window.scrollY * 0.15, el.parentElement.offsetHeight * 0.15)}px)`;
            });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <div className={`relative w-full overflow-hidden ${height}`}>
            <img
                ref={imgRef}
                src={img}
                alt={alt}
                className="absolute inset-x-0 -top-[15%] w-full h-[130%] object-cover will-change-transform"
            />
            <div className={`absolute inset-0 ${overlay}`} />

            <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 w-full ${contentClassName}`}>
                <span className="bg-red-700 text-white text-xs md:text-sm font-black px-4 md:px-5 py-1.5 md:py-2 rounded-full uppercase tracking-widest mb-4 md:mb-6 shadow-lg border border-red-500 flex items-center gap-2">
                    {badge}
                </span>
                <h1 className={`${titleClassName} font-black text-white uppercase tracking-tighter drop-shadow-2xl mb-2 md:mb-4`}>
                    {title}
                </h1>
                <p className={`${subtitleClassName} text-gray-200 font-bold drop-shadow-lg text-balance`}>
                    {subtitle}
                </p>
                {children}
            </div>

            {/* Borde inferior curvo */}
            <svg className={`absolute bottom-0 left-0 w-full h-10 md:h-16 z-10 ${fill}`} viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 64 Q720 -20 1440 64 Z" fill="currentColor" />
            </svg>
        </div>
    );
};

export default PageHero;
