import type { CSSProperties } from "react";
import Image from "next/image";
import { Rotulo } from "@/components/ui/Rotulo";
import { etapasProtocolo } from "@/content/processo";

export function Protocolo() {
  return (
    <section aria-labelledby="protocolo-titulo" className="protocolo ritmo-secao" data-secao="protocolo" id="protocolo">
      <div className="conteiner">
        <header className="protocolo__cabecalho">
          <div data-revelar style={{ "--i": 0 } as CSSProperties}>
            <Rotulo>Método 03 / Quatro passagens</Rotulo>
            <h2 id="protocolo-titulo">Do diagnóstico ao cuidado posterior.</h2>
          </div>
          <p data-revelar style={{ "--i": 1 } as CSSProperties}>
            O procedimento muda; a ordem não. Cada atendimento começa por leitura, passa por preparo e execução controlada e termina com conferência.
          </p>
        </header>

        <div className="protocolo__corpo">
          <figure className="protocolo__visual" data-revelar>
            <Image
              alt="Frasco âmbar, conta-gotas, pote cosmético e disco de algodão alinhados como kit de protocolo de pele."
              fill
              sizes="(min-width: 64rem) 42vw, calc(100vw - 2 * var(--gutter))"
              src="/img/assets/i-protocolo-pele-explodido.webp"
              unoptimized
            />
            <figcaption>
              <span>PK 09 / PELE</span>
              <strong>Preparação em sequência</strong>
            </figcaption>
          </figure>

          <ol className="protocolo__etapas">
            {etapasProtocolo.map((etapa, indice) => (
              <li data-revelar key={etapa.codigo} style={{ "--i": indice } as CSSProperties}>
                <span>{etapa.codigo}</span>
                <div>
                  <h3>{etapa.titulo}</h3>
                  <p>{etapa.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
