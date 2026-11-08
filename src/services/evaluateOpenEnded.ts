import { UserOpenEndedAnswers } from "../types/answers";
import { OpenEndedBlock } from "../types/questions";
import { Result } from "../types/results";

export function evaluateOpenEnded (openEndedAnswers: OpenEndedBlock[], userInput: UserOpenEndedAnswers): Result {

  let totalQuestions = openEndedAnswers.length;
  let correctCount = 0;

  // Iteramos por cada bloque de pregunta abierta
  for (const block of openEndedAnswers) {

    // Obtenemos el input del usuario asociado a esa pregunta
    const userResponse = userInput[block.id]?.toLowerCase();

    // Comprobamos cuántas keywords se encuentran dentro
    if (userResponse) { 
      let totalKw = block.correctAnswer.keyWords.length;

      if (totalKw > 0) {
        let userKw = 0;

        for (const kw of block.correctAnswer.keyWords) {
          if (userResponse.includes(kw.toLowerCase())) userKw++;
        }

        correctCount += userKw / totalKw;
      }
    }
  }

  return {
    totalQuestions,
    correctCount
  }
}