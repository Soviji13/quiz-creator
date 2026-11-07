/* Vista de un quiz */

import { TestBlockComponent } from "./TestBlockComponent"
import { TestAnswerComponent } from "./TestAnswerComponent"
import { useTest } from "../hooks/useQuiz"
import { QuizQuestion } from "../../types/quiz";
import { OVER_SCORE } from '../../constants'
import { QuizBlockComponent } from "./QuizBlockComponent";

export function QuizViewComponent ({ quizQuestions }: {quizQuestions: QuizQuestion[]}) {

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
      { quizQuestions.map((block, i) => (
        <QuizBlockComponent
          question={`${i+1}. ${block.question}`} 
          showResults={showResults}
          key={block.id}
          {...(block.explanation && { explanation: block.explanation })} 
        >
          {/* Tipo test */}
          { block.type === 'choice' 
          ? (
            block.choices.map((choice) => (
              <TestAnswerComponent
                isActive={ testSelections[block.id]?.includes(choice.id) ?? false}
                key={choice.id}
                showResults={showResults}
                isCorrect={choice.correct}
                onClick={() => toggleTestAnswer(choice.id, block.id)}
              >
                {choice.text}
              </TestAnswerComponent>
            ))
          ) 
          /* Tipo desarrollo */
          : block.type === 'open-ended' 
          ? (
            <textarea cols={90} rows={3} placeholder="Inserte su respuesta"></textarea>
          ) : (<p>No se corresponde a ningún tipo</p>)
        }
          <p></p>
        </QuizBlockComponent>
      ))} 
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