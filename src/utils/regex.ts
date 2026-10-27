/* Evitamos que regex les asigne un significado sintáctico a carácteres reservados */
export function escapeRegex (str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}