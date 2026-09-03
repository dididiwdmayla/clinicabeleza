import { Revelacao } from "@/components/clientes/Revelacao";
import { Credenciais } from "@/components/secoes/Credenciais";
import { Equipe } from "@/components/secoes/Equipe";
import { Galeria } from "@/components/secoes/Galeria";
import { Hero } from "@/components/secoes/Hero";
import { Protocolo } from "@/components/secoes/Protocolo";
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
      </main>
    </>
  );
}
