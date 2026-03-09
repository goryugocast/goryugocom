// @ts-check
import 'dotenv/config';
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import wikiLinkPlugin from 'remark-wiki-link';
import remarkObsidianCallout from 'remark-obsidian-callout';
import remarkGfm from 'remark-gfm';
import { globSync } from 'glob';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

function astroSlugify(text) {
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-');
}

function normalizePermalink(value, fallback) {
  if (typeof value === 'string' && value.trim()) {
    return value.startsWith('/') ? value : `/${value}`;
  }
  if (typeof value === 'number') {
    return `/${value}`;
  }
  return fallback;
}

function buildFileIndex(sourceDir) {
  const index = new Map();
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Warning: Source directory not found: ${sourceDir}`);
    return index;
  }

  const files = globSync('**/*.md', { cwd: sourceDir, absolute: true });
  for (const absPath of files) {
    try {
      const content = fs.readFileSync(absPath, 'utf8');
      const { data } = matter(content);
      const basename = path.basename(absPath, '.md');
      const permalink = normalizePermalink(data.permalink, `/${astroSlugify(basename)}`);
      const keys = [
        basename.toLowerCase(),
        astroSlugify(basename),
        basename.replace(/ /g, '_').toLowerCase(),
        basename.replace(/ /g, '-').toLowerCase(),
      ];
      if (data.title) {
        keys.push(data.title.toLowerCase());
        keys.push(astroSlugify(data.title));
      }
      if (Array.isArray(data.aliases)) {
        data.aliases.forEach(a => keys.push(a.toLowerCase().trim()));
      }
      keys.forEach(key => {
        if (key && !index.has(key)) index.set(key, permalink);
      });
    } catch (e) { continue; }
  }
  return index;
}

const publishDir = process.env.VAULT_PUBLISH_PATH || './content-source/Publish';
const fileIndex = buildFileIndex(publishDir);

// https://astro.build/config
export default defineConfig({
  site: 'https://goryugo.com',
  integrations: [preact()],
  image: {
    // Disable image optimization - images will be handled later
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },
  markdown: {
    remarkPlugins: [
      remarkGfm,
      remarkObsidianCallout,
      [wikiLinkPlugin, {
        aliasDivider: '|',
        pageResolver: (name) => {
          const permalink = fileIndex.get(name.toLowerCase()) ||
                           fileIndex.get(astroSlugify(name));
          return permalink ? [permalink.replace(/^\//, '')] : [astroSlugify(name)];
        },
        hrefTemplate: (permalink) => `/${permalink}`,
        wikiLinkClassName: 'internal-link',
        newClassName: 'new-link'
      }]
    ]
  }
});
