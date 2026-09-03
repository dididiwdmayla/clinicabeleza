export type Horario = Readonly<{
  dias: string;
  periodo: string;
}>;

export const contato = {
  marca: "ESTÚDIO NOVE",
  assinatura: "Estética & Nail Design",
  cidade: "Maringá/PR",
  telefoneExibicao: "(44) 98888-0909",
  telefoneInternacional: "+5544988880909",
  whatsapp: "5544988880909",
  endereco: "Rua das Acácias, 909 — Zona 02, Maringá/PR — CEP 87010-120",
  referencia: "A meia quadra da Praça das Rosas, entrada pelo recuo lateral.",
  estacionamento: "Duas vagas sinalizadas em frente ao estúdio.",
  mapaUrl: "https://maps.google.com/?q=Rua+das+Acacias+909+Maringa+PR",
  horarioResposta: "Mensagens respondidas em até 2 horas dentro do horário de atendimento.",
  avisoLegal: "Projeto demonstrativo. Marca, profissionais, registros, endereço e contatos são fictícios.",
  credito: "Direção e desenvolvimento / projeto editorial independente",
  horarios: [
    { dias: "SEG–SEX", periodo: "09:00–19:00" },
    { dias: "SÁB", periodo: "09:00–15:00" },
    { dias: "DOM", periodo: "FECHADO" },
  ] satisfies readonly Horario[],
  sociais: {
    instagram: {
      handle: "@estudionove.mga",
      url: "https://instagram.com/estudionove.mga",
    },
    tiktok: {
      handle: "@estudionove.mga",
      url: "https://tiktok.com/@estudionove.mga",
    },
  },
} as const;
