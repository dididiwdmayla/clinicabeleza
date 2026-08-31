import type { CSSProperties } from "react";
import { Botao } from "@/components/ui/Botao";
import { IconeSeta } from "@/components/ui/Icone";
import { Rotulo } from "@/components/ui/Rotulo";
import { servicosPeleCorpo } from "@/content/servicos";
import { criarLinkWhatsApp } from "@/lib/wa";

const moeda = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  style: "currency",
});

export function Servicos() {
  return (
    <section aria-labelledby="servicos-titulo" className="servicos ritmo-secao" data-secao="servicos" id="servicos">
      <div className="conteiner">
        <header className="servicos__cabecalho">
          <div data-revelar style={{ "--i": 0 } as CSSProperties}>
            <Rotulo>Catálogo 01 / Pele &amp; corpo</Rotulo>
            <h2 id="servicos-titulo">Protocolos com escopo definido.</h2>
          </div>
          <p data-revelar style={{ "--i": 1 } as CSSProperties}>
            Cada atendimento informa duração, investimento, etapas e cuidado posterior antes da reserva.
          </p>
        </header>

        <div className="servicos__grade">
          {servicosPeleCorpo.map((servico, indice) => (
            <article
              className="servicos__cartao"
              data-revelar
              key={servico.slug}
              style={{ "--i": indice % 3 } as CSSProperties}
            >
              <header>
                <Rotulo>PR {String(indice + 1).padStart(2, "0")} / {servico.duracaoMin} min</Rotulo>
                <h3>{servico.nome}</h3>
              </header>

              <p className="servicos__indicacao">{servico.indicadoPara}</p>

              <div className="servicos__preco">
                <span>Investimento</span>
                <strong>{moeda.format(servico.precoMin)}–{moeda.format(servico.precoMax)}</strong>
              </div>

              <div className="servicos__inclui">
                <span>Inclui</span>
                <ul>
                  {servico.inclui.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <p className="servicos__pos"><strong>Pós:</strong> {servico.posProcedimento}</p>

              <Botao
                aria-label={`Consultar ${servico.nome} pelo WhatsApp`}
                href={criarLinkWhatsApp(`Olá, Estúdio Nove. Quero consultar agenda e valores para ${servico.nome}.`)}
                variante="contorno"
              >
                Consultar serviço <IconeSeta />
              </Botao>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
