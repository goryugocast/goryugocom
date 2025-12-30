---
project: an
title: Scrapboxプログラムの転用テクニック
prefix:
topic:
  - workflow
  - tool
  - javascript
  - bookmarklet
---

# Scrapboxプログラムの転用テクニック

## 概要

他のツール（Scrapboxなど）向けに作られたJavaScriptプログラムやブックマークレットは、最後の部分だけ変更すればObsidianでも使える。クラスターさんがScrapbox用に作っていたAmazon書籍情報取得プログラムを、ほぼ丸コピーしてObsidian用に転用した例がある。

## 具体的な活用方法

**転用の手順**:
1. 元のプログラムをコピー（Scrapbox用など）
2. データの取得部分はそのまま使う（タイトル、著者、出版社など）
3. 最後の出力部分だけ変更
   - Scrapbox → `window.open('https://scrapbox.io/...')`
   - Obsidian → `window.open('obsidian://advanced-uri?...')`

**元ネタの探し方**:
- GitHubで類似の機能を探す
- Scrapbox、Notion、Roamなどのコミュニティを調べる
- 他のツール用のブックマークレットを参考にする

**メリット**:
- ゼロから作る必要がない
- 実績のあるコードを活用できる
- データ取得のロジックは共通で使える

## 実践のコツ

- 「ほぼ丸コピー」で問題ない（個人利用の場合）
- 最後の部分（出力先）だけ変更すれば動く
- ChatGPTに「これをObsidian用に変えて」と依頼するのも有効
- クレジットを残すのがマナー

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー9動画アーカイブ](https://knowledgestuck.substack.com/p/ks009)
  - [00:13:06](https://knowledgestuck.substack.com/p/ks009?timestamp=786) - クラスターさんのプログラムを転用
  - [00:40:03](https://knowledgestuck.substack.com/p/ks009?timestamp=2403) - Scrapbox用のプログラムをObsidian用に変更
