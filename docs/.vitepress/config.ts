import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Quiz Creator",
  description: "Interactive Quiz Parser for Obsidian",
  base: "/quiz-creator/",

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Create your first quiz', link: '/create-your-first-quiz' }
        ],
        sidebar: [
          {
            text: 'Getting started',
            collapsed: false,
            items: [
              { text: 'Install the plugin', link: '/install-the-plugin'},
              { text: 'Create your first quiz', link: '/create-your-first-quiz' }
            ]
          }
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
      }
    },
    es: {
      label: 'Spanish',
      lang: 'es-ES',
      themeConfig: {
        nav: [
          { text: 'Inicio', link: '/es/' },
          { text: 'Crea tu primer quiz', link: '/es/create-your-first-quiz' }
        ],
        sidebar: [
          {
            text: 'Primeros pasos',
            collapsed: false,
            items: [
              { text: 'Instala el plugin', link: '/es/install-the-plugin'},
              { text: 'Crea tu primer quiz', link: '/es/create-your-first-quiz' }
            ]
          }
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
      }
    }
  }
});
