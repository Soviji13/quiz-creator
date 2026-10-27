/* Tipos de un quiz tipo test */

// Respuesta
export interface TestAnswer {
  text: string;
  correct: boolean;
  id: string;
}

// Pregunta
export interface TestQuestion {
  id: string;
  question: string;
  answers: TestAnswer[];
}