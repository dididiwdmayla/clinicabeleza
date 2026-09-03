import type { CSSProperties } from "react";
import Image from "next/image";
import { Rotulo } from "@/components/ui/Rotulo";
import { itensGaleria } from "@/content/processo";

export function Galeria() {
  return (
    <section aria-labelledby="galeria-titulo" className="galeria ritmo-secao" data-secao="galeria" id="galeria">
      <div className="conteiner">
        <header className="galeria__cabecalho">
          <div data-revelar style={{ "--i": 0 } as CSSProperties}>
            <Rotulo>Arquivo 04 / Bancada</Rotulo>
            <h2 id="galeria-titulo">Matéria, instrumento e calor em quadro aberto.</h2>
          </div>
          <p data-revelar style={{ "--i": 1 } as CSSProperties}>
            Uma seleção curta do que entra em contato com produto, pele e unha — sem imagem genérica de spa.
          </p>
        </header>

        <div className="galeria__grade">
          {itensGaleria.map((item, indice) => (
            <figure className="galeria__item" data-revelar key={item.codigo} style={{ "--i": indice % 3 } as CSSProperties}>
              <div className="galeria__imagem">
                <Image
                  alt={item.alt}
                  fill
                  sizes="(min-width: 64rem) 44vw, (min-width: 30rem) 46vw, 90vw"
                  src={item.src}
                  unoptimized
                />
              </div>
              <figcaption>
                <span>{item.codigo}</span>
                <strong>{item.nome}</strong>
                <p>{item.legenda}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
