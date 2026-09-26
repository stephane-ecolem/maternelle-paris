// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://maternelle.paris',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // La page de résultat dépend des paramètres saisis : pas d'indexation.
      filter: (page) => !page.includes('/shortlist/') && !page.includes('/merci/'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
