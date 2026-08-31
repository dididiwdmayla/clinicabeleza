import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const executavel = "/tmp/chromium";
const origem = process.env.CAPTURE_URL ?? "http://127.0.0.1:3000";
const destino = path.resolve(process.env.CAPTURE_DIR ?? "verificacao/marco-topo-hero-servicos");
const temas = ["noite", "dia", "oxido", "mineral"];
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
    const pagina = await navegador.newPage({
      deviceScaleFactor: 1,
      viewport: { width: quadro.largura, height: quadro.altura },
    });

    for (const tema of temas) {
      await pagina.goto(`${origem}/?shot=1`, { waitUntil: "load" });
      await pagina.evaluate((temaAtual) => {
        localStorage.setItem("estudio-nove-tema", temaAtual);
        document.documentElement.dataset.theme = temaAtual;
        document.documentElement.style.colorScheme = temaAtual === "dia" ? "light" : "dark";
        window.dispatchEvent(new Event("estudio-nove:tema"));
      }, tema);
      await pagina.waitForFunction(
        (temaAtual) => document.querySelector(`[data-opcao="${temaAtual}"]`)?.getAttribute("aria-checked") === "true",
        tema,
      );
      await pagina.waitForFunction(() => document.querySelectorAll(".servicos__cartao").length === 5);
      await pagina.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          Array.from(document.images, (imagem) => imagem.complete
            ? Promise.resolve()
            : new Promise((resolver) => imagem.addEventListener("load", resolver, { once: true }))),
        );
      });

      const medidas = await pagina.evaluate(() => {
        const cartoes = Array.from(document.querySelectorAll(".servicos__cartao"));
        return {
          cards: cartoes.map((cartao) => {
            const caixa = cartao.getBoundingClientRect();
            return { altura: Math.round(caixa.height), largura: Math.round(caixa.width) };
          }),
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        };
      });

      if (medidas.scrollWidth > quadro.largura + 1) {
        throw new Error(`Overflow em ${tema}/${quadro.nome}: ${medidas.scrollWidth}px para ${quadro.largura}px`);
      }
      if (medidas.cards.length !== 5) {
        throw new Error(`Catálogo incompleto em ${tema}/${quadro.nome}: ${medidas.cards.length} cards`);
      }
      if (medidas.cards.some((card) => card.altura === 0 || card.largura === 0)) {
        throw new Error(`Card com dimensão nula em ${tema}/${quadro.nome}`);
      }

      await pagina.screenshot({
        animations: "disabled",
        fullPage: true,
        path: path.join(destino, `${tema}-${quadro.nome}.png`),
      });
      resultados.push({ alturaViewport: quadro.altura, larguraViewport: quadro.largura, medidas, tema });
    }

    await pagina.close();
  }
} finally {
  await navegador.close();
}

console.log(JSON.stringify(resultados, null, 2));
