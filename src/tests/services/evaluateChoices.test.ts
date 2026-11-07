import { describe, it, expect } from "vitest";
import { evaluateChoices } from "../../services/evaluateChoices"; 
import type { ChoiceQuestionBlock } from "../../types/questions";

// Helper para instanciar preguntas
function createQuestion(
  id: string,
  choices: Array<{ id: string; correct: boolean }>
): ChoiceQuestionBlock {
  return {
    id,
    type: 'choice',
    question: `Pregunta ${id}`,
    choices: choices.map((c) => ({
      id: c.id,
      text: `Opción ${c.id}`,
      correct: c.correct,
    })),
  };
}


  describe("inputs vacíos y sin respuestas", () => {
    it("debe retornar 0 preguntas y 0 aciertos si la lista de preguntas está vacía", () => {
      const result = evaluateChoices([], {});

      expect(result).toEqual({
        totalQuestions: 0,
        correctCount: 0,
      });
    });

    it("debe contar el total de preguntas pero 0 aciertos si el usuario no ha respondido nada", () => {
      const questions = [
        createQuestion("q1", [
          { id: "a1", correct: true },
          { id: "a2", correct: false },
        ]),
        createQuestion("q2", [
          { id: "b1", correct: true },
          { id: "b2", correct: false },
        ]),
      ];

      const result = evaluateChoices(questions, {});

      expect(result).toEqual({
        totalQuestions: 2,
        correctCount: 0,
      });
    });

    it("debe puntuar 0 si el usuario envía un array vacío de respuestas para una pregunta", () => {
      const questions = [
        createQuestion("q1", [
          { id: "a1", correct: true },
          { id: "a2", correct: false },
        ]),
      ];

      const result = evaluateChoices(questions, { q1: [] });

      expect(result).toEqual({
        totalQuestions: 1,
        correctCount: 0,
      });
    });
  });

  describe("pregunta con una única respuesta correcta", () => {
    const question = createQuestion("q1", [
      { id: "opt-1", correct: true },
      { id: "opt-2", correct: false },
      { id: "opt-3", correct: false },
    ]);

    it("debe sumar 1 acierto completo si el usuario selecciona la opción correcta", () => {
      const result = evaluateChoices([question], { q1: ["opt-1"] });

      expect(result).toEqual({
        totalQuestions: 1,
        correctCount: 1,
      });
    });

    it("debe puntuar 0 si el usuario selecciona una opción incorrecta", () => {
      const result = evaluateChoices([question], { q1: ["opt-2"] });

      expect(result).toEqual({
        totalQuestions: 1,
        correctCount: 0,
      });
    });

    it("debe puntuar 0 si el usuario marca más respuestas de las correctas disponibles", () => {
      // Hay 1 correcta, pero el usuario marca 2 (la correcta y una incorrecta)
      const result = evaluateChoices([question], { q1: ["opt-1", "opt-2"] });

      expect(result).toEqual({
        totalQuestions: 1,
        correctCount: 0,
      });
    });
  });

  describe("pregunta con múltiples respuestas correctas (proporcionalidad)", () => {
    // Pregunta con 2 correctas (opt-1 y opt-2) y 2 incorrectas
    const multiQuestion = createQuestion("q-multi", [
      { id: "opt-1", correct: true },
      { id: "opt-2", correct: true },
      { id: "opt-3", correct: false },
      { id: "opt-4", correct: false },
    ]);

    it("debe otorgar 1 punto completo si selecciona todas las correctas exactas", () => {
      const result = evaluateChoices([multiQuestion], {
        "q-multi": ["opt-1", "opt-2"],
      });

      expect(result).toEqual({
        totalQuestions: 1,
        correctCount: 1,
      });
    });

    it("debe otorgar puntuación parcial si solo marca una parte de las correctas", () => {
      // 1 de 2 correctas = 0.5 puntos
      const result = evaluateChoices([multiQuestion], {
        "q-multi": ["opt-1"],
      });

      expect(result.totalQuestions).toBe(1);
      expect(result.correctCount).toBeCloseTo(0.5);
    });

    it("debe otorgar la parte proporcional si marca el número permitido pero mezcla correctas e incorrectas", () => {
      // Selecciona 2 opciones (<= 2 correctas posibles): acierta 1 y falla 1 -> 1/2 = 0.5
      const result = evaluateChoices([multiQuestion], {
        "q-multi": ["opt-1", "opt-3"],
      });

      expect(result.totalQuestions).toBe(1);
      expect(result.correctCount).toBeCloseTo(0.5);
    });

    it("debe anular la puntuación a 0 si marca más respuestas que el número de correctas", () => {
      // Hay 2 correctas, pero marca 3 opciones
      const result = evaluateChoices([multiQuestion], {
        "q-multi": ["opt-1", "opt-2", "opt-3"],
      });

      expect(result).toEqual({
        totalQuestions: 1,
        correctCount: 0,
      });
    });
  });

  describe("cálculo global con múltiples preguntas", () => {
    it("debe sumar correctamente la puntuación combinada de varias preguntas", () => {
      const questions = [
        createQuestion("q1", [
          { id: "a1", correct: true },
          { id: "a2", correct: false },
        ]),
        createQuestion("q2", [
          { id: "b1", correct: true },
          { id: "b2", correct: false },
        ]),
        createQuestion("q3", [
          { id: "c1", correct: true },
          { id: "c2", correct: true },
          { id: "c3", correct: false },
        ]),
      ];

      const userAnswers = {
        q1: ["a1"],       // 1.0 (acierto)
        q2: ["b2"],       // 0.0 (fallo)
        q3: ["c1"],       // 0.5 (parcial: 1 de 2)
      };

      const result = evaluateChoices(questions, userAnswers);

      expect(result.totalQuestions).toBe(3);
      expect(result.correctCount).toBeCloseTo(1.5);
    });
  });

  describe("casos borde y resiliencia", () => {
    it("debe desduplicar identificadores repetidos en la respuesta del usuario gracias al Set", () => {
      const question = createQuestion("q1", [
        { id: "a1", correct: true },
        { id: "a2", correct: false },
      ]);

      // Usuario envía el mismo id repetido en el array
      const result = evaluateChoices([question], { q1: ["a1", "a1", "a1"] });

      expect(result).toEqual({
        totalQuestions: 1,
        correctCount: 1,
      });
    });

    it("debe ignorar identificadores de respuesta que no pertenezcan a la pregunta", () => {
      const question = createQuestion("q1", [
        { id: "a1", correct: true },
        { id: "a2", correct: false },
      ]);

      const result = evaluateChoices([question], { q1: ["id-inexistente"] });

      expect(result).toEqual({
        totalQuestions: 1,
        correctCount: 0,
      });
    });

    it("no debe romper ni dividir entre cero si una pregunta no tiene ninguna respuesta correcta configurada", () => {
      const questionWithoutCorrect = createQuestion("q-broken", [
        { id: "x1", correct: false },
        { id: "x2", correct: false },
      ]);

      const result = evaluateChoices([questionWithoutCorrect], {
        "q-broken": ["x1"],
      });

      expect(result).toEqual({
        totalQuestions: 1,
        correctCount: 0,
      });
    });
  });

