import { describe, it, expect } from "vitest";
import { parseQuiz } from "../../services/parseQuiz";
import type { ChoiceQuestionBlock, OpenEndedBlock } from "../../types/questions";


describe("input vacío o inválido", () => {

  it("debe retornar un array vacío si el input está vacío o solo tiene espacios", () => {
    expect(parseQuiz("")).toEqual([]);
    expect(parseQuiz("   \n  ")).toEqual([]);
  });

  it("debe retornar un array vacío si el bloque no tiene pregunta ni respuestas reconocibles", () => {
    const input = `
Esto no es ni una pregunta ni una respuesta
    `;
    expect(parseQuiz(input)).toEqual([]);
  });

  it("debe ignorar un bloque que solo contiene la pregunta sin respuestas", () => {
    const input = `
# Pregunta sin respuestas
    `;
    expect(parseQuiz(input)).toEqual([]);
  });

  it("debe ignorar un bloque que solo contiene la explicación sin pregunta ni respuestas", () => {
    const input = `
? Explicación sin respuestas
    `;
    expect(parseQuiz(input)).toEqual([]);
  });
  
  it("debe ignorar un bloque que solo contiene la explicación y pregunta sin respuestas", () => {
    const input = `
# Pregunta sin respuestas
? Explicación sin respuestas
    `;
    expect(parseQuiz(input)).toEqual([]);
  });
});

describe("happy path - pregunta tipo test", () => {
  it("debe parsear una pregunta tipo test con una respuesta correcta y varias incorrectas", () => {
    const input = `
# Pregunta tipo test
[x] Respuesta correcta
[] Respuesta incorrecta 1
[] Respuesta incorrecta 2
`;
    const result = parseQuiz(input) as ChoiceQuestionBlock[];

    expect(result).toHaveLength(1);
    expect(result[0]?.question).toBe("Pregunta tipo test");
    expect(result[0]?.choices).toHaveLength(3);
    expect(result[0]?.choices[0]).toMatchObject({ text: "Respuesta correcta", correct: true });
    expect(result[0]?.choices[1]).toMatchObject({ text: "Respuesta incorrecta 1", correct: false });
    expect(result[0]?.choices[2]).toMatchObject({ text: "Respuesta incorrecta 2", correct: false });
  });

  it("debe aceptar varias respuestas correctas marcadas en la misma pregunta", () => {
    const input = `
# Pregunta con varias correctas
[x] Correcta 1
[x] Correcta 2
[] Incorrecta
`;
    const result = parseQuiz(input) as ChoiceQuestionBlock[];

    expect(result).toHaveLength(1);
    const correctCount = result[0]?.choices.filter((c) => c.correct).length;
    expect(correctCount).toBe(2);
  });

  it("debe reconocer el marcador de correcta en mayúsculas", () => {
    const input = `
# Pregunta
[X] Respuesta correcta
[] Respuesta incorrecta
`;
    const result = parseQuiz(input) as ChoiceQuestionBlock[];

    expect(result[0]?.choices[0]).toMatchObject({ text: "Respuesta correcta", correct: true });
  });

  it("debe tolerar espacios extra dentro y alrededor de los corchetes", () => {
    const input = `
# Pregunta
[  x  ]   Respuesta correcta
[   ]   Respuesta incorrecta
`;
    const result = parseQuiz(input) as ChoiceQuestionBlock[];

    expect(result[0]?.choices).toHaveLength(2);
    expect(result[0]?.choices[0]).toMatchObject({ text: "Respuesta correcta", correct: true });
    expect(result[0]?.choices[1]).toMatchObject({ text: "Respuesta incorrecta", correct: false });
  });
});

