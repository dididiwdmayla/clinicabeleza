import { Revelacao } from "@/components/clientes/Revelacao";
import { Credenciais } from "@/components/secoes/Credenciais";
import { Contato } from "@/components/secoes/Contato";
import { Depoimentos } from "@/components/secoes/Depoimentos";
import { Equipe } from "@/components/secoes/Equipe";
import { FAQ } from "@/components/secoes/FAQ";
import { Galeria } from "@/components/secoes/Galeria";
import { Hero } from "@/components/secoes/Hero";
import { Localizacao } from "@/components/secoes/Localizacao";
import { Protocolo } from "@/components/secoes/Protocolo";
import { Precos } from "@/components/secoes/Precos";
import { Rodape } from "@/components/secoes/Rodape";
import { Servicos } from "@/components/secoes/Servicos";
import { Topo } from "@/components/secoes/Topo";
import { Unhas } from "@/components/secoes/Unhas";

export default function Home() {
  return (
    <>
      <a className="pular-conteudo" href="#hero">Pular para o conteúdo</a>
      <Revelacao />
      <Topo />
      <main>
        <Hero />
        <Credenciais />
        <Servicos />
        <Unhas />
        <Protocolo />
        <Galeria />
        <Equipe />
        <Depoimentos />
        <Precos />
        <FAQ />
        <Localizacao />
        <Contato />
      </main>
      <Rodape />
    </>
  );
}
