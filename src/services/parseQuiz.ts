/* Transforma el texto del bloque introducido en uno quizBlock */

import { ChoiceAnswer, OpenEndedAnswer } from "../types/answers";
import { ChoiceQuestionBlock, OpenEndedBlock } from "../types/questions";
import { QuizQuestion } from "../types/quiz";
import { escapeRegex } from "../utils/regex";

/**
 * Formato de preguntas esperado:
 * ```
 * # Pregunta tipo test
 * [x] Respuesta correcta
 * [] Respuesta
 * [] Respuesta
 * ---
 * # Pregunta de desarrollo
 * > Respuesta
 * ```
**/

// Fuera de Scope: que la respuesta de desarrollo funcione y/o tenga keywords

// Constantes del quiz global
const QUESTION_INDICATOR = '#';
const INPUT_QUIZ_SEPARATOR = /\r?\n+\s*---\s*\r?\n+\s*/;
const LINE_QUIZ_SEPARATOR = /\r?\n+\s*/;

// Constantes del tipo test
const TEST_ANSWER_INDICATOR: [string, string] = [`[`, `]`];
const GOOD_TEST_ANSWER_INDICATOR = 'x';

// Constantes del tipo desarrollo
const OPEN_ENDED_ANSWER_INDICATOR = '>';


/* Función principal */
export function parseQuiz (input: string): QuizQuestion[] {

  let output: QuizQuestion[] = [];

  input = input.trim();
  if (!input) return output;

  // Iteramos sobre cada pregunta
  for (const questionBlock of input.split(INPUT_QUIZ_SEPARATOR)) {

    let question = '';
    let gotQuestion = false;

    let isChoice = false;
    let isOpenEnded = false;

    const choiceAnswers: ChoiceAnswer[] = [];
    let openEndedAnswer: OpenEndedAnswer = {id: '', answer: '', keyWords: []};

    // Iteramos sobre cada línea
    for (const line of questionBlock.split(LINE_QUIZ_SEPARATOR)) {

      // Si es una pregunta
      if (line.trim().startsWith(QUESTION_INDICATOR) && !gotQuestion) {
        question = line.replace(QUESTION_INDICATOR, "").trim();
        gotQuestion = true;

      // Si es una respuesta tipo test
      } else if (
        !isOpenEnded 
        && (testMatchers.isCorrect.test(line.trim()) 
          ||testMatchers.isIncorrect.test(line.trim()))
      ) {
        isChoice = addChoices(line, choiceAnswers);

      // Si es una respuesta de desarrollo
      } else if (
        !isChoice 
        && line.trim().startsWith(OPEN_ENDED_ANSWER_INDICATOR)
      ) {
        const openEndedParsed = createOpenEndedAnswer(line);
        if (openEndedParsed) {
          openEndedAnswer = openEndedParsed.answer;
          isOpenEnded = openEndedParsed.isOpenEnded;
        }
      }
    }

    // Construimos la pregunta
    addToQuiz (isOpenEnded, isChoice, openEndedAnswer, choiceAnswers, output, question);

  }

  return output;
}





/* Constante auxiliar para devolver los marcadores de tests correctos y no correctos */
const testMatchers = (() => {
  const [open, close] = TEST_ANSWER_INDICATOR;
  const safeOpen = escapeRegex(open);
  const safeClose = escapeRegex(close);
  const safeMarker = escapeRegex(GOOD_TEST_ANSWER_INDICATOR);

  return {
    isCorrect: new RegExp(`^\\s*${safeOpen}\\s*${safeMarker}\\s*${safeClose}`, 'i'),
    isIncorrect: new RegExp(`^\\s*${safeOpen}\\s*${safeClose}`)
  };
})();

/* Función auxiliar para almacenar las respuestas de un tipo test */
function addChoices (input: string, answers: ChoiceAnswer[]): boolean {
  // Comprobamos si la respuesta no es nula y extraemos su texto
  const choiceText = testMatchers.isCorrect.test(input.trim()) 
    ? input.replace(testMatchers.isCorrect, "").trim() 
    : input.replace(testMatchers.isIncorrect, "").trim();
        
  if (choiceText) {
    const choice: ChoiceAnswer = {
      id: crypto.randomUUID(),
      correct: testMatchers.isCorrect.test(input.trim()) ? true : false,
      text: choiceText
    };
    answers.push(choice);
    return true;
  }

  return false;
};

/* Función auxiliar para registrar una respuesta de desarrollo */
const createOpenEndedAnswer = (input: string) => {
  const openEndedText = input.replace(OPEN_ENDED_ANSWER_INDICATOR, '').trim();

  if (openEndedText) {
    const answer: OpenEndedAnswer = {
      id: crypto.randomUUID(),
      answer: openEndedText,
      keyWords: []
    };
    return {answer: answer,isOpenEnded: true};   
  }
  return null;
};

/* Función auxiliar para añadir una pregunta del tipo que sea al quiz */
function addToQuiz (
  isOpenEnded: boolean, 
  isChoice: boolean, 
  openEndedAnswer: OpenEndedAnswer, 
  choiceAnswers: ChoiceAnswer[], 
  quiz: QuizQuestion[],
  question: string
): void {
  if (choiceAnswers.length > 0 && !isOpenEnded && isChoice) {
    const choiceBlock: ChoiceQuestionBlock = {
      id: crypto.randomUUID(),
      question: question,
      choices: choiceAnswers
    };

    // Añadimos la pregunta al quiz completo
    quiz.push(choiceBlock);

  } else if (isOpenEnded && openEndedAnswer.id) {
    const openEndedBlock: OpenEndedBlock = {
      id: crypto.randomUUID(),
      question: question,
      correctAnswer: openEndedAnswer
    }

    quiz.push(openEndedBlock);
  }
}