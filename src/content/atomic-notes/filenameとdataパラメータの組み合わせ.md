---
project: an
title: filenameとdataパラメータの組み合わせ
prefix:
topic:
  - obsidian
  - tool
  - advanced-uri
---

# filenameとdataパラメータの組み合わせ

## 概要

Advanced URIで `filename` と `data` パラメータを組み合わせると、特定のファイルに直接テキストを追記できる。例えば「読んだ本2023年」というファイルに「アトミックシンキング」というテキストを追加する、といった操作がリンク1つで実現できる。

## 具体的な活用方法

**基本構文**:
```
obsidian://advanced-uri?filename=読んだ本2023年&data=アトミックシンキング
```

**動作**:
1. `filename=読んだ本2023年` で対象ファイルを指定
2. `data=アトミックシンキング` で追記する内容を指定
3. 指定したファイルの最下部にテキストが追加される

**活用例**:
- 読書リストに本のタイトルを追記
- プロジェクトノートに進捗メモを追記
- アイデアリストに新しいアイデアを追記
- 日報ファイルに作業記録を追記

## 実践のコツ

- `&` で複数のパラメータを連結
- ファイル名に日本語を使う場合はURLエンコードが必要
- デフォルトでは最下部に追記される
- ブックマークレットやスクリプトに組み込むと便利

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー9動画アーカイブ](https://knowledgestuck.substack.com/p/ks009)
  - [00:21:21](https://knowledgestuck.substack.com/p/ks009?timestamp=1281) - filenameとdataの組み合わせ例
  - [00:24:47](https://knowledgestuck.substack.com/p/ks009?timestamp=1487) - 複数パラメータの使い方
