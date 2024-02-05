import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, ua } from "./global-resources";
import AsyncStoragePlugin from "i18next-react-native-async-storage";

const resources = {
  en: {
    translation: en,
  },
  ua: {
    translation: ua,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(AsyncStoragePlugin("en"))
  .init({
    compatibilityJSON: "v3",
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
  })
  .catch((err) => {
    console.error("Initializing i18n failed:", err);
  });

// export function declareTranslations(namespace, translations) {
//   Object.keys(translations).forEach((language) => {
//     const resource = translations[language];
//     i18n.addResourceBundle(language, namespace, resource);
//   });
// }

export default i18n;
