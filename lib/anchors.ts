import type { Locale } from "./i18n/types";
import { seasonFromSlug } from "./seasons";

/**
 * La page à laquelle rattacher les ancres de navigation (`#appartement`, `#reserver`…).
 *
 * L'accueil et les deux pages de saison portent les mêmes sections : depuis `/fr/ski`,
 * « L'appartement » doit défiler dans la page, pas renvoyer à l'accueil et faire perdre
 * au visiteur la saison qu'il consultait. Ailleurs — guide, mentions légales — ces
 * sections n'existent pas : l'ancre repart vers l'accueil.
 */
export function anchorBase(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments[1];
  if (segments.length === 2 && slug && seasonFromSlug(locale, slug)) {
    return `/${locale}/${slug}`;
  }
  return `/${locale}`;
}
