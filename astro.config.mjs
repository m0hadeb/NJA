import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sanity from '@sanity/astro';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        {
          find: /^sanity$/,
          replacement: fileURLToPath(new URL('./node_modules/sanity/lib/index.js', import.meta.url))
        },
        {
          find: /^sanity\/structure$/,
          replacement: fileURLToPath(new URL('./node_modules/sanity/lib/structure.js', import.meta.url))
        },
        {
          find: /^styled-components$/,
          replacement: fileURLToPath(
            new URL('./node_modules/styled-components/dist/styled-components.browser.esm.js', import.meta.url)
          )
        }
      ]
    },
    optimizeDeps: {
      exclude: ['sanity', 'sanity/structure']
    }
  },

  integrations: [
    sanity({
      projectId: 'my832n63',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/admin',
      studioRouterHistory: 'hash'
    }),
    react()
  ]
});
