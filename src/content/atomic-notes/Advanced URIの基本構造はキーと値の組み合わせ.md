---
project: an
title: Advanced URIの基本構造はキーと値の組み合わせ
prefix:
topic:
  - obsidian
  - tool
  - advanced-uri
---

# Advanced URIの基本構造はキーと値の組み合わせ

## 概要

Obsidian Advanced URIの基本的な構文は、`obsidian://advanced-uri?` の後に「キー=値」の形式でコマンドを記述する。例えば `workspace=main` と書けばメインワークスペースを開ける。この単純な構造を理解することで、様々な自動化が可能になる。

## 具体的な活用方法

**基本構文**:
```
obsidian://advanced-uri?キー=値
```

**主要なキーの例**:
- `workspace=main` - ワークスペースを開く
- `filename=読んだ本2023年` - 特定のファイルを指定
- `data=アトミックシンキング` - テキストを追記
- `saveworkspace=true` - ワークスペースを保存

**複数のキーの組み合わせ**:
```
obsidian://advanced-uri?filename=読んだ本2023年&data=アトミックシンキング
```

キーを `&` でつなぐことで、複数の操作を同時に実行できる。

## 実践のコツ

- 最初は単純な1つのキーから試す（`workspace=main` など）
- 慣れてきたら複数のキーを組み合わせる
- GitHubのドキュメントで利用可能なキーを確認する
- テンプレートにリンクを埋め込んでおくと便利

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー9動画アーカイブ](https://knowledgestuck.substack.com/p/ks009)
  - [00:21:21](https://knowledgestuck.substack.com/p/ks009?timestamp=1281) - Advanced URIの基本構造の説明
  - [00:24:47](https://knowledgestuck.substack.com/p/ks009?timestamp=1487) - キー=値の基本的な使い方
