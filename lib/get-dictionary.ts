const dictionaries = {
  fr: () => import("../dictionaries/fr.json").then((module) => module.default),
  en: () => import("../dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  const lang = locale === "en" ? "en" : "fr";
  return dictionaries[lang]();
};
