import { useEffect, useRef } from "react";

// Línea roja fija arriba que avanza con el scroll de la página
const BarraProgreso = () => {
    const ref = useRef(null);

    useEffect(() => {
        const actualizar = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        };
        actualizar();
        window.addEventListener("scroll", actualizar, { passive: true });
        window.addEventListener("resize", actualizar);
        return () => {
            window.removeEventListener("scroll", actualizar);
            window.removeEventListener("resize", actualizar);
        };
    }, []);

    return <div ref={ref} className="fixed top-0 left-0 z-[60] h-1 w-full origin-left bg-white shadow-[0_1px_6px_rgba(0,0,0,0.6)] pointer-events-none" style={{ transform: "scaleX(0)" }} aria-hidden="true" />;
};

export default BarraProgreso;
