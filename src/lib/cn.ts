export type ClasseCondicional = string | false | null | undefined;

export function cn(...classes: readonly ClasseCondicional[]) {
  return classes.filter(Boolean).join(" ");
}

