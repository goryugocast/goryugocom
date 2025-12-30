---
project: an
title: Dataviewでデイリーノートテンプレートに動的リストを埋め込む
prefix:
topic:
  - dataview
  - daily-note
  - template
  - workflow
---

# Dataviewでデイリーノートテンプレートに動的リストを埋め込む

## 概要

デイリーノートのテンプレートにDataviewのクエリを直接記述することで、毎日自動的に更新されるタスクリストや振り返りリストを表示できる。テンプレート内の`{{date}}`のような変数と組み合わせることで、その日の日付に応じた動的なフィルタリングが可能になる。

## 具体的な活用方法

- テンプレート内に````dataview`ブロックを記述する
- `date({{date:YYYY-MM-DD}})`のように、テンプレート変数を使って今日の日付を参照する
- 今日が締切のタスク、今日振り返るべきノート、今週やるべきリピートタスクなどを自動表示
- 毎日新しいデイリーノートが作られると、その日の日付に応じたリストが自動生成される
- タグやフォルダを組み合わせて、複数の条件でノートを絞り込める

## 実践のコツ

- テンプレートに書いてあるため、毎日確実に同じフォーマットでタスクが表示される
- `WHERE sr_du < date({{date:YYYY-MM-DD}})`のように、今日より前の日付を条件にできる
- エリアタグなどで特定のカテゴリのタスクだけを表示することも可能
- テンプレートフォルダを除外する条件を入れると、テンプレート自体が表示されるのを防げる
- Dataviewのエラーが出る場合は、テンプレート内で`sql`などの余計な記述がないか確認する

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー7動画アーカイブ](https://knowledgestuck.substack.com/p/ks007)
  - [00:22:17](https://knowledgestuck.substack.com/p/ks007?timestamp=1337) - テンプレートでのDataview活用
  - [01:12:38](https://knowledgestuck.substack.com/p/ks007?timestamp=4358) - 日付変数の使い方
  - [01:13:01](https://knowledgestuck.substack.com/p/ks007?timestamp=4381) - リピートタスクの表示例
  - [00:37:29](https://knowledgestuck.substack.com/p/ks007?timestamp=2249) - テンプレートエラーの対処法
