/* Tipos de un quiz genérico */
export interface QuizResult {
  totalQuestions: number;
  correctCount: number;
  score: number;            // Sobre 10 o lo que el usuario quiera en un futuro
}