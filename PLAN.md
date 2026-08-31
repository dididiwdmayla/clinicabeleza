# Plano de execução — ESTÚDIO NOVE

## Ambiente

- Playwright deve sempre iniciar com `executablePath: '/tmp/chromium'` e `args: ['--no-sandbox']`; o script de verificação não pode baixar navegador.
- É proibido executar `playwright install`: `cdn.playwright.dev` está fora do allowlist deste ambiente.
- Se `/tmp/chromium` desaparecer entre sessões, reinstalar/extrair o binário com `npm i @sparticuz/chromium`; não tentar `apt-get`, pois o container recusa `setgroups`.
- Os WOFF2 variáveis validados estão em `/tmp/item0-fonts/`; na implementação, copiá-los para `public/fontes/`, versioná-los no Git e carregá-los exclusivamente com `next/font/local`.
- É proibido usar `next/font/google`, `fonts.googleapis.com`, `fonts.gstatic.com` ou qualquer CDN de fontes em runtime/build.

### Fontes locais contratadas

| Arquivo validado | Destino no projeto | Origem do arquivo | Licença | Cobertura validada |
| --- | --- | --- | --- | --- |
| `/tmp/item0-fonts/BricolageGrotesque-Variable.woff2` | `public/fontes/BricolageGrotesque-Variable.woff2` | Google Fonts/gstatic, família Bricolage Grotesque v9 | SIL Open Font License 1.1 | Latin + caracteres `ã õ ç é ê á í ú ô à ó` |
| `/tmp/item0-fonts/InstrumentSans-Variable.woff2` | `public/fontes/InstrumentSans-Variable.woff2` | Google Fonts/gstatic, família Instrument Sans v4 | SIL Open Font License 1.1 | Latin + caracteres `ã õ ç é ê á í ú ô à ó` |
| `/tmp/item0-fonts/IBMPlexMono-Variable.woff2` | `public/fontes/IBMPlexMono-Variable.woff2` | Repositório oficial IBM Plex, `packages/plex-mono-variable/fonts/complete/woff2/IBM Plex Mono Var-Roman.woff2` | SIL Open Font License 1.1 | Latin/Latin Extended + caracteres `ã õ ç é ê á í ú ô à ó` |

## Justificativa da direção visual

Grades, rótulos técnicos e superfícies limpas mostram que pele e unhas recebem higiene, medida e acabamento verificáveis — algo que rosa, dourado e mármore trocam por uma promessa vaga de luxo.

## Checklist de execução

1. [x] **Planejamento, método de trabalho e Git**
   - [x] Registrar este checklist numerado antes de qualquer implementação.
   - [x] Registrar a árvore de arquivos planejada.
   - [x] Registrar a justificativa visual em exatamente uma linha física.
   - [x] Adotar commits incrementais por item, com `git add -A`, verificação correspondente e mensagens `feat(secao): ...`, `chore(build): ...` ou `perf(hero): ...`.
   - [x] Configurar `origin` para `https://github.com/dididiwdmayla/clinicabeleza`; tentar push em cada marco e, se faltar credencial, continuar com commits locais e relatar imediatamente.

2. [x] **Stack e restrições estruturais**
   - [x] Criar Next.js com App Router, TypeScript `strict` e Tailwind CSS.
   - [x] Manter uma única página pública em `/`, pronta para publicação na Vercel.
   - [x] Não criar banco, autenticação, rota de API, Server Action nem formulário com envio ao servidor.
   - [x] Manter todo conteúdo estático e tipado em `src/content/`.
   - [x] Limitar contatos a links `wa.me` com mensagem pré-preenchida e `tel:`.
   - [x] Usar Server Components por padrão e isolar `"use client"` somente no tema, revelação e canvas.
   - [x] Não instalar Framer Motion, GSAP, Lottie ou bibliotecas equivalentes.
   - [x] Fazer `tsc --noEmit` e ESLint passarem sem erros.

3. [x] **Identidade e conteúdo fictício**
   - [x] Aplicar a marca “ESTÚDIO NOVE — Estética & Nail Design”, em Maringá/PR.
   - [x] Centralizar telefone/WhatsApp brasileiro fictício, endereço, horários e redes em `src/content/contato.ts`, sem hardcode nos componentes.
   - [x] Escrever conteúdo verossímil em pt-BR, curto e específico, com protocolos, duração, preço, contraindicações leves e pós-procedimento.
   - [x] Cobrir Pele & Corpo: limpeza profunda, sobrancelha com henna, cera quente, massagem relaxante e drenagem.
   - [x] Cobrir Unhas: fibra de vidro, esmaltação em gel, blindagem e nail art autoral.
   - [x] Excluir “transforme sua beleza”, “realce sua essência”, “cuidar de você é nossa missão” e variações.

