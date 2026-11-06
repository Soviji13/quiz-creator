/* Pasamos el input del usuario a render  */

import type QuizCreatorPlugin from "../main";
import { MarkdownRenderChild } from "obsidian";
import { parseQuiz } from "../services/parseQuiz";
import { createRoot } from "react-dom/client";
import { QuizViewComponent } from "../ui/components/QuizViewComponent"

// Test
export function registerQuizProcessor (plugin: QuizCreatorPlugin) {
  plugin.registerMarkdownCodeBlockProcessor ("quiz", (source, el, ctx) => {

    const quizQuestions = parseQuiz(source);

    const root = createRoot(el);
    root.render(<QuizViewComponent quizQuestions={quizQuestions} />)

    // Desmontar react
    const child = new MarkdownRenderChild(el);
    child.onunload = () => root.unmount();
    ctx.addChild(child);
  });
}