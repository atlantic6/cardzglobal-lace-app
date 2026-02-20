import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import zh from "./locales/zh";
import fr from "./locales/fr";
import de from "./locales/de";
import es from "./locales/es";
import ar from "./locales/ar";
import pt from "./locales/pt";
import ja from "./locales/ja";
import ko from "./locales/ko";
import hi from "./locales/hi";
import it from "./locales/it";
import ru from "./locales/ru";
import tr from "./locales/tr";
import nl from "./locales/nl";
import vi from "./locales/vi";

export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "zh", label: "中文", flag: "🇨🇳", dir: "ltr" },
  { code: "ar", label: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "fr", label: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "es", label: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "pt", label: "Português", flag: "🇧🇷", dir: "ltr" },
  { code: "ja", label: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "ko", label: "한국어", flag: "🇰🇷", dir: "ltr" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "it", label: "Italiano", flag: "🇮🇹", dir: "ltr" },
  { code: "ru", label: "Русский", flag: "🇷🇺", dir: "ltr" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱", dir: "ltr" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳", dir: "ltr" },
];

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
    fr: { translation: fr },
    de: { translation: de },
    es: { translation: es },
    ar: { translation: ar },
    pt: { translation: pt },
    ja: { translation: ja },
    ko: { translation: ko },
    hi: { translation: hi },
    it: { translation: it },
    ru: { translation: ru },
    tr: { translation: tr },
    nl: { translation: nl },
    vi: { translation: vi },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
