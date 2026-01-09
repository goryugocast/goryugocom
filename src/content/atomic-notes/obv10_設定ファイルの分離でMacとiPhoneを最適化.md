---
title: 設定ファイルの分離でMacとiPhoneを最適化
topic: Obsidian
category: 設定・環境構築
series: Obsidianの全技術
episode: obv10
source: ks.251226_Obsidianを「スマホで上手く使う」ための設定のコツ
note_type: method
---

## 概要
MacとiPhoneではプラグインの要不要や画面の広さなど、最適な設定が異なるため、設定ファイルを分離することが重要。

## 実装方法
1. `設定 > Files & Links` にアクセス
2. `Override config folder` に `.iPhone` を指定
3. iCloudで同期しつつも、デバイスごとの最適化を実現

## メリット
- PC版とスマホ版で独立した設定を保持
- デバイスごとに異なるプラグインを選別可能
- 画面レイアウトを最適化できる

## 参考
- VS Codeで隠しフォルダ（`.obsidian`）へアクセス可能

---
[[PCとスマホでObsidianの使い方は異なる]]
