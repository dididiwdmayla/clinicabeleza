import type { CSSProperties } from "react";
import Image from "next/image";
import { CanvasHero } from "@/components/clientes/CanvasHero";
import { Botao } from "@/components/ui/Botao";
import { IconeSeta, IconeTelefone } from "@/components/ui/Icone";
import { Rotulo } from "@/components/ui/Rotulo";
import { contato } from "@/content/contato";
import { apresentacao } from "@/content/institucional";
import { criarLinkTelefone, criarLinkWhatsApp } from "@/lib/wa";

export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="hero" data-secao="hero" id="hero">
      <div className="hero__grade conteiner">
        <div className="hero__conteudo">
          <Rotulo data-revelar style={{ "--i": 0 } as CSSProperties}>{apresentacao.rotulo}</Rotulo>
          <h1 data-revelar id="hero-titulo" style={{ "--i": 1 } as CSSProperties}>
            {apresentacao.titulo}
          </h1>
          <p className="hero__texto" data-revelar style={{ "--i": 2 } as CSSProperties}>
            {apresentacao.texto}
          </p>
          <div className="hero__acoes" data-revelar style={{ "--i": 3 } as CSSProperties}>
            <Botao href={criarLinkWhatsApp("Olá, Estúdio Nove. Quero consultar a agenda.")}>
              Consultar agenda <IconeSeta />
            </Botao>
            <Botao href={criarLinkTelefone()} variante="contorno">
              <IconeTelefone /> {contato.telefoneExibicao}
            </Botao>
          </div>
          <dl className="hero__provas" data-revelar style={{ "--i": 4 } as CSSProperties}>
            {apresentacao.provas.map((prova) => (
              <div key={prova.rotulo}>
                <dt>{prova.rotulo}</dt>
                <dd>{prova.valor}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="hero__visual" data-revelar style={{ "--i": 2 } as CSSProperties}>
          <picture>
            <source media="(min-width: 48rem)" srcSet="/img/hero-paisagem.webp" />
            <Image
              alt=""
              fill
              priority
              sizes="(min-width: 48rem) 42vw, calc(100vw - 2 * var(--gutter))"
              src="/img/hero-retrato.webp"
            />
          </picture>
          <CanvasHero />
          <figcaption>
            <span>Campo 09 / leitura de superfície</span>
            <span>{contato.cidade}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
