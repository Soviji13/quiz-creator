/* Registramos el test en .md a JSON por ahora */

import type QuizCreatorPlugin from "../main";
import { parseTest } from "../services/parseTest";

export function registerTestProcessor (plugin: QuizCreatorPlugin) {
  plugin.registerMarkdownCodeBlockProcessor ("quiz", (source, el) => {
    const test = parseTest(source);
    el.createEl("pre", {text: JSON.stringify(test)});
  })
}