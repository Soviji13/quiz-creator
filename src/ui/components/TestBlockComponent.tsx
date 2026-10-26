import React from "react";

export interface TestBlockProps {
  question: string;
  children: React.ReactNode;
}

export function TestBlockComponent ({question, children}: TestBlockProps) {
  return (
    <div className="quiz-creator-test-block">
      <p style={{fontWeight: 600}}>{question}</p>
      <div>
        {children}
      </div>
    </div>
  )
}