4. [ ] **Arquitetura de arquivos e WhatsApp**
   - [x] Separar seções, UI, folhas clientes, conteúdo e utilitários conforme a árvore deste plano.
   - [x] Implementar `src/lib/wa.ts` com `encodeURIComponent` e um único número de origem.
   - [x] Gerar CTA individual em cada serviço com mensagem que cite exatamente o procedimento selecionado.

5. [x] **Direção visual “instrumento de precisão e matéria”**
   - [x] Traduzir a referência consultório suíço + fotografia japonesa de salão em superfícies foscas, muito ar e sinalização técnica.
   - [x] Reservar brilho ao acento e às imagens de unha/gel.
   - [x] Usar grão estático em tile com opacidade máxima de `0.05` e filetes estruturais de `1px`.
   - [x] Usar rótulos técnicos monoespaçados, em caixa-alta e com `letter-spacing: 0.08em`.
   - [x] Não usar rosa-claro, serifas Playfair/Cormorant, dourado, mármore, folhagem, lótus ou gradiente rosa-lilás.

6. [x] **Tipografia e escala fluida**
   - [x] Usar Bricolage Grotesque apenas em headline e títulos de seção, com tracking negativo, `line-height` entre `0.95` e `1.05` e `text-wrap: balance`.
   - [x] Usar Instrument Sans em texto e navegação, `line-height` entre `1.55` e `1.65`, `max-width: 62ch` e `text-wrap: pretty`.
   - [x] Usar IBM Plex Mono em rótulos, preços, durações, etapas e horários, sempre pequena e em caixa-alta.
   - [x] Definir tokens `--txt--1` a `--txt-7` com `clamp()`, razão 1.2 mobile/1.333 desktop e corpo de 16px.
   - [x] Proibir `font-size` em px cru nos componentes e aplicar números tabulares aos preços.

7. [x] **Fontes locais**
   - [x] Copiar os três arquivos validados de `/tmp/item0-fonts/` para `public/fontes/` e incluí-los no commit.
   - [x] Configurar `next/font/local` com `display: 'swap'` e fallbacks de métricas ajustadas.
   - [x] Usar `preload: true` somente em Bricolage e Instrument Sans; `preload: false` em IBM Plex Mono.
   - [x] Confirmar no build que não existe referência a Google Fonts ou CDN.

8. [x] **Quatro temas no mesmo código**
   - [x] Implementar `data-theme="noite | dia | oxido | mineral"` na raiz.
   - [x] Definir todos os tokens semânticos de cor em `globals.css`: `--bg`, `--bg-elev`, `--superficie`, `--linha`, `--tinta`, `--tinta-2`, `--tinta-3`, `--acento`, `--acento-tinta`, `--acento-suave` e `--foco`.
   - [x] Definir também `--raio-1/2/3`, `--sombra-1/2`, `--dur-rapida/media/lenta`, `--ease-saida` e `--ease-entrada`.
   - [x] Mapear Tailwind aos tokens e impedir qualquer literal de cor em componentes.
   - [x] Fazer `oxido` e `mineral` parecerem marcas irmãs cromaticamente opostas, não simples skins.
   - [x] Criar radiogroup acessível fixo, com rótulo, `aria-checked` e alvos de pelo menos 44px.
   - [x] Persistir em `localStorage`, respeitar `prefers-color-scheme` na primeira visita e aplicar tema antes da primeira pintura.
   - [x] Evitar CLS e limitar transições de cor a 200ms.

9. [x] **Espaçamento, grid e contêiner**
   - [x] Criar escala de 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160 e 224px como tokens.
   - [x] Aplicar `--ritmo: clamp(72px, 11vw, 168px)` entre seções.
   - [x] Usar contêiner `min(100% - 2 * var(--gutter), 1280px)` com gutter fluido de 20–48px.
   - [x] Usar grid de 12/6/4 colunas em desktop/tablet/mobile e preservar leitura em telas estreitas.

10. [ ] **Imagens locais, placeholders e documentação**
    - [ ] Servir todas as imagens locais com `next/image`, sem hotlink.
    - [ ] Garantir dimensões reais ou wrapper `fill` com `aspect-ratio`, posição relativa e altura resolvida.
    - [ ] Informar `sizes` em toda imagem responsiva, `priority` somente no hero e lazy loading nas demais.
    - [ ] Gerar placeholders nas proporções finais por `scripts/gerar-placeholders.mjs` usando Sharp, cor sólida e grão estático.
    - [ ] Usar `hero-retrato.webp` (4:5) e `hero-paisagem.webp` (16:9) em `<picture>`/`sizes` responsivos, escolhendo a fonte por breakpoint para preservar o corte, especialmente em 540px.
    - [ ] Escrever `IMAGENS.md` com caminho, proporção, dimensão mínima e briefing fotográfico de cada slot.
    - [ ] Aplicar temperatura consistente, overlay sólido de baixa opacidade e `--raio-2`, sem duotone via blend nem filtro em imagem móvel.

