import type { Metadata } from "next";
import type { ReactNode } from "react";
import { classesFontes } from "./fontes";
import "./globals.css";

export const metadata: Metadata = {
  title: "ESTÚDIO NOVE — Estética & Nail Design",
  description: "Clínica de estética e nail design em Maringá, Paraná.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className={classesFontes} lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
