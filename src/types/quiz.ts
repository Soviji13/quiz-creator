/* Tipos de un quiz genérico */

import { ChoiceQuestionBlock, OpenEndedBlock } from "./questions";

type QuestionType = 'choice' | 'open-ended';

/* Bloque de pregunta + resupuesta de un quiz */
export interface QuizBlock {
  id: string;
  question: string;
  type: QuestionType;
}

// Tipos de preguntas y respuestas
export type QuizQuestion = ChoiceQuestionBlock | OpenEndedBlock;

/* Evaluación total del quiz */
export interface QuizResult {
  totalQuestions: number;
  correctCount: number;
  score: number;
}