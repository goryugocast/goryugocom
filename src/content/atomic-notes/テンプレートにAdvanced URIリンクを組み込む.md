---
project: an
title: テンプレートにAdvanced URIリンクを組み込む
prefix:
topic:
  - obsidian
  - workflow
  - advanced-uri
  - template
---

# テンプレートにAdvanced URIリンクを組み込む

## 概要

デイリーノートなどのテンプレートに、Advanced URIのリンクを事前に埋め込んでおくことで、毎日同じワークフローを簡単に実行できる。ワークスペース切り替えリンク、保存リンク、設定変更リンクなどをテンプレートに書いておけば、クリックするだけで作業環境を整えられる。

## 具体的な活用方法

**デイリーノートテンプレートの例**:
```markdown
## 作業環境

- [ホームワークスペースに戻る](obsidian://advanced-uri?workspace=home)
- [原稿執筆モード](obsidian://advanced-uri?workspace=writing)
- [ノート振り返りモード](obsidian://advanced-uri?workspace=review)
- [トピック一覧モード](obsidian://advanced-uri?workspace=topic)

## クイックアクション

- [今日のワークスペースを保存](obsidian://advanced-uri?saveworkspace=true&workspace=daily)
```

**メリット**:
- 毎日同じリンクが自動で生成される
- 上から順番に作業を進めるだけでワークフローが完結
- 新しいノートでも即座に使える

## 実践のコツ

- プラグインを上手に活用するコツはテンプレートへの組み込み
- セミナーの時だけ文字サイズを大きくして終わったら戻す、といった小さな自動化も可能
- 設定へのリンクもテンプレートに入れておける
- 日付が変わるたびにワークスペースを更新する「儀式」も簡略化できる

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー9動画アーカイブ](https://knowledgestuck.substack.com/p/ks009)
  - [00:16:45](https://knowledgestuck.substack.com/p/ks009?timestamp=1005) - テンプレートへの組み込みの重要性
  - [00:50:00](https://knowledgestuck.substack.com/p/ks009?timestamp=3000) - 設定変更の自動化
