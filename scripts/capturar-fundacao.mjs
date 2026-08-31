import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const executavel = "/tmp/chromium";
const origem = process.env.CAPTURE_URL ?? "http://127.0.0.1:3000";
const destino = path.resolve(process.env.CAPTURE_DIR ?? "verificacao/fundacao");
const temas = ["noite", "dia", "oxido", "mineral"];
const quadros = [
  { nome: "mobile", largura: 390, altura: 844 },
  { nome: "desktop", largura: 1440, altura: 900 },
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

try {
  for (const quadro of quadros) {
    const pagina = await navegador.newPage({
      deviceScaleFactor: 1,
      viewport: { width: quadro.largura, height: quadro.altura },
    });

    for (const tema of temas) {
      await pagina.goto(origem, { waitUntil: "load" });
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
      await pagina.screenshot({
        animations: "disabled",
        path: path.join(destino, `${tema}-${quadro.nome}.png`),
      });
    }

    await pagina.close();
  }
} finally {
  await navegador.close();
}
