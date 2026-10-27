/* Pasamos el input del usuario a render  */

import type QuizCreatorPlugin from "../main";
import { MarkdownRenderChild } from "obsidian";
import { parseTest } from "../services/parseTest";
import { createRoot } from "react-dom/client";
import { QuizViewComponent } from "../ui/components/QuizViewComponent"

// Test
export function registerTestProcessor (plugin: QuizCreatorPlugin) {
  plugin.registerMarkdownCodeBlockProcessor ("quiz", (source, el, ctx) => {
    const testQuestions = parseTest(source);

    const root = createRoot(el);
    root.render(<QuizViewComponent testQuestions={testQuestions} />)

    // Desmontar react
    const child = new MarkdownRenderChild(el);
    child.onunload = () => root.unmount();
    ctx.addChild(child);
  });
}