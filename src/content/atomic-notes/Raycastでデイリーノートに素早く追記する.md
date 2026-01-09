---
project: an
title: Raycastでデイリーノートに素早く追記する
prefix: null
topic:
- obsidian
- daily-note
- tool
- raycast
note_type: method
---

# Raycastでデイリーノートに素早く追記する

## 概要

Raycastというランチャーアプリを使うと、思いついたことをその日のデイリーノートの最下部に素早く追記できる。「Obsidianデイリーに追加」というコマンドで入力すると、JavaScriptでクリップボードの内容を取得し、URLエンコードして、Advanced URIの `data` パラメータとして渡す仕組み。

## 具体的な活用方法

**使い方**:
1. Raycastを起動
2. 「Obsidianデイリーに追加」コマンドを実行
3. テキストを入力
4. その日のデイリーノート（5月6日など）の一番下に自動追記される

**仕組み**:
- JavaScriptでクリップボードの内容を取得
- URLエンコードして特殊文字を処理
- `obsidian://advanced-uri?data=...` の形式で渡す

**メリット**:
- 本の一手間が変わるだけで使い勝手が大きく変わる
- パソコンの前にいる時は常にすぐメモができる
- デイリーノートの活用が加速する

## 実践のコツ

- iPhoneやMacのショートカットアプリでも同様のことができる
- Raycastはコマンドとして非常に使いやすい
- Windowsでも同様のランチャーツールを使えば可能
- デイリーノートがすぐに忘れないためのメモツールとして機能

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー9動画アーカイブ](https://knowledgestuck.substack.com/p/ks009)
  - [00:08:49](https://knowledgestuck.substack.com/p/ks009?timestamp=529) - Raycastでのデイリーノート追記機能の紹介
  - [00:40:03](https://knowledgestuck.substack.com/p/ks009?timestamp=2403) - JavaScriptの実装詳細
