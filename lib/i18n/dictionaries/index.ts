import type { Locale, Dictionary } from "../types";
import { fr } from "./fr";
import { en } from "./en";

export const dictionaries: Record<Locale, Dictionary> = { fr, en };

/** Accès au dictionnaire côté serveur (composants serveur, generateMetadata). */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.fr;
}
