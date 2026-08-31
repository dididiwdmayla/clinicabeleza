export type PerguntaFrequente = Readonly<{
  pergunta: string;
  resposta: string;
}>;

export const faq = [
  {
    pergunta: "Preciso fazer avaliação antes de agendar?",
    resposta: "A avaliação acontece no início do primeiro horário e leva cerca de 10 minutos. Casos específicos podem ser avaliados por foto antes do agendamento.",
  },
  {
    pergunta: "A limpeza profunda deixa marcas?",
    resposta: "Pode haver vermelhidão leve por algumas horas. Extrações são feitas apenas onde há indicação, sem insistir em lesões inflamadas.",
  },
  {
    pergunta: "Quanto dura a esmaltação em gel?",
    resposta: "Em média, 14 a 18 dias. A durabilidade varia com crescimento, rotina manual e contato frequente com produtos químicos.",
  },
  {
    pergunta: "Fibra de vidro enfraquece a unha?",
    resposta: "A aplicação correta não afina a lâmina. O maior risco está na remoção por arrancamento; por isso, manutenção e retirada são feitas no estúdio.",
  },
  {
    pergunta: "Posso fazer drenagem no pós-operatório?",
    resposta: "Somente com liberação escrita do cirurgião e após avaliação. O protocolo e a intensidade seguem a fase da recuperação.",
  },
  {
    pergunta: "Como funciona o cancelamento?",
    resposta: "Remarcações sem custo podem ser feitas com 12 horas de antecedência. Ausências ou cancelamentos tardios exigem novo sinal.",
  },
  {
    pergunta: "Os materiais de unha são esterilizados?",
    resposta: "Instrumentais metálicos passam por limpeza, embalagem individual e autoclave. Lixas e palitos são descartáveis e de uso único.",
  },
] as const satisfies readonly PerguntaFrequente[];

