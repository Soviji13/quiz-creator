# Quiz Creator

![version](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Soviji13/quiz-creator/main/manifest.json&query=$.version&label=version)

![status](https://img.shields.io/github/actions/workflow/status/Soviji13/quiz-creator/lint.yml?branch=main)

![coverage](https://codecov.io/gh/Soviji13/quiz-creator/graph/badge.svg)

[![lastCommit](https://img.shields.io/github/last-commit/Soviji13/quiz-creator)](https://github.com/Soviji13/quiz-creator/commits)

## Estructura de ficheros a seguir

```text
mi-plugin/
├─ manifest.json
├─ versions.json
├─ styles.css
├─ esbuild.config.mjs
├─ tsconfig.json
└─ src/
   ├─ main.ts              # solo clase Plugin: registra cosas y delega
   ├─ settings/
   │  ├─ settings.ts       # interfaz + DEFAULT_SETTINGS
   │  └─ SettingTab.ts
   ├─ commands/            # un fichero por comando o grupo de comandos
   ├─ views/               # ItemView/Modal de Obsidian que montan React
   ├─ ui/                  # todo lo de React
   │  ├─ components/
   │  ├─ hooks/
   │  └─ context/          # AppContext para pasar `app` a los componentes
   ├─ services/            # lógica de negocio, sin React ni Obsidian si se puede
   ├─ utils/
   └─ types/
```

- `services/`: lee notas, elementos del vault y los traslada a la UI

## Comandos

- `pnpm dev`: Compilar en modo watch y construir en obsidian
- `pnpm test`: Ejecutar tests
- `pnpm exec vitest run --coverage`: Comprobar cobertura de tests
- `pnpm docs:dev`: Levantar la página de documentación en local para desarrollo
- `pnpm docs:build`, `pnpm docs:preview`: Comprobar página antes de producción


## Estructura de documentación

```text
quiz-creator/
├── docs/
│   ├── .vitepress/
│   │   └── config.mts       <-- Configuración del menú y sidebar
│   ├── index.md             <-- Landing page de la web
│   ├── getting-started.md   <-- Instalación y primer quiz
│   ├── syntax/
│   │   ├── basic.md         <-- Pregunta simple, opciones, respuestas
│   │   └── advanced.md      <-- Callouts, explicaciones, puntuación
│   └── styling.md           <-- Cómo personalizarlo con CSS
├── src/                     <-- El código de tu plugin
├── esbuild.config.mjs
└── package.json
```

## CI para desplegar docs en GitHub Pages (añadirlo posteriormente)

````text
name: Deploy Docs

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - '.github/workflows/deploy-docs.yml'

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm docs:build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## First time developing plugins?

Quick starting guide for new plugin devs:

- Check if [someone already developed a plugin for what you want](https://obsidian.md/plugins)! There might be an existing plugin similar enough that you can partner up with.
- Make a copy of this repo as a template with the "Use this template" button (login to GitHub if you don't see it).
- Clone your repo to a local development folder. For convenience, you can place this folder in your `.obsidian/plugins/your-plugin-name` folder.
- Install NodeJS, then install [pnpm](https://pnpm.io/installation), then run `pnpm i` in the command line under your repo folder.
- Run `pnpm run dev` to compile your plugin from `src/main.ts` to `main.js`.
- Make changes to `src/main.ts` (or create new `.ts` files). Those changes should be automatically compiled into `main.js`.
- Reload Obsidian to load the new version of your plugin.
- Enable plugin in settings window.
- For updates to the Obsidian API run `pnpm update` in the command line under your repo folder.

## Releasing new releases

- Update your `manifest.json` with your new version number, such as `1.0.1`, and the minimum Obsidian version required for your latest release.
- Update your `versions.json` file with `"new-plugin-version": "minimum-obsidian-version"` so older versions of Obsidian can download an older version of your plugin that's compatible.
- Create new GitHub release using your new version number as the "Tag version". Use the exact version number, don't include a prefix `v`. See here for an example: https://github.com/obsidianmd/obsidian-sample-plugin/releases
- Upload the files `manifest.json`, `main.js`, `styles.css` as binary attachments. Note: The manifest.json file must be in two places, first the root path of your repository and also in the release.
- Publish the release.

> You can simplify the version bump process by running `pnpm version patch`, `pnpm version minor` or `pnpm version major` after updating `minAppVersion` manually in `manifest.json`.
> The command will bump version in `manifest.json` and `package.json`, and add the entry for the new version to `versions.json`

## Adding your plugin to the community plugin list

- Check the [plugin guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines).
- Publish an initial version.
- Make sure you have a `README.md` file in the root of your repo.
- Make a pull request at https://github.com/obsidianmd/obsidian-releases to add your plugin.

## How to use

- Clone this repo.
- Make sure your NodeJS is at least v18 (`node --version`).
- Make sure [pnpm](https://pnpm.io/installation) is installed (`pnpm --version`).
- `pnpm i` to install dependencies.
- `pnpm run dev` to start compilation in watch mode.

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.

## Improve code quality with eslint

- [ESLint](https://eslint.org/) is a tool that analyzes your code to quickly find problems. You can run ESLint against your plugin to find common bugs and ways to improve your code.
- This project already has eslint preconfigured, you can invoke a check by running `pnpm run lint`
- Together with a custom eslint [plugin](https://github.com/obsidianmd/eslint-plugin) for Obsidan specific code guidelines.
- A GitHub action is preconfigured to automatically lint every commit on all branches.

## Funding URL

You can include funding URLs where people who use your plugin can financially support it.

The simple way is to set the `fundingUrl` field to your link in your `manifest.json` file:

```json
{
	"fundingUrl": "https://buymeacoffee.com"
}
```

If you have multiple URLs, you can also do:

```json
{
	"fundingUrl": {
		"Buy Me a Coffee": "https://buymeacoffee.com",
		"GitHub Sponsor": "https://github.com/sponsors",
		"Patreon": "https://www.patreon.com/"
	}
}
```

## Seguridad de dependencias

Este proyecto usa [pnpm](https://pnpm.io/) en vez de npm porque, por defecto, bloquea los scripts `install`/`postinstall` de cualquier dependencia nueva hasta que se aprueban explícitamente (ver `pnpm-workspace.yaml` → `allowBuilds`), y porque su `node_modules` estricto evita que el código dependa en silencio de paquetes transitivos no declarados. Aun así, ninguna de estas protecciones sustituye una revisión periódica.

### Revisión periódica (cada ~1 mes, y siempre antes de publicar un release)

1. `pnpm outdated` — ver qué dependencias tienen versión nueva disponible.
2. `pnpm audit` — comprobar si alguna dependencia (directa o transitiva) tiene vulnerabilidades conocidas (CVEs).
3. Si algo necesita actualizarse, hazlo de una en una (`pnpm update <paquete>`) en vez de todas a la vez, así un problema se detecta y se revierte fácilmente.
4. Antes de hacer commit, revisa el diff de `pnpm-lock.yaml`: comprueba que los paquetes que cambian son los que esperabas y no aparecen dependencias nuevas que no reconozcas.
5. Si `pnpm install` se detiene pidiendo aprobar un build script nuevo (`ERR_PNPM_IGNORED_BUILDS`), **no lo apruebes a ciegas**. Mira qué paquete es y por qué lo necesita (ejemplo legítimo: `esbuild` descarga su binario nativo en el `postinstall`). Si no lo entiendes o no lo esperabas, no lo apruebes y pregunta/investiga primero.
6. Vuelve a correr `pnpm run lint`, `pnpm test` y `pnpm run build` tras cualquier actualización, antes de dar el cambio por bueno.
7. Antes de una release (ver sección *Releasing new releases*), repite los pasos 1-2 como mínimo.

### Señales de paquete sospechoso

Revisa esto antes de añadir o aceptar una actualización de cualquier dependencia:

- **Typosquatting**: nombre casi idéntico a un paquete popular pero con una letra cambiada, un guion de más/menos, o un scope distinto (`@react/dom` en vez de `react-dom`).
- **Repositorio inexistente o que no coincide**: el campo `repository` del paquete no existe, o apunta a un repo vacío/no relacionado con lo que dice hacer el paquete.
- **Publicado o actualizado hace muy poco** sin relación con ningún cambio relevante, especialmente en una dependencia transitiva que nadie pidió actualizar.
- **Salto de versión brusco** (p. ej. de `1.2.0` a `4.0.0`) sin changelog, notas de versión, ni relación con un cambio en el ecosystem.
- **Pide un `postinstall`/`preinstall` nuevo** que antes no tenía, sobre todo si el paquete es de bajo nivel y no debería necesitar ejecutar nada en la instalación. pnpm te avisará de esto directamente (`pnpm approve-builds`) — trátalo como la señal de alarma que es, no como un trámite.
- **Cambio de mantenedor/propietario reciente** en un paquete que llevaba tiempo estable.
- **Pocas descargas semanales o sin apenas uso** para lo popular que dice ser, o sin issues/actividad en su repositorio.
- **Pide permisos o acceso que no tiene sentido** para lo que hace (acceso a red, al sistema de archivos fuera de lo esperado, variables de entorno sensibles) — revisa especialmente cualquier dependencia nueva que toque el filesystem o haga peticiones de red, dado que este plugin debe operar en local/offline salvo que se documente lo contrario.

Ante cualquier duda, no lo instales/actualices todavía: busca el paquete en [npmjs.com](https://www.npmjs.com/), revisa su repositorio en GitHub, y comprueba si hay alertas conocidas (`pnpm audit`, [GitHub Advisory Database](https://github.com/advisories), o [socket.dev](https://socket.dev/)).

## API Documentation

See https://docs.obsidian.md
