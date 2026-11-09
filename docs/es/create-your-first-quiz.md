# Crea tu primer Quiz

En este apartado aprenderás a:
- Crear un quiz completo
- Crear un tipo test
- Crear una pregunta corta/de desarrollo

Para saber los conceptos básicos, vamos a realizar un Quiz de cultura general para ver cuánto sabemos. Abre una nota de obsidian cualquiera, ¡que vamos a empezar!

> [!important] Importante
> Antes debes instalarte el plugin. Hay un [apartado](./install-the-plugin.md) específico para ello

## Índice

- [Estructura básica de un Quiz](#estructura-básica-de-un-quiz)
- [Creando tipo test](#creando-tipo-test)
- [Creando preguntas abiertas](#creando-preguntas-abiertas)

## Estructura básica de un Quiz

~~~~markdown
```quiz

# Pregunta 1
? Explicación

---

# Pregunta 2
? Explicación

```
~~~~

Esta estructura es la más importante. **La palabra `quiz` debe ser añadida** para que el Plugin detecte que lo que vas a realizar dentro de este bloque es un quiz.

- Con `#` indicas que el texto a continuación *(sin saltos de línea)* es una **pregunta o enunciado**, independientemente del tipo que quieras que sea.

- Con `---` indicas que a continuación vendrá otra pregunta *(no debe ir acompañado de texto)*, por lo que actúa como un **separador**.

- Con `?` añadiremos una **explicación** de la respuesta correcta al **mostrar los resultados**. Se puede usar para cualquier fin distinto, como por ejemplo añadir un tip para acordarnos o reflexionarla. Es **opcional**.

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

? Todas son ciudades de España reconocidas y populares. Sin embargo, Madrid, que se encuentra en el centro del país, es la capital.

---

# ¿Cuánto es 23 * 9?

[] 340
[] 203
[x] 207
[] 196

? Truco para hacerlo más fácil: 23 * 9 = (20 + 3) * 9 = (20 * 9) + (3 * 9) = 180 + 27 = 207

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

## Creando preguntas abiertas

Vamos a subir un poco más el nivel! Acuérdate de añadir un separador entre la última pregunta tipo test y estas siguientes.

~~~~markdown
```quiz
# ¿En qué año llegó Cristóbal Colón a América y a qué territorio creía haber llegado inicialmente?

> Cristóbal Colón llegó a América en el año *1492*. Inicialmente creyó haber llegado a *Asia*, específicamente a las islas de las Indias Occidentales.

---

# ¿Cuáles son los cinco sabores primarios que percibe el sentido del gusto humano?

> *Dulce*, *salado*, *ácido*, *amargo* y *umami*.

---

# ¿Cuántas teclas negras y blancas conforman un piano estándar?

> *52* teclas blancas y *36* teclas negras.
```
~~~~

- Con `>` seguido del texto, indicas la **respuesta** esperada.
- Si **envuelves una palabra entre `*`** *(por ejemplo `*importante*`)*, indicas que esa palabra **debe estar incluida en la respuesta** para ser marcada como válida. La nota de esa pregunta se calculará en base a cuántas palabras críticas marcadas coincidieron con tu respuesta.