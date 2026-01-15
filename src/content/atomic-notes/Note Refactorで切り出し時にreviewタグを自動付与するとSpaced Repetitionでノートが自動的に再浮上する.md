---
project: an
title: Note Refactorで切り出し時にreviewタグを自動付与するとSpaced Repetitionでノートが自動的に再浮上する
tags:
- Note Refactor
- Obsidian設定
- レビュー運用
created: 2025-01-02
note_type: method
---

# 切り出し時に自動的にreviewタグを付与する設定

## 概要
Note Refactorで新しいノートを作成する際、自動的に `review` タグを付与する設定。この設定により、後続のSpaced Repetitionプラグインと連携し、レビュー対象として管理される。

## 設定のポイント
- 新しく作成されるノートに常に `review` タグが付与される
- 作成先フォルダは `notes/` に指定（カスタマイズ可能）
- 元のノートへのリンク自動作成は `無効` に設定

## 設定の意図
- **タグ付与**: Spaced Repetitionプラグインのレビュー対象として機能
- **リンクなし**: ノート同士の関係性を文脈に応じて自分で再構築できるようにするため

## 効果
- レビュー運用の前提条件として機能
- 自動的にノートが再浮上する仕組みが実現
- 思考の育成サイクルを支援

## 関連
[[Spaced Repetitionと組み合わせたレビュー運用]] - システム全体の視点
[[Note Refactorのショートカットキー（Cmd+Shift+N）]] - 操作面での効率化

## 参考
- セミナー: 251016_🪄ノートリファクターで思考の断片を育てる
- セクション: Note Refactorの基本（00:01:06）
