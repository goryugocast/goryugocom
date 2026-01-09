// @ts-check
import { defineConfig } from 'astro/config';
import { remarkWikiLink } from './remark-wiki-link.mjs';

// GitHub Actionsでビルドする時だけ base パスを設定
// ローカル開発時は base: '/' でシンプルに
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  site: 'https://portal.goryugo.com',
  base: '/',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkWikiLink],
  }
});
