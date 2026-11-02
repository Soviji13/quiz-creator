/* Tipos de respuestas */

// Respuesta tipo test
export interface ChoiceAnswer {
  text: string;
  correct: boolean;
  id: string;
}

// Respuesta tipo desarrollo 
export interface OpenEndedAnswer {
  id: string;
  answer: string;
  keyWords: string[];
}

// Lo que el usuario introduce en el tipo test
type UserTestSelections = Record<string, string[]>;