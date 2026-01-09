---
project: an
title: Dataviewで前回と次回のノートへ自動リンクを作る
prefix: null
topic:
- obsidian
- dataview
- tool
- workflow
note_type: method
---

# Dataviewで前回と次回のノートへ自動リンクを作る

## 概要

同じカテゴリーの繰り返し業務（セミナー、記事配信など）で、前回のノートへのリンクを自動生成する仕組み。Dataviewで「同じタグがついている、今日より1日以上前の、一番近い日付のノート」を表示させることで、前回の内容を簡単にコピペして再利用できる。テンプレートごとコピーしても、リンクが自動的に正しい前回ノートを指してくれる。

## 具体的な活用方法

### 前回へのリンク（Dataviewクエリ例）
```dataview
LIST FROM #🎥プレゼン
WHERE file.day < this.file.day - dur(1 day)
SORT file.day DESC
LIMIT 1
```
- 同じタグ（例：`#🎥プレゼン`）がついているノート
- このファイルの日付より1日以上前
- 日付が近い順に並べて、1件だけ表示

### 次回へのリンク（Dataviewクエリ例）
```dataview
LIST FROM #🎥プレゼン
WHERE file.day >= this.file.day
SORT file.day ASC
LIMIT 1
```
- 今日以降の日付で、一番近い未来のノートを表示

## 実践のコツ

- 同じカテゴリーの仕事には必ず同じタグ（絵文字タグなど）をつける
- 前回のノートを開き、内容をコピペして新しいノートに貼り付ける
- テンプレート部分もまるごとコピーすれば、Dataviewが自動的に正しいリンクを生成
- セミナー、記事、ポッドキャストなど、繰り返し作業に非常に有効

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー5動画アーカイブ](https://knowledgestuck.substack.com/p/5)
  - [01:01:01](https://knowledgestuck.substack.com/p/5?timestamp=3661) - 前回のノートを使いたい場面
  - [01:01:45](https://knowledgestuck.substack.com/p/5?timestamp=3705) - 前回のノートへの自動リンク生成
  - [01:02:48](https://knowledgestuck.substack.com/p/5?timestamp=3768) - 次回のノートへの自動リンク
