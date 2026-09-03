import type { CSSProperties } from "react";
import { Rotulo } from "@/components/ui/Rotulo";
import { faq } from "@/content/faq";

export function FAQ() {
  return (
    <section aria-labelledby="faq-titulo" className="faq ritmo-secao" data-secao="faq" id="faq">
      <div className="faq__grade conteiner">
        <header>
          <div data-revelar style={{ "--i": 0 } as CSSProperties}>
            <Rotulo>Dúvidas 08 / Antes de reservar</Rotulo>
            <h2 id="faq-titulo">Perguntas que mudam a decisão.</h2>
          </div>
          <p data-revelar style={{ "--i": 1 } as CSSProperties}>
            Respostas diretas sobre avaliação, durabilidade, esterilização e remarcação.
          </p>
        </header>

        <div className="faq__lista">
          {faq.map((item, indice) => (
            <details data-revelar key={item.pergunta} style={{ "--i": indice } as CSSProperties}>
              <summary>
                <span>{String(indice + 1).padStart(2, "0")}</span>
                <strong>{item.pergunta}</strong>
              </summary>
              <p>{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
