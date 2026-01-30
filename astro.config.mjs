
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import wikiLinkPlugin from 'remark-wiki-link';

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  markdown: {
    remarkPlugins: [
      [wikiLinkPlugin, {
        // Map [[Wiki Link]] to /glossary/wiki-link
        hrefTemplate: (permalink) => `/glossary/${permalink}`,
        // We assume links point to other glossary items. 
        // Since we don't have a full file map at config time easily without extra logic, 
        // we rely on consistent naming (kebab-case slugs).
        // Astro slugs are usually kebab-case. 
        // For Japanese filenames, Astro usually preserves them or URI encodes them? 
        // If Astro preserves unicode slugs, we might need to adjust.
        // But for now, let's assume default behavior.
        aliasDivider: '|'
      }]
    ]
  }
});