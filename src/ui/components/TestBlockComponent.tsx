import React from "react";

export interface TestBlockProps {
  question: string;
  showResults: boolean;
  children: React.ReactNode;
}

export function TestBlockComponent ({question, children, showResults}: TestBlockProps) {
  return (
    <div className="quiz-creator-test-block">
      <p style={{fontWeight: 600}}>{question} {showResults ? <span style={{fontWeight: 900, marginLeft: '10px'}}>·</span> : ''}</p>
      <div>
        {children}
      </div>
    </div>
  )
}