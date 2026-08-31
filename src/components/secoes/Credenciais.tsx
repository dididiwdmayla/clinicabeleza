import type { CSSProperties } from "react";
import { Rotulo } from "@/components/ui/Rotulo";
import { credenciais } from "@/content/processo";

export function Credenciais() {
  return (
    <section aria-labelledby="credenciais-titulo" className="credenciais" data-secao="credenciais" id="credenciais">
      <div className="credenciais__grade conteiner">
        <header data-revelar style={{ "--i": 0 } as CSSProperties}>
          <Rotulo>Controle 01 / Rotina</Rotulo>
          <h2 id="credenciais-titulo">Antes de tocar, conferir.</h2>
        </header>

        <ol>
          {credenciais.map((credencial, indice) => (
            <li data-revelar key={credencial.codigo} style={{ "--i": indice } as CSSProperties}>
              <span>{credencial.codigo}</span>
              <strong>{credencial.titulo}</strong>
              <p>{credencial.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
