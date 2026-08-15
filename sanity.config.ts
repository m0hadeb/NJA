import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { contentPage } from './src/sanity/schemaTypes/contentPage';

export default defineConfig({
  name: 'nan-jing-academy',
  title: 'Nan Jing Academy — ניהול תוכן',
  projectId: 'my832n63',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [contentPage],
  },
});
