export type FaixaInvestimento = Readonly<{
  procedimento: string;
  valor: string;
  nota?: string;
}>;

export const precos = [
  { procedimento: "Limpeza profunda", valor: "R$ 190–230" },
  { procedimento: "Design com henna", valor: "R$ 65–80" },
  { procedimento: "Depilação com cera", valor: "R$ 45–140", nota: "conforme área" },
  { procedimento: "Massagem relaxante", valor: "R$ 150–180" },
  { procedimento: "Drenagem linfática", valor: "R$ 160–200" },
  { procedimento: "Fibra de vidro", valor: "R$ 260–320", nota: "primeira aplicação" },
  { procedimento: "Esmaltação em gel", valor: "R$ 95–120" },
  { procedimento: "Blindagem", valor: "R$ 120–150" },
  { procedimento: "Nail art autoral", valor: "R$ 140–220", nota: "conforme complexidade" },
] as const satisfies readonly FaixaInvestimento[];

export const notaAvaliacao =
  "O valor final é confirmado após avaliação breve de pele, área corporal ou condição das unhas.";

