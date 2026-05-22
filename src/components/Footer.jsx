import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, X, Code, GraduationCap, User } from "lucide-react";
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
        { name: "Fixtures", href: "/fixtures" },
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
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    return (
        <footer className="bg-red-800 text-white mt-auto">
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">

                    <div className="lg:col-span-2">
                        <Link to="/" className="mb-4 flex items-center gap-3">
                            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white/10 p-1">
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

                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-red-200">El Club</h3>
                        <ul className="space-y-2">
                            {footerLinks.club.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-red-100/80 transition-colors hover:text-white hover:underline">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-red-200">Fútbol</h3>
                        <ul className="space-y-2">
                            {footerLinks.futbol.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-red-100/80 transition-colors hover:text-white hover:underline">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-red-200">Socios</h3>
                        <ul className="space-y-2">
                            {footerLinks.socios.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-red-100/80 transition-colors hover:text-white hover:underline">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-6 border-t border-red-700 pt-8 text-sm text-red-100/80">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <a href="https://maps.app.goo.gl/uFvAx33peRGt5DLMA" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Estadio La Ciudadela - San Miguel de Tucumán</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>+54 (0381) 4247817</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>institucional@clubatleticosanmartin.com.ar</span>
                    </div>
                </div>
            </div>

            <div className="border-t border-red-900 bg-red-950">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 text-sm md:flex-row text-red-200/60">
                    <p>
                        © {new Date().getFullYear()} Club Atlético San Martín de Tucumán. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-4">
                        {/* Botón Acerca De con el mismo estilo de Acceso Staff */}
                        <button 
                            onClick={() => setIsAboutOpen(true)}
                            className="hover:text-red-400 transition-colors font-medium"
                        >
                            Acerca de
                        </button>

                        <span className="text-red-900/30">|</span>

                        <Link 
                            to={isLoggedIn ? "/admin" : "/login"} 
                            className="hover:text-red-400 transition-colors font-medium"
                        >
                            {isLoggedIn ? "Panel Admin" : "Acceso Staff"}
                        </Link>
                    </div>
                </div>
            </div>

            {/* ========================================== */}
            {/* MODAL "ACERCA DEL PROYECTO" (PORTFOLIO)    */}
            {/* ========================================== */}
            {isAboutOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-300">
                    <div className="relative w-full max-w-2xl rounded-2xl bg-white p-8 text-gray-900 shadow-2xl">
                        
                        <button
                            onClick={() => setIsAboutOpen(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-red-600 transition-colors bg-gray-100 rounded-full p-2"
                            aria-label="Cerrar modal"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
                            <Code className="h-8 w-8 text-red-700" />
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-wider text-gray-900 leading-none">
                                    Acerca de este sitio
                                </h3>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Proyecto de Portfolio</p>
                            </div>
                        </div>

                        <div className="space-y-5 text-gray-700">
                            
                            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg">
                                <p className="text-sm text-red-900 font-medium">
                                    <strong className="font-black uppercase tracking-wider">Aviso:</strong> Este sitio web no es la página oficial del Club Atlético San Martín de Tucumán. Es una aplicación web desarrollada exclusivamente con fines académicos y de demostración técnica.
                                </p>
                            </div>

                            <p className="text-sm md:text-base leading-relaxed">
                                La plataforma fue construida utilizando arquitectura <strong>MERN</strong> (MongoDB, Express, React, Node.js), implementando bases de datos no relacionales, diseño de interfaces UI/UX mediante Figma, consumo de APIs externas (ESPN), un sistema de gestión de contenidos (CMS) propio y aplicación de Inteligencia Artificial.
                            </p>

                            <div className="mt-6 rounded-xl bg-gray-50 p-6 border border-gray-200 shadow-inner">
                                <h4 className="mb-4 font-bold uppercase tracking-widest text-gray-400 text-xs flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Desarrollador y estudiante de Ingeniería Informática.
                                </h4>
                                
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                    <div className="flex-grow space-y-2">
                                        <p className="font-black text-2xl text-gray-900 uppercase tracking-tight">Wenceslao José Villegas</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium mt-2">
                                            <GraduationCap className="h-4 w-4 text-red-700" />
                                            Estudiante de 5to Año - Ingeniería Informática (UNSTA)
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                            <Code className="h-4 w-4 text-red-700" />
                                            Egresado Fullstack - Rolling Code School
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                                            <MapPin className="h-4 w-4" />
                                            Yerba Buena, Tucumán, Argentina
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2 w-full md:w-auto">
                                        <a href="https://www.linkedin.com/in/wenceslaojosevillegas/" target="_blank" rel="noopener noreferrer" className="text-center px-6 py-2 bg-[#0A66C2] text-white text-sm font-bold rounded-lg hover:bg-blue-800 transition-colors">
                                            LinkedIn
                                        </a>
                                        <a href="https://github.com/wevillegas" target="_blank" rel="noopener noreferrer" className="text-center px-6 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors">
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