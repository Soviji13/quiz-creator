/* Vista de un quiz */

import { TestQuestion } from "../../types/answers"
import { TestBlockComponent } from "./TestBlockComponent"
import { TestAnswerComponent } from "./TestAnswerComponent"
import { useTest } from "../hooks/useTest"
import { OVER_SCORE } from "../../constants"

export function QuizViewComponent ({ testQuestions }: {testQuestions: TestQuestion[]}) {

  const { 
    toggleTestAnswer, 
    testSelections, 
    clearTestSelections,
    getResults,
    showResults,
    quizResult
  } = useTest();
  
  return (
    <div>
      { testQuestions.map((testQuestion, i) => (
          <TestBlockComponent 
            question={`${i+1}. ${testQuestion.question}`} 
            key={testQuestion.id}
            showResults={showResults}
          >
            { testQuestion.answers.map((testAnswer) => (
                <TestAnswerComponent 
                  showResults={showResults}
                  key={testAnswer.id}
                  isActive={ testSelections[testQuestion.id]?.includes(testAnswer.id) ?? false}
                  isCorrect={ testAnswer.correct }
                  onClick={() => toggleTestAnswer(testAnswer.id, testQuestion.id)}
                >
                  {testAnswer.text}
                </TestAnswerComponent>
              )) 
            }
          </TestBlockComponent>
        )) 
      } 
      <div style={{display: 'flex', alignItems: 'center'}}>
        <button 
          className="button"
          onClick={() => getResults(testQuestions)}
        >
          Comprobar resultados
        </button>
        <button 
          className="button"
          type="button"
          onClick={() => clearTestSelections()}
        >
          Limpiar
        </button>
        {showResults &&
          <p 
            style={{
              fontWeight: 600, 
              margin: '0px',
              marginLeft: '10px',
            }}
          >
            {`Resultado: ${quizResult.correctCount} / ${quizResult.totalQuestions} (${quizResult.score} / ${OVER_SCORE})`}
          </p>
        }
      </div>
    </div>
  )
}