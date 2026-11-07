import React from "react";

export interface TestBlockProps {
  question: string;
  explanation?: string;
  showResults: boolean;
  children: React.ReactNode;
}

export function QuizBlockComponent ({question, children, showResults, explanation}: TestBlockProps) {
  return (
    <div className="quiz-creator-quiz-block">
      <p style={{fontWeight: 600}}>{question}</p>
      <div>
        {children}
      </div>
      {showResults && explanation && 
      <details className="quiz-creator-explanation">
        <summary><em>Ver explicación:</em></summary>
        <p><em>{explanation}</em></p>
      </details>
      }
    </div>
  )
}