describe("happy path - pregunta de desarrollo", () => {
  it("debe parsear una pregunta de desarrollo", () => {
    const input = `
# Pregunta de desarrollo
> Respuesta esperada
`;
    const result = parseQuiz(input) as OpenEndedBlock[];

    expect(result).toHaveLength(1);
    expect(result[0]?.question).toBe("Pregunta de desarrollo");
    expect(result[0]?.correctAnswer.answer).toBe("Respuesta esperada");
    expect(result[0]?.correctAnswer.keyWords).toEqual([]);
  });

  it("debe quedarse con la última línea de respuesta de desarrollo si hay varias", () => {
    const input = `
# Pregunta de desarrollo
> Primera respuesta
> Segunda respuesta
`;
    const result = parseQuiz(input) as OpenEndedBlock[];

    expect(result).toHaveLength(1);
    expect(result[0]?.correctAnswer.answer).toBe("Segunda respuesta");
  });
});

describe("múltiples preguntas y separadores", () => {
  it("debe parsear varias preguntas separadas por '---' combinando con y sin explicaciones", () => {
    const input = `
# Pregunta tipo test con explicación
? Explicación de la pregunta 1
[x] Correcta
[] Incorrecta
---
# Pregunta de desarrollo sin explicación
> Respuesta
---
# Pregunta tipo test sin explicación
[x] Correcta
`;
    const result = parseQuiz(input);

    expect(result).toHaveLength(3);
    expect(result[0]?.explanation).toBe("Explicación de la pregunta 1");
    expect(result[1]).not.toHaveProperty("explanation");
    expect(result[2]).not.toHaveProperty("explanation");
  });

  it("debe parsear más de dos preguntas seguidas", () => {
    const input = `
# Pregunta 1
[x] Correcta
---
# Pregunta 2
> Respuesta desarrollo
---
# Pregunta 3
[x] Correcta
[] Incorrecta
`;
    const result = parseQuiz(input);

    expect(result).toHaveLength(3);
    expect(result.map((q) => q.question)).toEqual(["Pregunta 1", "Pregunta 2", "Pregunta 3"]);
  });

  it("debe tolerar espacios y saltos de línea variables alrededor del separador '---'", () => {
    const input = `
# Pregunta 1
[x] Correcta


   ---

# Pregunta 2
> Respuesta
`;
    const result = parseQuiz(input);

    expect(result).toHaveLength(2);
  });

  it("debe ignorar bloques vacíos generados entre separadores", () => {
    const input = `
# Pregunta 1
[x] Correcta
---
---
# Pregunta 2
> Respuesta
`;
    const result = parseQuiz(input);

    expect(result).toHaveLength(2);
    expect(result[0]?.question).toBe("Pregunta 1");
    expect(result[1]?.question).toBe("Pregunta 2");
  });
});

describe("formato de la pregunta", () => {

  it("debe ignorar un segundo encabezado '#' dentro del mismo bloque", () => {
    const input = `
# Primera pregunta
# Segunda pregunta ignorada
[x] Correcta
[] Incorrecta
`;
    const result = parseQuiz(input) as ChoiceQuestionBlock[];

    expect(result).toHaveLength(1);
    expect(result[0]?.question).toBe("Primera pregunta");
  });

  it("debe recortar espacios alrededor del texto de la pregunta", () => {
    const input = `
#    Pregunta con espacios
[x] Correcta
`;
    const result = parseQuiz(input) as ChoiceQuestionBlock[];

    expect(result[0]?.question).toBe("Pregunta con espacios");
  });
});

