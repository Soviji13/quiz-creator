export interface TestAnswerProps {
  children: string;
}

export function TestAnswerComponent ({children}: TestAnswerProps) {
  return (
    <div className="quiz-creator-test-answer">
      <p>{children}</p>
    </div>
  )
}