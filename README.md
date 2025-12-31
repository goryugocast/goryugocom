# goryugo.com - Astro サイト

Knowledge Stuckのセミナー動画アーカイブサイト。

## 開発環境のセットアップ

```bash
npm install
npm run dev
```

ローカル開発サーバーは `http://localhost:4321/` でアクセスできます。

## ビルド

```bash
npm run build
```

ビルドされた静的ファイルは `dist/` ディレクトリに出力されます。

## デプロイ

GitHub Pagesへの自動デプロイは、`main` ブランチへのプッシュで自動的に実行されます。

### 環境変数による設定の切り替え

`astro.config.mjs` では、環境変数 `GITHUB_ACTIONS` を使ってローカル開発環境と本番環境を自動的に切り替えています：

- **ローカル開発**: `base: '/'` でシンプルなURL（`http://localhost:4321/`）
- **GitHub Pages**: `base: '/'` でカスタムドメインに対応（`https://portal.goryugo.com/`）

GitHub Actionsでは `GITHUB_ACTIONS=true` が自動的に設定されるため、デプロイ時は自動的に正しい設定が適用されます。

## ディレクトリ構造

```
web/
├── src/
│   ├── pages/          # ページファイル
│   │   └── index.astro # トップページ（セミナー一覧）
│   └── content/        # コンテンツ（Markdown）
│       └── ks/
│           └── セミナー/ # 公開セミナー記事（41件）
├── dist/               # ビルド出力（Git無視）
└── astro.config.mjs    # Astro設定
```

## デプロイフロー

1. `main` ブランチにプッシュ
2. GitHub Actions が自動実行（`.github/workflows/deploy.yml`）
3. `npm ci` で依存関係インストール
4. `npm run build` で静的ファイル生成
5. GitHub Pages にデプロイ
6. https://portal.goryugo.com/ で公開

## 公開範囲

`.gitignore` で以下のコンテンツのみ公開：
- `web/src/content/ks/セミナー/` のみ（41件のセミナー動画）
- その他のコンテンツ（atomic-notes, topic, セミナー以外のks記事）は非公開
