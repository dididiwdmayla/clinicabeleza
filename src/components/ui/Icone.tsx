import type { SVGProps } from "react";

type IconeProps = SVGProps<SVGSVGElement>;

export function IconeSeta(props: IconeProps) {
  return (
    <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 20 20" width="20" {...props}>
      <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

export function IconeTelefone(props: IconeProps) {
  return (
    <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 20 20" width="20" {...props}>
      <path d="M6.2 2.8 8 6.9 6.6 8.1c.9 2.1 2.5 3.7 4.6 4.6l1.2-1.4 4.1 1.8-.5 3.2c-.1.6-.7 1-1.3 1C8.2 16.7 3.3 11.8 2.7 5.3c-.1-.6.4-1.2 1-1.3l2.5-.4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

