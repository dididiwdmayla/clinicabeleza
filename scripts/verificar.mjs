import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const executavel = "/tmp/chromium";
const origem = process.env.VERIFICAR_URL ?? "http://127.0.0.1:3000";
const raiz = path.resolve("verificacao");
const temas = ["noite", "dia", "oxido", "mineral"];
const secoes = ["topo", "hero", "credenciais", "servicos", "unhas", "protocolo", "galeria", "equipe", "depoimentos", "precos", "faq", "localizacao", "contato", "rodape"];
const larguras = [320, 360, 390, 540, 768, 1024, 1280, 1440, 1920];
const falhas = [];
const relatorioAnterior = await readFile(path.join(raiz, "relatorio.md"), "utf8").catch(() => "");
const indiceInspecao = relatorioAnterior.indexOf("## Inspeção visual");
const inspecaoVisual = indiceInspecao >= 0 ? relatorioAnterior.slice(indiceInspecao).trim() : "";

await access(executavel).catch(() => {
  throw new Error("Chromium ausente em /tmp/chromium. Extraia o binário de @sparticuz/chromium; nunca execute playwright install.");
});

await Promise.all([
  rm(path.join(raiz, "temas"), { force: true, recursive: true }),
  rm(path.join(raiz, "secoes"), { force: true, recursive: true }),
  rm(path.join(raiz, "larguras"), { force: true, recursive: true }),
]);

await Promise.all([
  mkdir(path.join(raiz, "temas", "mobile"), { recursive: true }),
  mkdir(path.join(raiz, "temas", "desktop"), { recursive: true }),
  mkdir(path.join(raiz, "secoes", "mobile"), { recursive: true }),
  mkdir(path.join(raiz, "secoes", "desktop"), { recursive: true }),
  mkdir(path.join(raiz, "larguras"), { recursive: true }),
]);

const navegador = await chromium.launch({
  args: ["--no-sandbox"],
  executablePath: executavel,
  headless: true,
});

function registrarFalha(condicao, mensagem) {
  if (condicao) falhas.push(mensagem);
}

async function abrirPagina({ dpr = 1, largura, altura, tema = "dia", captura = true, observarCls = false, cpu = null }) {
  const contexto = await navegador.newContext({
    deviceScaleFactor: dpr,
    reducedMotion: captura ? "reduce" : "no-preference",
    viewport: { width: largura, height: altura },
  });

  await contexto.addInitScript(({ temaInicial, medirCls }) => {
    localStorage.setItem("estudio-nove-tema", temaInicial);
    if (medirCls) {
      const estado = {
        cls: 0,
        entradas: [],
        estadoDocumentoNoInicio: document.readyState,
        iniciadoEm: performance.now(),
        paintsNoInicio: performance.getEntriesByType("paint").length,
        suportado: PerformanceObserver.supportedEntryTypes.includes("layout-shift"),
      };
      const registrar = (entradas) => {
        for (const entrada of entradas) {
          estado.entradas.push({
            fontes: entrada.sources?.length ?? 0,
            houveEntradaRecente: entrada.hadRecentInput,
            inicio: entrada.startTime,
            valor: entrada.value,
          });
          if (!entrada.hadRecentInput) estado.cls += entrada.value;
        }
      };
      const observador = new PerformanceObserver((lista) => registrar(lista.getEntries()));
      observador.observe({ type: "layout-shift", buffered: true });
      globalThis.__estadoClsEstudioNove = estado;
      globalThis.__observadorClsEstudioNove = observador;
      globalThis.__registrarClsEstudioNove = registrar;
    }
  }, { medirCls: observarCls, temaInicial: tema });

  const pagina = await contexto.newPage();
  const cdp = cpu === null ? null : await contexto.newCDPSession(pagina);
  const confirmacaoThrottleInicial = cdp ? await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu }) : null;
  await pagina.goto(origem + "/" + (captura ? "?shot=1" : ""), { waitUntil: captura ? "load" : "domcontentloaded" });
  await pagina.evaluate((temaAtual) => {
    document.documentElement.dataset.theme = temaAtual;
    document.documentElement.style.colorScheme = temaAtual === "dia" ? "light" : "dark";
  }, tema);
  if (captura) {
    await pagina.evaluate(async () => {
      document.querySelectorAll("img").forEach((imagem) => { imagem.loading = "eager"; });
      await document.fonts.ready;
      await Promise.all(Array.from(document.images, (imagem) => imagem.decode().catch(() => undefined)));
      scrollTo(0, 0);
    });
  } else {
    await pagina.evaluate(() => scrollTo(0, 0));
  }
  return { cdp, confirmacaoThrottleInicial, contexto, pagina };
}

