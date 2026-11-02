/* Tipos de un quiz genérico */

import { ChoiceQuestionBlock, OpenEndedBlock } from "./questions";

/* Bloque de pregunta + resupuesta de un quiz */
export interface QuizBlock {
  id: string;
  question: string;
}

// Tipos de preguntas y respuestas
export type QuizQuestion = ChoiceQuestionBlock | OpenEndedBlock;