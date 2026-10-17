import { useEffect, useState } from "react";
import api from "../services/api";

// Cifras del club. Se editan desde el panel (Datos del club); estas son las de respaldo si la API no responde.
export const CIFRAS_POR_DEFECTO = { capacidadCiudadela: 27000, cantidadSocios: 15000, copasNacionales: 1 };

export const useDatosClub = () => {
    const [cifras, setCifras] = useState(CIFRAS_POR_DEFECTO);

    useEffect(() => {
        api.get("/club")
            .then((r) => setCifras({ ...CIFRAS_POR_DEFECTO, ...r.data }))
            .catch(() => {});
    }, []);

    return cifras;
};

// Años cumplidos desde una fecha: suma uno recién al llegar al aniversario (mes 1-12)
export const aniversarios = (año, mes, dia) => {
    const hoy = new Date();
    const cumplido = hoy >= new Date(hoy.getFullYear(), mes - 1, dia);
    return hoy.getFullYear() - año - (cumplido ? 0 : 1);
};

// Fundación: 2 de noviembre de 1909
export const añosDeHistoria = () => aniversarios(1909, 11, 2);
