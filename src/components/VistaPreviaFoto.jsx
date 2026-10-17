import { Image as ImageIcon } from "lucide-react";

// Muestra la foto recortada con la misma proporción que tendrá en el sitio (object-cover, como las tarjetas)
const VistaPreviaFoto = ({ src, relacion = "3/4", ancho = "w-36", etiqueta }) => (
    <div className="flex shrink-0 flex-col items-center gap-2">
        <div className={`${ancho} flex items-center justify-center overflow-hidden rounded-xl border-4 border-white bg-gray-100 shadow-lg`} style={{ aspectRatio: relacion }}>
            {src ? <img src={src} alt="Vista previa" className="h-full w-full object-cover" /> : <ImageIcon className="h-10 w-10 text-gray-300" />}
        </div>
        {etiqueta && <span className="text-center text-[11px] font-bold uppercase tracking-widest text-gray-400">{etiqueta}</span>}
    </div>
);

export default VistaPreviaFoto;
