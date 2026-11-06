/* Funciones que conectan la interfaz con evaluateQuiz */

import { useState } from "react";
import { Result } from "../../types/results";
import { ChoiceQuestionBlock } from "../../types/questions";
import { evaluateChoices } from "../../services/evaluateChoices";
import { OVER_SCORE } from "../../constants";

type TestSelections = Record<string, string[]>;

export function useTest () {

  // Se inicializa a 0
  const [testSelections, setTestSelections] = useState<TestSelections>({});
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState<Result>({
    totalQuestions: 0,
    correctCount: 0,
  });
  const [score, setScore] = useState(0);

  /* Marcar o desmarcar tipo test */
  const toggleTestAnswer = (answerId: string, questionId: string) => {
    setTestSelections((prev) => {

      const selectedAnswers = prev[questionId] ?? [];

      const updatedSelectedAnswers = selectedAnswers.includes(answerId) 
        ? selectedAnswers.filter(id => answerId !== id) 
        : [...selectedAnswers, answerId]

      return {
        ...prev,
        [questionId]: updatedSelectedAnswers 
      };
    });
  };

  /* Obtener los resultados del tipo test - Auxiliar */
  const getChoicesResults = (testQuestions: ChoiceQuestionBlock[]): Result => {
    setShowResults(true);
    return(evaluateChoices(testQuestions, testSelections));

  };

  /* Obtener los resultados del desarrollo - Auxiliar, aún no implementada */
  const getOpenEndedResults = () => {
    return 0;
  };

  /* Posteriormente actualizar también con las de desarrollo */
  const getResults = (testQuestions: ChoiceQuestionBlock[]) => {

    const choicesResults = getChoicesResults(testQuestions);

    setQuizResult({
      totalQuestions: choicesResults.totalQuestions,
      correctCount: choicesResults.correctCount
    });

    setScore(5);
    //setScore(quizResult.correctCount / quizResult.totalQuestions * OVER_SCORE);
  }


  /* Limpiar vistas */
  const clearTestSelections = () => {
    setTestSelections({});
    setQuizResult({totalQuestions: 0, correctCount: 0});
    setShowResults(false);
  };

  return { 
    toggleTestAnswer, 
    testSelections, 
    clearTestSelections,
    getResults,
    showResults,
    quizResult,
    score
  };
}