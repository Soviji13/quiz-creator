/* Funciones que conectan la interfaz con evaluateQuiz */

import { useState } from "react";
import { Result } from "../../types/results";
import { ChoiceQuestionBlock, OpenEndedBlock } from "../../types/questions";
import { evaluateChoices } from "../../services/evaluateChoices";
import { OVER_SCORE } from "../../constants";
import type { UserOpenEndedAnswers, UserTestSelections } from "../../types/answers";
import { QuizBlock } from "../../types/quiz";
import { evaluateOpenEnded } from "../../services/evaluateOpenEnded";

export function useTest () {

  // Tipo test
  const [testSelections, setTestSelections] = useState<UserTestSelections>({});

  // Tipo abierta
  const [openEndedSelections, setOpenEndedSelections] = useState<UserOpenEndedAnswers>({});

  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState<Result>({
    totalQuestions: 0,
    correctCount: 0,
  });
  
  const [score, setScore] = useState<number>(0);

  /* Marcar o desmarcar tipo test */
  const toggleTestAnswer = (answerId: string, questionId: string) => {
    setTestSelections((prev) => {

      const selectedAnswers = prev[questionId] ?? [];

      // Si la pregunta ya contenía a la respuesta, la quitamos. En caso contrario, la añadimos
      const updatedSelectedAnswers = selectedAnswers.includes(answerId) 
        ? selectedAnswers.filter(id => answerId !== id) 
        : [...selectedAnswers, answerId]

      return {
        ...prev,
        [questionId]: updatedSelectedAnswers 
      };
    });
  };

  /* Ir actualizando los valores de los inputs de preguntas abiertas */
  const updateOpenEndedSelection = (questionId: string, input: string) => {
    setOpenEndedSelections((prev) => {
      return {
        ...prev,
        [questionId]: input
      };
    });
  };

  /* Obtener resultados globales */
  const getResults = (quizQuestions: QuizBlock[]) => {

    // Obtenemos los tipo test
    const testQuestions: ChoiceQuestionBlock[] = quizQuestions.filter((q): q is ChoiceQuestionBlock => q.type === 'choice')
    const choicesResults = evaluateChoices(testQuestions, testSelections);

    // Obtenemos las tipo abiertas
    const openEndedQuestions: OpenEndedBlock[] = quizQuestions.filter((q): q is OpenEndedBlock => q.type === 'open-ended')
    const openEndedResults = evaluateOpenEnded(openEndedQuestions, openEndedSelections);
    
    const correctCount: number = choicesResults.correctCount + openEndedResults.correctCount;
    const totalQuestions: number = choicesResults.totalQuestions + openEndedResults.totalQuestions;

    setShowResults(true);

    setQuizResult({
      totalQuestions: totalQuestions,
      correctCount: correctCount
    });

    setScore(totalQuestions > 0 
      ? Number((correctCount / totalQuestions * OVER_SCORE).toFixed(2))
      : 0
    );
  }


  /* Limpiar vistas */
  const clearSelections = () => {
    setTestSelections({});
    setOpenEndedSelections({});
    setQuizResult({totalQuestions: 0, correctCount: 0});
    setShowResults(false);
  };

  return { 
    toggleTestAnswer, 
    updateOpenEndedSelection,
    testSelections, 
    openEndedSelections,
    clearSelections,
    getResults,
    showResults,
    quizResult,
    score
  };
}