---
project: an
title: Basesのフィルター機能でデータベースを絞り込む
topic:
  - Bases
  - plugin
---

Basesプラグインでは、フィルター機能を使ってノートを条件で絞り込むことができる。例えば、`people: goryugo`というフィルターを設定すれば、特定の人物に関連する打ち合わせ履歴や関連ノートを一覧表示できる。

フィルターは複数の条件を組み合わせることも可能で、`topic: Obsidian AND people: goryugo`のように指定すれば、より精密な絞り込みが実現できる。また、`Prefix`パラメータを使えば、ノートを任意の順序で並べ替えることもできる。

重要なのは、フィルターに使用するプロパティは事前にノートのフロントマターに設定しておく必要があるという点である。ファイル名だけでは機械が理解できないため、明示的なプロパティとして記述することが、Basesの機能を最大限に活用する鍵となる。

## 出典・参照

- [Spaced Repetitionプラグインで実現する「常時レビュー」について](https://knowledgestuck.substack.com/p/spaced-repetition)
  - [00:15:05](https://knowledgestuck.substack.com/p/spaced-repetition?timestamp=905) - フィルター機能の説明
  - [00:16:15](https://knowledgestuck.substack.com/p/spaced-repetition?timestamp=975) - Prefixパラメータでの並べ替え
