import { useEffect, useRef, useState } from "react";

// Número que cuenta de 0 a `valor` la primera vez que entra en pantalla
const Contador = ({ valor, prefijo = "", duracion = 1800 }) => {
    const ref = useRef(null);
    const [actual, setActual] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setActual(valor);
            return;
        }

        let raf = 0;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            const inicio = performance.now();
            const paso = (ahora) => {
                const t = Math.min((ahora - inicio) / duracion, 1);
                setActual(Math.round(valor * (1 - Math.pow(1 - t, 3)))); // ease-out cúbico
                if (t < 1) raf = requestAnimationFrame(paso);
            };
            raf = requestAnimationFrame(paso);
        }, { threshold: 0.5 });

        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [valor, duracion]);

    return <span ref={ref}>{prefijo}{actual.toLocaleString("es-AR")}</span>;
};

export default Contador;
