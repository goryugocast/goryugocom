# goryugo.com 設計書
## Claude Codeへの完全指示書

---

# Part 1: このプロジェクトの哲学

## なぜこのサイトを作るのか

ごりゅごさんが面白いと感じたものを書く。忖度しない。Claudeはそれを最大限に広げる。Googleのご機嫌伺いはClaudeがやる。ごりゅごさんは楽しんで書くことだけに専念する。

## サイトの目的（優先順）

1. **お金に苦労せず生きる手段**
   - アフィリエイト収益（Amazon・楽天・Yahoo・その他）
   - Substack有料会員の増加
   - Substackへの誘導は有料会員を増やすための手段

2. **思考の変遷の記録**
   - 記事単体に価値があるのではなく、変化し続けてきた人間の歴史に価値がある
   - 「かつてこう思っていた、今はこう変わった」はAIが量産できない唯一のコンテンツ
   - 15年以上分のブログ記事、Obsidianのノートが土台にある

3. **仲良くなれる人との出会い**
   - 顔の見えない大勢ではなく、深く繋がれる人が来る場所
   - ごりゅごさんの人柄・考え方が伝わるコンテンツを前面に出す

## 役割分担

**ごりゅごさんがやること**
- 面白いと感じたものを書く
- Claudeの提案に「あり・なし」の判断を出す
- 最終的な公開許可を出す
- それだけ

**Claudeがやること**
- 書いたものを最大限に広げる
- 記事の提案と下書き生成
- descriptionの生成（本文を読んで書く。自動抽出しない）
- アフィリエイトリンクの管理・最適化
- Kindleセール記事の自動生成
- アクセスデータの分析と改善提案
- 「あり・なし」フィードバックを学習して精度を上げる
- フォルダ構造の変化・規約変更などへの対応

## やらないこと

- アドセンス（完全に使わない）
- 完全自動公開（最初はやらない。運用して信頼が積まれたら段階的に任せる）
- Googleアルゴリズムへの手動対応
- アフィリエイト規約変更への手動対応

---

# Part 2: コンテンツ構造

## ソース

Obsidian Vaultの `Publish/` フォルダをコンテンツソースとして使用する。

## フォルダ構造

```
Publish/
  blog/               ← ブログ記事（Publish/blog/ 以下が全部ブログ）
    2024/
      article.md      ← 年別フォルダあり
    2025/
      article.md
    flat-article.md   ← フォルダなしもある
  some-note.md        ← Wikiノート（フラット）
  other-note.md
  tools/              ← 将来的に追加されるフォルダ（人間の都合で自由に追加）
    obsidian.md
```

**重要な設計原則**
- フォルダ構造はObsidian側で人間が自由に決める
- Astroはpermalinkだけを見てURLを決める
- フォルダ構造が変わってもURLは変わらない
- `Publish/blog/` 以下がブログ、それ以外がノート、という判定のみ行う

---

# Part 3: URL設計（最重要）

## 基本方針

**現在のObsidian PublishのURLを完全に維持する。** 検索エンジンからのアクセスがあるため、URLが変わると流入が失われる。

## permalinkの扱い

### ノート
frontmatterの `permalink` をそのままURLとして使用する。すでに全ノートに設定済み。

### ブログ記事
`permalink` がない場合はClaudeが生成してfrontmatterに書き込む。

**ブログpermalinkのルール**
```
/blog/YYYY/英語スラッグ
例：/blog/2026/obsidian-daily-note-tips
```
- 日本語タイトルは意味のある英語に変換（直訳より意訳）
- 短く・意味がわかるもの
- 記事の内容を正確に反映する

---

# Part 4: frontmatterの設計

