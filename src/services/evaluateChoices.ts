/* Evalúa un quiz total */

// En scope: solo tipo test y que coincidan todas las respuestas
// Fuera de scope: Añadir más tipo y que incorrectas en tipo test resten si el usuario activa la opción

import type { ChoiceQuestionBlock } from "../types/questions";
import type { Result } from "../types/results";

export function evaluateChoices (testQuestions: ChoiceQuestionBlock[], userAnswers: Record<string, string[]>): Result {

  let correctCount = 0;
  let totalQuestions = 0;

  // Iteramos sobre cada pregunta
  for (const question of testQuestions) {

    const selectedAnswers = new Set(userAnswers[question.id] ?? []);
    let correctUserCount = 0;
    const correctAnswers = question.choices.filter(c => {
      return c.correct;
    })

    // Comprobamos que el usuario ha pulsado sobre el mismo o menor número de respuestas que el número de respuestas correctas
    if (selectedAnswers.size <= correctAnswers.length ) {
      // Comprobamos ahora el número de correctas
      correctUserCount = correctAnswers.filter(a => selectedAnswers.has(a.id)).length;
    }
    
    if (correctAnswers.length > 0) {
      correctCount += correctUserCount/correctAnswers.length;
    }
    totalQuestions++;
  }

  return {
    totalQuestions,
    correctCount,
  }
}