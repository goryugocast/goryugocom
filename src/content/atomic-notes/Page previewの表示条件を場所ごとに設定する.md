---
project: an
title: Page previewの表示条件を場所ごとに設定する
prefix: null
topic:
- workflow
note_type: method
---

Obsidianのページプレビュー機能は、リンクにカーソルを合わせたときの挙動を、画面の場所ごとに細かく設定できる。

## 設定できる条件

- Hover（カーソルを合わせるだけで表示）
- Cmd/Ctrl押しながら（修飾キーが必要）
- Never（表示しない）

これらを、エディタ部分、サイドバー、読み取りモードなど、場所ごとに個別設定できる。

## 推奨設定

### エディタ内

Never または Cmd押しながら

編集中は頻繁にリンクを通過するため、自動表示されると邪魔になりやすい。

### サイドバー

Hover

バックリンクやアウトリンク一覧では、内容を確認したいことが多いので、カーソルを合わせるだけで表示されると便利。

## なぜ場所ごとに設定するのか

同じ「Hover」設定でも、編集中とサイドバーでは望ましい挙動が異なる。場所に応じて最適化することで、作業効率が上がる。

---

## 関連する概念

## 出典

- [『アトミック・シンキング』実践セミナー3動画アーカイブ](https://knowledgestuck.substack.com/p/seminar003)
  - [00:32:01](https://knowledgestuck.substack.com/p/seminar003?timestamp=1921) - プレビュー表示条件の設定
  - [00:32:15](https://knowledgestuck.substack.com/p/seminar003?timestamp=1935) - 場所ごとの設定の理由
