export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

export const preguntas: PreguntaFrecuente[] = [
  {
    pregunta: "¿Cuánto cuesta usar a Alba?",
    respuesta: "Nada. Alba es gratis. Solo necesitas tener Telegram y conexión a internet.",
  },
  {
    pregunta: "¿Alba es una persona?",
    respuesta:
      "No. Alba es un programa que responde automáticamente (lo que se conoce como “bot”). Por eso contesta en segundos.",
  },
  {
    pregunta: "¿Qué pasa si escribo mal el nombre del medicamento?",
    respuesta:
      "No te preocupes. Alba entiende aunque haya errores: si escribes “ibupropeno” o “acetmanifen”, igual sabe que buscas ibuprofeno o acetaminofén.",
  },
  {
    pregunta: "¿Me va a pedir datos personales o dinero?",
    respuesta:
      "No. Alba solo necesita el nombre del medicamento. Nunca te pedirá contraseñas, números de tarjeta, documentos ni pagos.",
  },
  {
    pregunta: "¿Ya puedo usarla para saber si hay un medicamento en mi farmacia?",
    respuesta:
      "Todavía no. Alba es un prototipo: por ahora consulta un inventario de prueba, así que sus respuestas no corresponden a una farmacia real. Antes de salir, confirma con tu farmacia.",
  },
  {
    pregunta: "¿Alba reemplaza al médico o al farmacéutico?",
    respuesta:
      "No. Alba solo te informa si un medicamento está disponible. Para dudas sobre tu tratamiento, consulta siempre al personal de salud.",
  },
];
