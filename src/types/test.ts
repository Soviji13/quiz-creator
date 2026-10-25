/* Tipos de un quiz tipo test */

// Respuesta
export interface TestAnswer {
  text: string;
  correct: boolean;
}

// Pregunta
export interface TestQuestion {
  question: string;
  answers: TestAnswer[];
}
