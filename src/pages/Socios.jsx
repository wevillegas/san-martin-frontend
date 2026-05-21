import { Users, TrendingUp, ShieldCheck, Ticket, ShoppingBag, Landmark, CheckCircle2, ExternalLink, Trophy } from "lucide-react";

const Socios = () => {
    // Foto épica de la hinchada
    const imgHero = "/images/hinchada-socios.JPG"; 

    // URL de la página web externa de socios (Reemplazala por la real)
    const urlPlataformaSocios = "https://socios.casmt.ar/";

    // Lista de beneficios (Sin hover)
    const beneficios = [
        {
            icono: <Ticket className="w-8 h-8 text-red-700" />,
            titulo: "Entradas más baratas",
            descripcion: "Entradas a mitad de precio y prioridad para la compra de abonos. Acceso exclusivo a la plataforma de socios."
        },
        {
            icono: <ShoppingBag className="w-8 h-8 text-red-700" />,
            titulo: "Descuentos en Tienda",
            descripcion: "15% de descuento en la Tienda Oficial del club en indumentaria oficial, merchandising y ropa de salida."
        },
        {
            icono: <Landmark className="w-8 h-8 text-red-700" />,
            titulo: "Complejo Natalio Mirkin",
            descripcion: "Uso de las instalaciones, quinchos, asadores y descuentos en la cuota de todas las disciplinas deportivas del club."
        },
        {
            icono: <ShieldCheck className="w-8 h-8 text-red-700" />,
            titulo: "Voz y Voto",
            descripcion: "Participación activa en las asambleas, poder de decisión y derecho a elegir a nuestras autoridades institucionales."
        }
    ];

    // Categorías de socios (Solo 2 y sin botón interno)
    const categorias = [
        {
            nombre: "Socio Tucumán (Activo)",
            edades: "Mayores de 18 años",
            precio: "$25.000",
            destacado: true, // Resaltamos el plan estándar
            features: ["Entradas a mitad de precio", "Voz y voto en asambleas", "Descuento en tienda oficial", "Prioridad en plateas", "Acceso al Complejo"]
        },
        {
            nombre: "Socio Filial (Interior)",
            edades: "+50km de la Capital",
            precio: "$15.000",
            destacado: false,
            features: ["Entradas a mitad de precio", "Voz y voto en asambleas", "Descuento en tienda oficial", "Gestión vía Filiales"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-0 font-sans">
            
            {/* 1. CABECERA HERO */}
            <div className="relative w-full h-[500px] md:h-[600px]">
                <img
                    src={imgHero || "https://images.unsplash.com/photo-1518605368461-1e1e38ce8058?q=80&w=2000&auto=format&fit=crop"}
                    alt="Hinchada de San Martín"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-10">
                    <span className="bg-red-700 text-white text-sm font-black px-5 py-2 rounded-full uppercase tracking-widest mb-6 shadow-lg border border-red-500">
                        Departamento de Socios
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-2xl mb-4">
                        SER SOCIO ES UN ORGULLO
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 font-bold max-w-2xl text-balance drop-shadow-lg mb-10">
                        Hacerte socio es el acto de amor más grande. Defendé los colores, cuidá la institución y hacé más grande a San Martín.
                    </p>
                    {/* Botón Hero que redirige a la web externa */}
                    <a 
                        href={urlPlataformaSocios}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest py-4 px-10 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all transform hover:scale-105 flex items-center gap-3"
                    >
                        Asociate Online
                        <ExternalLink className="w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* 2. BARRA DE ESTADÍSTICAS (ROJA) */}
            <div className="bg-red-700 py-12 border border-red-600 shadow-xl relative z-10 -mt-10 mx-4 md:mx-auto max-w-5xl rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-red-500/50 text-white text-center">
                    <div className="flex flex-col items-center px-4">
                        <Users className="w-10 h-10 text-red-200 mb-2" />
                        <span className="text-4xl font-black">+10.000</span>
                        <span className="text-sm font-bold uppercase tracking-widest text-red-200 mt-1">Socios Activos</span>
                    </div>
                    <div className="flex flex-col items-center px-4 pt-8 md:pt-0">
                        <TrendingUp className="w-10 h-10 text-red-200 mb-2" />
                        <span className="text-4xl font-black">100%</span>
                        <span className="text-sm font-bold uppercase tracking-widest text-red-200 mt-1">Gestión Transparente</span>
                    </div>
                    <div className="flex flex-col items-center px-4 pt-8 md:pt-0">
                        <ShieldCheck className="w-10 h-10 text-red-200 mb-2" />
                        <span className="text-4xl font-black">116</span>
                        <span className="text-sm font-bold uppercase tracking-widest text-red-200 mt-1">Años de Grandeza</span>
                    </div>
                </div>
            </div>

            {/* 3. BENEFICIOS (Fondo Blanco, Sin Hovers) */}
            <div className="bg-white py-24 border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-wider mb-4">Por qué ser Socio</h2>
                        <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full mb-4"></div>
                        <p className="text-gray-500 font-medium max-w-xl mx-auto">Estar al día tiene sus ventajas. Disfrutá y ayuda al club.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {beneficios.map((item, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-sm border-t-4 border-red-700 flex flex-col items-center text-center border border-gray-100">
                                <div className="bg-red-50 p-4 rounded-full mb-6 border border-red-100">
                                    {item.icono}
                                </div>
                                <h3 className="text-xl font-black text-gray-900 uppercase mb-3">
                                    {item.titulo}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                                    {item.descripcion}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. CATEGORÍAS Y VALORES (Fondo Blanco, Sin Hovers ni Botones) */}
            <div className="bg-white py-24 border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-wider mb-4">Categorías de Cuota</h2>
                        <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full mb-4"></div>
                        <p className="text-gray-500 font-medium max-w-xl mx-auto">Valores referenciales de la cuota mensual para mayores de 18 años.</p>
                    </div>

                    {/* Grilla ajustada a 2 columnas y centrada */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                        {categorias.map((cat, index) => (
                            <div 
                                key={index} 
                                className={`rounded-2xl p-8 md:p-10 flex flex-col relative overflow-hidden border ${
                                    cat.destacado 
                                    ? 'bg-red-700 text-white shadow-2xl border-red-600' 
                                    : 'bg-gray-50 text-gray-900 border-gray-200 shadow-sm'
                                }`}
                            >
                                <h3 className={`text-2xl md:text-3xl font-black uppercase mb-1 ${cat.destacado ? 'text-white' : 'text-gray-900'}`}>
                                    {cat.nombre}
                                </h3>
                                <p className={`text-sm font-bold uppercase tracking-widest mb-8 ${cat.destacado ? 'text-red-200' : 'text-gray-500'}`}>
                                    {cat.edades}
                                </p>
                                
                                <div className="mb-10 pb-8 border-b ${cat.destacado ? 'border-red-600' : 'border-gray-200'}">
                                    <span className="text-5xl md:text-6xl font-black">{cat.precio}</span>
                                    <span className={`text-base font-bold ${cat.destacado ? 'text-red-200' : 'text-gray-500'}`}> /mes</span>
                                </div>

                                <ul className="space-y-4 flex-grow">
                                    {cat.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-3">
                                            <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${cat.destacado ? 'text-red-300' : 'text-red-600'}`} />
                                            <span className={`font-medium text-base ${cat.destacado ? 'text-gray-100' : 'text-gray-700'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. SECCIÓN FINAL - LLAMADO A LA ACCIÓN (FONDO GRIS CLARO) */}
            <div className="bg-gray-50 py-24 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Trophy className="w-16 h-16 text-red-600 mx-auto mb-8" />
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-6">
                        ¿Listo para dar el paso?
                    </h2>
                    <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
                        Toda la gestión de tu carnet, el pago de cuotas y el reempadronamiento se realiza exclusivamente a través de nuestra plataforma digital oficial. Hacé clic abajo para dirigirte al sitio.
                    </p>
                    
                    {/* EL BOTÓN NOTORIO FINAL */}
                    <a 
                        href={urlPlataformaSocios}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-lg md:text-xl py-6 px-12 rounded-2xl shadow-[0_15px_40px_rgba(220,38,38,0.4)] transition-all transform hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(220,38,38,0.5)] w-full sm:w-auto"
                    >
                        Ir a la Plataforma de Socios Oficial
                        <ExternalLink className="w-6 h-6" />
                    </a>
                    
                    <p className="text-gray-400 text-sm mt-8 font-bold uppercase tracking-widest">
                        https://socios.casmt.ar/
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Socios;