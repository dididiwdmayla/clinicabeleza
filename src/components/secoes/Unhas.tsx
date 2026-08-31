import type { CSSProperties } from "react";
import Image from "next/image";
import { Botao } from "@/components/ui/Botao";
import { IconeSeta } from "@/components/ui/Icone";
import { Rotulo } from "@/components/ui/Rotulo";
import { servicosUnhas } from "@/content/servicos";
import { criarLinkWhatsApp } from "@/lib/wa";

const moeda = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  style: "currency",
});

const amostras = [
  {
    alt: "Gel transparente curado sobre lâmina técnica.",
    codigo: "MAT 01 / POLÍMERO",
    descricao: "Camada fina, nivelamento contínuo e brilho concentrado.",
    nome: "Gel curado",
    src: "/img/assets/a-gel-curado.webp",
  },
  {
    alt: "Feixe de fibra de vidro apoiado sobre suporte branco.",
    codigo: "MAT 02 / ESTRUTURA",
    descricao: "Trama leve para construir comprimento, eixo e curvatura.",
    nome: "Fibra de vidro",
    src: "/img/assets/b-fibra-vidro.webp",
  },
] as const;

export function Unhas() {
  return (
    <section aria-labelledby="unhas-titulo" className="unhas ritmo-secao" data-secao="unhas" id="unhas">
      <div className="conteiner">
        <header className="unhas__cabecalho">
          <div data-revelar style={{ "--i": 0 } as CSSProperties}>
            <Rotulo>Ateliê 02 / Unhas</Rotulo>
            <h2 id="unhas-titulo">Curvatura, espessura e brilho sob medida.</h2>
          </div>
          <div className="unhas__introducao" data-revelar style={{ "--i": 1 } as CSSProperties}>
            <p>
              A estrutura começa na leitura da unha natural. Gel e fibra entram em camadas finas, com ápice, laterais e acabamento verificados antes da cor.
            </p>
            <dl>
              <div><dt>Retorno</dt><dd>18–25 dias</dd></div>
              <div><dt>Construção</dt><dd>Sob medida</dd></div>
              <div><dt>Remoção</dt><dd>No estúdio</dd></div>
            </dl>
          </div>
        </header>

        <div aria-label="Amostras de materiais usados nos protocolos de unhas" className="unhas__materiais">
          {amostras.map((amostra, indice) => (
            <figure className="unhas__amostra" data-revelar key={amostra.codigo} style={{ "--i": indice } as CSSProperties}>
              <div className="unhas__imagem">
                <Image
                  alt={amostra.alt}
                  fill
                  sizes="(min-width: 64rem) 40vw, (min-width: 30rem) 46vw, 90vw"
                  src={amostra.src}
                  unoptimized
                />
              </div>
              <figcaption>
                <span>{amostra.codigo}</span>
                <strong>{amostra.nome}</strong>
                <p>{amostra.descricao}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="unhas__indice">
          <header className="unhas__indice-cabecalho" data-revelar>
            <Rotulo>Menu técnico / 04 protocolos</Rotulo>
            <span>Agenda e valor confirmados antes do preparo</span>
          </header>

          {servicosUnhas.map((servico, indice) => (
            <article className="unhas__servico" data-revelar key={servico.slug} style={{ "--i": indice % 3 } as CSSProperties}>
              <span className="unhas__numero">{String(indice + 1).padStart(2, "0")}</span>
              <div className="unhas__servico-conteudo">
                <h3>{servico.nome}</h3>
                <p>{servico.indicadoPara}</p>
              </div>
              <dl className="unhas__servico-dados">
                <div><dt>Duração</dt><dd>{servico.duracaoMin} min</dd></div>
                <div><dt>Investimento</dt><dd>{moeda.format(servico.precoMin)}–{moeda.format(servico.precoMax)}</dd></div>
              </dl>
              <Botao
                aria-label={`Consultar ${servico.nome} pelo WhatsApp`}
                href={criarLinkWhatsApp(`Olá, Estúdio Nove. Quero consultar agenda e valores para ${servico.nome}.`)}
                variante="contorno"
              >
                Consultar <IconeSeta />
              </Botao>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
