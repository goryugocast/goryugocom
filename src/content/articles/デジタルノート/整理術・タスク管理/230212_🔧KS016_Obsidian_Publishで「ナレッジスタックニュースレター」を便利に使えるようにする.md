---
project: ks
topic: ワークシートアップデート
title: Obsidian Publishで「ナレッジスタックニュースレター」を便利に使えるようにする
subtitle: "\U0001F527016 整理が難しい「ブログ」の整理にObsidian Publishを補助として活用する"
description: null
url: 'https://knowledgestuck.substack.com/p/obsidian-publish-eb7'
date_published: 2023-02-12T00:00:00.000Z
audience: everyone
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!bX_i!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F593c13da-4194-4454-8188-34410966f666_1020x1658.jpeg
tags:
  - Obsidian
draft_link: null
series_name: その他
category: 技術・ノウハウ
---
## メモ・原稿

#ks/🔧 `= this.file.frontmatter.url`

```dataview
LIST
FROM #ks/🔧 
WHERE file.day <= this.file.day - dur(1 d)
SORT file.day DESC
LIMIT 1
```
```dataview
LIST
FROM #ks/🔧 
WHERE file.day >= this.file.day + dur(1 d)
SORT file.day ASC
LIMIT 1
```


---

前回は、Obsidian Publishを「考えを整理していくために使っていこう」という話を書きました。

[Obsidian Publishで「自分の考えを文字にして整理する」](https://knowledgestuck.substack.com/p/obsidian-publish)

今回はそれに続いて、もうちょっとストレートに「ナレッジスタックを見てくれる人に役立つもの」としてObsidian Publishの活用を進めている、という話をしたいと思います。

## アーカイブ的な「振り返りやすいサイト」も目指したい

このニュースレターを配信しているSubstackは、あくまでも主目的が「ニュースレターの配信」であるため、書かれた記事を振り返るにはあまり便利ではありません。

一般的な「ブログ」のような仕組みも、そもそも「整理して読む」ことには余り向いてないんですが、それでも「カテゴリ」や「タグ」で一定程度記事の絞り込みは可能です。それに対してSubstackは、基本的に書いた記事の整理の手段はほとんどありません。これは目指しているものの違い、やろうとしていることの違いであって、どっちがいいとか悪いというものではないんですが、ナレッジスタックというニュースレターでは、蓄積がものを言うタイプのコンテンツを提供しているつもりです。

そうなると、やはり「過去の記事へのアクセスのしやすさ」だとか「過去の記事がある程度きれいにまとまっていること」も重要です。

ならばそこを「整理が得意なObsidian Publish」を使って補強してやればいいじゃないか。と思い立って、少しずつ「過去記事の整理」を進めています。

たとえば今、過去のセミナーの内容を整理しつつ「過去のセミナーへのリンクの一覧」なんかを作っていたりします。

[📋ナレッジスタックセミナー - ナレッジスタック - Obsidian Publish](https://publish.obsidian.md/knowledgestack/Publish/%F0%9F%93%8B%E3%83%8A%E3%83%AC%E3%83%83%E3%82%B8%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF%E3%82%BB%E3%83%9F%E3%83%8A%E3%83%BC)

こういうのを、うまく「自分の手元で整理した内容をうまくObsidian Publishと連携させる」という方法についても、しばらくいろいろと工夫していこうと考えています。

まずは「忘れない仕組み作り」の一環として、毎回アーカイブを配信するときの「やることリスト」に「Obsidian Publishを更新する」というメモを追加しておきました。

![[2023-02-09_16.53.04ss.jpeg|200]]

もちろんごりゅごはこういうノートをどれだけきっちりと作っていても、それでも「忘れる・間違える」タイプの人間で油断はできないんですが、少なくともこういう工夫によってミスの発生率を減らすことはできている（と思っています）。

このあたりの「工夫の仕方」についても、少しずつ自分なりの方法が固まってきているので、DataviewというObsidianプラグインの使い方を含めて、これから少しずつ整理していこうと思っています。
