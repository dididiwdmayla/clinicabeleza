import type { Metadata } from "next";
import type { ReactNode } from "react";
import { classesFontes } from "./fontes";
import "./globals.css";

export const metadata: Metadata = {
  title: "ESTÚDIO NOVE — Estética & Nail Design",
  description: "Clínica de estética e nail design em Maringá, Paraná.",
};

const scriptTema = `(() => {
  const raiz = document.documentElement;
  raiz.classList.add('js');
  if (new URLSearchParams(location.search).get('shot') === '1') raiz.classList.add('shot');
  const temas = ['noite', 'dia', 'oxido', 'mineral'];
  const salvo = localStorage.getItem('estudio-nove-tema');
  const preferido = matchMedia('(prefers-color-scheme: dark)').matches ? 'noite' : 'dia';
  const tema = salvo && temas.includes(salvo) ? salvo : preferido;
  raiz.dataset.theme = tema;
  raiz.style.colorScheme = tema === 'dia' ? 'light' : 'dark';
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
