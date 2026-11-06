// src/main.ts
import { Plugin } from "obsidian";
import { registerQuizProcessor } from "./processors/quizProcessor";

export default class QuizCreatorPlugin extends Plugin {

  async onload() {
		registerQuizProcessor(this);
  }
}