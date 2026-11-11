// Conversaciones reales con Alba (tomadas de Telegram) que se muestran en la web.

export interface MensajeChat {
  de: "usuario" | "alba";
  hora: string;
  /** Líneas del mensaje. Se permite <strong> para resaltar el medicamento. */
  lineas: string[];
}

export const respuestaDisponible: MensajeChat = {
  de: "alba",
  hora: "9:49 a. m.",
  lineas: [
    "✅ Sí, tenemos <strong>Ibuprofeno 400mg</strong> disponible.",
    "📦 Presentación: Caja x 10 tabletas",
    "💰 Precio: $8500",
    "🏭 Laboratorio: Genfar",
    "📊 Unidades en stock: 23",
  ],
};

export const respuestaAgotado: MensajeChat = {
  de: "alba",
  hora: "9:52 a. m.",
  lineas: [
    "❌ <strong>Acetaminofén 500mg</strong> está agotado en este momento.",
    "Te recomendamos consultar más tarde o preguntar por una alternativa.",
  ],
};

// Conversación del celular del inicio. Los errores de ortografía son a
// propósito: muestran que Alba entiende aunque se escriba mal.
export const conversacionDemo: MensajeChat[] = [
  { de: "usuario", hora: "9:49 a. m.", lineas: ["tienes ibupropeno?"] },
  respuestaDisponible,
  { de: "usuario", hora: "9:52 a. m.", lineas: ["y acetmanifen?"] },
  respuestaAgotado,
];
