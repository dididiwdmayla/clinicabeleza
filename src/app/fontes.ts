import localFont from "next/font/local";

export const fonteDisplay = localFont({
  src: "../../public/fontes/BricolageGrotesque-Variable.woff2",
  variable: "--fonte-display",
  weight: "200 800",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const fonteTexto = localFont({
  src: "../../public/fontes/InstrumentSans-Variable.woff2",
  variable: "--fonte-texto",
  weight: "400 700",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const fonteTecnica = localFont({
  src: "../../public/fontes/IBMPlexMono-Variable.woff2",
  variable: "--fonte-tecnica",
  weight: "100 700",
  style: "normal",
  display: "swap",
  preload: false,
  fallback: ["Courier New", "monospace"],
  adjustFontFallback: "Arial",
});

export const classesFontes = [
  fonteDisplay.variable,
  fonteTexto.variable,
  fonteTecnica.variable,
].join(" ");

