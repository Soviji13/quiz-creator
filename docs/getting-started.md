# Create your first Quiz

In this section you will learn to:
- Create a complete quiz
- Create a multiple-choice question
- Create a short/open-ended question

To learn the basics, we're going to create a general knowledge quiz to see how much we know. Open any Obsidian note, and let's get started!

> [!important] Important
> The `Basic structure of a Quiz` section is essential for you to know how to create a quiz. You can skip the rest if you don't intend to add that type of question to your quiz.

## Table of contents

- [Basic structure of a Quiz](#basic-structure-of-a-quiz)
- [Creating a multiple-choice question](#creating-a-multiple-choice-question)

## Basic structure of a Quiz

~~~~markdown
```quiz

# Question 1

---

# Question 2

```
~~~~

This structure is the most important one. **The word `quiz` must be added** so the plugin detects that what you're about to write inside this block is a quiz.

- With `#` you indicate that the following text *(with no line breaks)* is a **question or statement**, regardless of the type you want it to be.

- With `---` you indicate that another question follows *(it must not be accompanied by text)*, so it acts as a **separator**.

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

---

# How much is 23 * 9?

[] 340
[] 203
[x] 207
[] 196

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
