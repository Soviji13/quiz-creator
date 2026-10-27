import { describe, it, expect } from "vitest";
import { parseTest } from "../../services/parseTest";

describe("parseTest", () => {
  describe("Happy Path (Formato estándar)", () => {
    it("parsea correctamente una pregunta con sus respuestas y estado", () => {
      const input = `# Pregunta
      [] A
      [x] B
      [] C`;

      const result = parseTest(input);

      expect(result).toEqual([
        {
          question: "Pregunta",
          answers: [
            { text: "A", correct: false, id: result[0]?.answers[0]?.id },
            { text: "B", correct: true, id: result[0]?.answers[1]?.id },
            { text: "C", correct: false, id: result[0]?.answers[2]?.id },
          ],
          id: result[0]?.id
        },
      ]);
    });

    it("parsea múltiples preguntas separadas por el delimitador '---'", () => {
      const input = `# Pregunta 1
      [] A
      [x] B
      ---
      # Pregunta 2
      [x] C
      [x] D`;

      const result = parseTest(input);

      expect(result).toHaveLength(2);
      expect(result[0]?.question).toBe("Pregunta 1");
      expect(result[1]?.question).toBe("Pregunta 2");
    });
  });

  describe("Tolerancia y flexibilidad de formato (Edge Cases válidos)", () => {
    it("admite el indicador de respuesta correcta en mayúscula '[X]'", () => {
      const input = `# Pregunta
      [] A
      [X] B`;

      const result = parseTest(input);

      expect(result[0]?.answers[1]?.correct).toBe(true);
    });

    it("tolera espacios variables en la cabecera de la pregunta", () => {
      const input = `  #   Pregunta 1     
      [] A
      ---
      #Pregunta 2
      [] B`;

      const result = parseTest(input);

      expect(result[0]?.question).toBe("Pregunta 1");
      expect(result[1]?.question).toBe("Pregunta 2");
    });

    it("tolera respuestas pegadas a los corchetes o con indentación irregular", () => {
      const input = `# Pregunta
      []A
         [] B
      []    C`;

      const result = parseTest(input);

      expect(result[0]?.answers).toHaveLength(3);
      expect(result[0]?.answers.map((a) => a.text)).toEqual(["A", "B", "C"]);
    });

    it("ignora líneas en blanco o con espacios entre respuestas", () => {
      const input = `# Pregunta
         
      [] A
      
      [] B`;

      const result = parseTest(input);

      expect(result[0]?.answers).toHaveLength(2);
    });
  });

  describe("Validación de sintaxis y entradas inválidas", () => {
    it("devuelve array vacío si el texto de entrada está vacío o solo contiene espacios", () => {
      expect(parseTest("")).toEqual([]);
      expect(parseTest("   \n  \t ")).toEqual([]);
    });

    it("descarta preguntas que no tienen ninguna respuesta válida", () => {
      const input = `# Pregunta 1
      ---
      # Pregunta 2`;

      expect(parseTest(input)).toEqual([]);
    });

    it("ignora bloques que no comienzan con el indicador de pregunta", () => {
      const input = `Pregunta sin almohadilla
      [] A
      [] B`;

      expect(parseTest(input)).toEqual([]);
    });

    it("descarta respuestas individuales mal formateadas pero conserva las válidas", () => {
      const input = `# Pregunta
      [ ] A
      [] B
      [ C`; 

      const [parsedQuestion] = parseTest(input);

      expect(parsedQuestion?.answers).toHaveLength(2);
      expect(parsedQuestion?.answers.map((a) => a.text)).toEqual(["A", "B"]);
    });

    it("agrupa en una sola pregunta si falta el separador de bloque '---'", () => {
      const input = `# Pregunta 1
      [] A
      
      # Pregunta 2
      [] B`;

      const result = parseTest(input);

      expect(result).toHaveLength(1);
      expect(result[0]?.question).toBe("Pregunta 1");
    });

    it("descarta respuestas con expresión regular de indicador pero sin ningún texto", () => {
      const input = `# Pregunta 1
      []
      [] B`;

      const result = parseTest(input);
      expect(result[0]?.answers).toHaveLength(1);
      expect(result[0]?.answers[0]?.text).toBe("B")
    })
  });
});
