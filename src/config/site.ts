// Datos generales del sitio que se usan en varias secciones.
export const site = {
  nombre: "SinFilas",
  titulo: "SinFilas",
  descripcion:
    "Pregúntale a Alba por Telegram si tu medicamento está disponible antes de salir de casa.",
  asistente: "Alba",
  telegramUrl: "https://t.me/medicamentos_alba_bot",
  telegramUsuario: "@medicamentos_alba_bot",
  logo: "/images/logo_sinfilas.png",
  fotoAlba: "/images/alba_perfil.png",
  anioCopyright: 2026,
  // Mientras sea true, la web muestra el aviso de que Alba es un prototipo
  // y que la información de disponibilidad es de prueba.
  esPrototipo: true,
} as const;

export const descargasTelegram = {
  android: "https://play.google.com/store/apps/details?id=org.telegram.messenger",
  iphone: "https://apps.apple.com/app/telegram-messenger/id686449807",
} as const;
