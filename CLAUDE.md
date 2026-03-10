# Claude Code 作業ガイド（goryugo-com）

このファイルは Claude Code がこのリポジトリで作業する際の必読ガイドです。
同じミスを繰り返さないための教訓を記録しています。

---

## ⚠️ ワークツリー作業の鉄則

このリポジトリは **git worktree** を使って作業することがある。
worktree のパスは `/Users/goryugo/github/goryugo-com/.claude/worktrees/<name>/` 。

### 絶対に守ること

**ファイルを編集するときは、必ず現在の作業ディレクトリ（worktree）内のパスを使う。**

```
✅ /Users/goryugo/github/goryugo-com/.claude/worktrees/wizardly-feistel/src/pages/index.astro
❌ /Users/goryugo/github/goryugo-com/src/pages/index.astro  ← これはメイン repo（別ブランチ）
```

作業を始めたら `pwd` または git status で現在のブランチを確認してから編集する。

---

## ⚠️ .env ファイルの注意

worktree はメイン repo の `.env` を引き継がない。
dev server を起動する前に必ず確認：

```bash
ls .env  # ファイルがなければ symlink を作る
ln -s /Users/goryugo/github/goryugo-com/.env .env
```

これをしないと `getCollection('blog')` / `getCollection('notes')` が「コレクションが空」エラーになる。

---

## ⚠️ Write ツールと bash heredoc

**Write ツールはファイルを Read してからでないと使えない。**

回避策として bash heredoc を使う場合：
```bash
cat > /path/to/file.astro << 'ENDOFFILE'
...内容...
ENDOFFILE
echo "done"
```

heredoc で書いた後は **Astro の dev server を再起動しないと CSS が更新されない**。
ファイルウォッチャーが bash 書き込みを正しく検知しないことがある。
→ `preview_stop` → `preview_start` で再起動する。

---

## preview 検証フロー

コードを変更したら必ず以下の順で確認：

1. `preview_start` でサーバー起動（すでに起動中なら stop → start）
2. `preview_logs` でエラーがないか確認
3. `preview_screenshot` で表示を確認
4. 怪しければ `preview_inspect` で CSS の computed style を確認

**`preview_inspect` で `display: block` が返ってきたら CSS が未適用**。
サーバー再起動で解決する。

---

## Substack URL

ニュースレターの正しい URL：
```
https://knowledgestuck.substack.com/
```

`goryugo.substack.com` は古い URL。使わない。

---

## コンテンツ設計の詳細は docs/specs/ を参照

- `docs/specs/goryugo-final-instructions.md` — サイト全体の設計書（最重要）
- `docs/specs/site-information-architecture.md` — 最近実装した IA・ハブページ設計
