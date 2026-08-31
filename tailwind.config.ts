import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elev": "var(--bg-elev)",
        superficie: "var(--superficie)",
        linha: "var(--linha)",
        tinta: "var(--tinta)",
        "tinta-2": "var(--tinta-2)",
        "tinta-3": "var(--tinta-3)",
        acento: "var(--acento)",
        "acento-tinta": "var(--acento-tinta)",
        "acento-suave": "var(--acento-suave)",
        foco: "var(--foco)",
      },
      fontFamily: {
        display: ["var(--fonte-display)"],
        texto: ["var(--fonte-texto)"],
        tecnica: ["var(--fonte-tecnica)"],
      },
      fontSize: {
        "-1": "var(--txt--1)",
        0: "var(--txt-0)",
        1: "var(--txt-1)",
        2: "var(--txt-2)",
        3: "var(--txt-3)",
        4: "var(--txt-4)",
        5: "var(--txt-5)",
        6: "var(--txt-6)",
        7: "var(--txt-7)",
      },
      borderRadius: {
        1: "var(--raio-1)",
        2: "var(--raio-2)",
        3: "var(--raio-3)",
      },
      boxShadow: {
        1: "var(--sombra-1)",
        2: "var(--sombra-2)",
      },
      transitionDuration: {
        rapida: "var(--dur-rapida)",
        media: "var(--dur-media)",
        lenta: "var(--dur-lenta)",
      },
      transitionTimingFunction: {
        saida: "var(--ease-saida)",
        entrada: "var(--ease-entrada)",
      },
      letterSpacing: {
        tecnica: "0.08em",
      },
    },
  },
  plugins: [],
};

export default config;
