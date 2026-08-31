export type Depoimento = Readonly<{
  nome: string;
  procedimento: string;
  mes: string;
  texto: string;
}>;

export const depoimentos = [
  {
    nome: "Camila R.",
    procedimento: "Limpeza profunda",
    mes: "MAI/2026",
    texto: "A extração foi cuidadosa e saí com a rotina pós-atendimento escrita, sem dúvida sobre os próximos dois dias.",
  },
  {
    nome: "Renata L.",
    procedimento: "Fibra de vidro",
    mes: "ABR/2026",
    texto: "A curvatura ficou fina e natural. Voltei com 22 dias e nenhuma unha tinha descolado.",
  },
  {
    nome: "Joana M.",
    procedimento: "Drenagem",
    mes: "MAR/2026",
    texto: "A avaliação foi objetiva e a pressão das manobras foi ajustada durante toda a sessão.",
  },
  {
    nome: "Bruna S.",
    procedimento: "Nail art autoral",
    mes: "FEV/2026",
    texto: "Levei duas referências e recebi um desenho novo, pensado para o formato curto das minhas unhas.",
  },
  {
    nome: "Alice P.",
    procedimento: "Design com henna",
    mes: "JAN/2026",
    texto: "O mapeamento respeitou a assimetria natural e a cor ficou suave, sem bloco marcado.",
  },
] as const satisfies readonly Depoimento[];
