# CLAUDE.md（goryugo-com）

**まず `AGENTS.md` を読むこと。** 役割・スコープ・スキーマの共通ルールはすべてそこにある。

このファイルには **Claude 固有の運用メモ** のみを記載する。

---

## ⚠️ ワークツリーの罠

worktree のパス: `/Users/goryugo/github/goryugo-com/.claude/worktrees/<name>/`

**編集するファイルのパスは必ず worktree 内を指すこと。**

```
✅ /Users/goryugo/github/goryugo-com/.claude/worktrees/wizardly-feistel/src/pages/index.astro
❌ /Users/goryugo/github/goryugo-com/src/pages/index.astro  ← メイン repo（別ブランチ）
```

作業開始時に `pwd` または `git status` でブランチを確認してから始める。

---

## ⚠️ .env は symlink が必要

worktree はメイン repo の `.env` を引き継がない。dev server 起動前に確認：

```bash
ls .env || ln -s /Users/goryugo/github/goryugo-com/.env .env
```

これをしないと `getCollection('blog')` / `getCollection('notes')` が空になる。

---

## ⚠️ Write ツールと heredoc

Write ツールはファイルを Read してからでないと使えない。
Read していない場合は heredoc で書く：

```bash
cat > /path/to/file << 'ENDOFFILE'
...
ENDOFFILE
echo "done"
```

heredoc 書き込み後は **dev server を再起動しないと CSS が反映されない**。
→ `preview_stop` → `preview_start`

---

## preview 検証フロー

1. `preview_start`（起動中なら stop → start）
2. `preview_logs` でエラー確認
3. `preview_screenshot` で表示確認
4. `preview_inspect` で computed style を確認

`display: block` が返ってきたら CSS 未適用 → サーバー再起動で解決。

