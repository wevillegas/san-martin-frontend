const Loader = ({ texto = "Cargando..." }) => (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-700 mb-4"></div>
        <p className="text-gray-500 font-black uppercase tracking-widest">{texto}</p>
    </div>
);

export default Loader;
