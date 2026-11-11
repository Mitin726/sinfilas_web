import type { NombreIcono } from "../components/Icono.astro";

export interface Paso {
  titulo: string;
  descripcion: string;
  icono: NombreIcono;
}

// El número de cada paso se calcula a partir de su posición en la lista.
export const pasos: Paso[] = [
  {
    titulo: "Escríbele por Telegram",
    descripcion:
      "Escribe el medicamento que necesitas, como si estuvieras enviando un mensaje normal.",
    icono: "mensaje",
  },
  {
    titulo: "Alba te responde",
    descripcion:
      "En segundos, te dice si el medicamento está disponible o no, sin que tengas que hacer fila para averiguarlo.",
    icono: "chispa",
  },
  {
    titulo: "Decides con calma",
    descripcion:
      "Si está disponible, puedes ir tranquilo a buscarlo. Si no, te ahorras el viaje y la espera.",
    icono: "calma",
  },
];
