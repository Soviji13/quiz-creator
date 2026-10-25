/* Transforma el texto del bloque introducido en uno TestQuestion[] */

/**
 * Formato de preguntas esperado:
 * ```
 * # Pregunta 1
 * [] Respuesta
 * [] Respuesta
 * [] Respuesta
 * ---
 * # Pregunta 2
 * [] Respuesta
 * [] Respuesta
 * [] Respuesta
 * 
 * ```
 */

/* Fuera de scope: detectar respuesta correcta */

import type { TestAnswer, TestQuestion } from "../types/test";
import { INPUT_QUIZ_SEPARATOR, LINE_QUIZ_SEPARATOR } from "../constants";

export const QUESTION_TEST_INDICATOR = '#';
export const ANSWER_TEST_INDICATOR = '[]';


export function parseTest (input: string): TestQuestion[] {

  // Comprobamos si el input no ha sido nulo
  const inputTrimmed = input.trim();
  if (!inputTrimmed) return [];

  const testQuestions: TestQuestion[] = [];

  // Separamos los bloques de las distintas preguntas con sus respuestas 
  const questionBlocks = inputTrimmed.split(INPUT_QUIZ_SEPARATOR);

  // Iteramos sobre cada bloque de preguntas
  for (const questionBlock of questionBlocks) {

    const lines = questionBlock.split(LINE_QUIZ_SEPARATOR);
    let question = "";

    const answers: TestAnswer[] = [];
    let gotQuestion = false;

    // Iteramos por cada línea para obtener pregunta o respuesta
    for (const line of lines) {
      const testLine = line.trim();

      // Si es una pregunta
      if (testLine.startsWith(QUESTION_TEST_INDICATOR) && !gotQuestion) {
        question = testLine.replace(QUESTION_TEST_INDICATOR, "").trim();
        gotQuestion = true;

      // Si es una respuesta
      } else if (testLine.startsWith(ANSWER_TEST_INDICATOR)) {
        const answer = testLine.replace(ANSWER_TEST_INDICATOR, "").trim();

        const testAnswer: TestAnswer = {
          text: answer,
          correct: false
        }

        answers.push(testAnswer);
      }

    }

    // Almacenamos la pregunta y sus respuestas
    if (question && answers.length > 0) {
      const testQuestion: TestQuestion = {
        question,
        answers
      }

      testQuestions.push(testQuestion);
    }
  }

  return testQuestions;
}