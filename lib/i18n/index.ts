export { I18nProvider, useTranslation } from "./context";
export { dictionaries, getDictionary } from "./dictionaries";
export { LOCALES } from "./types";
export type { Locale, Dictionary, SeasonContent } from "./types";

import { LOCALES, type Locale } from "./types";

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}
