# Relatório de verificação — ESTÚDIO NOVE

Gerado em 2026-09-02T09:03:45.668Z. Valores obtidos pelo Chromium em /tmp/chromium; nenhuma métrica abaixo é estimada.

## Movimento e estabilidade

| cenário | CPU | FPS médio | FPS p5 | CLS |
| --- | ---: | ---: | ---: | ---: |
| mobile 390×844 | 4× | 60.00 | 59.88 | 0.0000 |
| desktop 1440×900 | 1× | 60.00 | 59.88 | 0.0000 |

## Temas, imagens e contraste

| tema | viewport | scroll/client | imagens | pior contraste | falhas AA |
| --- | --- | ---: | ---: | ---: | ---: |
| noite | mobile | 390/390 | 14 | 4.67 | 0 |
| noite | desktop | 1440/1440 | 14 | 4.67 | 0 |
| dia | mobile | 390/390 | 14 | 4.70 | 0 |
| dia | desktop | 1440/1440 | 14 | 4.70 | 0 |
| oxido | mobile | 390/390 | 14 | 4.73 | 0 |
| oxido | desktop | 1440/1440 | 14 | 4.73 | 0 |
| mineral | mobile | 390/390 | 14 | 4.95 | 0 |
| mineral | desktop | 1440/1440 | 14 | 4.95 | 0 |

## Larguras

| largura | scroll/client | slots nulos | tabela scroll/client |
| ---: | ---: | ---: | ---: |
| 320 | 320/320 | 0 | 280/280 |
| 360 | 360/360 | 0 | 320/320 |
| 390 | 390/390 | 0 | 350/350 |
| 540 | 540/540 | 0 | 497/497 |
| 768 | 768/768 | 0 | 707/707 |
| 1024 | 1024/1024 | 0 | 942/942 |
| 1280 | 1280/1280 | 0 | 1184/1184 |
| 1440 | 1440/1440 | 0 | 1280/1280 |
| 1920 | 1920/1920 | 0 | 1280/1280 |

## Contratos

- IDs verificados: topo, hero, credenciais, servicos, unhas, protocolo, galeria, equipe, depoimentos, precos, faq, localizacao, contato, rodape.
- Cada ID coincide com data-secao; não há seção aninhada.
- FAQ: 7 pares details/summary.
- Falhas automatizadas: nenhuma.

## Inspeção visual

Todas as 45 capturas finais abaixo foram abertas após a última execução. A inspeção humana complementa, mas não substitui, os números de `dados.json`.

### Full-page por tema

| captura | observação visual |
| --- | --- |
| noite / mobile | Fluxo longo, porém segmentado; acento âmbar orienta credenciais, contatos e marcador sem apagar a hierarquia. Nenhum corte ou sobreposição. |
| noite / desktop | Alternância de superfícies escuras distingue catálogo, matéria, pessoas, registros, tabela e conversão. Headline e painel têm peso equivalente. |
| dia / mobile | Texto, filetes e imagens permanecem legíveis; as seções não se confundem apesar do fundo claro contínuo. |
| dia / desktop | Maior contraste espacial dos quatro temas; órfãos de serviços e galeria ficam à esquerda, e as linhas de leitura não se alongam em excesso. |
| oxido / mobile | A paleta quente mantém contraste e separação; o bloco de contato se destaca sem parecer um card concorrente. |
| oxido / desktop | Marca-irmã mais densa e editorial; estrutura, alinhamentos e escala permanecem idênticos aos demais temas. |
| mineral / mobile | Acento frio identifica controles e conversão; nenhum texto se perde sobre as superfícies verde-escuras. |
| mineral / desktop | A grade visual permanece sóbria e técnica; não há distorção dos assets nem mudança de ritmo entre skins. |

### Seções — mobile e desktop

