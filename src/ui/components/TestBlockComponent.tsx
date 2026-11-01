import React from "react";

export interface TestBlockProps {
  question: string;
  showResults: boolean;
  children: React.ReactNode;
}

export function TestBlockComponent ({question, children, showResults}: TestBlockProps) {
  return (
    <div className="quiz-creator-test-block">
      <p style={{fontWeight: 600}}>{question}</p>
      <div>
        {children}
      </div>
    </div>
  )
}