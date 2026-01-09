---
project: an
title: saveworkspaceでワークスペースを自動保存
prefix: null
topic:
- obsidian
- tool
- advanced-uri
- workspace
note_type: method
---

# saveworkspaceでワークスペースを自動保存

## 概要

Advanced URIの `saveworkspace=true` パラメータを使うと、現在の作業環境（レイアウト、開いているファイルなど）を指定したワークスペース名で保存できる。日付が変わるたびにデイリーノートのワークスペースを更新する作業を、リンクをクリックするだけで実行できる。

## 具体的な手順

**従来の手動方法**:
1. コマンドパレットを開く
2. 「ワークスペースを保存」を選択
3. ワークスペース名を入力

**Advanced URI活用後**:
```
obsidian://advanced-uri?saveworkspace=true&workspace=daily
```
このリンクをクリックするだけで、現在の状態が「daily」ワークスペースとして保存される。

**日々の更新の儀式**:
1. ピンを外す
2. 新しい日付のデイリーノートを開く
3. 再度ピンする
4. 保存リンクをクリック

## 実践のコツ

- 現在は1日の儀式として手動で実行しているが、将来的には完全自動化も可能
- テンプレートに保存リンクを埋め込んでおくと便利
- ワークスペース名は用途に応じて使い分ける（daily, writing, review など）

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー9動画アーカイブ](https://knowledgestuck.substack.com/p/ks009)
  - [00:19:28](https://knowledgestuck.substack.com/p/ks009?timestamp=1168) - ワークスペース保存機能の説明
  - [00:21:21](https://knowledgestuck.substack.com/p/ks009?timestamp=1281) - 日々の更新の儀式
