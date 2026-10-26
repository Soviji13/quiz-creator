import { TestQuestion } from "../../types/test"
import { TestBlockComponent } from "./TestBlockComponent"
import { TestAnswerComponent } from "./TestAnswerComponent"

export function QuizViewComponent ({ testQuestions }: {testQuestions: TestQuestion[]}) {
  return (
    <div>
      { testQuestions.map((testQuestion, index) => (
        <TestBlockComponent question={(index + 1).toString() + ". " + testQuestion.question}>
          {testQuestion.answers.map((testAnswer) => (
            <TestAnswerComponent>{testAnswer.text}</TestAnswerComponent>
          ))}
        </TestBlockComponent>
      )) }
    </div>
  )
}