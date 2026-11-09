# Quiz Creator

<p align="center">
  <img alt="version" src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Soviji13/quiz-creator/main/manifest.json&query=$.version&label=version">
  <img alt="status" src="https://img.shields.io/github/actions/workflow/status/Soviji13/quiz-creator/lint.yml?branch=main">
  <img alt="coverage" src="https://codecov.io/gh/Soviji13/quiz-creator/graph/badge.svg">
  <a href="https://github.com/Soviji13/quiz-creator/commits"><img alt="lastCommit" src="https://img.shields.io/github/last-commit/Soviji13/quiz-creator"></a>
  <a href="https://ko-fi.com/soviji13"><img alt="ko-fi" src="https://ko-fi.com/img/githubbutton_sm.svg"></a>
</p>

A simple quiz creator for [Obsidian](https://obsidian.md), specifically designed for exams. Write multiple-choice or open-ended questions directly inside your notes and get instant feedback when checking your answers.

## Documentation

Full guides and syntax reference: https://soviji13.github.io/quiz-creator/

## Technologies used

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [esbuild](https://esbuild.github.io/)
- [pnpm](https://pnpm.io/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/) with [eslint-plugin-obsidianmd](https://github.com/obsidianmd/eslint-plugin)
- [VitePress](https://vitepress.dev/)
- [Obsidian API](https://docs.obsidian.md/)

## License

GPL-3.0-or-later. See [LICENSE](./LICENSE).

## Commands

- `pnpm dev`: compile in watch mode and build for Obsidian
- `pnpm run build`: type-check and build for production
- `pnpm test`: run the test suite
- `pnpm exec vitest run --coverage`: run tests with coverage report
- `pnpm docs:dev`: run the documentation site locally for development
- `pnpm docs:build`, `pnpm docs:preview`: build/preview the documentation site before deploying
