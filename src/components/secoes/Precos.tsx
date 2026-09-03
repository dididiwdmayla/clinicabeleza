import type { CSSProperties } from "react";
import { Rotulo } from "@/components/ui/Rotulo";
import { notaAvaliacao, precos } from "@/content/precos";

export function Precos() {
  return (
    <section aria-labelledby="precos-titulo" className="precos ritmo-secao" data-secao="precos" id="precos">
      <div className="conteiner">
        <header className="precos__cabecalho">
          <div data-revelar style={{ "--i": 0 } as CSSProperties}>
            <Rotulo>Tabela 07 / Investimento</Rotulo>
            <h2 id="precos-titulo">Faixas claras antes da avaliação.</h2>
          </div>
          <p data-revelar style={{ "--i": 1 } as CSSProperties}>
            Valores de referência para reservar o atendimento sem transformar a conversa em orçamento surpresa.
          </p>
        </header>

        <div className="precos__quadro" data-revelar style={{ "--i": 2 } as CSSProperties}>
          <table className="precos__tabela">
            <caption>Faixas de preço dos procedimentos do Estúdio Nove</caption>
            <thead>
              <tr>
                <th scope="col">Procedimento</th>
                <th scope="col">Faixa</th>
                <th scope="col">Observação</th>
              </tr>
            </thead>
            <tbody>
              {precos.map((item) => (
                <tr key={item.procedimento}>
                  <th scope="row">{item.procedimento}</th>
                  <td>{item.valor}</td>
                  <td>{"nota" in item ? item.nota : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="precos__nota"><span>NOTA / AVALIAÇÃO</span>{notaAvaliacao}</p>
        </div>
      </div>
    </section>
  );
}
