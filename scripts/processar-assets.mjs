import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const raiz = process.cwd();
const entrada = path.join(raiz, "upload", "assets");
const destino = path.join(raiz, "public", "img", "assets");
const folhaContato = path.join(raiz, "verificacao", "assets-folha-contato.webp");

const assets = [
  { id: "a", nome: "a-gel-curado.webp", largura: 800, altura: 800, qualidade: 76 },
  { id: "b", nome: "b-fibra-vidro.webp", largura: 800, altura: 800, qualidade: 76 },
  { id: "c", nome: "c-pinca-aco.webp", largura: 800, altura: 800, qualidade: 76 },
  { id: "d", nome: "d-frasco-ambar.webp", largura: 1120, altura: 1400, qualidade: 82 },
  { id: "e", nome: "e-cabine-led.webp", largura: 1120, altura: 1400, qualidade: 82 },
  { id: "f", nome: "f-pincel-nail-art.webp", largura: 1120, altura: 1400, qualidade: 82 },
  { id: "g", nome: "g-espatula-extracao.webp", largura: 1120, altura: 1400, qualidade: 82 },
  { id: "h", nome: "h-kit-manicure-explodido.webp", largura: 1200, altura: 675, qualidade: 82 },
  { id: "i", nome: "i-protocolo-pele-explodido.webp", largura: 1200, altura: 675, qualidade: 82 },
  { id: "j", nome: "j-cera-000.webp", largura: 1400, altura: 1400, qualidade: 82 },
  { id: "k", nome: "k-cera-120.webp", largura: 1400, altura: 1400, qualidade: 82 },
  { id: "l", nome: "l-cera-240.webp", largura: 1400, altura: 1400, qualidade: 82 },
];

await Promise.all([
  mkdir(destino, { recursive: true }),
  mkdir(path.dirname(folhaContato), { recursive: true }),
]);

async function processar(asset) {
  const origem = path.join(entrada, `${asset.id}.png`);
  const metadata = await sharp(origem).metadata();

  if (!metadata.hasAlpha) {
    throw new Error(`${asset.id}.png não possui canal alfa real.`);
  }

  const recorte = await sharp(origem)
    .ensureAlpha()
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 8 })
    .png()
    .toBuffer();

  const margem = 0.92;
  const conteudo = await sharp(recorte)
    .resize({
      width: Math.round(asset.largura * margem),
      height: Math.round(asset.altura * margem),
      fit: "inside",
      withoutEnlargement: true,
    })
    .png()
    .toBuffer({ resolveWithObject: true });

  const esquerda = Math.floor((asset.largura - conteudo.info.width) / 2);
  const topo = Math.floor((asset.altura - conteudo.info.height) / 2);
  const saida = path.join(destino, asset.nome);

  await sharp({
    create: {
      width: asset.largura,
      height: asset.altura,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: conteudo.data, left: esquerda, top: topo }])
    .webp({
      preset: "photo",
      quality: asset.qualidade,
      alphaQuality: 60,
      effort: 6,
      smartSubsample: false,
    })
    .toFile(saida);

  const peso = (await stat(saida)).size;
  return { ...asset, caminho: saida, peso };
}

const resultados = [];
for (const asset of assets) {
  resultados.push(await processar(asset));
}

const colunas = 4;
const linhas = 3;
const celulaLargura = 360;
const celulaAltura = 300;
const fundo = { r: 45, g: 47, b: 46, alpha: 1 };
const composicoes = [];

for (const [indice, asset] of resultados.entries()) {
  const miniatura = await sharp(asset.caminho)
    .ensureAlpha()
    .resize({
      width: 300,
      height: 238,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  const meta = await sharp(miniatura).metadata();
  const coluna = indice % colunas;
  const linha = Math.floor(indice / colunas);
  const esquerda = coluna * celulaLargura + Math.floor((celulaLargura - meta.width) / 2);
  const topo = linha * celulaAltura + 36 + Math.floor((238 - meta.height) / 2);
  const rotulo = Buffer.from(
    `<svg width="${celulaLargura}" height="36" xmlns="http://www.w3.org/2000/svg"><text x="18" y="24" fill="#f3efe6" font-family="monospace" font-size="13">${asset.id.toUpperCase()} · ${asset.nome}</text></svg>`,
  );

  composicoes.push(
    { input: miniatura, left: esquerda, top: topo },
    { input: rotulo, left: coluna * celulaLargura, top: linha * celulaAltura },
  );
}

await sharp({
  create: {
    width: colunas * celulaLargura,
    height: linhas * celulaAltura,
    channels: 4,
    background: fundo,
  },
})
  .composite(composicoes)
  .webp({ quality: 82, effort: 6 })
  .toFile(folhaContato);

const total = resultados.reduce((soma, asset) => soma + asset.peso, 0);
for (const asset of resultados) {
  console.log(`${asset.id}\t${asset.nome}\t${asset.largura}x${asset.altura}\tq${asset.qualidade}\t${asset.peso} B`);
}
console.log(`TOTAL\t${total} B`);

if (total >= 700_000) {
  process.exitCode = 2;
}