describe("soporte de explicaciones ('?')", () => {
  it("debe parsear la explicación en una pregunta tipo test", () => {
    const input = `
# ¿Cuál es la capital de España?
? Madrid es la capital política y administrativa desde el siglo XVI.
[x] Madrid
[] Barcelona
`;
    const result = parseQuiz(input) as ChoiceQuestionBlock[];

    expect(result).toHaveLength(1);
    expect(result[0]?.explanation).toBe("Madrid es la capital política y administrativa desde el siglo XVI.");
  });

  it("debe parsear la explicación en una pregunta de desarrollo", () => {
    const input = `
# Explica la ley de Ohm
? Relaciona voltaje, intensidad y resistencia (V = I * R).
> V = I * R
`;
    const result = parseQuiz(input) as OpenEndedBlock[];

    expect(result).toHaveLength(1);
    expect(result[0]?.explanation).toBe("Relaciona voltaje, intensidad y resistencia (V = I * R).");
  });

  it("debe admitir la explicación ubicada al final del bloque (después de las respuestas)", () => {
    const input = `
# Pregunta con explicación al final
[x] Opción correcta
[] Opción falsa
? Esta es una explicación ubicada al final.
`;
    const result = parseQuiz(input) as ChoiceQuestionBlock[];

    expect(result).toHaveLength(1);
    expect(result[0]?.explanation).toBe("Esta es una explicación ubicada al final.");
  });

  it("debe recortar los espacios alrededor del texto de la explicación", () => {
    const input = `
# Pregunta
?    Explicación con muchos espacios iniciales   
[x] Correcta
`;
    const result = parseQuiz(input) as ChoiceQuestionBlock[];

    expect(result[0]?.explanation).toBe("Explicación con muchos espacios iniciales");
  });

  it("debe quedarse con la primera explicación si aparecen varias en el mismo bloque", () => {
    const input = `
# Pregunta con múltiples explicaciones
? Primera explicación válida
? Segunda explicación ignorada
[x] Correcta
`;
    const result = parseQuiz(input) as ChoiceQuestionBlock[];

    expect(result).toHaveLength(1);
    expect(result[0]?.explanation).toBe("Primera explicación válida");
  });

  it("no debe definir la propiedad explanation si no se introduce el indicador '?'", () => {
    const input = `
# Pregunta sin explicación
[x] Correcta
[] Incorrecta
`;
    const result = parseQuiz(input) as ChoiceQuestionBlock[];

    expect(result[0]).not.toHaveProperty("explanation");
  });
});

describe("identificadores generados", () => {
  it("debe asignar ids distintos a cada pregunta y respuesta generada", () => {
    const input = `
# Pregunta tipo test
[x] Correcta
[] Incorrecta
---
# Pregunta de desarrollo
> Respuesta
`;
    const result = parseQuiz(input) as [ChoiceQuestionBlock, OpenEndedBlock];

    expect(result[0]?.id).not.toBe(result[1].id);
    expect(result[0]?.choices[0]?.id).not.toBe(result[0]?.choices[1]?.id);
  });

  it("debe generar un id para la respuesta de desarrollo", () => {
    const input = `
# Pregunta de desarrollo
> Respuesta
`;
    const result = parseQuiz(input) as OpenEndedBlock[];

    expect(result[0]?.correctAnswer.id).toBeTruthy();
  });
});

describe("casos mixtos y ambiguos", () => {
  it("no debe mezclar respuestas tipo test con respuestas de desarrollo en el mismo bloque", () => {
    const input = `
# Pregunta mixta
[x] Correcta
[] Incorrecta
> Respuesta de desarrollo ignorada
`;
    const result = parseQuiz(input) as ChoiceQuestionBlock[];

    expect(result).toHaveLength(1);
    expect(result[0]?.choices).toHaveLength(2);
    expect(result[0]).not.toHaveProperty("correctAnswer");
  });

  it("debe priorizar las respuestas de desarrollo si aparecen antes que las de tipo test", () => {
    const input = `
# Pregunta mixta
> Respuesta de desarrollo
[x] Correcta ignorada
[] Incorrecta ignorada
`;
    const result = parseQuiz(input) as OpenEndedBlock[];

    expect(result).toHaveLength(1);
    expect(result[0]?.correctAnswer.answer).toBe("Respuesta de desarrollo");
    expect(result[0]).not.toHaveProperty("choices");
  });

  it("debe descartar una pregunta tipo test cuyas respuestas no tienen texto", () => {
    const input = `
# Pregunta sin texto de respuestas
[x]
[]
`;
    expect(parseQuiz(input)).toEqual([]);
  });

  it("debe descartar una pregunta de desarrollo cuya respuesta no tiene texto", () => {
    const input = `
# Pregunta sin texto de respuesta
>
`;
    expect(parseQuiz(input)).toEqual([]);
  });
});

