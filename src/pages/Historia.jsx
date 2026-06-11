import { Calendar, Trophy, Star, ArrowUpCircle, Church } from "lucide-react";

const imagenPlaceholder = "https://images.unsplash.com/photo-1574629810360-7efbb1925536?q=80&w=1000&auto=format&fit=crop";

const hitosHistoricos = [
    {
        año: "1909",
        titulo: "Fundación",
        descripcion: "El 2 de noviembre de 1909, catorce jóvenes de la barriada sur de San Miguel de Tucumán se reunieron en la plaza San Martín. Encabezados por Romelio Castro, fundaron el Club Atlético San Martín, adoptando los colores rojo y blanco a bastones en honor a los gloriosos granaderos.",
        imagenUrl: "/images/fundacion.jpg",
        icono: <Calendar className="w-6 h-6 text-white" />,
        color: "bg-red-700"
    },
    {
        año: "1919-1931",
        titulo: "Dominio Local",
        descripcion: "San Martín se convirtió rápidamente en la fuerza dominante del fútbol regional, ganando su primera liga en 1919. Durante estos años, San Martín forjó su identidad popular, acumulando trofeos locales y consolidando una base de hinchas masiva que ya desbordaba cualquier campo de juego. Fue la era donde el equipo dejó de ser una promesa de barrio para transformarse en el máximo exponente de Tucumán.",
        imagenUrl: "/images/ltf1919.jpg",
        icono: <Trophy className="w-6 h-6 text-white" />,
        color: "bg-red-700"
    },
    {
        año: "1932",
        titulo: "El Nacimiento de La Ciudadela",
        descripcion: "El 24 de marzo de 1932 marcó un antes y un después con la inauguración del mítico estadio en el predio donde se libró la Batalla de Tucumán. Este hito no solo dio un sentido de pertenencia inigualable, sino que convirtió a La Ciudadela en un símbolo de la resistencia y pasión del pueblo ciruja. La construcción de sus primeras tribunas cimentó el carácter de una fortaleza que, con el tiempo, se ganaría el respeto de todo el fútbol argentino. El estadio mas caliente del país",
        imagenUrl: "/images/ciudadela1932.jpg",
        icono: <Church className="w-6 h-6 text-white" />,
        color: "bg-red-700"
    },
    {
        año: "1944-1945",
        titulo: "La Copa de la República",
        descripcion: "El 4 de marzo de 1945, San Martín se consagró campeón de la Copa de la República 1944 tras eliminar a Boca Juniors, en cuartos de final, a Sarmiento (Resistencia), en semifinales, y a Newell's Old Boys, en la final, por 3 a 1. El partido se jugó en el estadio Monumental José Fierro con 18.000 espectadores presenciando el encuentro, en un recinto que en esos años tenía capacidad para 12.000 personas",
        imagenUrl: "/images/copa-republica-color.jpg",
        icono: <Star className="w-6 h-6 text-white" />,
        color: "bg-yellow-500"
    },
    {
        año: "1945-1967",
        titulo: "Los reyes del norte",
        descripcion: "Tras la gloria nacional de 1944, San Martín vivió una etapa de dominio absoluto en la región, convirtiéndose en el campeón por excelencia de la Liga Tucumana. Durante estas dos décadas, el club acumuló una vitrina envidiable de trofeos locales y de la Federación Tucumana. Fue el tiempo de los grandes clásicos a estadio lleno y de la formación de una identidad cultural profunda, donde el club se preparó institucionalmente para el gran salto definitivo: el ingreso a los Torneos Nacionales de AFA en 1968",
        imagenUrl: "/images/ltf1955.jpg",
        icono: <Trophy className="w-6 h-6 text-white" />,
        color: "bg-red-700"
    },
    {
        año: "1968-1985",
        titulo: "Campeonatos Nacionales de Primera División",
        descripcion: "Durante las décadas de 1960, 1970 y 1980, San Martín se convirtió en un protagonista recurrente de los antiguos Torneos Nacionales, reafirmando su estatus como potencia del interior. Su debut en 1968 marcó un precedente para el fútbol tucumano, permitiéndole medirse de igual a igual contra los equipos más poderosos del país. En este periodo, La Ciudadela se transformó en una fortaleza casi inexpugnable. El punto máximo de esta etapa llegó en 1982, cuando el equipo desplegó un fútbol de alto nivel y alcanzó los cuartos de final, quedando entre los mejores del país tras una campaña memorable. Estos torneos no solo le dieron visibilidad a nivel federal, sino que forjaron el carácter del club, demostrando que El Santo tenia la jearquía necesaria para codearse con la élite del fútbol argentino de manera constante",
        imagenUrl: "/images/nac82.jpg",
        icono: <Trophy className="w-6 h-6 text-white" />,
        color: "bg-red-700"
    },
    {
        año: "1988-1989",
        titulo: "El Ascenso Imposible",
        descripcion: "En 1988, San Martín protagonizó un hito único en el fútbol mundial al lograr dos ascensos en una misma temporada, saltando del Torneo del Interior a Primera División sin escalas. Esta epopeya alcanzó su punto máximo el 20 de noviembre de ese año, cuando el Santo humilló a Boca Juniors con un histórico 6-1 en La Bombonera. Fue una campaña mágica donde el equipo de Nelson Chabay demostró que no existían límites imposibles para la mística ciruja, inscribiendo su nombre en los libros de oro del deporte argentino.",
        imagenUrl: "/images/chaco.jpg",
        icono: <ArrowUpCircle className="w-6 h-6 text-white" />,
        color: "bg-red-700"
    },
    {
        año: "1992-1994",
        titulo: "Gloria en el 92 y victoria contra la Roma",
        descripcion: "En 1992, San Martín reafirmó su estirpe ganadora al conquistar un nuevo ascenso a Primera División, coronando una campaña impecable tras vencer a Almirante Brown en una final inolvidable en Isidro Casanova. Sin embargo, el momento que llevó el prestigio del club a escala internacional ocurrió un año después, en 1994, cuando El Santo derrotó 1-0 a la Roma de Italia en La Ciudadela. Aquella noche, con un gol de Alfredo Zelaya, el equipo tucumano venció a una potencia mundial plagada de estrellas.",
        imagenUrl: "/images/brown.jpg",
        icono: <ArrowUpCircle className="w-6 h-6 text-white" />,
        color: "bg-red-700"
    },
    {
        año: "2004-2008",
        titulo: "El regreso a la gloria",
        descripcion: "Entre 2004 y 2008, bajo la conducción técnica de Carlos Roldán, El Santo inició una escalada frenética que lo llevó a subir cuatro categorías en apenas cinco años, pasando del Argentino B a la Primera División casi sin escalas. El proceso incluyó una racha invicta memorable en La Ciudadela y culminó con el campeonato de la B Nacional en 2008, devolviendo al Ciruja a la élite del fútbol argentino y consolidando una de las mayores gestas de recuperación deportiva que se recuerden en el país.",
        imagenUrl: "/images/2008.png",
        icono: <ArrowUpCircle className="w-6 h-6 text-white" />,
        color: "bg-red-700"
    },
    {
        año: "2018",
        titulo: "Vuelta a primera",
        descripcion: "El 2018 quedó marcado a fuego por el retorno a la Superliga Argentina en una tarde mágica en La Ciudadela. Tras una campaña sólida en la B Nacional, San Martín barrió a Sarmiento de Junín con un contundente 5-1 en la final del Reducido, desatando una fiesta histórica en toda la provincia. Ese ascenso no fue solo un logro deportivo, sino la confirmación de que El Santo había completado su ciclo de reconstrucción. En esa temporada en primera, San Martín derrotó a Atlético Tucumán 3 a 2 en el José Fierro, en lo que fue el primer clásico tucumano en primera desde 1983.",
        imagenUrl: "/images/2018.jpg",
        icono: <ArrowUpCircle className="w-6 h-6 text-white" />,
        color: "bg-red-700"
    },
    {
        año: "2019 - Actualidad",
        titulo: "La época actual",
        descripcion: "En estos últimos años, San Martín ha reafirmado su jerarquía como el club más convocante y apasionado del Norte Argentino. Lejos de detenerse ante las adversidades, la institución ha transformado cada desafío en un motor de crecimiento, consolidándose como un animador constante de los torneos nacionales con una propuesta futbolística protagonista. Hoy, con el orgullo de nuestra historia y la fuerza de un pueblo unido, San Martín camina con paso firme y mentalidad ganadora hacia su lugar natural en la élite, demostrando que la mística de El Santo está más viva que nunca y que lo mejor está siempre por venir.",
        imagenUrl: "/images/rip.jpg",
        icono: <Star className="w-6 h-6 text-white" />,
        color: "bg-red-700"
    }
];

