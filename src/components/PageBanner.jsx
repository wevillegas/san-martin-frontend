// Franja de título para páginas de listado (Plantel, Noticias, Autoridades)
const PageBanner = ({ title, subtitle }) => (
    <section className="relative overflow-hidden bg-gradient-to-r from-red-900 via-red-800 to-red-700 py-14 md:py-20 border-b-4 border-red-950">
        <div className="banner-bastones absolute inset-0" aria-hidden="true" />
        <div className="escudo-marca absolute right-2 md:right-6 top-1/2 -translate-y-1/2 rotate-12 w-40 h-40 md:w-72 md:h-72" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4">
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-wider drop-shadow-lg">{title}</h1>
            <div className="w-20 h-1.5 bg-white/80 rounded-full mt-4" />
            <p className="mt-4 max-w-2xl text-red-100 font-medium text-lg md:text-xl text-balance">{subtitle}</p>
        </div>
    </section>
);

export default PageBanner;
