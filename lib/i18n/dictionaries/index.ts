import { DEFAULT_LOCALE, type Locale } from "../locales";
import type { Dictionary } from "../types";
import { fr } from "./fr";
import { en } from "./en";
import { de } from "./de";
import { es } from "./es";
import { it } from "./it";

export const dictionaries: Record<Locale, Dictionary> = { fr, en, de, es, it };

/** Accès au dictionnaire côté serveur (composants serveur, generateMetadata). */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
