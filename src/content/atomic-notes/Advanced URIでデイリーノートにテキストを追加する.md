---
project: an
title: Advanced URIでデイリーノートにテキストを追加する
prefix: null
topic:
- obsidian
- plugin
- automation
- bookmarklet
note_type: method
---

# Advanced URIでデイリーノートにテキストを追加する

## 概要

Advanced URIプラグインの書き込み機能を使うと、外部のブックマークレットやスクリプトから、Obsidianのデイリーノートに直接テキストを追加できる。これにより、Webページの情報をワンクリックでObsidianに取り込む仕組みが作れる。

## 具体的な活用方法

- `obsidian://advanced-uri?vault=Vault名&daily=true&mode=append&data=テキスト内容`の形式
- `daily=true`で今日のデイリーノートを対象にする
- `mode=append`で既存の内容の末尾に追加する
- JavaScriptのブックマークレットと組み合わせて、Amazon商品情報などを自動取得できる
- Safariでは許可を求められるが、許可すればObsidianに情報が即座に追加される

## 実践のヒント

- 本の情報を自動取得するブックマークレットを作成すると、読書管理が格段に楽になる
- タイトル、著者、URL、画像URLなどを整形してフロントマター形式で追加できる
- ブックマークレット内でテンプレート形式を定義すれば、常に同じフォーマットでノートが作成される
- パラメータとしてテキストを渡すため、URLエンコードが必要
- 外部連携の可能性が広がり、ObsidianをハブとしたワークフローPlain Textが構築できる

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー7動画アーカイブ](https://knowledgestuck.substack.com/p/ks007)
  - [01:23:26](https://knowledgestuck.substack.com/p/ks007?timestamp=5006) - Amazon書籍情報ブックマークレットの実演
  - [01:24:04](https://knowledgestuck.substack.com/p/ks007?timestamp=5044) - ブックマークレットによるノート自動作成
  - [01:24:43](https://knowledgestuck.substack.com/p/ks007?timestamp=5083) - デイリーノートへの書き込み設定
