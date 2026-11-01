/* Componente de respuesta en tipo test */

import React from "react";

export interface TestAnswerProps extends React.HTMLAttributes<HTMLDivElement>{
  children: string;
  isActive: boolean;
  isCorrect: boolean;
  showResults: boolean;
  onClick: () => void;
}

type BorderColor = 'normal' | 'correct' | 'incorrect';

export function TestAnswerComponent ({children, isActive, onClick, isCorrect, showResults}: TestAnswerProps) {

  let borderColor: BorderColor = 'normal';

  if (showResults) {
    if (isActive) {
      borderColor = isCorrect ? 'correct' : 'incorrect';
    } else if (isCorrect) {
      borderColor = 'correct';
    }
  } else {
    borderColor = 'normal';
  }

  return (
    <div 
      className={`quiz-creator-test-answer ${borderColor} ${isActive ? "is-selected" : ""}`}
      role="button"
      tabIndex={0} 
      onClick={() => {if (!showResults) onClick();}}  
    >
      <p>{children}</p>
    </div>
  )
}