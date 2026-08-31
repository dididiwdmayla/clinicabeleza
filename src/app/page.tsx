import { AlternadorTema } from "@/components/clientes/AlternadorTema";
import { Botao } from "@/components/ui/Botao";
import { Cartao } from "@/components/ui/Cartao";
import { Divisor } from "@/components/ui/Divisor";
import { IconeSeta, IconeTelefone } from "@/components/ui/Icone";
import { Rotulo } from "@/components/ui/Rotulo";
import { contato } from "@/content/contato";
import { criarLinkTelefone, criarLinkWhatsApp } from "@/lib/wa";

export default function Home() {
  return (
    <main className="fundacao">
      <AlternadorTema />
      <div className="fundacao__cabecalho">
        <Rotulo>{contato.marca} / Fundação 01—08</Rotulo>
        <span className="fundacao__local">{contato.cidade} · atendimento com hora marcada</span>
      </div>

      <div className="fundacao__grade">
        <div className="fundacao__intro">
          <Rotulo>Pele + unhas / higiene + acabamento</Rotulo>
          <h1 className="fundacao__titulo">Precisão na pele. Proporções e sequência nas unhas.</h1>
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
            <div>Fosco</div>
            <div>Linha 01</div>
            <div>Medida</div>
            <div className="fundacao__acento"><span className="fundacao__amostra" /></div>
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
  );
}
