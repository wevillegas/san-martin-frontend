import { useState, useEffect } from 'react';
import { obtenerJugadores } from '../services/jugadorService';

const Plantel = () => {
    // Estados para guardar los datos y saber si está cargando
    const [jugadores, setJugadores] = useState([]);
    const [cargando, setCargando] = useState(true);

    // useEffect se ejecuta una sola vez al entrar a la página
    useEffect(() => {
        const cargarPlantel = async () => {
            try {
                const datos = await obtenerJugadores();
                setJugadores(datos); // Guardamos los jugadores en el estado
                setCargando(false);  // Ya terminó de cargar
            } catch (error) {
                console.error("No se pudo cargar el plantel");
                setCargando(false);
            }
        };

        cargarPlantel();
    }, []); // Los corchetes vacíos significan "ejecutar solo al montar el componente"

    // Si todavía está esperando los datos, mostramos un mensaje
    if (cargando) {
        return <div className="text-center mt-20 text-xl font-bold text-red-700">Cargando plantel del Santo...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-4xl font-black text-red-700 text-center mb-10 uppercase tracking-wider">
                Plantel Profesional
            </h1>

            {/* Grilla responsiva: 1 columna en celulares, 2 en tablets, 3 en monitores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Recorremos el arreglo de jugadores y dibujamos una tarjeta por cada uno */}
                {jugadores.map((jugador) => (
                    <div key={jugador._id} className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-600 hover:shadow-2xl transition-shadow">
                        <h2 className="text-2xl font-bold text-gray-800 uppercase">
                            {jugador.nombre} {jugador.apellido}
                        </h2>
                        <div className="mt-4 text-gray-600 font-medium">
                            <p>Posición: <span className="text-red-700">{jugador.posicion}</span></p>
                            <p>Camiseta: <span className="text-red-700">#{jugador.numeroCamiseta}</span></p>
                        </div>
                    </div>
                ))}

                {/* Mensaje por si la base de datos está vacía */}
                {jugadores.length === 0 && (
                    <p className="col-span-full text-center text-gray-500">
                        No hay jugadores registrados en la base de datos todavía.
                    </p>
                )}

            </div>
        </div>
    )
}

export default Plantel;