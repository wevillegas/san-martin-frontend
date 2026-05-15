import { Users } from "lucide-react";

// Lista de autoridades (Podés agregar o quitar los que necesites)
const autoridades = [
    { cargo: "Presidente", nombre: "Oscar Mirkin" },
    { cargo: "Vicepresidente 1°", nombre: "Rafael Ponce De León" },
    { cargo: "Vicepresidente 2°", nombre: "Nicolás José Nasrallah" },
    { cargo: "Vocal Titular 1", nombre: "Ernesto Baaclini" },
    { cargo: "Vocal Titular 2", nombre: "Manuel Núnez Ingrao" },
    { cargo: "Vocal Titular 3", nombre: "Geronimo García Mirkin" },
    { cargo: "Vocal Titular 4", nombre: "Franco Pinello" },
    { cargo: "Vocal Titular 5", nombre: "Carlos María Yolde" },
    { cargo: "Vocal Titular 6", nombre: "Bruno Rocchio" },
    { cargo: "Vocal Titular 7", nombre: "Matías Lorenzo Pisarello" },
    { cargo: "Vocal Titular 8", nombre: "Agustín Martínez Lozano" },
    { cargo: "Vocal Titular 9", nombre: "María Soledad Miranda Villagra" },
    { cargo: "Vocal Titular 10", nombre: "Roxana Del Valle Lopez" },
    { cargo: "Vocal Suplente 1", nombre: "Javier Reinerio Jiménez" },
    { cargo: "Vocal Suplente 2", nombre: "Silvio Andrada Pedescoll" },
    { cargo: "Vocal Suplente 3", nombre: "Nicolás Graña" },
    { cargo: "Vocal Suplente 4", nombre: "Germán Ricco" },
    { cargo: "Vocal Suplente 5", nombre: "Ricardo Jesús Rodriguez" },
    { cargo: "Vocal Suplente 6", nombre: "Gonzalo Valdez Todoroff" },
    { cargo: "Junta Fiscalizadora, Titular 1", nombre: "Amira Nair Maidan" },
    { cargo: "Junta Fiscalizadora, Titular 2", nombre: "Nery Maximiliano Nieto" },
    { cargo: "Junta Fiscalizadora, Titular 3", nombre: "Baaclini Ignacio" },
    { cargo: "Junta Fiscalizadora, Suplente 1", nombre: "Luciana Falcucci" },
    { cargo: "Junta Fiscalizadora, Suplente 2", nombre: "Adolfo Enrique Bottini Rubiol" },
    { cargo: "Junta Fiscalizadora, Suplente 3", nombre: "NCarlos Hinojosa Pozzi" },

];

const Autoridades = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-24 font-sans">
            <div className="max-w-6xl mx-auto px-4">
                
                {/* Encabezado Simple */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <div className="bg-red-100 p-3 rounded-full text-red-700">
                            <Users className="w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-wider mb-4">
                        Comisión Directiva
                    </h1>
                    <div className="w-24 h-1.5 bg-red-700 mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                        Las autoridades encargadas de guiar el destino institucional y deportivo del Club Atlético San Martín.
                    </p>
                </div>

                {/* Grilla de Tarjetas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {autoridades.map((autoridad, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-red-700 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                {autoridad.cargo}
                            </h3>
                            <p className="text-lg font-black text-gray-900 uppercase">
                                {autoridad.nombre}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Autoridades;