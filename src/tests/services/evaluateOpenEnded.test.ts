import { describe, it, expect } from "vitest";
import { evaluateOpenEnded } from "../../services/evaluateOpenEnded"; // Ajusta la ruta a tu proyecto
import type { OpenEndedBlock } from "../../types/questions";

// Helper para instanciar preguntas de desarrollo limpias
function createOpenQuestion(
  id: string,
  keyWords: string[],
  answer: string = "Texto completo esperado"
): OpenEndedBlock {
  return {
    id,
    type: "open-ended",
    question: `Pregunta ${id}`,
    correctAnswer: {
      id: `ans-${id}`,
      answer,
      keyWords,
    },
  };
}

describe("inputs vacíos y sin respuestas", () => {
  it("debe retornar 0 preguntas y 0 aciertos si la lista de preguntas está vacía", () => {
    const result = evaluateOpenEnded([], {});

    expect(result).toEqual({
      totalQuestions: 0,
      correctCount: 0,
    });
  });

  it("debe contabilizar el total de preguntas pero 0 aciertos si el usuario no ha respondido nada", () => {
    const questions = [
      createOpenQuestion("q1", ["fotosíntesis"]),
      createOpenQuestion("q2", ["clorofila"]),
    ];

    const result = evaluateOpenEnded(questions, {});

    expect(result).toEqual({
      totalQuestions: 2,
      correctCount: 0,
    });
  });

  it("debe puntuar 0 si la respuesta del usuario es un string vacío", () => {
    const questions = [createOpenQuestion("q1", ["JavaScript"])];

    const result = evaluateOpenEnded(questions, { q1: "" });

    expect(result).toEqual({
      totalQuestions: 1,
      correctCount: 0,
    });
  });
});

describe("evaluación con todas las palabras clave (acierto completo)", () => {
  it("debe otorgar 1 punto completo si la respuesta contiene la única keyword requerida", () => {
    const questions = [createOpenQuestion("q1", ["Amazonas"])];
    const userInput = {
      q1: "El río más caudaloso del mundo es el Amazonas sin duda.",
    };

    const result = evaluateOpenEnded(questions, userInput);

    expect(result).toEqual({
      totalQuestions: 1,
      correctCount: 1,
    });
  });

  it("debe otorgar 1 punto completo si el usuario incluye todas las múltiples keywords requeridas", () => {
    const questions = [createOpenQuestion("q1", ["1989", "Taylor Swift"])];
    const userInput = {
      q1: "En 1989 nació la cantante Taylor Swift en Pensilvania.",
    };

    const result = evaluateOpenEnded(questions, userInput);

    expect(result).toEqual({
      totalQuestions: 1,
      correctCount: 1,
    });
  });
});

describe("evaluación parcial y proporcionalidad", () => {
  it("debe otorgar la mitad de los puntos si solo incluye 1 de las 2 keywords", () => {
    const questions = [createOpenQuestion("q1", ["voltaje", "resistencia"])];
    const userInput = {
      q1: "La ley relaciona el voltaje con la corriente.",
    };

    const result = evaluateOpenEnded(questions, userInput);

    expect(result.totalQuestions).toBe(1);
    expect(result.correctCount).toBeCloseTo(0.5);
  });

  it("debe calcular la proporción exacta con 3 palabras clave (1 de 3 = 0.33)", () => {
    const questions = [createOpenQuestion("q1", ["HTML", "CSS", "JavaScript"])];
    const userInput = {
      q1: "Para maquetar solo usamos HTML.",
    };

    const result = evaluateOpenEnded(questions, userInput);

    expect(result.totalQuestions).toBe(1);
    expect(result.correctCount).toBeCloseTo(1 / 3);
  });

  it("debe puntuar 0 si el texto no contiene ninguna de las keywords esperadas", () => {
    const questions = [createOpenQuestion("q1", ["React", "TypeScript"])];
    const userInput = {
      q1: "Se usó Angular y vanilla JS para este proyecto.",
    };

    const result = evaluateOpenEnded(questions, userInput);

    expect(result).toEqual({
      totalQuestions: 1,
      correctCount: 0,
    });
  });
});

describe("evaluación combinada de múltiples preguntas", () => {
  it("debe sumar correctamente la puntuación combinada de varias preguntas abiertas", () => {
    const questions = [
      createOpenQuestion("q1", ["Sol"]),                  // 1 kw
      createOpenQuestion("q2", ["Tierra", "Luna"]),        // 2 kw
      createOpenQuestion("q3", ["Marte"]),                 // 1 kw
    ];

    const userInput = {
      q1: "El Sol es una estrella",          // 1/1 = 1.0
      q2: "La Tierra gira sola",             // 1/2 = 0.5
      q3: "Júpiter es muy grande",           // 0/1 = 0.0
    };

    const result = evaluateOpenEnded(questions, userInput);

    expect(result.totalQuestions).toBe(3);
    expect(result.correctCount).toBeCloseTo(1.5);
  });
});

describe("casos borde y resiliencia", () => {
  it("no debe puntuar doble si una palabra clave se repite varias veces en el texto del usuario", () => {
    const questions = [createOpenQuestion("q1", ["ADN"])];
    // El usuario repite la misma palabra muchas veces
    const userInput = {
      q1: "El ADN, sí, el ADN contiene ADN.",
    };

    const result = evaluateOpenEnded(questions, userInput);

    expect(result).toEqual({
      totalQuestions: 1,
      correctCount: 1,
    });
  });

  it("debe ignorar respuestas que pertenezcan a preguntas que no están en la lista", () => {
    const questions = [createOpenQuestion("q1", ["Átomo"])];
    const userInput = {
      q1: "Un Átomo es indivisible",
      q_fantasma: "Respuesta a pregunta inexistente con Átomo",
    };

    const result = evaluateOpenEnded(questions, userInput);

    expect(result).toEqual({
      totalQuestions: 1,
      correctCount: 1,
    });
  });

  it("no debe romper ni devolver NaN si la pregunta no tiene keywords configuradas", () => {
    const questionWithoutKw = createOpenQuestion("q-empty", []);
    const userInput = {
      "q-empty": "Cualquier respuesta del usuario",
    };

    const result = evaluateOpenEnded([questionWithoutKw], userInput);

    expect(result).toEqual({
      totalQuestions: 1,
      correctCount: 0,
    });
  });
});
