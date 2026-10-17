const TIPOS = ["image/jpeg", "image/png", "image/webp"]; // los que acepta el servidor
const MAX_MB = 5; // límite del servidor
const MIN_LADO = 600; // por debajo se ve borrosa en las tarjetas grandes

// Valida la foto elegida y, si sirve, la guarda con su vista previa. Avisa con un cartel si algo anda mal.
export const elegirFoto = (e, { setImagen, setPreview, avisar }) => {
    const input = e.target;
    const archivo = input.files[0];
    if (!archivo) return;

    if (!TIPOS.includes(archivo.type)) {
        avisar("La foto tiene que ser JPG, PNG o WEBP (las fotos HEIC del iPhone no sirven).", "error", 6000);
        input.value = "";
        return;
    }
    if (archivo.size > MAX_MB * 1024 * 1024) {
        avisar(`La foto pesa ${(archivo.size / 1048576).toFixed(1)} MB y el máximo es ${MAX_MB} MB.`, "error", 6000);
        input.value = "";
        return;
    }

    const url = URL.createObjectURL(archivo);
    setImagen(archivo);
    setPreview(url);

    const medida = new Image();
    medida.onload = () => {
        if (Math.min(medida.width, medida.height) < MIN_LADO) {
            avisar(`La foto es chica (${medida.width}×${medida.height}) y puede verse borrosa.`, "info", 6000);
        }
    };
    medida.src = url;
};
