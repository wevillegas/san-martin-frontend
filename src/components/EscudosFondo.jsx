// Escudos rojos tenues que flotan de fondo. El contenedor padre debe ser `relative isolate`.
// [left%, top%, tamaño px, duración s, delay s]: grilla de 6 columnas repartida en todo el alto, con variación determinista
const generar = (cantidad) => {
    const paso = 100 / Math.ceil(cantidad / 6);
    return Array.from({ length: cantidad }, (_, i) => [
        (i % 6) * 16 + 2 + ((i * 37) % 11),
        Math.floor(i / 6) * paso + (((i * 53) % 7) * paso) / 10,
        70 + ((i * 29) % 90),
        10 + ((i * 13) % 8),
        (i * 7) % 15,
    ]);
};

// `cantidad`: cuántos escudos (menos en páginas cortas)
const EscudosFondo = ({ cantidad = 60 }) => (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        {generar(cantidad).map(([left, top, size, dur, delay], i) => (
            <div
                key={i}
                className="escudo-flotante"
                style={{
                    left: `${left}%`, top: `${top}%`, width: size, height: size,
                    animationDuration: `${dur}s`, animationDelay: `-${delay}s`,
                    '--dx': `${(size % 2 ? 1 : -1) * (15 + size / 6)}px`,
                    '--dy': `${(delay % 2 ? 1 : -1) * (20 + size / 5)}px`,
                }}
            />
        ))}
    </div>
);

export default EscudosFondo;
