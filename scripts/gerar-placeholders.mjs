import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const destino = path.resolve("public/img");
const grao = path.join(destino, "grao.png");

await mkdir(destino, { recursive: true });

async function gerar(nome, largura, altura) {
  const textura = await sharp(grao)
    .flatten({ background: "#77736b" })
    .grayscale()
    .linear(0.12, 112)
    .ensureAlpha(0.08)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: largura,
      height: altura,
      channels: 3,
      background: "#77736b",
    },
  })
    .composite([{ input: textura, blend: "soft-light", tile: true }])
    .webp({ quality: 84 })
    .toFile(path.join(destino, nome));
}

await Promise.all([
  gerar("hero-retrato.webp", 960, 1200),
  gerar("hero-paisagem.webp", 1600, 900),
]);
