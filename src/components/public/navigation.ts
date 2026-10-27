export const links = [
  ["Home", "home"],
  ["About", "about"],
  ["How It Works", "how-it-works"],
  ["FAQ", "faq"],
  ["Contact Us", "contact"],
];

export function navigationHref(id: string) {
  return id === "home" ? "/" : `/${id}`;
}

export function isNavigationActive(pathname: string, id: string) {
  return pathname === navigationHref(id);
}