```yaml
---
title: "記事タイトル"
permalink: /blog/2026/article-slug
date: 2026-03-08
tags: [obsidian, productivity]
description: "Claudeが記事を読んで書いたdescription（自動抽出しない）"
status: published        # draft / published / archived
type: blog               # blog / note / landing
affiliate: false         # アフィリエイトリンクを入れるか
noindex: false           # 検索エンジンにindexさせるか
revenue_potential: low   # low / medium / high（Claudeが評価）
related: []              # 関連記事のpermalink
---
```

**必須**：title、permalink
**推奨**：date、description、tags
**任意**：その他（Claudeが必要に応じて追加）

---

# Part 5: データ設計

## アフィリエイト管理

Astroプロジェクト内に置く（GitHubで管理）。

```
~/GitHub/goryugo-com/
  data/
    affiliates/
      amazon.json
      rakuten.json
      yahoo.json
      others.json
```

```json
// amazon.json の例
{
  "obsidian-book": {
    "url": "https://amzn.to/xxxxx",
    "title": "Obsidian関連書籍",
    "category": "obsidian",
    "updated": "2026-03-08"
  }
}
```

## 書籍データベース

ごりゅごさんがフィードバックしやすいよう**Obsidian Vault内**に置く（iCloudで同期）。

```
Publish/（またはVault内の任意の場所）
  claude/
    books/
      preferences.md    ← フィードバック蓄積
```

ごりゅごさんのObsidianに「読んだ本ノート」がすでにある（1本1ノート、読了日・評価等のパラメータあり）。Claudeはこれを参照してセール記事・おすすめ記事の素材にする。

**フィードバックの蓄積（preferences.md）**
```markdown
# 書籍フィードバック

## 学習ログ
- YYYY-MM-DD：「XX」は外してほしかった。理由：YY
- YYYY-MM-DD：「ZZ」は好評だった
```

## Claudeの作業ログ

Astroプロジェクト内に置く（GitHubで管理）。

```
~/GitHub/goryugo-com/
  claude-logs/
    YYYY-MM-DD.md
```

```markdown
# 2026-03-08 Claude作業ログ

## 自動公開（Kindleセール）
- 「XX」「YY」を公開しました

## 提案（要確認）
- 記事案：下書きを draft/YYYY-MM-DD-title.md に作成しました
- 公開候補ノート：note-name.md

## やったこと
- 内部リンク3件追加
- アフィリエイトリンク更新
```

---

# Part 6: Kindleセール・書籍紹介の仕組み

## 方針

- 0時更新のKindleセール情報を定期取得
- 信頼できるセール情報サイトも参照
- ジャンル問わず広く対象（人文・マンガ・小説・サイエンス・生産性・Obsidian・iPad・音楽など）
- Claudeが候補を選ぶ→ごりゅごさんが「あり・なし」を判断→Claudeが学習して精度を上げる

## 自動公開（例外的に許可）

Kindleセールは時間勝負のため、セール記事のみ自動公開を許可する。ただし：
- 当日のclaude-logsに自動公開した記事一覧を必ず記録する
- ごりゅごさんがClaude Codeに直接話しかけてフィードバックを出せる
- フィードバックは `data/books/preferences.md` に記録して次回に反映する

## フィードバックの出し方

ごりゅごさんがClaude Codeに直接話しかけるだけでOK。
例：「今日のセール記事、この本は外してほしかった。理由はXX」
→ ClaudeがpreferencesファイルとCloudflare Analyticsを見ながら精度を上げる

---

# Part 7: 技術スタック・実装指示

## 技術スタック

- **フレームワーク**：Astro（最新版・5.x系）
- **UI**：Preact
- **スタイリング**：Tailwind CSS
- **言語**：TypeScript
- **ホスティング**：Cloudflare Pages（無料・高速・MCP対応）
- **アナリティクス**：Cloudflare Analytics（GAは使わない）

## 必須パッケージ

```json
{
  "dependencies": {
    "astro": "latest",
    "@astrojs/preact": "latest",
    "@astrojs/tailwind": "latest",
    "preact": "latest",
    "gray-matter": "latest",
    "remark-gfm": "latest",
    "remark-wiki-link": "^2.0.1",
    "remark-obsidian-callout": "latest"
  }
}
```

