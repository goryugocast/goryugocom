---
project: an
title: ObsidianをハブにしてGemini CLIと連携すると情報収集からコンテンツ作成まで効率化できる
topic:
- Gemini CLI
- Obsidian
- ワークフロー
note_type: method
---

# ObsidianとGemini CLIの連携ワークフロー

## 概要

Gemini CLIのローカルファイル読み書き能力と、Obsidianの柔軟なノート管理機能を組み合わせることで、シームレスなAI連携ワークフローを構築できる。Obsidianで作成したノートをGemini CLIに直接参照させ、AIに要約、構成、文章生成などのタスクを依頼。その結果を再びObsidianに書き戻すことで、情報収集からコンテンツ作成までの一連のプロセスを効率化する。

## 重要なポイント

-   **Obsidianがハブとなる**: Obsidianを情報収集、思考の整理、コンテンツの保管場所とし、Gemini CLIをAIによる情報加工のツールとして活用する。
-   **ファイルパスによる連携**: Gemini CLIがファイルパスを直接解釈できるため、ObsidianのノートファイルをAIに直接渡せる。
-   **自動化されたコンテンツ作成**: 長文の文字起こしデータから記事の要約を生成したり、既存のノートを元に新しいコンテンツのアウトラインを作成したりといったタスクを自動化できる。
-   **カスタマイズ可能なAI**: Gemini CLIの指示文（プロンプトファイル）もObsidianで管理し、必要に応じてAI自身に指示文を改善させる。

## 実践のヒント

-   ObsidianのワークスペースをGemini CLIの作業ディレクトリに設定する。
-   Gemini CLIのコマンド（`gemini generate --file @filename.md`）を使って、Obsidianの特定のノートファイルをAIに読み込ませる。
-   AIにコンテンツを生成・編集させる際、その結果を新しいObsidianのノートファイルに書き出させる指示を与える（例：`--output new_note.md`）。
-   Obsidianのシェルコマンドプラグインやランチャーアプリを活用し、特定のコマンドやショートカットからGemini CLIを呼び出す。

## 出典・参照

- [『アトミック・シンキング』実践セミナー037 動画アーカイブ](https://knowledgestuck.substack.com/p/ks037)
  - [00:46:00](https://knowledgestuck.substack.com/p/ks037?timestamp=2760) - ObsidianとGemini CLIを連携させ、AIとの協業ワークフローを構築
  - [00:54:00](https://knowledgestuck.substack.com/p/ks037?timestamp=3240) - ローカルデータを直接扱うAIとObsidianを組み合わせることで、シームレスなコンテンツ作成が可能
