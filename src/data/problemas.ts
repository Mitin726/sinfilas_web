import type { NombreIcono } from "../components/Icono.astro";

export interface Problema {
  titulo: string;
  descripcion: string;
  icono: NombreIcono;
}

export const problemas: Problema[] = [
  {
    titulo: "Filas largas",
    descripcion:
      "Muchas personas pasan largos minutos o incluso horas esperando en farmacias y centros de salud.",
    icono: "reloj",
  },
  {
    titulo: "Desplazamientos innecesarios",
    descripcion:
      "Salir de casa con la esperanza de encontrar el medicamento solo para volver sin él puede ser agotador.",
    icono: "camino",
  },
  {
    titulo: "Frustración y dudas",
    descripcion:
      "Cuando no está disponible, la preocupación aumenta, especialmente para personas mayores o con movilidad limitada.",
    icono: "duda",
  },
];
