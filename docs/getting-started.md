# Create your first Quiz

In this section you will learn to:
- Create a complete quiz
- Create a multiple-choice question
- Create a short/open-ended question

To learn the basics, we're going to create a general knowledge quiz to see how much we know. Open any Obsidian note, and let's get started!

> [!important] Important
> The `Basic structure of a Quiz` section is essential for you to know how to create a quiz. You can skip the rest of the sections if you don't intend to add that type of question to your quiz. However, with just that structure alone nothing will render, you must know how to add at least one answer type.

## Table of contents

- [Basic structure of a Quiz](#basic-structure-of-a-quiz)
- [Creating a multiple-choice question](#creating-a-multiple-choice-question)
- [Creating open-ended questions](#creating-open-ended-questions)

## Basic structure of a Quiz

~~~~markdown
```quiz

# Question 1
? Explanation

---

# Question 2
? Explanation

```
~~~~

This structure is the most important one. **The word `quiz` must be added** so the plugin detects that what you're about to write inside this block is a quiz.

- With `#` you indicate that the following text *(with no line breaks)* is a **question or statement**, regardless of the type you want it to be.

- With `---` you indicate that another question follows *(it must not be accompanied by text)*, so it acts as a **separator**.

- With `?` you add an **explanation** of the correct answer, shown **when displaying the results**. It can be used for any other purpose, such as adding a tip to remember or reflect on. It's **optional**.

- When you **click outside the block** of questions and answers, **the view is rendered** and you'll be able to interact with the quiz you created. At the end of all the questions you'll see two buttons:
  - **Check results**: Clicking it shows you where you got it right or wrong, along with the total score
  - **Clear**: Resets the view to its initial state. It's useful for clearing the view once you've checked the results or all your marked answers

## Creating a multiple-choice question

Now that you know how a Quiz works, let's write some multiple-choice questions for the exam.

~~~~markdown
```quiz
# What is the capital of Spain?

[x] Madrid
[] Barcelona
[] Valencia
[] Málaga

? They're all recognized and popular Spanish cities. However, Madrid, located in the center of the country, is the capital.

---

# How much is 23 * 9?

[] 340
[] 203
[x] 207
[] 196

? Trick to make it easier: 23 * 9 = (20 + 3) * 9 = (20 * 9) + (3 * 9) = 180 + 27 = 207

---

# Mark the correct characteristics of a dog

[] It's a carnivore
[x] It has 4 legs
[] It says meow
[x] It's a mammal
```
~~~~

- With `[]` followed by text, you indicate an **answer** for the respective question.
- With `[x]` followed by text, you indicate that this is a **correct answer**

> [!note] Note
> You can add as many answers as you want, the same goes for correct ones

## Creating open-ended questions

Let's take it up a notch! Remember to add a separator between the last multiple-choice question and the following ones.

~~~~markdown
```quiz
# In what year did Christopher Columbus arrive in America, and which territory did he initially believe he had reached?

> Christopher Columbus arrived in America in the year *1492*. He initially believed he had reached *Asia*, specifically the islands of the West Indies.

---

# What are the five primary flavors perceived by the human sense of taste?

> *Sweet*, *salty*, *sour*, *bitter*, and *umami*.

---

# How many black and white keys make up a standard piano?

> *52* white keys and *36* black keys.
```
~~~~

- With `>` followed by text, you indicate the **expected answer**.
- If you **wrap a word with `*`** *(for example `*important*`)*, you indicate **that word must be included in the answer** for it to be marked as valid. The grade for that question will be calculated based on how many of the marked critical words matched your answer.
