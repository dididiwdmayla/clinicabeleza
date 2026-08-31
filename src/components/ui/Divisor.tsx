import { cn } from "@/lib/cn";

export function Divisor({ className }: Readonly<{ className?: string }>) {
  return <hr className={cn("m-0 border-0 border-t border-linha", className)} />;
}

