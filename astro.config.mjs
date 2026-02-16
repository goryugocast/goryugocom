import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import wikiLinkPlugin from 'remark-wiki-link';
import { astroSlugify } from './src/plugins/remark-obsidian-resolver.mjs';

// 不要なインデックス構築とプラグイン設定を削除

export default defineConfig({
  site: 'https://portal.goryugo.com',
  integrations: [preact()],
  markdown: {
    remarkPlugins: [
      [wikiLinkPlugin, {
        aliasDivider: '|',
        pageResolver: (name) => {
          // targetName に基づく全ての候補を返す
          return [name, astroSlugify(name), name.replace(/ /g, '_'), name.replace(/ /g, '-')];
        },
        hrefTemplate: (permalink) => {
          return `/topics/${astroSlugify(permalink)}`;
        },
        wikiLinkClassName: 'internal-link',
        newClassName: 'new-link'
      }]
    ]
  }
});
