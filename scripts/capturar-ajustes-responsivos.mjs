import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const executavel = "/tmp/chromium";
const origem = process.env.CAPTURE_URL ?? "http://127.0.0.1:3000";
const destino = path.resolve(process.env.CAPTURE_DIR ?? "verificacao/ajustes-responsivos");
const quadros = [
  { nome: "390", largura: 390, altura: 844 },
  { nome: "540", largura: 540, altura: 960 },
  { nome: "1440", largura: 1440, altura: 900 },
];

await access(executavel).catch(() => {
  throw new Error("Chromium ausente em /tmp/chromium. Reinstale @sparticuz/chromium antes da captura.");
});
await mkdir(destino, { recursive: true });

const navegador = await chromium.launch({
  args: ["--no-sandbox"],
  executablePath: executavel,
  headless: true,
});

const resultados = [];

try {
  for (const quadro of quadros) {
    const pagina = await navegador.newPage({ viewport: { width: quadro.largura, height: quadro.altura } });
    await pagina.goto(`${origem}/?shot=1`, { waitUntil: "load" });
    await pagina.evaluate(() => {
      localStorage.setItem("estudio-nove-tema", "dia");
      document.documentElement.dataset.theme = "dia";
      document.documentElement.style.colorScheme = "light";
      window.dispatchEvent(new Event("estudio-nove:tema"));
    });
    await pagina.waitForFunction(() => document.querySelector('[data-opcao="dia"]')?.getAttribute("aria-checked") === "true");
    await pagina.evaluate(async () => {
      document.querySelectorAll("img").forEach((imagem) => { imagem.loading = "eager"; });
      await document.fonts.ready;
      await Promise.all(Array.from(document.images, (imagem) => imagem.decode().catch(() => undefined)));
    });

    const medidas = await pagina.evaluate(() => {
      const caixa = (seletor) => document.querySelector(seletor)?.getBoundingClientRect();
      const alternador = caixa(".alternador-tema");
      const provas = caixa(".hero__provas");
      const painelHero = caixa(".hero__visual");
      const conteudoHero = caixa(".hero__conteudo");
      const cartoes = Array.from(document.querySelectorAll(".servicos__cartao"), (elemento) => elemento.getBoundingClientRect());
      const grade = document.querySelector(".servicos__grade");
      const servicos = caixa("#servicos");
      const rotuloServicos = caixa(".servicos__cabecalho .font-tecnica");
      const tituloServicos = caixa(".servicos__cabecalho h2");
      const cabecalhoServicos = caixa(".servicos__cabecalho");
      const textoHero = document.querySelector(".hero__texto");
      const faixaTextoHero = document.createRange();
      faixaTextoHero.selectNodeContents(textoHero);
      const linhas = Object.values(Object.groupBy(cartoes, (cartao) => String(Math.round(cartao.top))));
      const botoes = Array.from(document.querySelectorAll(".servicos__cartao > a"), (elemento) => elemento.getBoundingClientRect());
      const imagemHero = document.querySelector(".hero__visual img");
      const imagensUnhas = Array.from(document.querySelectorAll(".unhas__imagem img"), (elemento) => elemento.getBoundingClientRect());
      const contratosSecao = ["credenciais", "protocolo", "galeria"].map((id) => {
        const secao = document.getElementById(id);
        return Boolean(secao && secao.dataset.secao === id);
      });
      const imagemProtocolo = caixa(".protocolo__visual img");
      const imagensGaleria = Array.from(document.querySelectorAll(".galeria__imagem img"), (elemento) => elemento.getBoundingClientRect());

      const intersectam = alternador && provas
        ? !(alternador.right <= provas.left || alternador.left >= provas.right || alternador.bottom <= provas.top || alternador.top >= provas.bottom)
        : null;
      const alternadorSobrePainel = alternador && painelHero
        ? !(alternador.right <= painelHero.left || alternador.left >= painelHero.right || alternador.bottom <= painelHero.top || alternador.top >= painelHero.bottom)
        : null;

      return {
        alternador: alternador && {
          altura: Math.round(alternador.height),
          direita: Math.round(innerWidth - alternador.right),
          largura: Math.round(alternador.width),
          topo: Math.round(alternador.top),
        },
        colisaoAlternadorPainel: alternadorSobrePainel,
        colisaoAlternadorProvas: intersectam,
        documento: {
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        },
        grade: grade && getComputedStyle(grade).gridTemplateColumns,
        linhasCards: linhas.map((linha) => {
          const indices = linha.map((cartao) => cartoes.indexOf(cartao));
          return {
            alturas: linha.map((cartao) => Math.round(cartao.height)),
            botoesBase: indices.map((indice) => Math.round(botoes[indice].bottom)),
            esquerdas: linha.map((cartao) => Math.round(cartao.left)),
          };
        }),
        hero: {
          alturaConteudo: Math.round(conteudoHero.height),
          alturaPainel: Math.round(painelHero.height),
          imagem: imagemHero?.getAttribute("src"),
          larguraTexto: Math.round(textoHero.getBoundingClientRect().width),
          linhasTexto: faixaTextoHero.getClientRects().length,
        },
        ritmo: servicos && rotuloServicos && tituloServicos && cabecalhoServicos && cartoes[0]
          ? {
              secaoRotulo: Math.round(rotuloServicos.top - servicos.top),
              rotuloTitulo: Math.round(tituloServicos.top - rotuloServicos.bottom),
              cabecalhoCards: Math.round(cartoes[0].top - cabecalhoServicos.bottom),
            }
          : null,
        ultimoCard: cartoes.at(-1) && {
          largura: Math.round(cartoes.at(-1).width),
          esquerda: Math.round(cartoes.at(-1).left),
        },
        unhas: {
          imagens: imagensUnhas.map((imagem) => ({ altura: Math.round(imagem.height), largura: Math.round(imagem.width) })),
          servicos: document.querySelectorAll(".unhas__servico").length,
        },
        novasSecoes: {
          contratos: contratosSecao,
          credenciais: {
            itens: document.querySelectorAll("#credenciais li").length,
            revelar: document.querySelectorAll("#credenciais [data-revelar]").length,
          },
          galeria: {
            imagens: imagensGaleria.map((imagem) => ({ altura: Math.round(imagem.height), largura: Math.round(imagem.width) })),
            itens: document.querySelectorAll(".galeria__item").length,
            revelar: document.querySelectorAll("#galeria [data-revelar]").length,
          },
          protocolo: {
            etapas: document.querySelectorAll(".protocolo__etapas li").length,
            imagem: imagemProtocolo && { altura: Math.round(imagemProtocolo.height), largura: Math.round(imagemProtocolo.width) },
            revelar: document.querySelectorAll("#protocolo [data-revelar]").length,
          },
        },
      };
    });

    if (medidas.documento.scrollWidth > quadro.largura + 1) {
      throw new Error(`Overflow em ${quadro.nome}: ${medidas.documento.scrollWidth}px para ${quadro.largura}px`);
    }
    if (medidas.unhas.servicos !== 4 || medidas.unhas.imagens.some((imagem) => imagem.altura === 0 || imagem.largura === 0)) {
      throw new Error(`Seção unhas incompleta em ${quadro.nome}`);
    }
    if (
      medidas.novasSecoes.credenciais.itens !== 4
      || medidas.novasSecoes.credenciais.revelar !== 5
      || medidas.novasSecoes.protocolo.etapas !== 4
      || medidas.novasSecoes.protocolo.revelar !== 7
      || !medidas.novasSecoes.protocolo.imagem
      || medidas.novasSecoes.protocolo.imagem.altura === 0
      || medidas.novasSecoes.protocolo.imagem.largura === 0
      || medidas.novasSecoes.galeria.itens !== 6
      || medidas.novasSecoes.galeria.revelar !== 8
      || medidas.novasSecoes.galeria.imagens.some((imagem) => imagem.altura === 0 || imagem.largura === 0)
      || medidas.novasSecoes.contratos.some((contrato) => !contrato)
    ) {
      throw new Error(`Credenciais, protocolo ou galeria incompletos em ${quadro.nome}`);
    }
    if (quadro.nome === "540" && medidas.grade.split(" ").length !== 2) {
      throw new Error(`Grade de serviços não tem duas colunas em ${quadro.nome}`);
    }
    if (quadro.nome === "1440" && Math.abs(medidas.hero.alturaConteudo - medidas.hero.alturaPainel) > 1) {
      throw new Error(`Painel e conteúdo do hero diferem em ${quadro.nome}`);
    }

    if (quadro.nome === "390") {
      await pagina.screenshot({ animations: "disabled", path: path.join(destino, "dia-390-viewport.png") });
    } else {
      await pagina.screenshot({
        animations: "disabled",
        path: path.join(destino, `dia-${quadro.nome}-viewport.png`),
      });
      await pagina.locator("#hero").screenshot({
        animations: "disabled",
        path: path.join(destino, `dia-${quadro.nome}-hero.png`),
      });
      await pagina.addStyleTag({ content: ".alternador-tema, .pular-conteudo, .topo { display: none !important; }" });
      await pagina.locator("#servicos").screenshot({
        animations: "disabled",
        path: path.join(destino, `dia-${quadro.nome}-servicos.png`),
      });
      await pagina.locator("#unhas").screenshot({
        animations: "disabled",
        path: path.join(destino, `dia-${quadro.nome}-unhas.png`),
      });
      await pagina.locator("#credenciais").screenshot({
        animations: "disabled",
        path: path.join(destino, `dia-${quadro.nome}-credenciais.png`),
      });
      await pagina.locator("#protocolo").screenshot({
        animations: "disabled",
        path: path.join(destino, `dia-${quadro.nome}-protocolo.png`),
      });
      await pagina.locator("#galeria").screenshot({
        animations: "disabled",
        path: path.join(destino, `dia-${quadro.nome}-galeria.png`),
      });
    }

    resultados.push({ quadro: quadro.nome, medidas });
    await pagina.close();
  }
} finally {
  await navegador.close();
}

console.log(JSON.stringify(resultados, null, 2));
