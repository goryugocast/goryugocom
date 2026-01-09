---
project: an
title: Advanced URIとブックマークレットでAmazon書誌情報ノートをワンクリック作成
prefix: ''
topic:
- Obsidian
- ブックマークレット
source_article: ks.230420_🔧ObsidianにワンクリックでAmazon書誌情報ページを作る
note_type: method
---

# Advanced URIとブックマークレットでAmazon書誌情報ノートをワンクリック作成

## 概要
Obsidianのプラグイン「Advanced URI」と、特定のJavaScriptを実行するブックマークレットを組み合わせることで、Amazonの書籍ページを開いているときにワンクリックで書誌情報を含んだノートをObsidian内に自動生成することができる。

## 重要なポイント
- この仕組みのコアは「Advanced URI」プラグインである。
- ブックマークレットが、開いているページの情報を取得し、Advanced URIが解釈できる形式のリンク（URI）を生成して実行する。
- ユーザーは、プラグインのインストールとブックマークレットの登録だけで、この機能を利用できる。

## 実践のヒント / 関連する概念
同様の仕組みを応用すれば、Amazon以外のWebページ（書評ブログ、映画レビューサイトなど）からも情報を抽出し、定型的なノートを作成するブックマークレットを自作できる可能性がある。

## 出典・参照
- [ObsidianにワンクリックでAmazon書誌情報ページを作る](https://knowledgestuck.substack.com/p/obsidianamazon)
