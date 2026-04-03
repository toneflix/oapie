import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'OAPIEX',
  description: 'Extract OpenAPI documents from ReadMe powered documentation sites and saved HTML files.',
  base: '/oapiex/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'CLI', link: '/reference/cli' },
      { text: 'Programmatic', link: '/reference/programmatic-usage' },
      { text: 'SDKs', link: '/guide/sdk-generation' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Extraction Flow', link: '/guide/extraction-flow' },
          { text: 'Output Files', link: '/guide/output-files' },
          { text: 'SDK Generation', link: '/guide/sdk-generation' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'CLI', link: '/reference/cli' },
          { text: 'Programmatic Usage', link: '/reference/programmatic-usage' },
          { text: 'Configuration', link: '/reference/configuration' },
          { text: 'Browser Engines', link: '/reference/browser-engines' },
          { text: 'SDK Kit', link: '/reference/sdk-kit' }
        ]
      },
      {
        text: 'References',
        items: [
          { text: 'Quick Reference', link: '/quick-reference' },
          { text: 'API Examples', link: '/api-examples' },
        ]
      },
      {
        text: 'Project',
        items: [
          { text: 'Roadmap', link: '/project/roadmap' },
          { text: 'Development', link: '/project/development' },
          { text: 'CI/CD', link: '/project/ci-cd' },
          { text: 'Release Notes', link: '/reference/release-notes' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/toneflix/oapiex' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/oapiex' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Toneflix'
    }
  }
})
