---
project: an
title: DataviewとSpaced Repetitionを組み合わせるとタスクの日付管理を自動化できる
prefix: null
topic:
- task-management
- obsidian
- dataview
- spaced-repetition
- tool
note_type: method
---

# DataviewとSpaced Repetitionでタスク管理する仕組み

## 概要

DataviewプラグインとSpaced Repetitionプラグインを組み合わせることで、タスクの日付管理を自動化・効率化できる。タスクノートに`sr_due`という日付フィールドを持たせ、Dataviewで「今日より前の日付のもの」を抽出して表示。Spaced Repetitionのショートカットで日付を未来に送ることで、タスクの先送りや完了管理を簡単に行える。

## 具体的な活用方法

### Dataviewのクエリ設定
```dataview
LIST FROM #working AND !"_note-template"
WHERE sr_due < date(today)
SORT sr_due ASC
```
- `#working`タグがついているノートを抽出
- `sr_due`（締め切り日）が今日より前のものだけ表示
- 日付が古い順（遠い順）に並べる

### Spaced Repetitionでの操作
- ショートカットキー（例：Cmd+3）を押すと日付が未来に変わる
- Ankiのような仕組みで次回表示日を設定
- 手動で日付を変更することも可能

## 実践のコツ

- タスクが終わったら`#working`タグを消すだけで、リストから消える
- 先送りしたい場合は、日付を手動で未来の日に変更
- 全て処理できたら「今日やること」がゼロになり、達成感が得られる

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー5動画アーカイブ](https://knowledgestuck.substack.com/p/5)
  - [00:22:16](https://knowledgestuck.substack.com/p/5?timestamp=1336) - 今日やることの自動表示
  - [00:23:04](https://knowledgestuck.substack.com/p/5?timestamp=1384) - Spaced Repetitionの活用
  - [00:27:00](https://knowledgestuck.substack.com/p/5?timestamp=1620) - Dataviewクエリの解説
