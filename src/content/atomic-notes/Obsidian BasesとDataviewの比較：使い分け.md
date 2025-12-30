---
project: an
title: Obsidian BasesとDataviewの比較：使い分け
topic:
  - Obsidian
  - Bases
  - Dataview
---

# Obsidian BasesとDataviewの比較：使い分け

## 概要

Obsidian BasesとDataviewは、どちらもObsidianノートの動的な表示を可能にするツールだが、その設計思想と操作性には大きな違いがある。Dataviewがコードベースの柔軟なクエリ言語を提供するのに対し、BasesはUI駆動型で直感的な操作を重視する。それぞれの強みと弱みを理解し、タスクの複雑さやユーザーのスキルレベルに応じて適切に使い分けることが、Obsidianを効率的に運用する鍵となる。

## 重要なポイント

-   **Dataviewの強み**: コードによる高度なカスタマイズ性、複雑な条件でのフィルタリングやソート、多様な表示形式（テーブル、リスト、タスクなど）を柔軟に制御できる。プログラミングの知識があるユーザー向け。
-   **Basesの強み**: UI駆動型でコードを書く必要がなく、直感的な操作で動的なリストやテーブルを作成できる。Baseビュー内での直接編集が可能。初心者や非プログラマー向け。
-   **信頼性とサポート**: BasesはObsidian公式の機能であるため、長期的な信頼性とサポートが期待できる。Dataviewはコミュニティプラグインであり、公式サポートはない。
-   **用途に応じた使い分け**: 単純な一覧表示や直接編集を伴うタスク管理にはBases、複雑なデータ分析や高度なカスタマイズが必要な場合はDataviewが適している。

## 実践のヒント

-   **まずはBasesから試す**: コードを書くことに抵抗がある場合は、まずBasesで実現できることを試す。
-   **Dataviewで作成したクエリをBasesに移植**: 既存のDataviewクエリがBasesのUIで再現可能か試してみる。多くの場合、Basesの方が簡単に設定できる。
-   **複雑なケースではDataview**: Basesで実現できないような複雑な条件でのデータ抽出や、高度なフォーマットが必要な場合は、Dataviewを検討する。
-   **両者の併用**: 両者を排他的に使うのではなく、例えばBaseでタスクを管理し、Dataviewでそのタスクの進捗を多角的に分析するといった併用も可能。

## 出典・参照

- [『アトミック・シンキング』実践セミナー038 動画アーカイブ](https://knowledgestuck.substack.com/p/ks038)
  - [00:27:00](https://knowledgestuck.substack.com/p/ks038?timestamp=1620) - BasesとDataviewの比較、それぞれの得意分野と使い分けについて解説
  - [00:46:00](https://knowledgestuck.substack.com/p/ks038?timestamp=2760) - Basesが公式プラグインであることの信頼性や、UIでの直感的な操作性を強調