11. [ ] **Seções e identificadores estáveis**
    - [x] Publicar `topo` como seção sticky, com navegação âncora, alternador de tema e CTA de WhatsApp.
    - [x] Publicar `hero` com headline, subtítulo, dois CTAs, prova rápida, crops 4:5/16:9 e canvas decorativo.
    - [x] Publicar `servicos` como catálogo de Pele & Corpo, com duração, faixa de preço, itens inclusos e CTA individual.
    - [x] Publicar `unhas` como dossiê autoral de matéria, com gel curado, fibra de vidro e índice técnico próprio.
    - [ ] Publicar, sem seção aninhada, os contratos `topo`, `hero`, `credenciais`, `servicos`, `unhas`, `protocolo`, `galeria`, `equipe`, `depoimentos`, `precos`, `faq`, `localizacao`, `contato` e `rodape`.
    - [ ] Aplicar a cada âncora `id` e `data-secao` idênticos em kebab-case.
    - [ ] Aplicar `scroll-margin-top: calc(var(--altura-cabecalho) + 16px)`.
    - [ ] Não colocar seções em contêiner que corte a captura com `overflow: hidden`.
    - [ ] Entregar hero completo, faixa de credenciais, catálogo Pele & Corpo, destaque autoral de Unhas, protocolo em quatro etapas, galeria, equipe, 4–6 depoimentos, tabela, FAQ com 6–8 itens, localização sem iframe, contato e rodapé.

12. [x] **Interatividade e movimento**
    - [x] Implementar um único `IntersectionObserver` em `src/lib/reveal.ts`, com `threshold: 0.15`, `rootMargin: "0px 0px -8% 0px"`, `data-revelar`, `--i` e `unobserve` imediato.
    - [x] Esconder estado inicial apenas sob classe `js`; sem JavaScript, todo conteúdo permanece visível.
    - [x] Animar somente `opacity` e `translateY` de até 16px por 320–420ms com `cubic-bezier(.16,1,.3,1)`.
    - [x] Aplicar foco visível de 2px + offset de 3px, hover somente em mídia compatível, active tátil e alvos ≥ 44×44px.
    - [x] Manter toda informação disponível sem hover e habilitar rolagem suave somente quando movimento for permitido.
    - [x] Criar o único efeito contínuo no canvas 2D do hero, com DPR ≤ 1.5, aproximadamente 30fps, pausa fora da viewport/aba e cleanup no unmount.

13. [x] **Movimento reduzido e modo de captura**
    - [x] Sob `prefers-reduced-motion`, revelar tudo, remover transformações, reduzir transições a ≤ 80ms, desligar smooth scroll e desenhar um frame do canvas.
    - [x] Fazer `?shot=1` aplicar exatamente o comportamento reduzido, sem animação pendente para o robô fotógrafo.

14. [ ] **Restrições fechadas de performance**
    - [ ] Não combinar `filter: blur()` com transform animado.
    - [ ] Fazer efeitos animados exclusivamente em canvas; manter os demais estáticos.
    - [ ] Não usar SVG animado do tamanho da viewport, `mix-blend-mode` na raiz do fundo nem `backdrop-filter`.
    - [ ] Limitar gradientes a faixas estruturais de até 96px e nunca colocá-los sob texto de leitura.
    - [ ] Animar somente `transform` e `opacity`; nunca dimensões, posição, margem, sombra, background-position ou filtro.
    - [ ] Limitar `will-change` transitório a no máximo dois elementos e `sticky` somente ao cabeçalho.
    - [ ] Usar zero JavaScript de terceiros e zero fonte de ícones; SVGs inline terão dimensões explícitas.

15. [ ] **Alvos mensuráveis**
    - [ ] Atingir FPS médio mínimo de 45 na rolagem mobile com CPU 4× limitada.
    - [ ] Medir CLS abaixo de 0.1 em mobile e desktop.
    - [ ] Garantir zero slots de imagem com largura/altura zero.
    - [ ] Garantir zero overflow horizontal e nenhuma quebra entre 320px e 1920px, com inspeção específica em 540px.
    - [ ] Validar contraste AA nos quatro temas.
    - [ ] Fazer build de produção, TypeScript e lint passarem sem warnings/erros.

