"use client";

import { useEffect, useState } from "react";

const temas = [
  { id: "noite", nome: "Noite" },
  { id: "dia", nome: "Dia" },
  { id: "oxido", nome: "Óxido" },
  { id: "mineral", nome: "Mineral" },
] as const;

type Tema = (typeof temas)[number]["id"];

const chaveTema = "estudio-nove-tema";

const eventoTema = "estudio-nove:tema";

function temaValido(valor: string | null | undefined): valor is Tema {
  return temas.some((tema) => tema.id === valor);
}

function obterTema(): Tema {
  if (typeof document === "undefined") {
    return "noite";
  }

  const tema = document.documentElement.getAttribute("data-theme");
  return temaValido(tema) ? tema : "noite";
}

export function AlternadorTema() {
  const [temaAtual, setTemaAtual] = useState<Tema>("noite");

  useEffect(() => {
    const atualizarTema = () => setTemaAtual(obterTema());
    const quadro = window.requestAnimationFrame(atualizarTema);
    window.addEventListener(eventoTema, atualizarTema);

    return () => {
      window.cancelAnimationFrame(quadro);
      window.removeEventListener(eventoTema, atualizarTema);
    };
  }, []);

  function escolherTema(tema: Tema) {
    document.documentElement.setAttribute("data-theme", tema);
    document.documentElement.style.setProperty("color-scheme", tema === "dia" ? "light" : "dark");
    window.localStorage.setItem(chaveTema, tema);
    window.dispatchEvent(new Event(eventoTema));
  }

  return (
    <div aria-label="Escolha o tema visual" className="alternador-tema" role="radiogroup">
      <span className="alternador-tema__rotulo">Tema</span>
      <div className="alternador-tema__opcoes">
        {temas.map((tema) => (
          <button
            aria-checked={temaAtual === tema.id}
            className="alternador-tema__opcao"
            data-opcao={tema.id}
            key={tema.id}
            onClick={() => escolherTema(tema.id)}
            role="radio"
            type="button"
          >
            <span aria-hidden="true" className="alternador-tema__amostra" />
            <span>{tema.nome}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
