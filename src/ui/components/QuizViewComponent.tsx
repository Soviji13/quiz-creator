/* Vista de un quiz */

import { TestAnswerComponent } from "./TestAnswerComponent"
import { useTest } from "../hooks/useQuiz"
import { QuizQuestion } from "../../types/quiz";
import { OVER_SCORE } from '../../constants'
import { QuizBlockComponent } from "./QuizBlockComponent";
import { OpenEndedAnswerComponent } from "./OpenEndedAnswerComponent";

export function QuizViewComponent ({ quizQuestions }: {quizQuestions: QuizQuestion[]}) {

  const { 
    toggleTestAnswer,
    updateOpenEndedSelection, 
    testSelections, 
    openEndedSelections,
    clearSelections,
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
            <OpenEndedAnswerComponent 
              showResults={showResults}
              blockId={block.id}
              updateAnswer={updateOpenEndedSelection}
              answer={block.correctAnswer.answer}
              value={openEndedSelections[block.id] ?? ""}
              keyWords={block.correctAnswer.keyWords}
            />
          ) : (<p>No se corresponde a ningún tipo</p>)
        }
        </QuizBlockComponent>
      ))} 
      <div style={{display: 'flex', alignItems: 'center'}}>
        <button 
          className="button"
          onClick={() => {getResults(quizQuestions)}}
        >
          Comprobar resultados
        </button>
        <button 
          className="button"
          type="button"
          onClick={() => clearSelections()}
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