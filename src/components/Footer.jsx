import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, ChevronDown, X, Code, GraduationCap, User } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

const footerLinks = {
    club: [
        { name: "Historia", href: "/club/historia" },
        { name: "Estadio", href: "/club/estadio" },
        { name: "Autoridades", href: "/club/autoridades" },
        { name: "Museo", href: "/club/museo" },
        { name: "Complejo", href: "/club/complejo" },
    ],
    futbol: [
        { name: "Plantel Profesional", href: "/plantel" },
        { name: "Cuerpo Técnico", href: "/plantel/cuerpo-tecnico" },
        { name: "Fixture", href: "/fixture" },
    ],
    socios: [
        { name: "Hacete Socio", href: "/socios" },
        { name: "Beneficios", href: "/socios" },
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
    
    // Estados para Acordeón y Modal
    const [openSection, setOpenSection] = useState(null);
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    const toggleAccordion = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <footer className="bg-red-800 text-white mt-auto relative">
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

                    {/* COLUMNA 2: Menús en Acordeón */}
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

            {/* BARRA INFERIOR CON MODAL "ACERCA DE" */}
            <div className="border-t border-red-900 bg-red-950">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:py-4 text-center md:text-left text-sm md:flex-row text-red-200/60">
                    <p>
                        © {new Date().getFullYear()} Club Atlético San Martín de Tucumán. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsAboutOpen(true)}
                            className="hover:text-white transition-colors font-medium tracking-wider uppercase text-xs"
                        >
                            Acerca de
                        </button>
                        
                        <span className="text-red-900/50">|</span>
                        
                        <Link 
                            to={isLoggedIn ? "/admin" : "/login"} 
                            className="hover:text-white transition-colors font-medium tracking-wider uppercase text-xs"
                        >
                            {isLoggedIn ? "Panel Admin" : "Acceso Staff"}
                        </Link>
                    </div>
                </div>
            </div>

            {/* ========================================== */}
            {/* MODAL "ACERCA DEL PROYECTO" RESPONSIVO     */}
            {/* ========================================== */}
            {isAboutOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-300">
                    
                    {/* ARREGLO: max-h-[90vh] overflow-y-auto para evitar desbordes. Paddings ajustados (p-5 en cel, p-8 en PC) */}
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 md:p-8 text-gray-900 shadow-2xl">
                        
                        <button
                            onClick={() => setIsAboutOpen(false)}
                            className="absolute right-3 top-3 md:right-4 md:top-4 text-gray-400 hover:text-red-600 transition-colors bg-gray-100 rounded-full p-1.5 md:p-2"
                            aria-label="Cerrar modal"
                        >
                            <X className="h-5 w-5 md:h-6 md:w-6" />
                        </button>

                        <div className="mb-4 md:mb-6 flex items-center gap-3 border-b border-gray-200 pb-3 md:pb-4 pr-8">
                            <Code className="h-6 w-6 md:h-8 md:w-8 text-red-700 shrink-0" />
                            <div>
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-wider text-gray-900 leading-none">
                                    Acerca de este sitio
                                </h3>
                                <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Proyecto de Portfolio</p>
                            </div>
                        </div>

                        <div className="space-y-4 md:space-y-5 text-gray-700">
                            
                            <div className="bg-red-50 border-l-4 border-red-600 p-3 md:p-4 rounded-r-lg">
                                <p className="text-[13px] md:text-sm text-red-900 font-medium leading-snug">
                                    <strong className="font-black uppercase tracking-wider">Aviso:</strong> Este sitio web no es la página oficial del Club Atlético San Martín de Tucumán. Es una aplicación web desarrollada exclusivamente con fines académicos y de demostración técnica.
                                </p>
                            </div>

                            <p className="text-[13px] md:text-base leading-relaxed">
                                La plataforma fue construida utilizando arquitectura <strong>MERN</strong> (MongoDB, Express, React, Node.js), implementando bases de datos no relacionales, diseño de interfaces UI/UX mediante Figma, consumo de APIs externas (ESPN), un sistema de gestión de contenidos (CMS) propio y aplicación de Inteligencia Artificial.
                            </p>

                            <div className="mt-4 md:mt-6 rounded-xl bg-gray-50 p-4 md:p-6 border border-gray-200 shadow-inner">
                                <h4 className="mb-3 md:mb-4 font-bold uppercase tracking-widest text-gray-400 text-[10px] md:text-xs flex items-center gap-1.5 md:gap-2">
                                    <User className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
                                    Desarrollador y estudiante de Ing. Informática.
                                </h4>
                                
                                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
                                    <div className="flex-grow space-y-1.5 md:space-y-2">
                                        <p className="font-black text-lg md:text-2xl text-gray-900 uppercase tracking-tight">Wenceslao José Villegas</p>
                                        <div className="flex items-start md:items-center gap-2 text-[13px] md:text-sm text-gray-600 font-medium mt-1 md:mt-2">
                                            <GraduationCap className="h-4 w-4 text-red-700 shrink-0 mt-0.5 md:mt-0" />
                                            <span>Estudiante de 5to Año - Ingeniería Informática (UNSTA)</span>
                                        </div>
                                        <div className="flex items-start md:items-center gap-2 text-[13px] md:text-sm text-gray-600 font-medium">
                                            <Code className="h-4 w-4 text-red-700 shrink-0 mt-0.5 md:mt-0" />
                                            <span>Egresado Fullstack - Rolling Code School</span>
                                        </div>
                                        <div className="flex items-start md:items-center gap-2 text-[13px] md:text-sm text-gray-500 mt-1 md:mt-2">
                                            <MapPin className="h-4 w-4 shrink-0 mt-0.5 md:mt-0" />
                                            <span>Yerba Buena, Tucumán, Argentina</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0">
                                        <a href="https://www.linkedin.com/in/wenceslaojosevillegas/" target="_blank" rel="noopener noreferrer" className="text-center px-6 py-2.5 md:py-2 bg-[#0A66C2] text-white text-[13px] md:text-sm font-bold rounded-lg hover:bg-blue-800 transition-colors w-full">
                                            LinkedIn
                                        </a>
                                        <a href="https://github.com/wevillegas" target="_blank" rel="noopener noreferrer" className="text-center px-6 py-2.5 md:py-2 bg-gray-900 text-white text-[13px] md:text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors w-full">
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;