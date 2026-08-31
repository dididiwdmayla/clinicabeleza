import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type RotuloProps = Readonly<{
  children: ReactNode;
  className?: string;
}> &
  Omit<HTMLAttributes<HTMLSpanElement>, "children" | "className">;

export function Rotulo({ children, className, ...atributos }: RotuloProps) {
  return (
    <span
      className={cn("font-tecnica text--1 uppercase tracking-tecnica text-tinta-2", className)}
      {...atributos}
    >
      {children}
    </span>
  );
}
