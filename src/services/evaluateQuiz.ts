/* Evalúa un quiz total */

// En scope: solo tipo test y que coincidan todas las respuestas
// Fuera de scope: Añadir más tipo y que incorrectas en tipo test resten si el usuario activa la opción

import type { TestQuestion } from "../types/test";
import type { QuizResult } from "../types/quiz";
import { OVER_SCORE } from "../constants";

export function evaluateQuiz (testQuestions: TestQuestion[], userAnswers: Record<string, string[]>): QuizResult {

  let correctCount = 0;
  let totalQuestions = 0;

  // Iteramos sobre cada pregunta
  for (const question of testQuestions) {

    const selectedAnswers = userAnswers[question.id] ?? [];
    let correctUserCount = 0;
    const correctAnswers = question.answers.filter(answer => {
      return answer.correct;
    })

    // Comprobamos que el usuario ha pulsado sobre el mismo o menor número de respuestas que el número de respuestas correctas
    if (selectedAnswers && selectedAnswers.length <= correctAnswers.length ) {
      // Comprobamos ahora el número de correctas
      correctUserCount = correctAnswers.filter(questionAnswer => {
        return selectedAnswers.includes(questionAnswer.id);
      }).length
    }
    
    if (correctAnswers.length > 0) {
      correctCount += correctUserCount/correctAnswers.length;
    }
    totalQuestions++;
  }

  return {
    totalQuestions,
    correctCount,
    score: totalQuestions > 0 ? Number((correctCount/totalQuestions * OVER_SCORE).toFixed(2)) : 0
  }
}