import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

const footerLinks = {
    club: [
        { name: "Historia", href: "/club/historia" },
        { name: "Estadio", href: "/club/estadio" },
        { name: "Autoridades", href: "/club/autoridades" },
        { name: "Museo", href: "/club/museo" },
    ],
    futbol: [
        { name: "Plantel Profesional", href: "/plantel" },
        { name: "Cuerpo Técnico", href: "/plantel/cuerpo-tecnico" },
        { name: "Fixtures", href: "/fixtures" },
    ],
    socios: [
        { name: "Hacete Socio", href: "/socios" },
        { name: "Beneficios", href: "/socios" },
        { name: "Contacto", href: "/contacto" },
    ],
};

const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/CASMoficial", icon: FaFacebook },
    { name: "Instagram", href: "https://www.instagram.com/casmoficialok/?hl=es-la", icon: FaInstagram },
    { name: "Twitter", href: "https://x.com/CASMOficial", icon: FaTwitter },
    { name: "YouTube", href: "https://www.youtube.com/@CASMOFICIALOK/videos", icon: FaYoutube },
    { name: "TikTok", href: "https://www.tiktok.com/@casmoficial", icon: FaTiktok },
];

const Footer = () => {
    const location = useLocation(); 
    const isLoggedIn = !!localStorage.getItem("token");

    // ESTADO PARA EL ACORDEÓN MÓVIL
    const [openSection, setOpenSection] = useState(null);

    const toggleAccordion = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <footer className="bg-red-800 text-white mt-auto">
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="grid gap-8 lg:grid-cols-5">

                    {/* COLUMNA 1: Información del Club y Redes */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="mb-4 flex items-center gap-3">
                            <div className="relative h-24 w-24 overflow-hidden rounded-full bg-white/10 p-1">
                                <img src="/images/escudo.png" alt="Escudo San Martín" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black uppercase tracking-wider">Club Atlético San Martín</span>
                                <span className="text-lg font-bold text-red-200">Tucumán</span>
                            </div>
                        </Link>
                        <p className="mb-6 max-w-md text-sm text-red-100/80 leading-relaxed">
                            Club Atlético San Martín de Tucumán. Fundado en 1909 en Barrio Ciudadela, la cuna de la independencia.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/30"
                                    aria-label={social.name}
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* COLUMNA 2: Menús (Agrupados para controlar el Acordeón) */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 divide-y divide-red-700/50 md:divide-y-0 mt-4 md:mt-0">
                        
                        {/* SECCIÓN: EL CLUB */}
                        <div className="py-4 md:py-0">
                            <button 
                                onClick={() => toggleAccordion('club')}
                                className="flex w-full items-center justify-between md:pointer-events-none focus:outline-none"
                            >
                                <h3 className="text-sm font-bold uppercase tracking-widest text-red-200">El Club</h3>
                                <ChevronDown className={`h-5 w-5 text-red-200 transition-transform md:hidden ${openSection === 'club' ? 'rotate-180' : ''}`} />
                            </button>
                            <ul className={`mt-4 space-y-3 md:mt-4 md:space-y-2 md:block overflow-hidden transition-all duration-300 ${openSection === 'club' ? 'max-h-60' : 'max-h-0 md:max-h-full'}`}>
                                {footerLinks.club.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.href} className="text-sm text-red-100/80 transition-colors hover:text-white hover:underline block">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SECCIÓN: FÚTBOL */}
                        <div className="py-4 md:py-0">
                            <button 
                                onClick={() => toggleAccordion('futbol')}
                                className="flex w-full items-center justify-between md:pointer-events-none focus:outline-none"
                            >
                                <h3 className="text-sm font-bold uppercase tracking-widest text-red-200">Fútbol</h3>
                                <ChevronDown className={`h-5 w-5 text-red-200 transition-transform md:hidden ${openSection === 'futbol' ? 'rotate-180' : ''}`} />
                            </button>
                            <ul className={`mt-4 space-y-3 md:mt-4 md:space-y-2 md:block overflow-hidden transition-all duration-300 ${openSection === 'futbol' ? 'max-h-60' : 'max-h-0 md:max-h-full'}`}>
                                {footerLinks.futbol.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.href} className="text-sm text-red-100/80 transition-colors hover:text-white hover:underline block">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SECCIÓN: SOCIOS */}
                        <div className="py-4 md:py-0 border-b border-red-700/50 md:border-none">
                            <button 
                                onClick={() => toggleAccordion('socios')}
                                className="flex w-full items-center justify-between md:pointer-events-none focus:outline-none"
                            >
                                <h3 className="text-sm font-bold uppercase tracking-widest text-red-200">Socios</h3>
                                <ChevronDown className={`h-5 w-5 text-red-200 transition-transform md:hidden ${openSection === 'socios' ? 'rotate-180' : ''}`} />
                            </button>
                            <ul className={`mt-4 space-y-3 md:mt-4 md:space-y-2 md:block overflow-hidden transition-all duration-300 ${openSection === 'socios' ? 'max-h-60' : 'max-h-0 md:max-h-full'}`}>
                                {footerLinks.socios.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.href} className="text-sm text-red-100/80 transition-colors hover:text-white hover:underline block">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* INFORMACIÓN DE CONTACTO */}
                <div className="mt-10 flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 border-t border-red-700 pt-8 text-sm text-red-100/80">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <a href="https://maps.app.goo.gl/uFvAx33peRGt5DLMA" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Estadio La Ciudadela - San Miguel de Tucumán</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0" />
                        <span>+54 (0381) 4247817</span>
                    </div>
                    <div className="flex items-center gap-2 break-all">
                        <Mail className="h-4 w-4 shrink-0" />
                        <span>institucional@clubatleticosanmartin.com.ar</span>
                    </div>
                </div>
            </div>

            {/* BARRA INFERIOR DE LEGALES */}
            <div className="border-t border-red-900 bg-red-950">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:py-4 text-center md:text-left text-sm md:flex-row text-red-200/60">
                    <p>
                        © {new Date().getFullYear()} Club Atlético San Martín de Tucumán. Todos los derechos reservados.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
                        <Link to="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
                        <span className="hidden md:inline text-red-900/50">|</span>
                        <Link to="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link>
                        <span className="text-red-900/50">|</span>
                        <Link 
                            to={isLoggedIn ? "/admin" : "/login"} 
                            className="hover:text-red-400 transition-colors font-medium"
                        >
                            {isLoggedIn ? "Panel Admin" : "Acceso Staff"}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;