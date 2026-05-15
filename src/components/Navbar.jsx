import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, ShoppingBag, Settings } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// ARREGLO DE NAVEGACIÓN ACTUALIZADO
const navigation = [
    { name: "Inicio", href: "/" },
    {
        name: "El Club", href: "/club",
        children: [
            { name: "Historia", href: "/club/historia" },
            { name: "Estadio", href: "/club/estadio" },
            { name: "Museo", href: "/club/museo" }, // <-- MUSEO AGREGADO ACÁ
            { name: "Autoridades", href: "/club/autoridades" },
        ],
    },
    {
        name: "Plantel", href: "/plantel",
        children: [
            { name: "Primer Equipo", href: "/plantel" },
            { name: "Cuerpo Técnico", href: "/plantel/cuerpo-tecnico" },
        ],
    },
    { name: "Noticias", href: "/noticias" },
    { name: "Fixtures", href: "/fixtures" },
    { name: "Tienda", href: "/tienda" },
    { name: "Socios", href: "/socios" }, // <-- SOCIOS AGREGADO ACÁ AL FINAL
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    // Verificación inteligente que se ejecuta cada vez que cambiamos de página
    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem("token");
            if (!token) return false;

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                // Si el token venció
                if (payload.exp && payload.exp * 1000 < Date.now()) {
                    localStorage.removeItem("token"); // Limpiamos el token fantasma
                    return false;
                }
                return true;
            } catch (error) {
                return false;
            }
        };

        setIsLoggedIn(checkToken());
    }, [location]); // Al poner 'location' acá, re-evaluamos el login cada vez que navegás

    return (
        <header className="sticky top-0 z-50 w-full shadow-md">
            {/* Top bar (Barrita roja fina arriba) */}
            <div className="bg-red-800 text-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm font-semibold uppercase tracking-wider">
                    <div className="hidden items-center gap-4 md:flex">
                        <span>02 de Noviembre de 1909</span>
                    </div>
                    <div className="flex items-center gap-6 ml-auto">
                        <Link to="./socios" className="flex items-center gap-1.5 hover:text-red-200 transition-colors">
                            <User className="h-4 w-4" />
                            <span>Hacete Socio</span>
                        </Link>
                        <Link to="/tienda" className="flex items-center gap-1.5 hover:text-red-200 transition-colors">
                            <ShoppingBag className="h-4 w-4" />
                            <span>Tienda</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main navigation (Barra principal blanca) */}
            <nav className="bg-white border-b border-gray-200">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative h-20 w-20 flex items-center justify-center p-0 transition-transform group-hover:scale-105 duration-300">
                            <img src="/images/escudo.png" alt="Escudo San Martín" className="w-full h-full object-contain" />
                        </div>
                        <div className="hidden flex-col sm:flex">
                            <span className="text-2xl font-black leading-tight text-red-700 uppercase tracking-wide">San Martín</span>
                            <span className="text-sm text-gray-500 font-bold uppercase tracking-widest">Tucumán</span>
                        </div>
                    </Link>

                    {/* Menú de Escritorio */}
                    <div className="hidden items-center gap-3 lg:flex">
                        {navigation.map((item) =>
                            item.children ? (
                                <div key={item.name} className="relative group">
                                    <button className="flex items-center gap-1 rounded-md px-3 py-2 text-base font-bold uppercase tracking-wider text-gray-700 hover:text-red-700 transition-colors focus:outline-none">
                                        {item.name}
                                        <ChevronDown className="h-5 w-5 transition-transform group-hover:rotate-180" />
                                    </button>
                                    <div className="absolute left-0 top-full hidden w-56 bg-white shadow-xl border border-gray-100 rounded-b-md py-3 group-hover:block z-50 mt-[-5px]">
                                        {item.children.map((child) => (
                                            <Link key={child.name} to={child.href} className="block px-5 py-2 text-base font-semibold text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors">
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link key={item.name} to={item.href} className="rounded-md px-3 py-2 text-base font-bold uppercase tracking-wider text-gray-700 transition-colors hover:text-red-700">
                                    {item.name}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Botón Ingresar (Condicional para Administradores) */}
                    <div className="hidden items-center gap-2 lg:flex">
                        {isLoggedIn && (
                            <Link to="/admin" className="flex items-center gap-2 border-2 border-red-600 text-red-700 hover:bg-red-600 hover:text-white font-black text-sm px-5 py-2.5 rounded-md transition-all uppercase tracking-wider shadow-sm">
                                <Settings className="w-4 h-4" />
                                Panel Admin
                            </Link>
                        )}
                    </div>

                    {/* Botón Menú Celular */}
                    <button
                        className="lg:hidden p-2 text-gray-600 hover:text-red-700"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                    </button>
                </div>

                {/* Menú Celular Desplegable */}
                <div className={cn("overflow-hidden transition-all duration-300 lg:hidden bg-gray-50", mobileMenuOpen ? "max-h-[600px] border-b" : "max-h-0")}>
                    <div className="space-y-1 px-4 py-6">
                        {navigation.map((item) => (
                            <div key={item.name}>
                                <Link to={item.href} className="block rounded-md px-3 py-2 text-lg font-bold text-gray-800 hover:bg-red-100 hover:text-red-700 uppercase" onClick={() => setMobileMenuOpen(false)}>
                                    {item.name}
                                </Link>
                                {item.children && (
                                    <div className="ml-4 border-l-2 border-red-200 pl-4 space-y-2 mt-2 mb-4">
                                        {item.children.map((child) => (
                                            <Link key={child.name} to={child.href} className="block rounded-md px-3 py-1 text-base font-medium text-gray-600 hover:text-red-700" onClick={() => setMobileMenuOpen(false)}>
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Botón Celular Condicional */}
                        {isLoggedIn && (
                            <div className="pt-6 mt-4 border-t border-gray-200">
                                <Link to="/admin" className="flex items-center justify-center gap-2 w-full bg-red-700 text-white font-black py-4 rounded-md uppercase tracking-wider text-lg" onClick={() => setMobileMenuOpen(false)}>
                                    <Settings className="w-5 h-5" />
                                    Panel Admin
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;