# サイト情報アーキテクチャ（IA）仕様

最終更新: 2026-03-10

---

## トップページ（index.astro）の構成

```
1. Hero セクション
   - サイト名 h1
   - サイト説明文（2行）

2. テーマ別に読む（ハブページグリッド）
   - type: landing のノートを 2×2 カード形式で表示
   - 各カード：title（太字）+ description（薄グレー）
   - モバイル: 1列, デスクトップ: 2列グリッド

3. 最近のブログ記事
   - 8件（date 降順）
   - タイトル + 日付

4. Substack CTA
   - URL: https://knowledgestuck.substack.com/
   - 青背景カード形式
```

---

## ハブページ（案内ハブ）パターン

### frontmatter

```yaml
---
title: ページタイトル
type: landing          # ← ハブページのマーカー。これがないとトップに表示されない
permalink: some-slug   # ← URL（先頭の / なし）
description: 1〜2文の説明文。トップページのカードに表示される
---
```

### 本文構成

```markdown
[リード段落: 定義 + フック]

## [テーマ名]とは
[体験談・哲学 500〜1000字]

## [テーマ名]に何を書くか / 使い方
[実践的な説明 200〜400字]

---

## まず読む
- [リンク1](URL)
  説明文（なぜ読むか一行）
- [リンク2](URL)
  説明文

## 実例を見る
- [[WikiLink|表示名]]
  説明文

## 関連テーマ
- [[他のまとめたノート|表示名]]
  説明文
```

### 文体

**敬体（です・ます調）** で統一する。

### 現在のハブページ一覧

| ファイル | permalink | title |
|---------|-----------|-------|
| `🗃️Zettelkastenについてまとめたノート.md` | `zettelkasten` | Zettelkasten |
| `🧠アトミックシンキングについてまとめたノート.md` | `atomic-thinking` | アトミック・シンキング |
| `🌱エバーグリーンノートについてまとめたノート.md` | `evergreen-notes` | エバーグリーンノート |
| `📅デイリーノートについてまとめたノート.md` | `daily-note` | デイリーノート |

すべて `Vault/Publish/🗂️10-19💡仕事術・ライフハック・デジタルツールの話/` に置いてある。

新しいハブページは `Vault/Publish/topics/` フォルダへ置くことも可。

---

## Note.astro のヘッダー

```astro
<header>
  <h1>{title}</h1>
  {description && (
    <p class="mt-3 text-base text-gray-500 leading-relaxed">{description}</p>
  )}
</header>
```

`type: landing` のノートは `description` が表示される。
通常のノートも `description` frontmatter があれば表示される。

---

## フッター（全ページ共通）

Note.astro・BlogPost.astro の末尾に Substack リンクを配置：

```
ニュースレターを購読しませんか？
Knowledge Stack（Substack）を購読する → https://knowledgestuck.substack.com
```

---

## getHref ヘルパー関数

permalink が数値や `/` なしの文字列でも正しく動作させるために使う。

```typescript
const getHref = (entry: { data: { permalink?: string | number }; id: string }) => {
  const p = entry.data.permalink ? String(entry.data.permalink) : '';
  if (!p) return `/${entry.id}`;
  return p.startsWith('/') ? p : `/${p}`;
};
```

---

## コンテンツスキーマ（config.ts 抜粋）

```typescript
type: z.enum(['blog', 'note', 'landing']).optional()
```

- `landing` = ハブページ（トップの「テーマ別に読む」に表示）
- `note` = 通常ノート
- `blog` = ブログ記事
- 未指定 = デフォルトはノートとして扱われる
