// src/main.ts
import { Plugin } from "obsidian";
import { registerTestProcessor } from "./processors/quizProcessor";

export default class QuizCreatorPlugin extends Plugin {

  async onload() {
		registerTestProcessor(this);
  }
}