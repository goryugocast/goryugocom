---
project: an
title: Graph Analysisはノート同士のリンクを分析し意外なつながりを発見できる
prefix:
topic:
  - tool
  - obsidian
  - plugin
---

# Graph Analysisで関連発見

## 概要

Graph Analysisは、ノート同士のリンクをネットワーク理論で分析し、関連度の高いノートを計算して表示してくれるプラグイン。意外なつながりを発見できる。

## 具体的な仕組み

- **リンクベースの分析**: ノート同士のリンク構造を数学的に計算
- **複数のアルゴリズム**: Adamic-Adar、Jaccard、Common Neighboursなど、様々な計算方法がある
- **アトミックノートに最適**: Adamic-Adarアルゴリズムがアトミックノート運用で最も精度が高い
- **除外設定**: デイリーノートなど、計算に含めたくないフォルダやタグを除外できる

## 設定のポイント

- **Exclusion tags**: 計算に含めたくないタグを指定（例：daily-noteなど）
- **Regex exclusion**: 特定のフォルダを除外（例：日記フォルダ）
- **Algorithm**: アトミックノート運用なら「Adamic-Adar」を推奨
- **デイリーノート中心**: JaccardやCommon Neighboursの方が良い場合もある

## 実践のヒント

- タグやYAMLフロントマターは関係なく、純粋にリンク構造だけを見る
- デイリーノートは関連度計算に含めない方が精度が上がる
- 予想外の関連ノートを発見できるのが面白い
- グラフビューとは異なり、計算ベースで関連を提案してくれる

## 関連する概念

- [[グラフビューの実践的活用法]]
- [[グラフは見るだけで終わらせない]]
- [[トピックノート作成の4ステップ]]

## 出典・参照

- [[ks.221024_🎥『アトミック・シンキング』実践セミナー2動画アーカイブ]]
  - [1:00:14](https://knowledgestuck.substack.com/p/217?timestamp=3614) - Graph Analysisの紹介
  - [1:00:36](https://knowledgestuck.substack.com/p/217?timestamp=3636) - リンクをキーにしたネットワーク理論計算
  - [1:01:47](https://knowledgestuck.substack.com/p/217?timestamp=3707) - Adamic-Adarアルゴリズムが最も精度が高い
  - [1:05:16](https://knowledgestuck.substack.com/p/217?timestamp=3916) - YAMLやタグは関係なく、リンクのみを見る
