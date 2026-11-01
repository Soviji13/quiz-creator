/* Funciones que conectan la interfaz con evaluateQuiz */

import { useState } from "react";
import { QuizResult } from "../../types/quiz";
import { TestQuestion } from "../../types/test";
import { evaluateQuiz } from "../../services/evaluateQuiz";

type TestSelections = Record<string, string[]>;

export function useTest () {

  // Se inicializa a 0
  const [testSelections, setTestSelections] = useState<TestSelections>({});
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult>({
    totalQuestions: 0,
    correctCount: 0,
    score:0
  });

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

  const getResults = (testQuestions: TestQuestion[]) => {
    setShowResults(true);
    setQuizResult(evaluateQuiz(testQuestions, testSelections));
  };

  /* Limpiar vistas */
  const clearTestSelections = () => {
    setTestSelections({});
    setQuizResult({totalQuestions: 0, correctCount: 0, score: 0});
    setShowResults(false);
  };

  return { 
    toggleTestAnswer, 
    testSelections, 
    clearTestSelections,
    getResults,
    showResults,
    quizResult
  };
}