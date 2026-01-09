---
project: an
title: Obsidian Web Clipperの設定方法と活用例：Amazon書誌情報とYouTube動画
prefix: null
topic:
- Obsidian
- Web Clipper
- 活用例
source_article: ks.241125_Obsidian Web ClipperをカスタマイズしてAmazonから書誌情報を簡単に作る
note_type: method
---

# Obsidian Web Clipperの設定方法と活用例：Amazon書誌情報とYouTube動画

## 概要
Obsidian Web Clipperの具体的な設定方法を解説します。Amazonの商品ページから本の書誌情報を、YouTubeから動画のタイトル、チャンネル名、埋め込みコードを自動で抽出・保存するテンプレート例を紹介し、そのカスタマイズ性を提示します。

## 重要なポイント
- 設定手順の簡易化: 拡張機能のダウンロード、設定ファイルの解凍、設定ファイルの読み込みという3ステップで基本的な設定が可能。
- Amazon書誌情報クリップ: `selector:#productTitle`や`selector:#ASIN?value`など、CSSセレクターを使い、本のタイトル、ASIN、画像URL、著者、出版社、出版日などを抽出。
- YouTube動画クリップ: `selector:h1.ytd-watch-metadata`などで動画タイトル、チャンネル名、埋め込みコードを抽出。
- カスタマイズ可能なテンプレート: ウェブページの構造が変わった場合でも、ユーザー自身でテンプレートを修正し対応できる。

## 実践のヒント / 関連する概念
- Web Clipper拡張機能（PC）またはアプリ（iPhone）をインストールする。
- 提供された設定ファイル（Zip）をダウンロードし、読み込む。
- 必要に応じて、自身のWeb ClipperテンプレートをCSS Selectorなどを利用してカスタマイズする。
- AmazonやYouTube以外のウェブサイトでも、同様にWeb Clipperの設定を試してみる。

## 出典・参照
- [Obsidian Web ClipperをカスタマイズしてAmazonから書誌情報を簡単に作る](https://knowledgestuck.substack.com/p/obsidian-035)
- [Obsidian Web Clipper](https://obsidian.md/clipper)
- [Introduction to Obsidian Web Clipper - Obsidian Help](https://help.obsidian.md/web-clipper)
