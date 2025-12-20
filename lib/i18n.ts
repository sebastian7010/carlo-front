import type { translations } from "./translations"

export const languages = [
  { code: "es" as const, name: "Español", flag: "🇪🇸" },
  { code: "en" as const, name: "English", flag: "🇺🇸" },
  { code: "zh" as const, name: "中文", flag: "🇨🇳" },
  { code: "hi" as const, name: "हिन्दी", flag: "🇮🇳" },
  { code: "ar" as const, name: "العربية", flag: "🇸🇦" },
  { code: "pt" as const, name: "Português", flag: "🇧🇷" },
  { code: "ru" as const, name: "Русский", flag: "🇷🇺" },
  { code: "fr" as const, name: "Français", flag: "🇫🇷" },
  { code: "ja" as const, name: "日本語", flag: "🇯🇵" },
  { code: "de" as const, name: "Deutsch", flag: "🇩🇪" },
  { code: "ko" as const, name: "한국어", flag: "🇰🇷" },
  { code: "it" as const, name: "Italiano", flag: "🇮🇹" },
  { code: "tr" as const, name: "Türkçe", flag: "🇹🇷" },
  { code: "vi" as const, name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "pl" as const, name: "Polski", flag: "🇵🇱" },
]

export const defaultLanguage = "es"

export type Language = (typeof languages)[0]
export type LanguageCode = keyof typeof translations
