import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const destino = path.resolve("public/img");

await mkdir(destino, { recursive: true });
await mkdir(path.join(destino, "equipe"), { recursive: true });

async function gerar(nome, largura, altura, variante = 0) {
  const tons = variante === 1
    ? { fundo: "#716d65", figura: "#4f504c", linha: "#b07834" }
    : { fundo: "#77736b", figura: "#575853", linha: "#ad7633" };
  const retrato = variante > 0
    ? Buffer.from(`<svg width="${largura}" height="${altura}" xmlns="http://www.w3.org/2000/svg"><defs><filter id="n"><feTurbulence baseFrequency=".7" numOctaves="2" seed="${variante}"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 .045 0"/></filter></defs><rect width="100%" height="100%" fill="${tons.fundo}"/><circle cx="50%" cy="32%" r="16%" fill="${tons.figura}"/><path d="M18 ${altura}C20 ${Math.round(altura * .63)} 33 ${Math.round(altura * .52)} 50 ${Math.round(altura * .52)}S80 ${Math.round(altura * .63)} 82 ${altura}Z" transform="scale(${largura / 100} 1)" fill="${tons.figura}"/><path d="M8 ${Math.round(altura * .78)}H${largura - 8}" stroke="${tons.linha}" stroke-width="4"/><rect width="100%" height="100%" filter="url(#n)" opacity=".34"/></svg>`)
    : null;
  const base = retrato ?? {
    create: {
      width: largura,
      height: altura,
      channels: 3,
      background: tons.fundo,
    },
  };

  await sharp(base)
    .webp({ quality: 84 })
    .toFile(path.join(destino, nome));
}

await Promise.all([
  gerar("hero-retrato.webp", 960, 1200),
  gerar("hero-paisagem.webp", 1600, 900),
  gerar("equipe/profissional-01.webp", 960, 1200, 1),
  gerar("equipe/profissional-02.webp", 960, 1200, 2),
]);
