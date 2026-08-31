export type Credencial = Readonly<{
  codigo: string;
  titulo: string;
  texto: string;
}>;

export const credenciais = [
  {
    codigo: "01 / FICHA",
    titulo: "Avaliação antes do procedimento",
    texto: "Histórico breve, condição atual e contraindicações conferidos antes do preparo.",
  },
  {
    codigo: "02 / ABERTURA",
    titulo: "Descartáveis abertos à vista",
    texto: "Lixas, palitos, fibras e consumíveis de uso individual entram novos na bancada.",
  },
  {
    codigo: "03 / CICLO",
    titulo: "Instrumental esterilizado",
    texto: "Peças metálicas permanecem embaladas até o início do atendimento reservado.",
  },
  {
    codigo: "04 / PÓS",
    titulo: "Orientação entregue por escrito",
    texto: "Cuidados, intervalo de retorno e sinais de atenção ficam registrados para consulta.",
  },
] as const satisfies readonly Credencial[];

export type EtapaProtocolo = Readonly<{
  codigo: string;
  titulo: string;
  texto: string;
}>;

export const etapasProtocolo = [
  {
    codigo: "01",
    titulo: "Leitura e registro",
    texto: "Pele, unha ou área corporal são observadas antes de definir produto, pressão e tempo.",
  },
  {
    codigo: "02",
    titulo: "Higienização e preparo",
    texto: "A bancada é montada para o procedimento e a superfície recebe preparo compatível.",
  },
  {
    codigo: "03",
    titulo: "Execução calibrada",
    texto: "Camadas, manobras ou remoções seguem sequência e duração explicadas durante a sessão.",
  },
  {
    codigo: "04",
    titulo: "Conferência e cuidado posterior",
    texto: "O resultado é revisado, fotografado quando autorizado e acompanhado de orientação de pós.",
  },
] as const satisfies readonly EtapaProtocolo[];

export type ItemGaleria = Readonly<{
  alt: string;
  codigo: string;
  legenda: string;
  nome: string;
  src: string;
}>;

export const itensGaleria = [
  {
    alt: "Pinça de aço de ponta fina isolada sobre fundo transparente.",
    codigo: "IN 03 / AÇO",
    legenda: "Apreensão precisa",
    nome: "Pinça técnica",
    src: "/img/assets/c-pinca-aco.webp",
  },
  {
    alt: "Frasco âmbar com conta-gotas e sombra curta.",
    codigo: "AT 04 / VIDRO",
    legenda: "Ativo protegido da luz",
    nome: "Frasco âmbar",
    src: "/img/assets/d-frasco-ambar.webp",
  },
  {
    alt: "Cabine branca de LED para cura de gel.",
    codigo: "EQ 05 / LED",
    legenda: "Cura em tempo controlado",
    nome: "Cabine LED",
    src: "/img/assets/e-cabine-led.webp",
  },
  {
    alt: "Pincel fino de nail art com cabo escuro.",
    codigo: "IN 06 / TRAÇO",
    legenda: "Linha e composição manual",
    nome: "Pincel de nail art",
    src: "/img/assets/f-pincel-nail-art.webp",
  },
  {
    alt: "Espátula metálica de extração com duas pontas.",
    codigo: "IN 07 / EXTRAÇÃO",
    legenda: "Pressão localizada",
    nome: "Espátula técnica",
    src: "/img/assets/g-espatula-extracao.webp",
  },
  {
    alt: "Aquecedor branco aberto com cera âmbar sólida.",
    codigo: "EQ 10 / 000",
    legenda: "Cera antes do aquecimento",
    nome: "Cera em repouso",
    src: "/img/assets/j-cera-000.webp",
  },
] as const satisfies readonly ItemGaleria[];
