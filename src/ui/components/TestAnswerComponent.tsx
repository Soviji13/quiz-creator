/* Componente de respuesta en tipo test */

import React, { useState } from "react";
import { useTest } from "../hooks/useTest";

export interface TestAnswerProps extends React.HTMLAttributes<HTMLDivElement>{
  children: string;
  isActive: boolean;
  isCorrect: boolean;
  showResults: boolean;
  onClick: () => void;
}

type BorderColor = 'normal' | 'green' | 'red';

export function TestAnswerComponent ({children, isActive, onClick, isCorrect, showResults}: TestAnswerProps) {

  let borderColor: BorderColor = 'normal';

  if (showResults) {
    if (isActive) {
      borderColor = isCorrect ? 'green' : 'red';
    } else if (isCorrect) {
      borderColor = 'green';
    }
  } else {
    borderColor = 'normal';
  }

  return (
    <div 
      className={`quiz-creator-test-answer ${borderColor} ${isActive ? "is-selected" : ""}`}
      role="button"
      tabIndex={0} 
      onClick={() => !showResults ? onClick() : ''}  
    >
      <p>{children}</p>
    </div>
  )
}