16. [ ] **Verificação obrigatória com Playwright**
    - [ ] Criar `scripts/verificar.mjs` usando exclusivamente `/tmp/chromium` e `--no-sandbox`, sem `playwright install`.
    - [ ] Testar o build de produção local e gerar oito capturas full-page: 390×844 DPR 2 e 1440×900 nos quatro temas.
    - [ ] Capturar cada um dos 14 IDs de seção em mobile e desktop.
    - [ ] Capturar 320, 360, 390, 540, 768, 1024, 1280, 1440 e 1920px.
    - [ ] Afirmar overflow ≤ 1px e dimensões não nulas para todos os `img`/wrappers em cada largura.
    - [ ] Medir CLS durante rolagem roteirizada.
    - [ ] Usar CDP com CPU throttle 4× e reportar FPS médio e p5 durante a rolagem completa.
    - [ ] Salvar evidências em `verificacao/` e números/afirmações em `verificacao/relatorio.md`.
    - [ ] Abrir e inspecionar visualmente mobile, desktop, os quatro temas e 540px; registrar alinhamento, overflow, órfãos, distorção, contraste e hierarquia, corrigindo e repetindo quando necessário.
    - [ ] Conferir na captura do hero se `ã`, `õ` e `ê` colidem com a linha superior no `line-height` baixo da Bricolage; ajustar o `line-height` ou o headline se houver colisão.

17. [ ] **Acessibilidade**
    - [ ] Usar `header`, `nav`, `main`, seções com `aria-labelledby` e `footer`.
    - [ ] Manter um único `h1`, headings sem saltos e `lang="pt-BR"`.
    - [ ] Inserir skip link para `#hero` como primeiro foco.
    - [ ] Rotular botões de ícone e manter ordem de foco igual à visual.
    - [ ] Implementar FAQ com `<details>/<summary>` acessível por teclado, sem JavaScript.
    - [ ] Tornar links de WhatsApp explícitos quanto ao destino e ao serviço.

18. [ ] **Entrega e critério de pronto**
    - [ ] Manter este checklist atualizado e um commit/push por item concluído.
    - [ ] Confirmar `npm run build`, lint e `tsc --noEmit` limpos.
    - [ ] Confirmar `verificacao/relatorio.md` com FPS, p5, CLS, zero-slot, zero-overflow e inspeção visual escrita.
    - [ ] Entregar resumo final com a linha visual, métricas versus alvos, lista dos IDs estáveis e qualquer desvio justificado.

## Árvore de arquivos planejada

```text
.
├── .gitignore
├── IMAGENS.md
├── PLAN.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── public
│   ├── fontes
│   │   ├── BricolageGrotesque-Variable.woff2
│   │   ├── IBMPlexMono-Variable.woff2
│   │   └── InstrumentSans-Variable.woff2
│   └── img
│       ├── grao.png
│       ├── hero-paisagem.webp
│       ├── hero-retrato.webp
│       ├── unhas-destaque.webp
│       ├── equipe
│       │   ├── profissional-01.webp
│       │   └── profissional-02.webp
│       └── galeria
│           ├── galeria-01.webp
│           ├── galeria-02.webp
│           ├── galeria-03.webp
│           ├── galeria-04.webp
│           ├── galeria-05.webp
│           └── galeria-06.webp
├── scripts
│   ├── gerar-placeholders.mjs
│   └── verificar.mjs
├── src
│   ├── app
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── clientes
│   │   │   ├── AlternadorTema.tsx
│   │   │   ├── CanvasHero.tsx
│   │   │   └── Revelacao.tsx
│   │   ├── secoes
│   │   │   ├── Contato.tsx
│   │   │   ├── Credenciais.tsx
│   │   │   ├── Depoimentos.tsx
│   │   │   ├── Equipe.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Galeria.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Localizacao.tsx
│   │   │   ├── Precos.tsx
│   │   │   ├── Protocolo.tsx
│   │   │   ├── Rodape.tsx
│   │   │   ├── Servicos.tsx
│   │   │   ├── Topo.tsx
│   │   │   └── Unhas.tsx
│   │   └── ui
│   │       ├── Botao.tsx
│   │       ├── Cartao.tsx
│   │       ├── Divisor.tsx
│   │       ├── Icone.tsx
│   │       └── Rotulo.tsx
│   ├── content
│   │   ├── contato.ts
│   │   ├── depoimentos.ts
│   │   ├── equipe.ts
│   │   ├── faq.ts
│   │   ├── precos.ts
│   │   └── servicos.ts
│   └── lib
│       ├── cn.ts
│       ├── reveal.ts
│       └── wa.ts
└── verificacao
    ├── relatorio.md
    ├── secoes
    │   ├── desktop
    │   └── mobile
    ├── temas
    │   ├── desktop
    │   └── mobile
    └── larguras
```

## Regra de execução após aprovação

Cada item só será marcado como concluído depois de sua implementação e verificação correspondente; então o plano será atualizado, os arquivos serão adicionados, um commit incremental será criado no padrão acordado e o push será tentado antes de avançar ao próximo marco.
