---
project: an
title: "ObsidianプラグインSmart Connectionsはノートをベクトル化し意味的に関連するノートを検索できる"
prefix: ""
source_article: "ks.230407"
---
# ObsidianプラグインSmart Connectionsはノートをベクトル化し意味的に関連するノートを検索できる

## 概要
Obsidianのコミュニティプラグイン「Smart Connections」は、手持ちのノートをOpenAIのEmbedding APIを使ってベクトル化する。これにより、キーワードの一致に頼らず、文章の意味的な近さに基いて関連ノートを検索・表示することが可能になる。

## 重要なポイント
- 従来のキーワード検索とは異なり、表現の揺れ（例：「ニンジン」と「人参」）や抽象的な関連性も捉えることが期待される。
- ノートは1,536次元のベクトル空間に配置され、その空間上の距離が近いものが「関連ノート」として扱われる。
- この機能により、予期せぬノートの組み合わせが発見され、思考が促進される可能性がある。

## 出典・参照
- [「Obsidianのノートの内容を踏まえたChat GPT」ができるようになるプラグイン Smart Connections](https://knowledgestuck.substack.com/p/smartconnections)