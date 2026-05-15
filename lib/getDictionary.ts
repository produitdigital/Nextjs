import fr from "@/dictionaries/fr.json";
import en from "@/dictionaries/en.json";

export const dictionaries = { fr, en };

export function getDictionary(lang: "fr" | "en") {
  return dictionaries[lang] || dictionaries.fr;
}
