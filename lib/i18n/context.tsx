"use client";

import { createContext, useContext, useEffect } from "react";
import type { Locale, Dictionary } from "./types";
import { dictionaries } from "./dictionaries";

interface I18nContextValue {
  locale: Locale;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * La langue vient du segment d'URL (`/fr/…`, `/en/…`), pas d'un état client :
 * il n'y a donc pas de `setLocale`, on change de langue en changeant d'URL.
 * Cela garde une URL unique et indexable par langue.
 */
export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, t: dictionaries[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation doit être utilisé dans un I18nProvider");
  }
  return context;
}
