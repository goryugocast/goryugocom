
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
        sourceBasePath: '/Users/goryugo/GitHub/Astro/content-source',
        externalCollections: ['ks', 'bc', 'iw', 'topics'],
        collectionPriority: ['ks', 'bc', 'iw', 'topics'],
        onMissing: 'text',
        strictUrl: true
      }]
    ]
  }
});
