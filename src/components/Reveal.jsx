import { useEffect, useRef, useState } from "react";

// Hace aparecer su contenido con un fade + slide suave cuando entra en pantalla al scrollear
const Reveal = ({ children, className = "", ...resto }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            {...resto}
            className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
        >
            {children}
        </div>
    );
};

export default Reveal;
