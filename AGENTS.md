# Agent Guide（goryugo-com）

すべてのエージェント（Claude・Codex・Antigravity 等）が従う共通ルール。
エージェント固有の補足は `CLAUDE.md` 等を参照。

---

## Role

**このリポジトリ = Astro コードの実装のみ。**

コンテンツの執筆・編集は Obsidian Vault 側のエージェントが行う。
このリポジトリのエージェントは Vault のファイルを「参照」することはあっても「書き込まない」。

---

## Scope

| 対象 | 操作 |
|------|------|
| `src/` 以下の Astro コード | ✅ 読み書き |
| `docs/specs/` | ✅ 読み書き |
| `astro.config.mjs` / `package.json` / `tsconfig.json` | ✅ 読み書き |
| `data/` | ✅ 読み書き |
| Vault（`VAULT_PUBLISH_PATH` 以下） | 🔍 読み取りのみ |
| Vault 内のノート・frontmatter | ❌ 書き込み禁止 |

---

## Shared Spec（唯一の事実）

スキーマ・フロントマターのルールは必ずここを参照する：

- `docs/specs/site-information-architecture.md` — frontmatter・IA 設計
- `docs/specs/goryugo-final-instructions.md` — サイト全体設計（最重要）

**スキーマ変更が必要なとき：**
1. `docs/specs/` を先に更新する
2. コードに実装する
3. Vault 側のエージェントへ「frontmatter ルールが変わった」と人間経由で伝える

---

## Key Facts

```
Substack URL  : https://knowledgestuck.substack.com/
コンテンツソース: env VAULT_PUBLISH_PATH
type: landing  → ハブページ（トップの「テーマ別に読む」グリッドに表示）
type: note     → 通常ノート
type: blog     → ブログ記事（blog コレクション）
```

---

## セッション終了プロトコル（必須）

**作業が終わったら必ずこれを実行する。スキップ禁止。**

### ステップ 1: 統合アクションログに記録する

Vault と共有の統一ログに書き込む。このファイルへの書き込みは **スコープの例外として許可**。

```bash
VAULT_ROOT="/Users/goryugo/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian_local"
DATE=$(date +%Y-%m-%d)
YYMMDD=$(date +%y%m%d)
TIME=$(date +%H:%M)
LOG="${VAULT_ROOT}/notes/Log/Analytics/actions/${YYMMDD}_action_log.md"

# ファイルがなければヘッダーを作成
if [ ! -f "$LOG" ]; then
cat > "$LOG" << HEADER
---
type: action_log
date: ${DATE}
---
# Action Log
HEADER
fi

# 末尾に追記（action_type・summary・対象ファイルを実際の内容に置き換える）
cat >> "$LOG" << 'LOGEOF'

## HH:MM design-layout [astro]

**サマリ**:
何をしたか・なぜしたか・動作確認済みかを記述する

**対象ファイル**:
- src/pages/index.astro
- src/layouts/Note.astro
LOGEOF
```

`action_type` は `log-analytics-action` スキルの定義を参照して選ぶ。

### ステップ 2: git commit

```bash
git add -A
git commit -m "作業内容の一行要約"
```

### ログの参照

analyze- 系スキルは `notes/Log/Analytics/actions/` を見ることで Astro 側の変更も把握できる。

---

## Frontmatter Schema（参照用）

```yaml
# ハブページ
title: タイトル
type: landing
permalink: url-slug      # 先頭の / なし
description: 1〜2文

# ブログ記事
title: タイトル
permalink: /blog/YYYY/slug
date: YYYY-MM-DD
description: 記事を読んで書く（自動抽出しない）
status: published
```

