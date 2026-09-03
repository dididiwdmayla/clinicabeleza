import type { CSSProperties } from "react";
import { Botao } from "@/components/ui/Botao";
import { IconeSeta, IconeTelefone } from "@/components/ui/Icone";
import { Rotulo } from "@/components/ui/Rotulo";
import { contato } from "@/content/contato";
import { criarLinkTelefone, criarLinkWhatsApp } from "@/lib/wa";

export function Contato() {
  const mensagem = "Olá, Estúdio Nove. Quero consultar horários e entender qual procedimento é indicado para mim.";

  return (
    <section aria-labelledby="contato-titulo" className="contato" data-secao="contato" id="contato">
      <div className="contato__grade conteiner">
        <div data-revelar style={{ "--i": 0 } as CSSProperties}>
          <Rotulo>Agenda 10 / Conversa direta</Rotulo>
          <h2 id="contato-titulo">Conte o que você precisa antes de escolher o horário.</h2>
        </div>

        <div className="contato__acoes" data-revelar style={{ "--i": 1 } as CSSProperties}>
          <Botao
            aria-label="Abrir o WhatsApp do Estúdio Nove com uma mensagem sobre avaliação e horários"
            className="contato__whatsapp"
            href={criarLinkWhatsApp(mensagem)}
            variante="contorno"
          >
            Conversar pelo WhatsApp <IconeSeta />
          </Botao>
          <a className="contato__telefone" href={criarLinkTelefone()}>
            <IconeTelefone /> <span><small>TELEFONE</small>{contato.telefoneExibicao}</span>
          </a>
          <p><span>RESPOSTA</span>{contato.horarioResposta}</p>
        </div>
      </div>
    </section>
  );
}
