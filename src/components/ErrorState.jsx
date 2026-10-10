import { AlertTriangle } from "lucide-react";

const ErrorState = ({ texto = "No pudimos cargar el contenido. Probá de nuevo en unos segundos." }) => (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 text-center">
        <AlertTriangle className="h-12 w-12 text-red-600 mb-4" />
        <p className="text-gray-700 font-bold max-w-md">{texto}</p>
    </div>
);

export default ErrorState;