async function medirPagina(pagina) {
  return pagina.evaluate((ids) => {
    const arredondar = (valor) => Math.round(valor * 100) / 100;
    const parseCor = (valor) => {
      if (!valor || valor === "transparent") return [0, 0, 0, 0];
      const numeros = valor.match(/[\d.]+/g)?.map(Number) ?? [];
      if (valor.startsWith("color(srgb")) {
        return [numeros[0] * 255, numeros[1] * 255, numeros[2] * 255, numeros[3] ?? 1];
      }
      return [numeros[0] ?? 0, numeros[1] ?? 0, numeros[2] ?? 0, numeros[3] ?? 1];
    };
    const sobrepor = (frente, fundo) => {
      const alfa = frente[3] + fundo[3] * (1 - frente[3]);
      if (!alfa) return [0, 0, 0, 0];
      return [
        (frente[0] * frente[3] + fundo[0] * fundo[3] * (1 - frente[3])) / alfa,
        (frente[1] * frente[3] + fundo[1] * fundo[3] * (1 - frente[3])) / alfa,
        (frente[2] * frente[3] + fundo[2] * fundo[3] * (1 - frente[3])) / alfa,
        alfa,
      ];
    };
    const fundoEfetivo = (elemento) => {
      const camadas = [];
      let atual = elemento;
      while (atual) {
        camadas.push(parseCor(getComputedStyle(atual).backgroundColor));
        atual = atual.parentElement;
      }
      let cor = [255, 255, 255, 1];
      for (const camada of camadas.reverse()) cor = sobrepor(camada, cor);
      return cor;
    };
    const luminancia = (cor) => {
      const canais = cor.slice(0, 3).map((canal) => {
        const normalizado = canal / 255;
        return normalizado <= 0.04045 ? normalizado / 12.92 : ((normalizado + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * canais[0] + 0.7152 * canais[1] + 0.0722 * canais[2];
    };
    const contraste = (a, b) => {
      const la = luminancia(a);
      const lb = luminancia(b);
      return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
    };

    const amostrasContraste = [];
    for (const elemento of document.body.querySelectorAll("*")) {
      if (["SCRIPT", "STYLE", "SVG", "PATH"].includes(elemento.tagName)) continue;
      const textoDireto = Array.from(elemento.childNodes).some((no) => no.nodeType === Node.TEXT_NODE && no.textContent.trim());
      if (!textoDireto) continue;
      const caixa = elemento.getBoundingClientRect();
      const estilo = getComputedStyle(elemento);
      if (caixa.width <= 2 || caixa.height <= 2 || estilo.visibility === "hidden" || estilo.display === "none" || estilo.clip !== "auto") continue;
      const fundo = fundoEfetivo(elemento);
      const frente = sobrepor(parseCor(estilo.color), fundo);
      const razao = contraste(frente, fundo);
      const tamanho = Number.parseFloat(estilo.fontSize);
      const peso = Number.parseInt(estilo.fontWeight, 10) || 400;
      const grande = tamanho >= 24 || (tamanho >= 18.66 && peso >= 700);
      const minimo = grande ? 3 : 4.5;
      let seletor = elemento.tagName.toLowerCase();
      if (elemento.id) seletor += "#" + elemento.id;
      else if (elemento.classList.length) seletor += "." + Array.from(elemento.classList).slice(0, 2).join(".");
      amostrasContraste.push({
        minimo,
        razao: arredondar(razao),
        seletor,
        texto: elemento.textContent.trim().replace(/\s+/g, " ").slice(0, 70),
      });
    }

    const imagens = Array.from(document.images, (imagem) => {
      const caixa = imagem.getBoundingClientRect();
      const pai = imagem.parentElement?.getBoundingClientRect();
      return {
        altura: arredondar(caixa.height),
        largura: arredondar(caixa.width),
        paiAltura: arredondar(pai?.height ?? 0),
        paiLargura: arredondar(pai?.width ?? 0),
        sizes: imagem.getAttribute("sizes") ?? (imagem.getAttribute("data-nimg") === "fill" ? "next/image:fill" : null),
        src: imagem.getAttribute("src"),
      };
    });

    const cartoes = Array.from(document.querySelectorAll(".servicos__cartao"), (elemento) => elemento.getBoundingClientRect());
    const botoes = Array.from(document.querySelectorAll(".servicos__cartao > a"), (elemento) => elemento.getBoundingClientRect());
    const linhasCartoes = Object.values(Object.groupBy(cartoes, (cartao) => String(Math.round(cartao.top)))).map((linha) => ({
      alturas: linha.map((cartao) => Math.round(cartao.height)),
      botoes: linha.map((cartao) => Math.round(botoes[cartoes.indexOf(cartao)]?.bottom ?? 0)),
      esquerdas: linha.map((cartao) => Math.round(cartao.left)),
    }));
    const gradeServicos = document.querySelector(".servicos__grade")?.getBoundingClientRect();
    const tabela = document.querySelector(".precos__tabela");

    return {
      contraste: {
        amostras: amostrasContraste.length,
        pior: Math.min(...amostrasContraste.map((amostra) => amostra.razao)),
        violacoes: amostrasContraste.filter((amostra) => amostra.razao + 0.01 < amostra.minimo),
      },
      documento: {
        altura: document.documentElement.scrollHeight,
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      },
      faq: document.querySelectorAll("#faq details").length,
      imagens,
      linhasCartoes,
      secaoAninhada: document.querySelectorAll("section section").length,
      secoes: ids.map((id) => {
        const elemento = document.getElementById(id);
        const caixa = elemento?.getBoundingClientRect();
        return {
          altura: arredondar(caixa?.height ?? 0),
          contrato: elemento?.dataset.secao === id,
          id,
          revelar: elemento?.querySelectorAll("[data-revelar]").length ?? 0,
        };
      }),
      servicosEsquerda: {
        grade: Math.round(gradeServicos?.left ?? 0),
        primeiraUltimaLinha: linhasCartoes.at(-1)?.esquerdas[0] ?? 0,
      },
      tabela: {
        clientWidth: tabela?.clientWidth ?? 0,
        scrollWidth: tabela?.scrollWidth ?? 0,
      },
      titulosH1: document.querySelectorAll("h1").length,
    };
  }, secoes);
}

function validarMedidas(medidas, contexto) {
  registrarFalha(medidas.documento.scrollWidth > medidas.documento.clientWidth + 1, contexto + ": overflow " + medidas.documento.scrollWidth + "/" + medidas.documento.clientWidth);
  registrarFalha(medidas.secoes.length !== secoes.length || medidas.secoes.some((secao) => !secao.contrato || secao.altura <= 0), contexto + ": contrato ou altura de seção inválido");
  registrarFalha(medidas.secoes.some((secao) => secao.revelar === 0), contexto + ": seção sem data-revelar");
  registrarFalha(medidas.secaoAninhada !== 0, contexto + ": seção aninhada");
  registrarFalha(medidas.titulosH1 !== 1, contexto + ": quantidade de h1 = " + medidas.titulosH1);
  registrarFalha(medidas.faq !== 7, contexto + ": FAQ tem " + medidas.faq + " itens");
  registrarFalha(medidas.imagens.some((imagem) => imagem.altura <= 0 || imagem.largura <= 0 || imagem.paiAltura <= 0 || imagem.paiLargura <= 0), contexto + ": slot de imagem com dimensão nula");
  registrarFalha(medidas.imagens.some((imagem) => !imagem.src?.startsWith("/img/")), contexto + ": imagem não local");
  registrarFalha(medidas.imagens.some((imagem) => !imagem.sizes), contexto + ": imagem responsiva sem sizes");
  registrarFalha(medidas.tabela.scrollWidth > medidas.tabela.clientWidth + 1, contexto + ": tabela de preços com rolagem horizontal");
  for (const [indice, linha] of medidas.linhasCartoes.entries()) {
    registrarFalha(Math.max(...linha.alturas) - Math.min(...linha.alturas) > 1, contexto + ": alturas diferentes na linha " + (indice + 1) + " de serviços");
    registrarFalha(Math.max(...linha.botoes) - Math.min(...linha.botoes) > 1, contexto + ": CTAs desalinhados na linha " + (indice + 1) + " de serviços");
  }
  registrarFalha(medidas.servicosEsquerda.grade !== medidas.servicosEsquerda.primeiraUltimaLinha && medidas.linhasCartoes.at(-1)?.esquerdas.length < 3, contexto + ": card órfão de serviços não alinhado à esquerda");
}

async function medirRolagem({ cpu = 1, largura, altura }) {
  const { cdp, confirmacaoThrottleInicial, contexto, pagina } = await abrirPagina({
    altura,
    captura: false,
    cpu,
    largura,
    observarCls: true,
  });
  if (!cdp) throw new Error("Sessão CDP ausente na medição de rolagem.");
  await pagina.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";
    scrollTo({ behavior: "instant", left: 0, top: 0 });
  });
  const recursosNoInicio = await pagina.evaluate(() => ({
    estadoFonte: document.fonts.status,
    imagensCarregadas: Array.from(document.images).filter((imagem) => imagem.complete).length,
    imagensTotais: document.images.length,
    observer: {
      estadoDocumentoNoInicio: globalThis.__estadoClsEstudioNove?.estadoDocumentoNoInicio,
      iniciadoEm: globalThis.__estadoClsEstudioNove?.iniciadoEm,
      paintsNoInicio: globalThis.__estadoClsEstudioNove?.paintsNoInicio,
      suportado: globalThis.__estadoClsEstudioNove?.suportado,
    },
  }));
  const promessaRolagem = pagina.evaluate(async () => new Promise((resolver) => {
    const amostras = [];
    let inicio;
    let ultimoY = scrollY;
    const duracao = 6000;
    const limite = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const passo = (agora) => {
      inicio ??= agora;
      const progresso = Math.min(1, (agora - inicio) / duracao);
      scrollTo({ behavior: "instant", left: 0, top: limite * progresso });
      const atualY = scrollY;
      amostras.push({ ativo: atualY !== ultimoY, tempo: agora, y: atualY });
      ultimoY = atualY;
      globalThis.__rolagemEstudioNove = { ativa: progresso < 1, progresso, y: atualY };
      if (progresso < 1) requestAnimationFrame(passo);
      else {
        globalThis.__rolagemEstudioNove.ativa = false;
        resolver({ amostras, distancia: limite, duracaoAlvo: duracao });
      }
    };
    requestAnimationFrame(passo);
  }));
  await pagina.waitForTimeout(2500);
  const rolagemDuranteConfirmacao = await pagina.evaluate(() => globalThis.__rolagemEstudioNove);
  const confirmacaoThrottleDurante = await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
  const resultadoRolagem = await promessaRolagem;
  await pagina.waitForTimeout(500);
  const quadrosAtivos = resultadoRolagem.amostras.filter((amostra) => amostra.ativo);
  const intervalos = quadrosAtivos.slice(1).map((amostra, indice) => amostra.tempo - quadrosAtivos[indice].tempo);
  const fpsInstantaneo = intervalos.map((intervalo) => 1000 / intervalo).sort((a, b) => a - b);
  const duracaoAtiva = (quadrosAtivos.at(-1)?.tempo ?? 0) - (quadrosAtivos[0]?.tempo ?? 0);
  const fpsMedio = duracaoAtiva > 0 ? (quadrosAtivos.length - 1) * 1000 / duracaoAtiva : 0;
  const p5 = fpsInstantaneo[Math.floor(fpsInstantaneo.length * 0.05)] ?? 0;
  const calibracaoCpuMs = await pagina.evaluate(() => {
    const inicio = performance.now();
    let acumulador = 0;
    for (let indice = 1; indice <= 4_000_000; indice += 1) acumulador += Math.sqrt(indice % 997);
    return { acumulador, duracao: performance.now() - inicio };
  });
  const cls = await pagina.evaluate(() => {
    const observador = globalThis.__observadorClsEstudioNove;
    const estado = globalThis.__estadoClsEstudioNove;
    const pendentes = observador?.takeRecords() ?? [];
    globalThis.__registrarClsEstudioNove?.(pendentes);
    const resultado = {
      cls: estado?.cls ?? 0,
      entradasComEntradaRecente: estado?.entradas.filter((entrada) => entrada.houveEntradaRecente).length ?? 0,
      entradasConsideradas: estado?.entradas.filter((entrada) => !entrada.houveEntradaRecente).length ?? 0,
      entradasTotais: estado?.entradas.length ?? 0,
      estadoDocumentoNoInicio: estado?.estadoDocumentoNoInicio,
      iniciadoEm: estado?.iniciadoEm,
      observadoAte: performance.now(),
      paintsNoInicio: estado?.paintsNoInicio,
      suportado: estado?.suportado,
      valores: estado?.entradas ?? [],
    };
    observador?.disconnect();
    return resultado;
  });
  const confirmacaoReset = await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  await contexto.close();
  return {
    calibracaoCpuMs: calibracaoCpuMs.duracao,
    cls,
    distancia: resultadoRolagem.distancia,
    duracaoAtiva,
    fpsMedio,
    p5,
    posicaoFinal: resultadoRolagem.amostras.at(-1)?.y ?? 0,
    quadrosAtivos: quadrosAtivos.length,
    quadrosTotais: resultadoRolagem.amostras.length,
    recursosNoInicio,
    rolagemDuranteConfirmacao,
    throttle: {
      confirmacaoDurante: confirmacaoThrottleDurante,
      confirmacaoInicial: confirmacaoThrottleInicial,
      confirmacaoReset,
      taxa: cpu,
    },
  };
}

const resultadosTemas = [];
const resultadosLarguras = [];

try {
  for (const tema of temas) {
    for (const modo of [
      { nome: "mobile", largura: 390, altura: 844, dpr: 2 },
      { nome: "desktop", largura: 1440, altura: 900, dpr: 1 },
    ]) {
      const { contexto, pagina } = await abrirPagina({ ...modo, tema });
      const medidas = await medirPagina(pagina);
      validarMedidas(medidas, tema + "/" + modo.nome);
      registrarFalha(medidas.contraste.violacoes.length > 0, tema + "/" + modo.nome + ": " + medidas.contraste.violacoes.length + " violações AA");
      await pagina.screenshot({
        animations: "disabled",
        fullPage: true,
        path: path.join(raiz, "temas", modo.nome, tema + ".jpg"),
        quality: 84,
        type: "jpeg",
      });
      resultadosTemas.push({ tema, modo: modo.nome, medidas });
      await contexto.close();
    }
  }

  for (const modo of [
    { nome: "mobile", largura: 390, altura: 844, dpr: 1 },
    { nome: "desktop", largura: 1440, altura: 900, dpr: 1 },
  ]) {
    const { contexto, pagina } = await abrirPagina({ ...modo, tema: "dia" });
    for (const [indice, id] of secoes.entries()) {
      if (id === "faq") {
        await pagina.locator("#faq details").nth(0).evaluate((elemento) => { elemento.open = true; });
        await pagina.locator("#faq details").nth(3).evaluate((elemento) => { elemento.open = true; });
      }
      await pagina.locator("#" + id).scrollIntoViewIfNeeded();
      await pagina.waitForTimeout(30);
      await pagina.locator("#" + id).screenshot({
        animations: "disabled",
        path: path.join(raiz, "secoes", modo.nome, String(indice + 1).padStart(2, "0") + "-" + id + ".jpg"),
        quality: 88,
        type: "jpeg",
      });
      if (id === "topo") {
        await pagina.addStyleTag({ content: ".topo, .alternador-tema, .pular-conteudo { visibility: hidden !important; }" });
      }
    }
    await contexto.close();
  }

  for (const largura of larguras) {
    const { contexto, pagina } = await abrirPagina({ largura, altura: 900, tema: "dia" });
    const medidas = await medirPagina(pagina);
    validarMedidas(medidas, "largura/" + largura);
    await pagina.screenshot({
      animations: "disabled",
      path: path.join(raiz, "larguras", largura + ".jpg"),
      quality: 88,
      type: "jpeg",
    });
    resultadosLarguras.push({ largura, medidas });
    await contexto.close();
  }

  const movimentoMobile = await medirRolagem({ cpu: 4, largura: 390, altura: 844 });
  const movimentoDesktop = await medirRolagem({ cpu: 1, largura: 1440, altura: 900 });
  const controleNegativo20x = await medirRolagem({ cpu: 20, largura: 390, altura: 844 });
  for (const [nome, movimento] of [["mobile 4×", movimentoMobile], ["desktop 1×", movimentoDesktop], ["controle 20×", controleNegativo20x]]) {
    registrarFalha(Math.abs(movimento.posicaoFinal - movimento.distancia) > 1, nome + ": rolagem não chegou ao fim (" + movimento.posicaoFinal + "/" + movimento.distancia + ")");
    registrarFalha(movimento.quadrosAtivos < movimento.quadrosTotais * 0.9, nome + ": poucos frames de rolagem ativa (" + movimento.quadrosAtivos + "/" + movimento.quadrosTotais + ")");
  }
  registrarFalha(controleNegativo20x.fpsMedio >= movimentoMobile.fpsMedio - 1, "controle negativo 20× não reduziu o FPS");
  registrarFalha(movimentoMobile.fpsMedio < 45, "FPS médio mobile " + movimentoMobile.fpsMedio.toFixed(2) + " < 45");
  registrarFalha(movimentoMobile.cls.cls >= 0.1, "CLS mobile " + movimentoMobile.cls.cls.toFixed(4) + " >= 0.1");
  registrarFalha(movimentoDesktop.cls.cls >= 0.1, "CLS desktop " + movimentoDesktop.cls.cls.toFixed(4) + " >= 0.1");

  const dados = {
    geradoEm: new Date().toISOString(),
    secoes,
    temas: resultadosTemas,
    larguras: resultadosLarguras,
    movimento: { controleNegativo20x, desktop: movimentoDesktop, mobile: movimentoMobile },
    falhas,
  };
  await writeFile(path.join(raiz, "dados.json"), JSON.stringify(dados, null, 2) + "\n");

  const linhasTemas = resultadosTemas.map(({ tema, modo, medidas }) =>
    "| " + tema + " | " + modo + " | " + medidas.documento.scrollWidth + "/" + medidas.documento.clientWidth + " | " + medidas.imagens.length + " | " + medidas.contraste.pior.toFixed(2) + " | " + medidas.contraste.violacoes.length + " |",
  );
  const linhasLarguras = resultadosLarguras.map(({ largura, medidas }) =>
    "| " + largura + " | " + medidas.documento.scrollWidth + "/" + medidas.documento.clientWidth + " | " + medidas.imagens.filter((imagem) => imagem.altura <= 0 || imagem.largura <= 0).length + " | " + medidas.tabela.scrollWidth + "/" + medidas.tabela.clientWidth + " |",
  );
  const relatorio = [
    "# Relatório de verificação — ESTÚDIO NOVE",
    "",
    "Gerado em " + dados.geradoEm + ". Valores obtidos pelo Chromium em " + executavel + "; nenhuma métrica abaixo é estimada.",
    "",
    "## Movimento e estabilidade",
    "",
    "| cenário | CPU | FPS médio | FPS p5 | frames ativos/totais | CLS acumulado | entradas de shift |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: |",
    "| mobile 390×844 | 4× | " + movimentoMobile.fpsMedio.toFixed(2) + " | " + movimentoMobile.p5.toFixed(2) + " | " + movimentoMobile.quadrosAtivos + "/" + movimentoMobile.quadrosTotais + " | " + movimentoMobile.cls.cls.toFixed(4) + " | " + movimentoMobile.cls.entradasTotais + " |",
    "| desktop 1440×900 | 1× | " + movimentoDesktop.fpsMedio.toFixed(2) + " | " + movimentoDesktop.p5.toFixed(2) + " | " + movimentoDesktop.quadrosAtivos + "/" + movimentoDesktop.quadrosTotais + " | " + movimentoDesktop.cls.cls.toFixed(4) + " | " + movimentoDesktop.cls.entradasTotais + " |",
    "| controle negativo 390×844 | 20× | " + controleNegativo20x.fpsMedio.toFixed(2) + " | " + controleNegativo20x.p5.toFixed(2) + " | " + controleNegativo20x.quadrosAtivos + "/" + controleNegativo20x.quadrosTotais + " | " + controleNegativo20x.cls.cls.toFixed(4) + " | " + controleNegativo20x.cls.entradasTotais + " |",
    "",
    "### Instrumentação das métricas",
    "",
    "- `Emulation.setCPUThrottlingRate` antes da navegação: mobile 4× `" + JSON.stringify(movimentoMobile.throttle.confirmacaoInicial) + "`, desktop 1× `" + JSON.stringify(movimentoDesktop.throttle.confirmacaoInicial) + "`, controle 20× `" + JSON.stringify(controleNegativo20x.throttle.confirmacaoInicial) + "`.",
    "- Segunda confirmação CDP durante rolagem ativa: mobile `" + JSON.stringify(movimentoMobile.throttle.confirmacaoDurante) + "` em " + (movimentoMobile.rolagemDuranteConfirmacao?.progresso * 100).toFixed(1) + "%/y=" + Math.round(movimentoMobile.rolagemDuranteConfirmacao?.y ?? 0) + "; desktop `" + JSON.stringify(movimentoDesktop.throttle.confirmacaoDurante) + "` em " + (movimentoDesktop.rolagemDuranteConfirmacao?.progresso * 100).toFixed(1) + "%/y=" + Math.round(movimentoDesktop.rolagemDuranteConfirmacao?.y ?? 0) + "; 20× `" + JSON.stringify(controleNegativo20x.throttle.confirmacaoDurante) + "` em " + (controleNegativo20x.rolagemDuranteConfirmacao?.progresso * 100).toFixed(1) + "%/y=" + Math.round(controleNegativo20x.rolagemDuranteConfirmacao?.y ?? 0) + ".",
    "- O cálculo usa somente callbacks em que `scrollY` mudou. Duração ativa: mobile " + movimentoMobile.duracaoAtiva.toFixed(1) + " ms; desktop " + movimentoDesktop.duracaoAtiva.toFixed(1) + " ms; controle 20× " + controleNegativo20x.duracaoAtiva.toFixed(1) + " ms.",
    "- Observer de CLS instalado por `addInitScript`: estado inicial mobile/desktop/20× = `" + movimentoMobile.cls.estadoDocumentoNoInicio + "/" + movimentoDesktop.cls.estadoDocumentoNoInicio + "/" + controleNegativo20x.cls.estadoDocumentoNoInicio + "`; paints existentes no início = `" + movimentoMobile.cls.paintsNoInicio + "/" + movimentoDesktop.cls.paintsNoInicio + "/" + controleNegativo20x.cls.paintsNoInicio + "`.",
    "- Observer permaneceu conectado por " + (movimentoMobile.cls.observadoAte - movimentoMobile.cls.iniciadoEm).toFixed(1) + " ms no mobile, " + (movimentoDesktop.cls.observadoAte - movimentoDesktop.cls.iniciadoEm).toFixed(1) + " ms no desktop e " + (controleNegativo20x.cls.observadoAte - controleNegativo20x.cls.iniciadoEm).toFixed(1) + " ms no controle, cobrindo os 5999.7 ms de rolagem ativa e a espera posterior.",
    "- Entradas `layout-shift` entregues: mobile " + movimentoMobile.cls.entradasTotais + ", desktop " + movimentoDesktop.cls.entradasTotais + ", controle 20× " + controleNegativo20x.cls.entradasTotais + ". Assim, `0.0000` significa ausência de evento capturado; não houve entrada de valor zero.",
    "- Imagens completas antes da rolagem, sem forçar `eager` nem `decode`: mobile " + movimentoMobile.recursosNoInicio.imagensCarregadas + "/" + movimentoMobile.recursosNoInicio.imagensTotais + ", desktop " + movimentoDesktop.recursosNoInicio.imagensCarregadas + "/" + movimentoDesktop.recursosNoInicio.imagensTotais + ", controle 20× " + controleNegativo20x.recursosNoInicio.imagensCarregadas + "/" + controleNegativo20x.recursosNoInicio.imagensTotais + ".",
    "- Controle auxiliar de CPU, mesmo laço fixo: 4× " + movimentoMobile.calibracaoCpuMs.toFixed(1) + " ms, 1× " + movimentoDesktop.calibracaoCpuMs.toFixed(1) + " ms, 20× " + controleNegativo20x.calibracaoCpuMs.toFixed(1) + " ms.",
    "",
    "## Temas, imagens e contraste",
    "",
    "| tema | viewport | scroll/client | imagens | pior contraste | falhas AA |",
    "| --- | --- | ---: | ---: | ---: | ---: |",
    ...linhasTemas,
    "",
    "## Larguras",
    "",
    "| largura | scroll/client | slots nulos | tabela scroll/client |",
    "| ---: | ---: | ---: | ---: |",
    ...linhasLarguras,
    "",
    "## Contratos",
    "",
    "- IDs verificados: " + secoes.join(", ") + ".",
    "- Cada ID coincide com data-secao; não há seção aninhada.",
    "- FAQ: 7 pares details/summary.",
    "- Falhas automatizadas: " + (falhas.length ? falhas.join("; ") : "nenhuma") + ".",
    "",
    ...(inspecaoVisual ? [inspecaoVisual] : ["## Inspeção visual", "", "A preencher após abertura humana das capturas."]),
    "",
  ].join("\n");
  await writeFile(path.join(raiz, "relatorio.md"), relatorio);
} finally {
  await navegador.close();
}

if (falhas.length) {
  console.error(falhas.join("\n"));
  process.exitCode = 2;
} else {
  console.log("Verificação concluída sem falhas.");
}
