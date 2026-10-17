import { useEffect, useState } from "react";
import api from "../services/api";

// Datos del club que se editan desde el panel (Datos del club). Estos son los de respaldo si la API no responde.
export const CIFRAS_POR_DEFECTO = { capacidadCiudadela: 27000, cantidadSocios: 15000, copasNacionales: 1 };

export const CUOTAS_POR_DEFECTO = [
    {
        nombre: "Socio Tucumán (Activo)", edades: "Mayores de 18 años", precio: 25000, destacada: true,
        ventajas: ["Entradas a mitad de precio", "Voz y voto en asambleas", "Descuento en tienda oficial", "Prioridad en plateas", "Acceso al Complejo"],
    },
    {
        nombre: "Socio Filial (Interior)", edades: "+50km de la Capital", precio: 15000, destacada: false,
        ventajas: ["Entradas a mitad de precio", "Voz y voto en asambleas", "Descuento en tienda oficial", "Gestión vía Filiales"],
    },
];

export const HORARIOS_MUSEO_POR_DEFECTO = {
    lineas: ["Lunes a Viernes: 9:00 - 17:00", "Sábado: 9:00 - 13:00"],
    aviso: "Cerrado los Domingos y días de partido",
    resumen: "Lun a Sáb desde las 9:00",
};

const POR_DEFECTO = { ...CIFRAS_POR_DEFECTO, cuotas: CUOTAS_POR_DEFECTO, horariosMuseo: HORARIOS_MUSEO_POR_DEFECTO };

export const useDatosClub = () => {
    const [datos, setDatos] = useState(POR_DEFECTO);

    useEffect(() => {
        api.get("/club")
            .then((r) => setDatos({ ...POR_DEFECTO, ...r.data }))
            .catch(() => {});
    }, []);

    return datos;
};

// Años cumplidos desde una fecha: suma uno recién al llegar al aniversario (mes 1-12)
export const aniversarios = (año, mes, dia) => {
    const hoy = new Date();
    const cumplido = hoy >= new Date(hoy.getFullYear(), mes - 1, dia);
    return hoy.getFullYear() - año - (cumplido ? 0 : 1);
};

// Fundación: 2 de noviembre de 1909
export const añosDeHistoria = () => aniversarios(1909, 11, 2);
