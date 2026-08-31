import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const destino = path.resolve("public/img");

await mkdir(destino, { recursive: true });

async function gerar(nome, largura, altura) {
  await sharp({
    create: {
      width: largura,
      height: altura,
      channels: 3,
      background: "#77736b",
    },
  })
    .webp({ quality: 84 })
    .toFile(path.join(destino, nome));
}

await Promise.all([
  gerar("hero-retrato.webp", 960, 1200),
  gerar("hero-paisagem.webp", 1600, 900),
]);
