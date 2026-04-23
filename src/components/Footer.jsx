import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
// Importamos las redes desde react-icons
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

const footerLinks = {
    club: [
        { name: "Historia", href: "/club/historia" },
        { name: "Estadio", href: "/club/estadio" },
        { name: "Autoridades", href: "/club/autoridades" },
        { name: "Instalaciones", href: "/club/instalaciones" },
    ],
    futbol: [
        { name: "Plantel Profesional", href: "/plantel" },
        { name: "Cuerpo Técnico", href: "/plantel/cuerpo-tecnico" },
        { name: "Juveniles", href: "/plantel/juveniles" },
        { name: "Fixtures", href: "/fixtures" },
    ],
    socios: [
        { name: "Hacete Socio", href: "/socios" },
        { name: "Beneficios", href: "/socios/beneficios" },
        { name: "Carnets", href: "/socios/carnets" },
        { name: "Contacto", href: "/contacto" },
    ],
};

// Actualizamos los nombres de los íconos acá
const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/CASMoficial", icon: FaFacebook },
    { name: "Instagram", href: "https://www.instagram.com/casmoficialok/?hl=es-la", icon: FaInstagram },
    { name: "Twitter", href: "https://x.com/CASMOficial", icon: FaTwitter },
    { name: "YouTube", href: "https://www.youtube.com/@CASMOFICIALOK/videos", icon: FaYoutube },
    { name: "TikTok", href: "https://www.tiktok.com/@casmoficial", icon: FaTiktok },
];

const Footer = () => {
    return (
        <footer className="bg-red-800 text-white mt-auto">
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">

                    <div className="lg:col-span-2">
                        <Link to="/" className="mb-4 flex items-center gap-3">
                            <div className="relative h-30 w-30 overflow-hidden rounded-full bg-white/10 p-1">
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
                        <a href="https://maps.app.goo.gl/uFvAx33peRGt5DLMA" target="_blank">Estadio La Ciudadela - San Miguel de Tucumán</a>
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
                        &copy; {new Date().getFullYear()} Club Atlético San Martín de Tucumán. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
                        <Link to="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;