import type { CSSProperties } from "react";
import Image from "next/image";
import { Rotulo } from "@/components/ui/Rotulo";
import { equipe } from "@/content/equipe";

export function Equipe() {
  return (
    <section aria-labelledby="equipe-titulo" className="equipe ritmo-secao" data-secao="equipe" id="equipe">
      <div className="conteiner">
        <header className="equipe__cabecalho">
          <div data-revelar style={{ "--i": 0 } as CSSProperties}>
            <Rotulo>Pessoas 05 / Responsabilidade</Rotulo>
            <h2 id="equipe-titulo">Duas especialidades, uma bancada em comum.</h2>
          </div>
          <p data-revelar style={{ "--i": 1 } as CSSProperties}>
            Atendimento feito por quem avalia, executa e acompanha — sem terceirizar a etapa que exige precisão.
          </p>
        </header>

        <div className="equipe__lista">
          {equipe.map((profissional, indice) => (
            <article className="equipe__profissional" data-revelar key={profissional.nome} style={{ "--i": indice } as CSSProperties}>
              <figure>
                <div className="equipe__retrato">
                  <Image alt={profissional.alt} fill sizes="(min-width: 64rem) 32vw, (min-width: 30rem) 42vw, calc(100vw - 2 * var(--gutter))" src={profissional.imagem} unoptimized />
                </div>
                <figcaption>{String(indice + 1).padStart(2, "0")} / EQUIPE</figcaption>
              </figure>
              <div className="equipe__dados">
                <p>{profissional.funcao}</p>
                <h3>{profissional.nome}</h3>
                <p>{profissional.formacao}</p>
                {"registro" in profissional && <small>{profissional.registro}</small>}
                <ul aria-label={`Especialidades de ${profissional.nome}`}>
                  {profissional.especialidades.map((especialidade) => <li key={especialidade}>{especialidade}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
