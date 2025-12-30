// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Actionsでビルドする時だけ base パスを設定
// ローカル開発時は base: '/' でシンプルに
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  site: isGitHubActions
    ? 'https://goryugocast.github.io'
    : 'http://localhost:4321',
  base: isGitHubActions ? '/goryugocom' : '/',
  output: 'static'
});