## WikiLinksの処理

**remark-wiki-link一本で処理する。** 事前変換スクリプトは不要。

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import wikiLinkPlugin from 'remark-wiki-link';
import remarkObsidianCallout from 'remark-obsidian-callout';
import remarkGfm from 'remark-gfm';
import { glob } from 'glob';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

function astroSlugify(text) {
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-');
}

function buildFileIndex(sourceDir) {
  const index = new Map();
  const files = glob.sync('**/*.md', { cwd: sourceDir, absolute: true });
  for (const absPath of files) {
    try {
      const content = fs.readFileSync(absPath, 'utf8');
      const { data } = matter(content);
      const basename = path.basename(absPath, '.md');
      const permalink = data.permalink || `/${astroSlugify(basename)}`;
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

export default defineConfig({
  site: 'https://goryugo.com',
  integrations: [preact(), tailwind()],
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
```

## Calloutのスタイリング

```css
.callout { border-left: 4px solid; padding: 1rem; margin: 1rem 0; border-radius: 4px; }
.callout[data-callout="note"] { border-color: #4a9eff; background: #e8f4ff; }
.callout[data-callout="warning"] { border-color: #ff9f43; background: #fff3e0; }
.callout[data-callout="tip"] { border-color: #2ed573; background: #e8fff0; }
.callout[data-callout="important"] { border-color: #ff4757; background: #fff0f0; }
.callout-title { font-weight: bold; margin-bottom: 0.5rem; }
```

## コンテンツコレクション設計

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const sharedSchema = z.object({
  title: z.string(),
  permalink: z.string().optional(),
  date: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
  type: z.enum(['blog', 'note', 'landing']).optional(),
  affiliate: z.boolean().default(false),
  noindex: z.boolean().default(false),
  revenue_potential: z.enum(['low', 'medium', 'high']).optional(),
  related: z.array(z.string()).optional(),
  aliases: z.array(z.string()).optional(),
});

export const collections = {
  blog: defineCollection({ type: 'content', schema: sharedSchema }),
  notes: defineCollection({ type: 'content', schema: sharedSchema }),
};
```

## ページルーティング

```astro
---
// src/pages/[...slug].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const [notes, blog] = await Promise.all([
    getCollection('notes'),
    getCollection('blog'),
  ]);
  const allContent = [...notes, ...blog];
  return allContent
    .filter(entry => entry.data.status !== 'draft')
    .map(entry => {
      const permalink = entry.data.permalink;
      const slugParts = permalink
        ? permalink.replace(/^\//, '').split('/')
        : [entry.slug];
      return {
        params: { slug: slugParts.join('/') },
        props: { entry }
      };
    });
}
---
```

### ページ一覧
- `src/pages/index.astro` — トップページ
- `src/pages/blog/index.astro` — ブログ一覧（日付降順）
- `src/pages/notes/index.astro` — ノート一覧
- `src/pages/tags/[tag].astro` — タグ別一覧
- `src/pages/[...slug].astro` — permalinkベースの動的ルーティング

## デザイン方針

- シンプルで読みやすいことを最優先
- モバイル対応（レスポンシブ）
- 参考デザインは別途画像で渡す

### 必須UI要素
- ヘッダー（サイト名、ナビゲーション）
- 記事本文エリア（読みやすい最大幅）
- **全記事の末尾にSubstackへの登録リンク**（シンプルなテキストリンクでOK）
- フッター

### 不要なもの
- サイドバー、検索、コメント、広告

## OGP設定

```astro
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={Astro.url} />
<meta property="og:type" content={isArticle ? "article" : "website"} />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
```

descriptionはfrontmatterの `description` を使用。**本文から自動抽出しない。Claudeが記事を読んで書く。**

## 環境変数

```
VAULT_PUBLISH_PATH=/Users/ごりゅご/Library/Mobile Documents/com~apple~CloudDocs/path/to/Publish
```

- Vaultのパスはハードコードしない
- `.env`に書いて`.gitignore`に追加する
- 別マシンで作業する場合は`.env`だけ書き換える

## 運用ディレクトリ

```
~/GitHub/goryugo-com/                          ← Astroプロジェクト
~/Library/Mobile Documents/com~apple~CloudDocs/
  .../Publish/                                 ← コンテンツソース（VAULT_PUBLISH_PATHで指定）
```

ごりゅごさんの作業フロー：
1. ObsidianでPublish/以下のノート・記事を書く
2. `~/GitHub/goryugo-com/`でClaude Codeを起動
3. Claude Codeがビルド・デプロイ・提案・改善を行う

## npm scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

## Cloudflare Pages設定

```toml
# wrangler.toml
name = "goryugo-com"
compatibility_date = "2026-01-01"

[build]
command = "npm run build"
publish = "dist"
```

## 画像（後回し）

`![[image.png]]` はそのまま残す。表示が崩れてもOK。別タスクで対応する。

## ディレクトリ構造

```
/
├── data/
│   ├── affiliates/
│   │   ├── amazon.json
│   │   ├── rakuten.json
│   │   ├── yahoo.json
│   │   └── others.json
│   └── books/
│       └── preferences.md
├── claude-logs/
│   └── .gitkeep
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   ├── blog/
│   │   └── notes/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/index.astro
│   │   ├── notes/index.astro
│   │   ├── tags/[tag].astro
│   │   └── [...slug].astro
│   ├── layouts/
│   │   ├── Layout.astro
│   │   ├── BlogPost.astro
│   │   └── Note.astro
│   └── styles/
│       └── global.css
├── public/
├── astro.config.mjs
├── wrangler.toml
├── package.json
└── tsconfig.json
```

## 作業手順

1. Astroプロジェクト初期化
2. 必要パッケージのインストール
3. 環境変数の設定
4. astro.config.mjsの設定
5. src/content/config.tsの作成
6. data/ディレクトリとファイルの作成
7. claude-logs/ディレクトリの作成
8. レイアウトコンポーネントの作成
9. ページの作成
10. CSSスタイリング
11. wrangler.tomlの作成
12. 動作確認（npm run dev）

---

# Part 8: 将来やりたいこと（記録）

今すぐ実装しないが、設計の方向性として記録しておく。サイト公開後に順番に実装する。

## 毎日の自動化ループ
- Cloudflare Analytics MCPでアクセスデータを毎日取得
- ObsidianのデイリーノートにClaudeが自動で書き込む
- 「今日書くべき記事」をClaudeが提案する
- 内部リンクの自動最適化
- アフィリエイトリンクの収益率比較・最適化
- 大幅セール検知時の追加自動ビルド（RSS监視）

## アフィリエイト・収益の最適化
- 記事内に「関連する今セール中の本・ツール」を埋め込む（毎日ビルドで更新）
- クリック計測して「どの記事のどのリンクが効いたか」をClaudeが週次報告
- 改善し続けることを楽しむ運用（厳密な統計より改善している感覚を重視）
- Kindleセール以外のプラグイン・ツール系アフィリエイトも対象
  - Pluginboutique、Plugin Alliance、Native Instrumentsなど独自プログラムを発掘
  - Amazonより収益率が高い場合が多い
- 「アフィリエイトがなくても書く」姿勢が信頼を積んで転換率を上げる

## コンテンツの自動生成・改善
- 既存ノートをClaudeがスキャンして「公開候補」を提案
- 人気記事の「関連記事」を自動充実
- 古い記事の定期的なリライト提案

## 思考の変遷コンテンツ
- WordPress記事（15年以上分）をMarkdownに変換してClaudeが読める形にする（別タスク）
- 「2018年はこう書いていた、2026年の今はこう」という変遷記事をClaudeが抽出・提案
- ごりゅごさんが肉付けして記事にする

## 書籍・モノのデータベース
- 読んだ本ノート（Obsidian）をClaudeが継続的に学習
- フィードバック蓄積によって選書精度が上がる
- 将来的にDBへの移行も検討
- 「ごりゅごさんの本棚」ページが自然にできる
- **買ったもの・欲しいものリスト**もコンテンツになる
  - 「実際に買った」「今欲しい」という文脈は信頼度が高い
  - 欲しいものリストは読者との距離が縮まる
  - Amazonウィッシュリストより人間味のある形で実現

## 音楽・DAWプラグイン分野（将来のサブドメイン展開）

### ビジョン
**64Pad演奏文化の世界的発信者になる。お金も稼ぐ。**

師匠サイト「無理ない暮らし」（うりなみさん）と並走して、Pad演奏という文化ごと世界に広げる。日本語＋英語で発信することで、世界中のPad奏者・興味ある人が「この人を見ておけ」となる場所を作る。

### 基本方針
- **music.goryugo.com** としてサブドメインで独立させることを検討
- goryugo.com完成後、ObsidianのフォルダとAstroの設計をサブドメイン展開に合わせて見直す
- **言語：日本語＋英語**（Claudeが英語版も作る。手間ほぼゼロで世界市場に出られる）
- 技術スタック・運用方法はgoryugo.comと完全共通化（Obsidian→Astro→Cloudflare Pages）

### ごりゅごさんの強みと差別化
- **64Padでジャズ・ファンクを演奏する**：世界レベルでも貴重な存在。YouTube演奏動画が「この人は本当に演奏している」という証明になる
- **哲学が核**：「たくさん買うな」「全部入り買うな」は売りたいサイトには絶対に書けない。だから信頼になる
- **アナログ志向**：サウンド的にも使いたいものも現代より古いものに向いている
- **演奏できる人間がDAWを使う**視点：情報を外から報告するだけの人間には永遠に書けない
- ギター出身→64Pad演奏というキャリアの変遷自体がコンテンツになる
- 「わからないことはわからない・自分のジャンルに偏っている」という正直さ

### 対象読者
- **64Padに興味がある人・始めたい人**：Padという楽器自体を広める入口
- **既存のPadユーザー**：もっとうまく使いたい人
- かつて演奏していて、今はDAWとPadで音楽をやっている層
- 「結局あの音が好き」「あの頃のあれやろうぜ」という人

### コンテンツの素材
- noteに2000字超の記事が4〜5本（移行できる）
- YouTube演奏動画（埋め込み可能）
- Obsidianに音楽ノートあり（哲学・練習方法・プラグインの話）
- これらがgoryugo.comと同じ構造でそのまま使える

### アフィリエイト
- Pluginboutique・Plugin Alliance・Native Instrumentsなど独自プログラムを発掘
- アフィリエイトがなくても書く→信頼が積まれる→転換率が上がる
- 英語記事があれば英語圏のアフィリエイトプログラムも対象になる

## 「ごりゅごさんフィルター」としてのブランド
- 情報が溢れるAI時代に「ごりゅごさんが面白いと思ったもの」というフィルターの価値が上がる
- 本・ツール・プラグイン・ガジェット何でも対象
- Wirecutter的な存在感を個人スケールで持てる
- コンテンツが増えるほど雪だるま式に資産が育つ

---

# Part 9: 既存コードの参照先

portal.goryugo.comのコードが参考になる。特に以下を参照すること：

- `astro.config.mjs`：remark-wiki-linkの設定例
- `src/plugins/remark-obsidian-resolver.mjs`：astroSlugify関数

WikiLinks解決ロジック・ファイルインデックス構築のアイデアは参考にしつつ、新プロジェクトではsync-content.jsは使わない。remark-wiki-link一本で処理する。
