import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type BaseBotao = Readonly<{
  children: ReactNode;
  className?: string;
  variante?: "acento" | "contorno";
}>;

type BotaoLink = BaseBotao &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type BotaoAcao = BaseBotao &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

export type BotaoProps = BotaoLink | BotaoAcao;

const estilosBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-1 border px-4 py-3 font-texto text-sm font-semibold transition-[transform,color,background-color,border-color] duration-rapida ease-saida focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-foco active:scale-[0.98]";

export function Botao(props: BotaoProps) {
  const { className, variante = "acento" } = props;
  const classes = cn(
    estilosBase,
    variante === "acento"
      ? "border-acento bg-acento text-acento-tinta"
      : "border-linha bg-superficie text-tinta",
    className,
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, children: conteudo, className: _, variante: __, ...atributos } = props;
    void _;
    void __;
    return (
      <a className={classes} href={href} {...atributos}>
        {conteudo}
      </a>
    );
  }

  const { children: conteudo, className: _, variante: __, type = "button", ...atributos } = props;
  void _;
  void __;
  return (
    <button className={classes} type={type} {...atributos}>
      {conteudo}
    </button>
  );
}
