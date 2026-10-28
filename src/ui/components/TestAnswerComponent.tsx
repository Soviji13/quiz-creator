/* Componente de respuesta en tipo test */

import React from "react";

export interface TestAnswerProps extends React.HTMLAttributes<HTMLDivElement>{
  children: string;
  isActive: boolean;
  onClick: () => void;
}

export function TestAnswerComponent ({children, isActive, onClick}: TestAnswerProps) {

  return (
    <div 
      className={`quiz-creator-test-answer ${isActive ? "is-selected" : ""}`}
      role="button"
      tabIndex={0} 
      onClick={onClick}  
    >
      <p>{children}</p>
    </div>
  )
}