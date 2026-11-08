/* Componente de respuesta de pregunta abierta */
import { escapeRegex } from "../../utils/regex";


export interface OpenEndedProps {
  showResults: boolean;
  blockId: string;
  updateAnswer: (questionId: string, input: string) => void;
  value: string;
  answer: string;
  keyWords: string[];
}



/* Función para que las palabras clave se subrayen - Auxiliar */
function highlightText (text: string, keyWords: string[], currentInput: string) {
  if (!keyWords || keyWords.length === 0) return text;

  // Añadimos marcador '|' entre palabras especiales para separarlas 
  const pattern = new RegExp(`(${keyWords.map(escapeRegex).join("|")})`, "gi");
  const words = text.split(pattern);

  // Paso a set para tardar menos en la búsqueda
  const keySet = new Set(keyWords.map(kw => kw.toLowerCase()));

  // Iteramos sobre las palabras para ver cuáles son normales y cuales son clave 
  return (
    words.map((w, i) => {
      // Si es palabra clave
      if (keySet.has(w.toLowerCase())) {
        return (
          <span key={i} className={`quiz-creator-keyword-highlight ${!currentInput.toLowerCase().contains(w.toLowerCase()) ? 'red' : ''}`}>
            {w}
          </span>
        )
      }
      return w;
    })
  )
} 



export function OpenEndedAnswerComponent ({ showResults, blockId, updateAnswer, value, answer, keyWords }: OpenEndedProps) {
  return (
    <div>
      <textarea 
        style={{ width: "100%", boxSizing: "border-box", resize: "vertical" }} 
        rows={3} 
        placeholder="Inserte su respuesta"
        value={value}
        onChange={(e) => {if (!showResults) updateAnswer(blockId, e.target.value);}}
        disabled={showResults}
      >
      </textarea>
      {showResults && 
        <div className="quiz-creator-explanation expected-response">
          <p><b>Respuesta esperada:</b></p>
          <p>{highlightText(answer, keyWords, value)}</p>
          </div>
      }
    </div>
  )
}