import { Revelacao } from "@/components/clientes/Revelacao";
import { Topo } from "@/components/secoes/Topo";
import { Botao } from "@/components/ui/Botao";
import { Cartao } from "@/components/ui/Cartao";
import { Divisor } from "@/components/ui/Divisor";
import { IconeSeta, IconeTelefone } from "@/components/ui/Icone";
import { Rotulo } from "@/components/ui/Rotulo";
import { contato } from "@/content/contato";
import { criarLinkTelefone, criarLinkWhatsApp } from "@/lib/wa";

export default function Home() {
  return (
    <>
      <a className="pular-conteudo" href="#hero">Pular para o conteúdo</a>
      <Revelacao />
      <Topo />
      <main className="fundacao">

      <div className="fundacao__grade">
        <div className="fundacao__intro">
          <Rotulo>Pele + unhas / higiene + acabamento</Rotulo>
          <h1 className="fundacao__titulo">Unhas: proporções. Pele: precisão.</h1>
          <p className="fundacao__texto">
            Protocolos com tempo, preço e cuidado pós-atendimento definidos antes de começar.
            Técnica limpa para pele e corpo; desenho sob medida para as unhas.
          </p>
          <div className="fundacao__acoes">
            <Botao href={criarLinkWhatsApp("Olá, Estúdio Nove. Quero consultar a agenda.")}>
              Consultar agenda <IconeSeta />
            </Botao>
            <Botao href={criarLinkTelefone()} variante="contorno">
              <IconeTelefone /> {contato.telefoneExibicao}
            </Botao>
          </div>
        </div>

        <Cartao className="fundacao__painel">
          <div className="fundacao__painel-topo">
            <Rotulo>Leitura do sistema</Rotulo>
            <span className="fundacao__codigo">BASE / 04</span>
          </div>
          <Divisor />
          <div className="fundacao__placa" aria-label="Amostra dos materiais visuais">
            <div className="fundacao__celula fundacao__fosco">
              <span className="fundacao__placa-rotulo">Fosco</span>
              <span aria-hidden="true" className="fundacao__fosco-amostra" />
            </div>
            <div className="fundacao__celula fundacao__linha">
              <span className="fundacao__placa-rotulo">Linha 01</span>
              <span aria-hidden="true" className="fundacao__linha-amostra" />
            </div>
            <div className="fundacao__celula fundacao__medida">
              <span className="fundacao__placa-rotulo">Medida</span>
              <span aria-hidden="true" className="fundacao__medida-amostra">24 / 32</span>
            </div>
            <div className="fundacao__celula fundacao__acento">
              <span className="fundacao__placa-rotulo">Acento</span>
              <span aria-hidden="true" className="fundacao__amostra" />
            </div>
          </div>
        </Cartao>
      </div>

        <Divisor />
        <div className="fundacao__dados">
        <div className="fundacao__dado">
          <Rotulo>Tipografia</Rotulo>
          <strong>3 famílias / papéis fixos</strong>
        </div>
        <div className="fundacao__dado">
          <Rotulo>Ritmo</Rotulo>
          <strong>Base de 4 pixels</strong>
        </div>
        <div className="fundacao__dado">
          <Rotulo>Temas</Rotulo>
          <strong>4 sistemas cromáticos</strong>
        </div>
        </div>
      </main>
    </>
  );
}
