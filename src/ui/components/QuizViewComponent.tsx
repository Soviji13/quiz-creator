/* Vista de un quiz */

import { TestQuestion } from "../../types/test"
import { TestBlockComponent } from "./TestBlockComponent"
import { TestAnswerComponent } from "./TestAnswerComponent"
import { useState } from "react"

/* Diccionario k: testQuestion.id, v: array testAnswer.id seleccionadas */
type TestSelections = Record<string, string[]>;

export function QuizViewComponent ({ testQuestions }: {testQuestions: TestQuestion[]}) {

  const [testSelections, setTestSelections] = useState<TestSelections>({});

  /* Activa o desactiva el estar pulsado o no */
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
  
  return (
    <div>
      { testQuestions.map((testQuestion, i) => (
          <TestBlockComponent question={testQuestion.question} key={testQuestion.id}>
            { testQuestion.answers.map((testAnswer, j) => (
                <TestAnswerComponent 
                  key={testAnswer.id}
                  isActive={ testSelections[testQuestion.id]?.includes(testAnswer.id) ?? false}
                  onClick={() => toggleTestAnswer(testAnswer.id, testQuestion.id)}
                >
                  {testAnswer.text}
                </TestAnswerComponent>
              )) 
            }
          </TestBlockComponent>
        )) 
      } 
      <button className="finish-button">Comprobar resultados</button>
      <button 
        className="finish-button"
        type="button"
        onClick={() => setTestSelections({})}
      >
        Limpiar
      </button>
    </div>
  )
}