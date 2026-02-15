
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import wikiLinkPlugin from 'remark-wiki-link';
import remarkObsidianResolver from './src/plugins/remark-obsidian-resolver.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://portal.goryugo.com',
  integrations: [preact()],
  markdown: {
    remarkPlugins: [
      [wikiLinkPlugin, {
        aliasDivider: '|'
      }],
      [remarkObsidianResolver, {
        sourceBasePath: '/Users/goryugo/GitHub/Astro/content-source/Archives',
        externalCollections: ['ks', 'bc', 'iw', 'Topics'],
        collectionPriority: ['ks', 'bc', 'iw', 'Topics'],
        onMissing: 'text',
        strictUrl: true
      }]
    ]
  }
});
