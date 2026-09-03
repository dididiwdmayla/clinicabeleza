import type { CSSProperties } from "react";
import { contato } from "@/content/contato";

const navegacao = [
  { href: "#servicos", rotulo: "Pele & corpo" },
  { href: "#unhas", rotulo: "Unhas" },
  { href: "#equipe", rotulo: "Equipe" },
  { href: "#precos", rotulo: "Preços" },
  { href: "#faq", rotulo: "Dúvidas" },
  { href: "#localizacao", rotulo: "Como chegar" },
] as const;

export function Rodape() {
  return (
    <footer aria-labelledby="rodape-titulo" className="rodape" data-secao="rodape" id="rodape">
      <div className="rodape__grade conteiner">
        <div className="rodape__marca" data-revelar style={{ "--i": 0 } as CSSProperties}>
          <h2 id="rodape-titulo">{contato.marca}</h2>
          <p>{contato.assinatura} / {contato.cidade}</p>
        </div>

        <nav aria-label="Navegação secundária" data-revelar style={{ "--i": 1 } as CSSProperties}>
          <span>NAVEGAÇÃO</span>
          {navegacao.map((item) => <a href={item.href} key={item.href}>{item.rotulo}</a>)}
        </nav>

        <div className="rodape__social" data-revelar style={{ "--i": 2 } as CSSProperties}>
          <span>SOCIAL</span>
          <a href={contato.sociais.instagram.url} rel="noreferrer" target="_blank">Instagram / {contato.sociais.instagram.handle}</a>
          <a href={contato.sociais.tiktok.url} rel="noreferrer" target="_blank">TikTok / {contato.sociais.tiktok.handle}</a>
        </div>
      </div>

      <div className="rodape__base conteiner" data-revelar style={{ "--i": 3 } as CSSProperties}>
        <p>{contato.avisoLegal}</p>
        <p>{contato.credito}</p>
      </div>
    </footer>
  );
}
