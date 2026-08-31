import { contato } from "@/content/contato";

const baseWhatsApp = `https://wa.me/${contato.whatsapp}`;

export function criarLinkWhatsApp(mensagem: string) {
  return `${baseWhatsApp}?text=${encodeURIComponent(mensagem)}`;
}

export function criarLinkServico(nomeServico: string) {
  return criarLinkWhatsApp(
    `Olá, Estúdio Nove. Quero consultar horários para ${nomeServico}.`,
  );
}

export function criarLinkTelefone() {
  return `tel:${contato.telefoneInternacional}`;
}

