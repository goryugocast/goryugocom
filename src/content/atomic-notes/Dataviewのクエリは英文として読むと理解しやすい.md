---
project: an
title: Dataviewのクエリは英文として読むと理解しやすい
prefix:
topic:
  - obsidian
  - dataview
  - tool
  - concept
---

# Dataviewのクエリは英文として読むと理解しやすい

## 概要

Dataviewのクエリは、英文として読むと意味が分かりやすい。難しいプログラミング言語ではなく、自然言語に近い構文で書かれているため、「LIST FROM」「WHERE」「SORT」などのキーワードを英語として理解すれば、何をしているかが直感的に把握できる。

## 重要なポイント

### 基本的な読み方
```dataview
LIST FROM #working AND !"_note-template"
WHERE sr_due < date(today)
SORT sr_due ASC
```

英文として読むと：
- **LIST FROM**: 「〜からリストを作る」
- `#working`: 「workingタグがついているもの」
- `AND !`: 「かつ、〜ではないもの」
- `"_note-template"`: 「_note-templateフォルダの中にないもの」
- **WHERE**: 「どこから（どれを）並べるか」
- `sr_due < date(today)`: 「sr_dueが今日の日付より小さい（過去の）もの」
- **SORT**: 「並び替え」
- `ASC`: 「昇順（小さい順）」

## 実践のコツ

- 「LIST FROM」と「WHERE」の2つさえ使えれば、基本的に何でもできる
- 複雑に見えても、英文として区切って読めば理解できる
- `!`（ビックリマーク）は否定（NOT）の意味
- 最初は既存のクエリをコピーして、少しずつ変更しながら理解を深める

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー5動画アーカイブ](https://knowledgestuck.substack.com/p/5)
  - [00:27:11](https://knowledgestuck.substack.com/p/5?timestamp=1631) - 英語で読むと分かりやすい
  - [00:27:33](https://knowledgestuck.substack.com/p/5?timestamp=1653) - LIST FROM WHERE の説明
  - [00:35:49](https://knowledgestuck.substack.com/p/5?timestamp=2149) - LIST FROM と WHERE の2つで何でもできる
