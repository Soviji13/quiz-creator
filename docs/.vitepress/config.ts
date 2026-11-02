import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Quiz Creator",
  description: "Interactive Quiz Parser for Obsidian",

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Getting Started', link: '/getting-started' }
        ],
        sidebar: [
          { 
            text: 'Examples',
            items: [
              { text: 'Markdown Examples', link: '/markdown-examples' },
              { text: 'Runtime API Examples', link: '/api-examples' }
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
          { text: 'Primeros pasos', link: '/es/getting-started' }
        ],
        sidebar: [
          { 
            text: 'Primeros pasos',
            items: [
              { text: 'Markdown Examples', link: '/markdown-examples' },
              { text: 'Runtime API Examples', link: '/api-examples' }
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
