---
project: an
title: CSSスニペットで特定の見た目だけを変更する
prefix: null
topic:
- tool
note_type: method
---

Obsidianのテーマ全体は気に入っているが、一部分だけ変更したい場合、CSSスニペット機能を使うと便利。

## CSSスニペットのメリット

テーマを変更せずに、H1の大きさやサイドバーの幅など、特定の要素だけを微調整できる。複数のスニペットを組み合わせて、自分好みの見た目を作れる。

## 設定手順

1. Settings → Appearance → CSS snippets
2. フォルダアイコンをクリックして、スニペット保存フォルダを開く
3. `.css`ファイルを作成（例：`h1-small.css`）
4. Obsidianの設定画面でスニペットをONにする

## 実用例

- H1見出しが大きすぎる → フォントサイズを小さくする
- サイドバーの文字が小さい → フォントサイズを大きくする
- 行間を調整したい → line-heightを変更する

## CSSの探し方

Developer Toolsを使って、変更したい要素のCSSクラス名を特定する。そのクラス名に対してCSSを記述すれば、ピンポイントで見た目を変更できる。

---

## 関連する概念

## 出典

- [『アトミック・シンキング』実践セミナー3動画アーカイブ](https://knowledgestuck.substack.com/p/seminar003)
  - [00:19:07](https://knowledgestuck.substack.com/p/seminar003?timestamp=1147) - CSSスニペットの使い方
  - [00:19:38](https://knowledgestuck.substack.com/p/seminar003?timestamp=1178) - スニペットファイルの作成方法
