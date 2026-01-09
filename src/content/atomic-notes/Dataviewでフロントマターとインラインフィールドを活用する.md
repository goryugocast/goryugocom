---
project: an
title: Dataviewでフロントマターとインラインフィールドを活用する
prefix: null
topic:
- dataview
- obsidian
- metadata
- tool
note_type: method
---

# Dataviewでフロントマターとインラインフィールドを活用する

## 概要

Dataviewは、ノートのフロントマター(YAMLヘッダー)と本文中のインラインフィールド(::で囲んだパラメーター)を認識し、条件指定や絞り込みに活用できる。これにより、タグやフォルダだけでなく、独自の属性でノートを管理できるようになる。

## 具体的な活用方法

- フロントマター:ノート冒頭の`---`で囲まれた領域にキー:値を記述する
- インラインフィールド:本文中に`key:: value`の形式で記述する
- WHERE句で条件を指定:例えば`WHERE sr_du < date(2023-03-04)`で特定の日付より前のノートを抽出
- 日付系のデータをDataviewが自動認識してくれるため、日付比較が簡単
- テーブル表示で特定のフィールドを列として表示できる

## 実践のヒント

- フロントマターは構造化データに適しており、Dataviewとの相性が良い
- 次回実行日(sr_du)や締切日(due)などをフロントマターで管理すると、動的なタスクリストが作れる
- インラインフィールドは本文中に埋め込めるため、柔軟にメタデータを追加できる
- コロン2つ(::)で囲むことで、Dataviewがフィールドとして認識する
- フィールド名は自由に設定できるため、自分のワークフローに合わせてカスタマイズ可能

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー7動画アーカイブ](https://knowledgestuck.substack.com/p/ks007)
  - [01:04:04](https://knowledgestuck.substack.com/p/ks007?timestamp=3844) - フロントマターとインラインフィールドの説明
  - [01:03:21](https://knowledgestuck.substack.com/p/ks007?timestamp=3801) - WHERE句での日付条件指定
  - [00:56:26](https://knowledgestuck.substack.com/p/ks007?timestamp=3386) - Dataviewの多様な活用事例
