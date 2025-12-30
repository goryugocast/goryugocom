---
project: an
title: Dataviewの4つの表示形式と基本構文
prefix:
topic:
  - dataview
  - obsidian
  - tool
  - reference
---

# Dataviewの4つの表示形式と基本構文

## 概要

Dataviewプラグインには、LIST、TABLE、TASK、CALENDARの4つの表示形式がある。基本的な構文は「```dataview」で始まり、表示形式、FROM句、WHERE句、LIMIT句などを組み合わせることで、ノートを動的に抽出・表示できる。

## 4つの表示形式

- LIST:ノートをリスト形式で表示する
- TABLE:ノートをテーブル形式で表示する(列を指定可能)
- TASK:チェックボックスのタスクを抽出して表示する(FROM句不要)
- CALENDAR:ノートをカレンダー形式で表示する

## 基本構文

```
```dataview
LIST/TABLE/TASK/CALENDAR
FROM #タグ または "フォルダ名"
WHERE 条件式
LIMIT 件数
```
```

## 実践のヒント

- FROM句でタグやフォルダを指定して、対象範囲を絞り込む
- WHERE句で日付や条件による絞り込みが可能(例:sr_du < date(2023-03-04))
- LIMIT句で表示件数を制限できる(例:LIMIT 5で最大5件)
- 日付の比較が得意で、フロントマターやインライン形式の日付を認識する
- 仕組みはSQLに近いため、SQLに慣れている人はすぐに使える

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー7動画アーカイブ](https://knowledgestuck.substack.com/p/ks007)
  - [01:01:31](https://knowledgestuck.substack.com/p/ks007?timestamp=3691) - Dataviewの4つの表示方法
  - [01:02:09](https://knowledgestuck.substack.com/p/ks007?timestamp=3729) - 基本構文の説明
  - [01:03:04](https://knowledgestuck.substack.com/p/ks007?timestamp=3784) - WHERE句とLIMIT句の使い方
  - [01:05:00](https://knowledgestuck.substack.com/p/ks007?timestamp=3900) - SQLとの類似性
