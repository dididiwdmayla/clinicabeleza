export type FamiliaServico = "pele-corpo" | "unhas";

export type Servico = Readonly<{
  slug: string;
  familia: FamiliaServico;
  nome: string;
  duracaoMin: number;
  precoMin: number;
  precoMax: number;
  inclui: readonly string[];
  indicadoPara: string;
  contraindicacao: string;
  posProcedimento: string;
}>;

export const servicos = [
  {
    slug: "limpeza-pele-profunda",
    familia: "pele-corpo",
    nome: "Limpeza de pele profunda",
    duracaoMin: 90,
    precoMin: 190,
    precoMax: 230,
    inclui: ["anamnese", "extração manual", "máscara calmante", "fotoproteção"],
    indicadoPara: "Poros obstruídos, comedões e textura irregular.",
    contraindicacao: "Adiar em caso de herpes ativa, ferida aberta ou dermatite em crise.",
    posProcedimento: "Evitar ácidos por 48 h e reaplicar FPS 50 ao longo do dia.",
  },
  {
    slug: "sobrancelha-henna",
    familia: "pele-corpo",
    nome: "Design de sobrancelha com henna",
    duracaoMin: 45,
    precoMin: 65,
    precoMax: 80,
    inclui: ["mapeamento facial", "remoção com pinça", "aplicação personalizada"],
    indicadoPara: "Correção visual de pequenas falhas e desenho mais definido.",
    contraindicacao: "Não realizar sobre pele lesionada ou com reação recente a pigmentos.",
    posProcedimento: "Manter a região seca nas primeiras 12 h e não esfregar.",
  },
  {
    slug: "depilacao-cera-quente",
    familia: "pele-corpo",
    nome: "Depilação com cera quente",
    duracaoMin: 40,
    precoMin: 45,
    precoMax: 140,
    inclui: ["higienização", "cera descartável", "gel calmante"],
    indicadoPara: "Remoção pela raiz em áreas faciais ou corporais.",
    contraindicacao: "Adiar sobre pele sensibilizada por sol, ácidos ou procedimentos recentes.",
    posProcedimento: "Evitar calor, atrito e exposição solar por 24 h.",
  },
  {
    slug: "massagem-relaxante",
    familia: "pele-corpo",
    nome: "Massagem relaxante",
    duracaoMin: 60,
    precoMin: 150,
    precoMax: 180,
    inclui: ["avaliação breve", "manobras de relaxamento", "óleo neutro"],
    indicadoPara: "Tensão muscular leve e pausa de recuperação física.",
    contraindicacao: "Não indicada durante febre, trombose ou inflamação aguda.",
    posProcedimento: "Hidratar-se e evitar treino intenso nas duas horas seguintes.",
  },
  {
    slug: "drenagem-linfatica",
    familia: "pele-corpo",
    nome: "Drenagem linfática manual",
    duracaoMin: 60,
    precoMin: 160,
    precoMax: 200,
    inclui: ["avaliação", "manobras linfáticas manuais", "orientação de rotina"],
    indicadoPara: "Sensação de inchaço e retenção leve, mediante avaliação.",
    contraindicacao: "Contraindicada em infecção ativa, trombose ou insuficiência cardíaca descompensada.",
    posProcedimento: "Beber água e observar a resposta do corpo nas 24 h seguintes.",
  },
  {
    slug: "fibra-vidro",
    familia: "unhas",
    nome: "Alongamento em fibra de vidro",
    duracaoMin: 180,
    precoMin: 260,
    precoMax: 320,
    inclui: ["preparo técnico", "estrutura em fibra", "esmaltação em gel"],
    indicadoPara: "Alongamento leve com curvatura construída sob medida.",
    contraindicacao: "Não aplicar sobre micose, inflamação ou lâmina ungueal lesionada.",
    posProcedimento: "Fazer manutenção entre 18 e 25 dias; não usar a unha como ferramenta.",
  },
  {
    slug: "esmaltacao-gel",
    familia: "unhas",
    nome: "Esmaltação em gel",
    duracaoMin: 75,
    precoMin: 95,
    precoMax: 120,
    inclui: ["preparo de cutícula", "base em gel", "cor e finalização"],
    indicadoPara: "Cor uniforme e brilho estável por até 18 dias.",
    contraindicacao: "Adiar em caso de alergia conhecida a acrilatos ou lesão ao redor da unha.",
    posProcedimento: "Remover somente no estúdio; não puxar o produto.",
  },
  {
    slug: "blindagem",
    familia: "unhas",
    nome: "Blindagem",
    duracaoMin: 90,
    precoMin: 120,
    precoMax: 150,
    inclui: ["nivelamento", "camada estrutural", "acabamento transparente ou nude"],
    indicadoPara: "Unhas naturais finas que precisam de proteção mecânica leve.",
    contraindicacao: "Não aplicar sobre descolamento, micose ou trauma recente.",
    posProcedimento: "Retornar em 18 a 21 dias para manutenção ou remoção segura.",
  },
  {
    slug: "nail-art-autoral",
    familia: "unhas",
    nome: "Nail art autoral",
    duracaoMin: 120,
    precoMin: 140,
    precoMax: 220,
    inclui: ["briefing visual", "composição original", "selagem em gel"],
    indicadoPara: "Desenhos únicos desenvolvidos para formato e comprimento das unhas.",
    contraindicacao: "Depende de base ungueal saudável e compatibilidade com gel.",
    posProcedimento: "Usar luvas com produtos de limpeza e hidratar cutículas diariamente.",
  },
] as const satisfies readonly Servico[];

export const servicosPeleCorpo = servicos.filter((servico) => servico.familia === "pele-corpo");
export const servicosUnhas = servicos.filter((servico) => servico.familia === "unhas");

