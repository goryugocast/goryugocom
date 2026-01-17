---
project: an
title: AnkiとObsidianのフィールド構成を連動させることでノートから問題を自動生成できる
prefix: anki
topic:
  - Anki
  - Obsidian
  - 設定
  - データ連携
source_article: ks.221221_🔧KS011_Obsidian_to_AnkiでObsidianのノートから簡単にAnki問題を作る
note_type: insight
---

# AnkiフィールドとObsidianの連携

## 概要
Obsidianのノート内容をAnkiの問題として自動生成するために、AnkiとObsidianの間でデータの「フィールド」を正確に一致させる設定は不可欠である。特に、Ankiのデッキ名やノートタイプ、フィールド構成をObsidian側のプラグイン設定と連動させることで、スムーズな情報変換と問題作成を実現する。

## 重要なポイント
- **Anki側のデッキ・ノートタイプ設定**:
    - デッキ名：`Obsidian_to_Anki`という専用デッキを作成する。
    - ノートタイプ：標準の「追加：基本」から`Cloze`というノートタイプを新規作成する。
    - フィールド：`Context`, `Text`, `Link`の3つのフィールドを設定し、これらがObsidianからの情報を受け取る形になる。
- **カードテンプレートの設定**: Ankiのカードの「表面のテンプレート」と「裏面のテンプレート」をHTMLとCSSでカスタマイズし、`{{Context}}`, `{{cloze:Text}}`, `{{Link}}`といったフィールド情報を適切に表示させる。
- **Obsidian側の連携設定**: Obsidianの`Obsidian_to_Anki`プラグイン設定画面で、Ankiで作成した`Obsidian_to_Anki`デッキを標準デッキとして指定し、各Obsidian項目をAnkiのフィールドにマッピングする。

## 実践のヒント / 関連する概念
- Ankiのフィールド名は正確に設定し、Obsidian側の設定と一致させることで、意図通りの問題が生成される。
- Ankiのカードスタイル（CSS）を調整することで、視認性や学習効率を高めることができる。

## 出典・参照
- [Obsidian_to_AnkiでObsidianのノートから簡単にAnki問題を作る](https://knowledgestuck.substack.com/p/obsidian_to_ankiobsidiananki)
