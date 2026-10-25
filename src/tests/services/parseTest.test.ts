import { describe, it, expect } from "vitest";
import { parseTest } from "../../services/parseTest";

it ("Lee una pregunta bien formateada y sus respuestas", () => {
  const input = `# Pregunta
  [] A
  [] B
  [] C`;

  const result = parseTest(input);

  expect(result).toEqual([
    {
      question: "Pregunta",
      answers: [
        {text: "A", correct: false},
        {text: "B", correct: false},
        {text: "C", correct: false}
      ]
    }
  ]);
});

it ("Lee tres preguntas bien formateadas y sus respuestas", () => {
  const input = `# Pregunta
  [] A
  [] B
  [] C
  ---
  # Pregunta 2
  [] D
  [] E
  [] F
  ---
  # Pregunta 3
  [] G
  [] H
  [] I`;

  const result = parseTest(input);

  expect(result).toEqual([
    {
      question: "Pregunta",
      answers: [
        {text: "A", correct: false},
        {text: "B", correct: false},
        {text: "C", correct: false}
      ]
    },
    {
      question: "Pregunta 2",
      answers: [
        {text: "D", correct: false},
        {text: "E", correct: false},
        {text: "F", correct: false}
      ]
    },
    {
      question: "Pregunta 3",
      answers: [
        {text: "G", correct: false},
        {text: "H", correct: false},
        {text: "I", correct: false}
      ]
    }
  ]);

  expect(result.length).toBe(3);
});

it ("Lee una pregunta sin respuestas", () => {
  const input = `# Pregunta`;

  const result = parseTest(input);

  expect(result).toEqual([]);
});

it ("Lee dos preguntas sin respuestas", () => {
  const input = `# Pregunta 1
  ---
  # Pregunta 2`;

  const result = parseTest(input);

  expect(result).toEqual([]);
})

it ("Lee pregunta mal formateada", () => {
  const input = `Pregunta
  [] A
  [] B`;

  const result = parseTest(input);

  expect(result).toEqual([]);
})

it ("Lee 2 respuestas mal formateadas de 3", () => {
  const input = `# Pregunta
  [ ] A
  [] B
  [ C`;

  const result = parseTest(input);

  expect(result[0]?.answers?.length).toBe(1);
  expect(result[0]?.answers[0]?.text).toBe("B");
  expect(result[0]?.question).toBe("Pregunta")
})

it ("Lee 2 preguntas sin separadores", () => {
  const input = `# Pregunta
  [] A
  [] B
  
  # Pregunta 2
  [] C
  [] D
  `
  const result = parseTest(input);

  expect(result.length).toBe(1);
  expect(result[0]?.question).toBe("Pregunta")
})

it ("Lee preguntas con formato raro pero válido", () => {
  const input = `  #   Pregunta 1     
  [] A
  ---
  #Pregunta 2
  [] B`

  const result = parseTest(input);

  expect(result[0]?.question).toBe("Pregunta 1");
  expect(result[1]?.question).toBe("Pregunta 2");
})

it("Lee respuestas con formatos raros pero válidos", () => {
  const input = `# Pregunta
  []A
     [] B
  []    C`

  const result = parseTest(input);

  expect(result[0]?.answers.length).toBe(3);
  expect(result[0]?.answers[0]?.text).toBe("A");
  expect(result[0]?.answers[1]?.text).toBe("B");
  expect(result[0]?.answers[2]?.text).toBe("C");
})

it("Texto vacío", () => {
  const input = ``
  
  const result = parseTest(input);

  expect(result).toEqual([]);
})

it("Espacios entre dos respuestas", () => {
  const input = `# Pregunta
     
  [] A
  
  [] B
       
  [] C

  `
  const result = parseTest(input);

  expect(result[0]?.answers.length).toBe(3);
})

