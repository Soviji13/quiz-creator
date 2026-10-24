// src/main.ts
import { Plugin } from "obsidian";
import { VIEW_TYPE_EXAMPLE } from "./constants";
import { registerCommands } from "./commands";
import { DEFAULT_SETTINGS, MyPluginSettings } from "./settings/settings";
import { MySettingTab } from "./settings/SettingTab";
import { ExampleView } from "./views/ExampleView";

export default class QuizCreatorPlugin extends Plugin {
	
  settings!: MyPluginSettings;

  async onload() {
    await this.loadSettings();

    this.registerView(VIEW_TYPE_EXAMPLE, (leaf) => new ExampleView(leaf));
    registerCommands(this);
    this.addSettingTab(new MySettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = { ...DEFAULT_SETTINGS, ...(await this.loadData()) };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}