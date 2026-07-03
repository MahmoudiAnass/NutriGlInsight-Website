export const i18n = {
  defaultLocale: "en",
  locales: ["en", "ar", "fr", "es"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  fr: "Français",
  es: "Español",
};

export const rtlLocales: Locale[] = ["ar"];

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

export function isLocale(value: string): value is Locale {
  return (i18n.locales as readonly string[]).includes(value);
}
