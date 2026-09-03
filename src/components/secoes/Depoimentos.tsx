import type { CSSProperties } from "react";
import { Rotulo } from "@/components/ui/Rotulo";
import { depoimentos } from "@/content/depoimentos";

export function Depoimentos() {
  return (
    <section aria-labelledby="depoimentos-titulo" className="depoimentos ritmo-secao" data-secao="depoimentos" id="depoimentos">
      <div className="depoimentos__grade conteiner">
        <header>
          <div data-revelar style={{ "--i": 0 } as CSSProperties}>
            <Rotulo>Registro 06 / Retornos</Rotulo>
            <h2 id="depoimentos-titulo">Resultado descrito por quem voltou.</h2>
          </div>
          <p data-revelar style={{ "--i": 1 } as CSSProperties}>
            Cinco relatos curtos, associados ao procedimento e ao mês em que o atendimento aconteceu.
          </p>
        </header>

        <ol className="depoimentos__lista">
          {depoimentos.map((depoimento, indice) => (
            <li data-revelar key={depoimento.nome + depoimento.mes} style={{ "--i": indice } as CSSProperties}>
              <div className="depoimentos__meta">
                <span>{String(indice + 1).padStart(2, "0")} / {depoimento.mes}</span>
                <strong>{depoimento.nome}</strong>
                <small>{depoimento.procedimento}</small>
              </div>
              <p>{depoimento.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
