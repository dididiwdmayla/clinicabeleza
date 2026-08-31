import { Revelacao } from "@/components/clientes/Revelacao";
import { Hero } from "@/components/secoes/Hero";
import { Servicos } from "@/components/secoes/Servicos";
import { Topo } from "@/components/secoes/Topo";

export default function Home() {
  return (
    <>
      <a className="pular-conteudo" href="#hero">Pular para o conteúdo</a>
      <Revelacao />
      <Topo />
      <main>
        <Hero />
        <Servicos />
      </main>
    </>
  );
}
