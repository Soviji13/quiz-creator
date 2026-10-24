// Agrupamos todos los comandos que haya

import type QuizCreatorPlugin from "../main";
import { openExampleView } from "./openExampleView";

export function registerCommands (plugin: QuizCreatorPlugin) {
  plugin.addCommand({
    id: "open-example-view",
    name: "Abrir vista de ejemplo",
    callback: () => openExampleView(plugin.app),
  });
}