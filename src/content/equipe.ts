export type Profissional = Readonly<{
  nome: string;
  funcao: string;
  formacao: string;
  especialidades: readonly string[];
  registro?: string;
}>;

export const equipe = [
  {
    nome: "Lívia Nascimento",
    funcao: "Esteticista responsável",
    formacao: "Tecnóloga em Estética e Cosmética, com formação em drenagem manual",
    especialidades: ["limpeza de pele", "drenagem", "massagem"],
    registro: "CNPB 09.184-PR (fictício)",
  },
  {
    nome: "Marina Kato",
    funcao: "Nail designer",
    formacao: "Formação técnica em estrutura de fibra e biossegurança para manicure",
    especialidades: ["fibra de vidro", "blindagem", "nail art"],
  },
] as const satisfies readonly Profissional[];

