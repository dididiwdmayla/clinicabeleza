import { AlternadorTema } from "@/components/clientes/AlternadorTema";
import { Botao } from "@/components/ui/Botao";
import { IconeSeta } from "@/components/ui/Icone";
import { contato } from "@/content/contato";
import { criarLinkWhatsApp } from "@/lib/wa";

export function Topo() {
  return (
    <section aria-label="Navegação principal" className="topo" data-secao="topo" id="topo">
      <header className="topo__barra conteiner">
        <a className="topo__marca" data-revelar href="#hero" style={{ "--i": 0 } as React.CSSProperties}>
          <strong>{contato.marca}</strong>
          <span>{contato.assinatura}</span>
        </a>

        <nav aria-label="Seções publicadas" className="topo__nav" data-revelar style={{ "--i": 1 } as React.CSSProperties}>
          <a href="#hero">Estúdio</a>
          <a href="#servicos">Pele &amp; corpo</a>
          <a href="#unhas">Unhas</a>
        </nav>

        <AlternadorTema />

        <Botao
          aria-label="Abrir o WhatsApp para consultar a agenda"
          className="topo__cta"
          data-revelar
          href={criarLinkWhatsApp("Olá, Estúdio Nove. Quero consultar a agenda.")}
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <span className="topo__cta-longo">Consultar agenda</span>
          <span aria-hidden="true" className="topo__cta-curto">Agenda</span>
          <IconeSeta />
        </Botao>
      </header>
    </section>
  );
}
