/* Bloques de preguntas */

import { QuizBlock } from "./quiz";
import { ChoiceAnswer, OpenEndedAnswer } from "./answers";

// Bloque de pregunta tipo test 
export interface ChoiceQuestionBlock extends QuizBlock {
  choices: ChoiceAnswer[];
  type: 'choice'
}

// Bloque de pregunta de desarrollo
export interface OpenEndedBlock extends QuizBlock {
  correctAnswer: OpenEndedAnswer;
  type: 'open-ended'
}