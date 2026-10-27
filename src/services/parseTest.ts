/* Transforma el texto del bloque introducido en uno TestQuestion[] */

/**
 * Formato de preguntas esperado:
 * ```
 * # Pregunta 1
 * [x] Respuesta correcta
 * [] Respuesta
 * [] Respuesta
 * ---
 * # Pregunta 2
 * [] Respuesta
 * [x] Respuesta correcta
 * [x] Respuesta correcta
 * 
 * ```
 */

// Fuera de scope: poder seleccionar el indicador de respuesta, pregunta y pregunta correcta

import type { TestAnswer, TestQuestion } from "../types/test";
import { INPUT_QUIZ_SEPARATOR, LINE_QUIZ_SEPARATOR } from "../constants";
import { escapeRegex } from "../utils/regex";

const QUESTION_INDICATOR = '#';
const ANSWER_INDICATOR: [string, string]= [`[`, `]`];
const GOOD_ANSWER_INDICATOR = `x`

/* Función auxiliar para devolver las respuestas correctas y no correctas */
function getAnswerMatchers(
  brackets = ANSWER_INDICATOR,
  marker = GOOD_ANSWER_INDICATOR
) {
  const [open, close] = brackets;
  const safeOpen = escapeRegex(open);
  const safeClose = escapeRegex(close);
  const safeMarker = escapeRegex(marker);

  return {
    isCorrect: new RegExp(`^\\s*${safeOpen}\\s*${safeMarker}\\s*${safeClose}`, 'i'),
    isIncorrect: new RegExp(`^\\s*${safeOpen}\\s*${safeClose}`)
  };
}


export function parseTest (input: string): TestQuestion[] {

  // Comprobamos si el input no ha sido nulo
  const inputTrimmed = input.trim();
  if (!inputTrimmed) return [];

  // Constantes
  const matcher = getAnswerMatchers();
  const testQuestions: TestQuestion[] = [];
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
      if (testLine.startsWith(QUESTION_INDICATOR) && !gotQuestion) {
        question = testLine.replace(QUESTION_INDICATOR, "").trim();
        gotQuestion = true;

      // Si es una respuesta común
      } else if (matcher.isCorrect.test(testLine) || matcher.isIncorrect.test(testLine)) {

        // Comprobamos si la respuesta no es nula
        const answerText = matcher.isCorrect.test(testLine) 
          ? testLine.replace(matcher.isCorrect, "").trim() 
          : testLine.replace(matcher.isIncorrect, "").trim();

        if (answerText) {
          const testAnswer: TestAnswer = {
            text: answerText,
            correct: matcher.isCorrect.test(testLine) ? true : false,
            id: crypto.randomUUID(),
          }

          answers.push(testAnswer);
        }
      } 

    }

    // Almacenamos la pregunta y sus respuestas
    if (question && answers.length > 0) {
      const testQuestion: TestQuestion = {
        question,
        answers,
        id: crypto.randomUUID(),
      }

      testQuestions.push(testQuestion);
    }
  }

  return testQuestions;
}