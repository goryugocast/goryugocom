---
project: an
title: Dataviewで表示件数を制限して情報過多を防ぐ
prefix: null
topic:
- obsidian
- dataview
- workflow
- tool
note_type: method
---

# Dataviewで表示件数を制限して情報過多を防ぐ

## 概要

Dataviewで「いつかやりたいこと」などを表示する場合、`LIMIT`を使って表示件数を5個程度に制限する。あまりたくさん表示されても邪魔になるため、適度な数に抑えることがポイント。5個程度見えていれば気になっている範囲としては十分で、集中力も保てる。

## 具体的な活用方法

### 表示件数制限のクエリ例
```dataview
LIST FROM #thinking
WHERE sr_due < date(today)
SORT sr_due ASC
LIMIT 5
```
- `LIMIT 5`: 結果を5件だけ表示
- 「いつかやりたいこと」リストを5個に制限
- 気になる範囲としては十分な量

### メリット
- たくさん出ても邪魔にならない
- 重要なものに集中できる
- 視覚的な負担が減る
- 適度な量で管理しやすい

## 実践のコツ

- ノートを開いて考え、終わったらSpaced Repetitionで未来に送る
- 日付が未来になると自動的にリストから消える
- 次に表示されるべきノートが自動的に繰り上がる
- 毎日全部ゼロにしようとせず、適度な量を保つ

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー5動画アーカイブ](https://knowledgestuck.substack.com/p/5)
  - [00:36:16](https://knowledgestuck.substack.com/p/5?timestamp=2176) - 5個だけ表示する
  - [00:36:46](https://knowledgestuck.substack.com/p/5?timestamp=2206) - 5個制限がポイント
  - [00:37:02](https://knowledgestuck.substack.com/p/5?timestamp=2222) - 気になる範囲として十分