| seção | mobile 390×844 | desktop 1440×900 |
| --- | --- | --- |
| topo | Marca e CTA cabem numa linha, sem colisão. | Marca, três âncoras, quatro temas e CTA formam uma barra única e contida. |
| hero | Headline sem colisão em `ã`, `õ` ou `ê`; CTAs e provas empilham antes do painel. | Texto e kit pautado ocupam alturas equivalentes; objetos têm detalhe legível e o alternador não compete com o painel. |
| credenciais | Faixa vira quatro registros verticais com filetes, não cards soltos. | Faixa horizontal fina e contínua, com rótulos mono uniformes. |
| servicos | Uma coluna legível em 390, CTAs no rodapé de cada card. | Grade 3+2; segunda linha começa sob PR 01, alturas e CTAs coincidem dentro de cada linha. |
| unhas | Coluna de matéria seguida do índice técnico; gel e fibra ocupam toda a largura útil. | Dois assets grandes lado a lado e quatro protocolos em linhas, estrutura distinta do catálogo. |
| protocolo | Kit 16:9 antecede a sequência numerada e preserva a progressão 01–04. | Imagem à esquerda e etapas à direita; avaliação → execução → orientação → retorno é lida de cima para baixo. |
| galeria | Oito imagens em coluna, todas com proporção resolvida e legenda mono. | Composição 3/3/2, com os dois últimos slots largos alinhados à esquerda; nenhum recorte ou slot vazio. |
| equipe | Dois perfis completos empilhados, retratos 4:5 sem distorção. | Alternância retrato/texto e texto/retrato cria pausa editorial. Os retratos ainda são placeholders gráficos locais. |
| depoimentos | Cinco registros lineares, sem estrelas nem aspas decorativas. | Introdução fixa à esquerda e cinco linhas de retorno à direita; mês, procedimento e relato têm níveis distintos. |
| precos | Cada linha da tabela se reorganiza sem rolagem horizontal; valor permanece à direita. | Tabela semântica em largura integral, valores tabulares alinhados e nota de avaliação visível. |
| faq | Sete alvos amplos; itens 01 e 04 abertos mostram resposta sem quebra. | Lista de `details/summary` à direita da introdução, com ordem e estados inequívocos. |
| localizacao | Diagrama, endereço, referência, estacionamento, horários e CTA seguem uma coluna. | Mapa abstrato à esquerda e dados operacionais à direita; não há iframe. |
| contato | Faixa de conversão compacta com WhatsApp, telefone e prazo de resposta. | Headline e ações dividem a faixa horizontal; CTA domina sem competir com outro card. |
| rodape | Navegação, social e aviso legal empilham com divisores claros. | Três colunas e linha legal final; encerramento visual é distinto da conversão. |

### Transições de largura

| largura | observação visual e de grade |
| ---: | --- |
| 320 | Cabeçalho, CTA e alternador cabem; o alternador fica ancorado abaixo do topo, sem cobrir o headline. Serviços em uma coluna. |
| 360 | Medida do hero permanece curta e a prova rápida cabe sem overflow. Serviços em uma coluna. |
| 390 | Alternador separado do painel e CTAs empilhados; nenhum diacrítico colide. Serviços em uma coluna. |
| 540 | Alternador no canto superior direito; CTAs lado a lado; serviços em 2+2+1, órfão à esquerda e alturas/CTAs iguais por linha. |
| 768 | Navegação completa no topo, painel reduzido ao lado do texto e chip de tema no canto inferior; serviços em 2+2+1 alinhados à esquerda. |
| 1024 | Hero passa à proporção ampla com painel dominante; serviços em 3+2, segunda linha à esquerda. |
| 1280 | Conteúdo respira sem aumentar a medida do texto; kit e headline equilibrados. Serviços em 3+2. |
| 1440 | Contêiner de 1280 px centra a composição; painel lê detalhes sem sobrar vazio. Serviços em 3+2. |
| 1920 | Contêiner conserva escala e medida, evitando linhas longas; margens externas crescem sem deslocar órfãos. Serviços em 3+2. |

### Conclusão da inspeção

- Overflow horizontal medido: `0 px` nas nove larguras; tolerância contratada: `≤ 1 px`.
- Slots com dimensão nula: `0` em todas as larguras; 14 imagens locais verificadas por viewport de tema.
- Cards de serviços: alinhamento à esquerda, altura e base de CTA confirmados linha a linha pelo script.
- Contraste: zero falha AA nos quatro temas; pior razão observada `4.67:1`.
- Único desvio visual remanescente: os dois retratos 4:5 da equipe são placeholders gráficos locais, identificados no item 10 ainda aberto do PLAN; formação, especialidade e estrutura final já estão prontas.
