const seletor = "[data-revelar]";

export function iniciarRevelacao() {
  const elementos = Array.from(document.querySelectorAll<HTMLElement>(seletor));
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const modoCaptura = new URLSearchParams(window.location.search).get("shot") === "1";

  if (reduzirMovimento || modoCaptura || !("IntersectionObserver" in window)) {
    elementos.forEach((elemento) => elemento.setAttribute("data-revelado", ""));
    return () => undefined;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.setAttribute("data-revelado", "");
        observador.unobserve(entrada.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
  );

  elementos.forEach((elemento) => observador.observe(elemento));
  return () => observador.disconnect();
}
