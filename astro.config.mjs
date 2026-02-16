import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import wikiLinkPlugin from 'remark-wiki-link';
import remarkObsidianResolver, { buildFileIndex, astroSlugify } from './src/plugins/remark-obsidian-resolver.mjs';

const sourceBasePath = './content-source/Archives';
const externalCollections = ['ks', 'bc', 'iw', 'topics'];
const internalTopicsPath = './src/content/topics';

// ビルド時にインデックスを共有するための準備
const fileIndex = buildFileIndex({
  sourceBasePath,
  collections: externalCollections,
  internalTopicsPath // 相対パス変数を使用
});

export default defineConfig({
  site: 'https://portal.goryugo.com',
  integrations: [preact()],
  markdown: {
    remarkPlugins: [
      [remarkObsidianResolver, {
        sourceBasePath,
        externalCollections,
        collectionPriority: externalCollections,
        fileIndex // 構築済みのインデックスを渡す
      }],
      [wikiLinkPlugin, {
        aliasDivider: '|',
        pageResolver: (name) => {
          // targetName に基づく全ての候補を返す
          return [name, astroSlugify(name), name.replace(/ /g, '_'), name.replace(/ /g, '-')];
        },
        hrefTemplate: (permalink) => {
          const candidates = fileIndex.get(permalink) || fileIndex.get(permalink.replace(/-/g, ' '));
          const selected = candidates?.find(c => c.url) || candidates?.[0];
          if (selected?.url) return selected.url;
          return `/topics/${astroSlugify(permalink)}`;
        },
        wikiLinkClassName: 'internal-link',
        newClassName: 'new-link'
      }]
    ]
  }
});
