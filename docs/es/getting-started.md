# Crea tu primer Quiz

En este apartado aprenderás a:
- Crear un quiz completo
- Crear un tipo test
- Crear una pregunta corta/de desarrollo

Para saber los conceptos básicos, vamos a realizar un Quiz de cultura general para ver cuánto sabemos. Abre una nota de obsidian cualquiera, ¡que vamos a empezar!

> [!important] Importante
> El apartado `Estructura básica de un Quiz` es esencial para que sepas cómo hacer un quiz. El resto de apartados puedes obviarlos si no tienes como objetivo añadir ese tipo de preguntas en tu quiz. Sin embargo, con solo esa estructura no se renderízará nada, debes saber cómo poner mínimo un tipo de respuesta.

## Índice

- [Estructura básica de un Quiz](#estructura-básica-de-un-quiz)
- [Creando tipo test](#creando-tipo-test)

## Estructura básica de un Quiz

~~~~markdown
```quiz

# Pregunta 1

---

# Pregunta 2

```
~~~~

Esta estructura es la más importante. **La palabra `quiz` debe ser añadida** para que el Plugin detecte que lo que vas a realizar dentro de este bloque es un quiz.

- Con `#` indicas que el texto a continuación *(sin saltos de línea)* es una **pregunta o enunciado**, independientemente del tipo que quieras que sea.

- Con `---` indicas que a continuación vendrá otra pregunta *(no debe ir acompañado de texto)*, por lo que actúa como un **separador**.

- Al **pulsar fuera del bloque** de preguntas y respuestas, **se renderiza la vista** y podrás interactuar con el quiz creado. Al final de todas las preguntas visualizarás dos botones:
  - **Comprobar resultados**: Al hacer click verás dónde acertaste y fallaste junto a la puntuación total
  - **Limpiar**: Restaura la vista al estado inicial. Sirve para limpiar una vez compruebes los resultados o todas tus respuestas marcadas

## Creando tipo test

Ahora que sabes cómo funciona un Quiz, escribamos algunas preguntas tipo test para el examen.

~~~~markdown
```quiz
# ¿Cuál es la capital de españa?

[x] Madrid
[] Barcelona
[] Valencia
[] Málaga

---

# ¿Cuánto es 23 * 9?

[] 340
[] 203
[x] 207
[] 196

---

# Marca las características correctas del perro

[] Es carnívoro
[x] Tiene 4 patas
[] Hace miau
[x] Es un mamífero
```
~~~~

- Con `[]` seguido del texto, indicas una **respuesta** para la respectiva pregunta.
- Con `[x]` seguido del texto, indicas que esta es una **respuesta correcta**

> [!note] Nota
> Puedes poner tantas respuestas como quieras, a lo mismo que correctas
