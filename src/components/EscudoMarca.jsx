// Marca de agua: inclinada y teñida de rojo; al pasar el cursor por la tarjeta (con clase `group`) se endereza y se pinta el escudo real
const EscudoMarca = ({ className }) => (
    <div className={`absolute rotate-12 transition-transform duration-700 ease-out group-hover:rotate-0 ${className}`} aria-hidden="true">
        <div className="escudo-marca-roja absolute inset-0 transition-opacity duration-700 group-hover:opacity-0" />
        <img
            src="/images/escudo.png"
            alt=""
            className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
    </div>
);

export default EscudoMarca;
