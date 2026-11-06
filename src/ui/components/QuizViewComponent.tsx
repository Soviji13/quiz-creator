/* Vista de un quiz */

import { TestBlockComponent } from "./TestBlockComponent"
import { TestAnswerComponent } from "./TestAnswerComponent"
import { useTest } from "../hooks/useQuiz"
import { QuizQuestion } from "../../types/quiz";
import { OVER_SCORE } from '../../constants'

export function QuizViewComponent ({ quizQuestions }: {quizQuestions: QuizQuestion[]}) {

  console.log("quizQuestions en la vista:", quizQuestions);
  
  const { 
    toggleTestAnswer, 
    testSelections, 
    clearTestSelections,
    getResults,
    showResults,
    quizResult,
    score
  } = useTest();
  
  return (
    <div>
      { quizQuestions.map((block, i) => {

          /* Tipo test */ 
          if (block.type === 'choice') {
            return (
              <TestBlockComponent 
                question={`${i+1}. ${block.question}`} 
                showResults={showResults}
                key={block.id}
              >
                { block.choices.map((choice, i) => (
                  <TestAnswerComponent
                    isActive={ testSelections[block.id]?.includes(choice.id) ?? false}
                    key={choice.id}
                    showResults={showResults}
                    isCorrect={choice.correct}
                    onClick={() => toggleTestAnswer(choice.id, block.id)}
                  >
                    {choice.text}
                  </TestAnswerComponent>
                ))}
              </TestBlockComponent>
            );
          }

          /* Desarrollo */
          if (block.type === 'open-ended') {
            return (
              <p>Posteriormente se lanzará...</p>
            )
          }
      })} 
      <div style={{display: 'flex', alignItems: 'center'}}>
        <button 
          className="button"
          onClick={() => {getResults(quizQuestions.filter (
            (q) => {return q.type === 'choice'})
          )}}
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
            {`Resultado: ${quizResult.correctCount} / ${quizResult.totalQuestions} (${score} / ${OVER_SCORE})`}
          </p>
        }
      </div>
    </div>
  )
}