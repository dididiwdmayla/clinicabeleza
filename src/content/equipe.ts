export type Profissional = Readonly<{
  alt: string;
  nome: string;
  funcao: string;
  formacao: string;
  imagem: string;
  especialidades: readonly string[];
  registro?: string;
}>;

export const equipe = [
  {
    alt: "Retrato editorial ilustrado de Lívia Nascimento em enquadramento vertical.",
    nome: "Lívia Nascimento",
    funcao: "Esteticista responsável",
    formacao: "Tecnóloga em Estética e Cosmética, com formação em drenagem manual",
    imagem: "/img/equipe/profissional-01.webp",
    especialidades: ["limpeza de pele", "drenagem", "massagem"],
    registro: "CNPB 09.184-PR (fictício)",
  },
  {
    alt: "Retrato editorial ilustrado de Marina Kato em enquadramento vertical.",
    nome: "Marina Kato",
    funcao: "Nail designer",
    formacao: "Formação técnica em estrutura de fibra e biossegurança para manicure",
    imagem: "/img/equipe/profissional-02.webp",
    especialidades: ["fibra de vidro", "blindagem", "nail art"],
  },
] as const satisfies readonly Profissional[];
