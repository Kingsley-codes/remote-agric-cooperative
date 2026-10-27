export const links = [
  ["Home", "home"],
  ["About", "about"],
  ["How It Works", "how-it-works"],
  ["Benefits", "benefits"],
  ["Our Impact", "impact"],
  ["FAQ", "faq"],
];

export function navigationHref(id: string) {
  return id === "about" || id === "how-it-works" ? `/${id}` : `/#${id}`;
}

export function isNavigationActive(pathname: string, id: string) {
  return (pathname === "/" && id === "home") ||
    ((id === "about" || id === "how-it-works") && pathname === `/${id}`);
}
