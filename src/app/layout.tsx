import type { Metadata } from "next";
import type { ReactNode } from "react";
import { classesFontes } from "./fontes";
import "./globals.css";

export const metadata: Metadata = {
  title: "ESTÚDIO NOVE — Estética & Nail Design",
  description: "Clínica de estética e nail design em Maringá, Paraná.",
};

const scriptTema = `(() => {
  const temas = ['noite', 'dia', 'oxido', 'mineral'];
  const salvo = localStorage.getItem('estudio-nove-tema');
  const preferido = matchMedia('(prefers-color-scheme: dark)').matches ? 'noite' : 'dia';
  const tema = salvo && temas.includes(salvo) ? salvo : preferido;
  document.documentElement.dataset.theme = tema;
  document.documentElement.style.colorScheme = tema === 'dia' ? 'light' : 'dark';
})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className={classesFontes} data-theme="noite" lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
