---
project: an
title: BasesプラグインのNew機能によるプロパティ自動継承
topic:
- Bases
- plugin
note_type: method
---

Basesプラグインの強力な機能の一つが、`New`ボタンから新規ノートを作成した際に、データベースのフィルター条件を新しいノートのプロパティに自動で引き継いでくれる点である。

例えば、`people: goryugo`というフィルターを設定したデータベースから`New`ボタンでノートを作成すると、新しいノートには最初から`people: goryugo`というプロパティが自動で付与される。これにより、毎回手動でプロパティを設定する手間が省け、タイプミスなどのエラーも防げる。

この機能により、コンピュータが理解しやすい構造化された情報を効率的に積み重ねていくことができ、後から検索やフィルタリングを行う際の精度が大幅に向上する。

## 出典・参照

- [Spaced Repetitionプラグインで実現する「常時レビュー」について](https://knowledgestuck.substack.com/p/spaced-repetition)
  - [00:18:33](https://knowledgestuck.substack.com/p/spaced-repetition?timestamp=1113) - Newボタンの機能説明
  - [00:18:56](https://knowledgestuck.substack.com/p/spaced-repetition?timestamp=1136) - フィルター条件の自動継承
