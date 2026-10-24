// Pantalla que se ve al pulsar en los ajustes del plugin

import { App, PluginSettingTab, Setting } from "obsidian";
import QuizCreatorPlugin from "../main";

export class MySettingTab extends PluginSettingTab {

  plugin: QuizCreatorPlugin;

  constructor (app: App, plugin: QuizCreatorPlugin) {
    super (app, plugin);
    this.plugin = plugin;
  }

  // display() es donde se construye el contenido de los ajustes
  display(): void {

    // Obtenemos la referencia al contenido del settingTab
    let { containerEl } = this;

    containerEl.empty();

    // Asignamos un nuevo ajuste para cambiar el saludo
    new Setting (containerEl)
      .setName('Ajuste de prueba')
      .addText((text) => {
        text
          .setPlaceholder('Elija un valor')
          .setValue(this.plugin.settings.greeting)
          .onChange(async (value) => {
            this.plugin.settings.greeting = value;
            await this.plugin.saveSettings();
          })
      })

  }
}
