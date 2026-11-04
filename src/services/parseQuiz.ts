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
    for (let line of questionBlock.split(LINE_QUIZ_SEPARATOR)) {

      line = line.trim();

      // Si es una pregunta
      if (line.startsWith(QUESTION_INDICATOR) && !gotQuestion) {
        question = line.replace(QUESTION_INDICATOR, "").trim();
        gotQuestion = true;

      // Si es una respuesta tipo test
      } else if (!isOpenEnded && line.match(CHOICE_REGEX)) {
        const choiceParsed = createChoice(line.match(CHOICE_REGEX));
        if (choiceParsed) {
          choiceAnswers.push(choiceParsed);
          isChoice = true;
        }

      // Si es una respuesta de desarrollo
      } else if (!isChoice && line.startsWith(OPEN_ENDED_ANSWER_INDICATOR)) {
        const openEndedParsed = createOpenEndedAnswer(line);
        if (openEndedParsed) {
          openEndedAnswer = openEndedParsed;
          isOpenEnded = true;
        }
      }
    }

    // Construimos la pregunta
    if (gotQuestion) addToQuiz (isOpenEnded, isChoice, openEndedAnswer, choiceAnswers, output, question);
  }

  return output;
}





/* Constante auxiliar para devolver los marcadores de tests correctos y no correctos */
const CHOICE_REGEX = (() => {
  const [open, close] = TEST_ANSWER_INDICATOR;
  const safeOpen = escapeRegex(open);
  const safeClose = escapeRegex(close);
  const safeMarker = escapeRegex(GOOD_TEST_ANSWER_INDICATOR);

  /**
   * [0] -> Línea completa que conicidió
   * [1] -> true si hay 'x'
   * [2] -> Texto de la opción 
   * */ 
  return new RegExp(`^\\s*${safeOpen}\\s*(${safeMarker})?\\s*${safeClose}\\s*(.+)$`, 'i');
})();



/* Función auxiliar para almacenar las elecciones de un tipo test */
const createChoice = (input: RegExpMatchArray | null) => {

  if (!input) return null; 

  if (input[2]) {
    const choice: ChoiceAnswer = {
      id: crypto.randomUUID(),
      correct: input[1] ? true : false,
      text: input[2]
    };

    return choice;
  } else {
    return null;
  }
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
    return answer;   
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

  // Si es multiopción
  if (choiceAnswers.length > 0 && !isOpenEnded && isChoice) {
    const choiceBlock: ChoiceQuestionBlock = {
      id: crypto.randomUUID(),
      question: question,
      choices: choiceAnswers
    };
    quiz.push(choiceBlock);

  // Si es de desarrollo
  } else if (isOpenEnded && openEndedAnswer.id) {
    const openEndedBlock: OpenEndedBlock = {
      id: crypto.randomUUID(),
      question: question,
      correctAnswer: openEndedAnswer
    }

    quiz.push(openEndedBlock);
  }
}