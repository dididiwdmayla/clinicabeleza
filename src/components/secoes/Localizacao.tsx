import type { CSSProperties } from "react";
import { Botao } from "@/components/ui/Botao";
import { IconeSeta } from "@/components/ui/Icone";
import { Rotulo } from "@/components/ui/Rotulo";
import { contato } from "@/content/contato";

export function Localizacao() {
  return (
    <section aria-labelledby="localizacao-titulo" className="localizacao ritmo-secao" data-secao="localizacao" id="localizacao">
      <div className="conteiner">
        <header className="localizacao__cabecalho">
          <div data-revelar style={{ "--i": 0 } as CSSProperties}>
            <Rotulo>Coordenada 09 / Zona 02</Rotulo>
            <h2 id="localizacao-titulo">Chegar sem procurar a entrada.</h2>
          </div>
          <p data-revelar style={{ "--i": 1 } as CSSProperties}>
            Referência de rua, vagas e horários reunidos antes de abrir o mapa externo.
          </p>
        </header>

        <div className="localizacao__corpo">
          <div aria-hidden="true" className="localizacao__diagrama" data-revelar style={{ "--i": 0 } as CSSProperties}>
            <span className="localizacao__via localizacao__via--a" />
            <span className="localizacao__via localizacao__via--b" />
            <span className="localizacao__via localizacao__via--c" />
            <span className="localizacao__marcador">09</span>
            <strong>ZONA 02 / MARINGÁ</strong>
          </div>

          <div className="localizacao__dados">
            <address data-revelar style={{ "--i": 1 } as CSSProperties}>
              <span>ENDEREÇO</span>
              <strong>{contato.endereco}</strong>
            </address>
            <div className="localizacao__chegada" data-revelar style={{ "--i": 2 } as CSSProperties}>
              <p><span>REFERÊNCIA</span>{contato.referencia}</p>
              <p><span>ESTACIONAMENTO</span>{contato.estacionamento}</p>
            </div>
            <dl data-revelar style={{ "--i": 3 } as CSSProperties}>
              {contato.horarios.map((horario) => (
                <div key={horario.dias}>
                  <dt>{horario.dias}</dt>
                  <dd>{horario.periodo}</dd>
                </div>
              ))}
            </dl>
            <Botao href={contato.mapaUrl} rel="noreferrer" target="_blank" variante="contorno">
              Abrir endereço no mapa <IconeSeta />
            </Botao>
          </div>
        </div>
      </div>
    </section>
  );
}
