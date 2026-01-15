---
project: an
title: Obsidian_to_Ankiプラグインの設定手順
prefix: srs
topic:
  - Obsidian
  - Anki
  - 設定
  - 学習
source_article: ks.221221_🔧KS011_Obsidian_to_AnkiでObsidianのノートから簡単にAnki問題を作る
note_type: technique
---

# Obsidian_to_Ankiプラグインの設定手順

## 概要
ObsidianのノートからAnkiの穴埋め問題（クローズテスト）を簡単に作成するための「Obsidian_to_Anki」プラグインの導入と初期設定手順を解説する。AnkiConnectのインストールからObsidianプラグインの設定、そしてAnkiとObsidianのフィールドを一致させるまでを、必要最低限のステップに絞り、具体的なコードや画像を用いて詳述する。

## 重要なポイント
- **AnkiConnectの導入**: Ankiアプリ側に`AnkiConnect`アドオンをインストールし、設定の`webCorsOriginList`に`"http://localhost", "app://obsidian.md"`を追加する。
- **Obsidian_to_Ankiの導入と設定**: Obsidian側に`Obsidian_to_Anki`プラグインをインストール。プラグイン設定の`Note type table`に`Cloze`の正規表現(`((?:.+\n)*(?:.*==.*)(?:\n(?:^.{1,3}$|^.{4}(?<!<!--).*))*)`)を貼り付け、`Curly Cloze`と`Curly Cloze –HilightS to Clozes`をオンにする。
- **フィールドの一致**: Anki側で`Obsidian_to_Anki`というデッキと、`Cloze`というノートタイプを作成し、フィールドを`Context`, `Text`, `Link`の3つに設定。Obsidian側でこれらをAnkiの各フィールドと対応させる設定を行う。
- **問題作成の基本**: Obsidianのノート内で穴埋め問題にしたい部分を`==`（イコール2つ）で囲む。例えば`SRSは==Spaced== Repetition Systemの略`のように記述する。

## 実践のヒント / 関連する概念
- 一度設定が完了すれば、Obsidianから「Scan Vaultコマンド」を実行するか、Ankiアイコンをクリックするだけで、Anki側に問題が自動作成・更新される。
- Ankiのカードテンプレートやスタイルシートもカスタマイズすることで、視覚的にも学習しやすい問題を作成できる。

## 出典・参照
- [Obsidian_to_AnkiでObsidianのノートから簡単にAnki問題を作る](https://knowledgestuck.substack.com/p/obsidian_to_ankiobsidiananki)
