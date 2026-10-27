import { describe, it, expect } from "vitest";
import { evaluateQuiz } from "../../services/evaluateQuiz";
import type { TestQuestion } from "../../types/test";

describe("evaluateQuiz", () => {
  // Mock helper para construir preguntas rápidamente
  const createMockQuestion = (
    id: string,
    answers: { id: string; correct: boolean }[]
  ): TestQuestion => ({
    id,
    question: `Pregunta ${id}`,
    answers: answers.map((a) => ({
      id: a.id,
      text: `Opción ${a.id}`,
      correct: a.correct,
    })),
  });

  it("debe retornar resultado con puntuación 0 si no hay preguntas (cubre rama totalQuestions === 0)", () => {
    const result = evaluateQuiz([], {});

    expect(result).toEqual({
      totalQuestions: 0,
      correctCount: 0,
      score: 0,
    });
  });

  it("debe evaluar correctamente cuando el usuario no ha marcado ninguna respuesta (cubre rama fallback userAnswers[id] ?? [])", () => {
    const questions: TestQuestion[] = [
      createMockQuestion("q1", [
        { id: "a1", correct: true },
        { id: "a2", correct: false },
      ]),
    ];

    // userAnswers no contiene la clave 'q1'
    const result = evaluateQuiz(questions, {});

    expect(result.totalQuestions).toBe(1);
    expect(result.correctCount).toBe(0);
    expect(result.score).toBe(0);
  });

  it("debe otorgar puntuación máxima si todas las respuestas correctas son seleccionadas", () => {
    const questions: TestQuestion[] = [
      createMockQuestion("q1", [
        { id: "a1", correct: true },
        { id: "a2", correct: false },
      ]),
      createMockQuestion("q2", [
        { id: "b1", correct: false },
        { id: "b2", correct: true },
      ]),
    ];

    const userAnswers = {
      q1: ["a1"],
      q2: ["b2"],
    };

    const result = evaluateQuiz(questions, userAnswers);

    expect(result.totalQuestions).toBe(2);
    expect(result.correctCount).toBe(2);
    expect(result.score).toBe(10);
  });

  it("debe otorgar 0 puntos en una pregunta si el usuario marca más respuestas de las permitidas (cubre rama falsa de selectedAnswers.length <= correctAnswers.length)", () => {
    const questions: TestQuestion[] = [
      createMockQuestion("q1", [
        { id: "a1", correct: true },
        { id: "a2", correct: false },
        { id: "a3", correct: false },
      ]),
    ];

    // correctAnswers tiene longitud 1, pero el usuario marcó 2 opciones
    const userAnswers = {
      q1: ["a1", "a2"],
    };

    const result = evaluateQuiz(questions, userAnswers);

    expect(result.totalQuestions).toBe(1);
    expect(result.correctCount).toBe(0);
    expect(result.score).toBe(0);
  });

  it("debe calcular puntuación parcial cuando se acierta una parte de las respuestas correctas", () => {
    const questions: TestQuestion[] = [
      createMockQuestion("q1", [
        { id: "a1", correct: true },
        { id: "a2", correct: true },
        { id: "a3", correct: false },
      ]),
    ];

    // Había 2 correctas, pero el usuario solo marcó 1
    const userAnswers = {
      q1: ["a1"],
    };

    const result = evaluateQuiz(questions, userAnswers);

    expect(result.totalQuestions).toBe(1);
    expect(result.correctCount).toBe(0.5);
    expect(result.score).toBe(5);
  });

  it("no debe sumar puntos si una pregunta no tiene ninguna respuesta correcta definida (cubre rama falsa de correctAnswers.length > 0)", () => {
    const questions: TestQuestion[] = [
      createMockQuestion("q1", [
        { id: "a1", correct: false },
        { id: "a2", correct: false },
      ]),
    ];

    const userAnswers = {
      q1: ["a1"],
    };

    const result = evaluateQuiz(questions, userAnswers);

    expect(result.totalQuestions).toBe(1);
    expect(result.correctCount).toBe(0);
    expect(result.score).toBe(0);
  });

  it("debe redondear la nota a dos decimales correctamente en puntuaciones periódicas", () => {
    // 3 preguntas, acierta 2 -> (2 / 3) * 10 = 6.6666... -> debe ser 6.67
    const questions: TestQuestion[] = [
      createMockQuestion("q1", [{ id: "a1", correct: true }]),
      createMockQuestion("q2", [{ id: "b1", correct: true }]),
      createMockQuestion("q3", [{ id: "c1", correct: true }]),
    ];

    const userAnswers = {
      q1: ["a1"],
      q2: ["b1"],
      q3: [], // Fallada
    };

    const result = evaluateQuiz(questions, userAnswers);

    expect(result.totalQuestions).toBe(3);
    expect(result.correctCount).toBe(2);
    expect(result.score).toBe(6.67);
  });
});
