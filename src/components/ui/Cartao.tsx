import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CartaoProps = Readonly<{
  children: ReactNode;
  className?: string;
}> &
  Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

export function Cartao({ children, className, ...atributos }: CartaoProps) {
  return (
    <div
      className={cn("rounded-2 border border-linha bg-superficie shadow-1", className)}
      {...atributos}
    >
      {children}
    </div>
  );
}

