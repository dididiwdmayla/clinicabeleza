"use client";

import { useEffect, useRef } from "react";

const intervaloQuadro = 1000 / 30;

export function CanvasHero() {
  const referencia = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const elementoCanvas = referencia.current;
    if (!elementoCanvas) return;
    const elementoRecipiente = elementoCanvas.parentElement;
    if (!elementoRecipiente) return;
    const contextoObtido = elementoCanvas.getContext("2d");
    if (!contextoObtido) return;

    const canvas: HTMLCanvasElement = elementoCanvas;
    const recipiente: HTMLElement = elementoRecipiente;
    const contexto: CanvasRenderingContext2D = contextoObtido;

    const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    const modoCaptura = new URLSearchParams(window.location.search).get("shot") === "1";
    let visivel = true;
    let quadro = 0;
    let ultimoTempo = 0;
    let escala = 1;

    function ajustarTamanho() {
      const caixa = recipiente.getBoundingClientRect();
      escala = Math.min(window.devicePixelRatio || 1, 1.5);
      const largura = Math.max(1, Math.round(caixa.width * escala));
      const altura = Math.max(1, Math.round(caixa.height * escala));
      if (canvas.width !== largura || canvas.height !== altura) {
        canvas.width = largura;
        canvas.height = altura;
      }
      contexto.setTransform(escala, 0, 0, escala, 0, 0);
    }

    function desenhar(tempo = 0) {
      ajustarTamanho();
      const largura = canvas.width / escala;
      const altura = canvas.height / escala;
      const estilos = getComputedStyle(document.documentElement);
      const linha = estilos.getPropertyValue("--linha").trim();
      const acento = estilos.getPropertyValue("--acento").trim();
      const tinta = estilos.getPropertyValue("--tinta-2").trim();
      const tema = document.documentElement.dataset.theme;

      contexto.clearRect(0, 0, largura, altura);
      contexto.lineWidth = 1;
      contexto.strokeStyle = linha;
      contexto.globalAlpha = 0.72;

      if (tema === "oxido") {
        const deslocamento = (tempo * 3) % 28;
        for (let x = -altura; x < largura; x += 28) {
          contexto.beginPath();
          contexto.moveTo(x + deslocamento, altura);
          contexto.lineTo(x + altura + deslocamento, 0);
          contexto.stroke();
        }
      } else if (tema === "mineral") {
        const passo = Math.max(24, Math.min(largura, altura) / 8);
        const pulso = Math.sin(tempo * 0.7) * 2;
        for (let raio = passo; raio < Math.max(largura, altura); raio += passo) {
          contexto.beginPath();
          contexto.arc(largura * 0.72, altura * 0.58, raio + pulso, 0, Math.PI * 2);
          contexto.stroke();
        }
      } else {
        const deslocamento = (tempo * 2) % 32;
        for (let y = 24; y < altura; y += 32) {
          contexto.beginPath();
          contexto.moveTo(0, y + deslocamento);
          contexto.lineTo(largura, y + deslocamento);
          contexto.stroke();
        }
      }

      contexto.globalAlpha = 0.82;
      contexto.strokeStyle = acento;
      contexto.beginPath();
      contexto.moveTo(largura * 0.12, altura * 0.5);
      contexto.lineTo(largura * 0.88, altura * 0.5);
      contexto.stroke();

      contexto.globalAlpha = 0.55;
      contexto.fillStyle = tinta;
      contexto.fillRect(largura * 0.5 - 1, altura * 0.12, 2, altura * 0.76);
      contexto.globalAlpha = 1;
    }

    function podeAnimar() {
      return !modoCaptura && !movimentoReduzido.matches && visivel && !document.hidden;
    }

    function animar(tempo: number) {
      if (!podeAnimar()) {
        quadro = 0;
        return;
      }
      if (tempo - ultimoTempo >= intervaloQuadro) {
        desenhar(tempo / 1000);
        ultimoTempo = tempo;
      }
      quadro = window.requestAnimationFrame(animar);
    }

    function sincronizar() {
      if (quadro) window.cancelAnimationFrame(quadro);
      quadro = 0;
      desenhar(0);
      if (podeAnimar()) quadro = window.requestAnimationFrame(animar);
    }

    const observadorTamanho = new ResizeObserver(sincronizar);
    const observadorVisibilidade = new IntersectionObserver(
      ([entrada]) => {
        visivel = Boolean(entrada?.isIntersecting);
        sincronizar();
      },
      { threshold: 0.01 },
    );
    const aoMudarVisibilidade = () => sincronizar();
    const aoMudarTema = () => sincronizar();

    observadorTamanho.observe(recipiente);
    observadorVisibilidade.observe(canvas);
    document.addEventListener("visibilitychange", aoMudarVisibilidade);
    movimentoReduzido.addEventListener("change", sincronizar);
    window.addEventListener("estudio-nove:tema", aoMudarTema);
    sincronizar();

    return () => {
      if (quadro) window.cancelAnimationFrame(quadro);
      observadorTamanho.disconnect();
      observadorVisibilidade.disconnect();
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
      movimentoReduzido.removeEventListener("change", sincronizar);
      window.removeEventListener("estudio-nove:tema", aoMudarTema);
    };
  }, []);

  return <canvas aria-hidden="true" className="hero__canvas" ref={referencia} />;
}