const Historia = () => {
    const imagenCabecera = "/images/copa-republica-color.jpg";

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-200 via-gray-50 to-white pb-24">

            {/* Cabecera Épica */}
            <div className="relative w-full h-[500px] md:h-[600px] shadow-xl">
                <img
                    src={imagenCabecera}
                    alt="Historia de San Martín de Tucumán"
                    className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-red-900/80 to-red-900/40" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <span className="bg-red-700 text-white text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-lg">
                        2 de noviembre de 1909
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-wider drop-shadow-lg">
                        Nuestra Historia
                    </h1>
                    <p className="mt-6 text-red-100 font-medium text-lg md:text-xl max-w-2xl text-balance drop-shadow-md">
                        Más de un siglo de pasión, lucha y gloria. El club más popular y convocante del norte argentino, forjado por el pueblo y para el pueblo. De Barrio Ciudadela para todo el país.
                    </p>
                </div>
            </div>

            {/* Contenido Principal - Línea de Tiempo */}
            <div className="max-w-6xl mx-auto px-4 mt-20 relative">

                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-800 uppercase tracking-wider mb-4 drop-shadow-sm">La línea de tiempo</h2>
                    <div className="w-24 h-1.5 bg-red-700 mx-auto rounded-full shadow-sm"></div>
                </div>

                <div className="relative">
                    {/* Línea vertical para Escritorio (Fija en el medio) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-red-700 transform -translate-x-1/2 rounded-full shadow-sm"></div>
                    
                    {/* Línea vertical para Móviles (Fija a la izquierda) */}
                    <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-red-700 transform -translate-x-1/2 rounded-full shadow-sm"></div>

                    <div className="space-y-16 md:space-y-20">
                        {hitosHistoricos.map((hito, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <div key={hito.año} className="relative flex flex-col md:flex-row items-center justify-between w-full">

                                    {/* Icono Flotante para Móviles */}
                                    <div className={`md:hidden absolute left-8 transform -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center z-20 top-0 ${hito.color}`}>
                                        {hito.icono}
                                    </div>

                                    {/* --- COLUMNA IZQUIERDA --- */}
                                    {/* LÓGICA: Si es par, es Texto (order-2 en móvil, order-1 en PC). Si es impar, es Imagen (order-1 en móvil, order-1 en PC). */}
                                    <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'order-2 md:order-1 mt-6 md:mt-0' : 'order-1 md:order-1'}`}>
                                        {isEven ? (
                                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-t-4 border-red-700 text-left md:text-right">
                                                <span className="inline-block text-3xl md:text-4xl font-black text-red-100 mb-2" style={{ WebkitTextStroke: '1px #b91c1c' }}>
                                                    {hito.año}
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-wide mb-3">
                                                    {hito.titulo}
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                                    {hito.descripcion}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="overflow-hidden rounded-2xl shadow-xl aspect-video w-full bg-white border border-gray-100">
                                                <img
                                                    src={hito.imagenUrl || imagenPlaceholder}
                                                    alt={hito.titulo}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* --- COLUMNA CENTRAL: CARRIL DEL ÍCONO --- */}
                                    <div className="hidden md:flex w-2/12 justify-center items-center z-20 md:order-2">
                                        <div className={`w-14 h-14 rounded-full border-4 border-white shadow-xl flex items-center justify-center ${hito.color}`}>
                                            {hito.icono}
                                        </div>
                                    </div>

                                    {/* --- COLUMNA DERECHA --- */}
                                    {/* LÓGICA: Si es par, es Imagen (order-1 en móvil, order-3 en PC). Si es impar, es Texto (order-2 en móvil, order-3 en PC). */}
                                    <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'order-1 md:order-3' : 'order-2 md:order-3 mt-6 md:mt-0'}`}>
                                        {isEven ? (
                                            <div className="overflow-hidden rounded-2xl shadow-xl aspect-video w-full bg-white border border-gray-100">
                                                <img
                                                    src={hito.imagenUrl || imagenPlaceholder}
                                                    alt={hito.titulo}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-t-4 border-red-700 text-left">
                                                <span className="inline-block text-3xl md:text-4xl font-black text-red-100 mb-2" style={{ WebkitTextStroke: '1px #b91c1c' }}>
                                                    {hito.año}
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-wide mb-3">
                                                    {hito.titulo}
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                                    {hito.descripcion}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Historia;