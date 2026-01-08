---
project: ks
topic_code: obs
title: Dataviewを使って「前回のアレ」をすぐ見つけられるようにする
subtitle: "\U0001F48Eseries設定であらゆるノートで「同じクエリ」が使える"
description: null
url: 'https://knowledgestuck.substack.com/p/dataview'
date_published: 2025-07-29T00:00:00.000Z
audience: only_paid
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!tzQK!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fedb92c72-d215-44c2-a90d-180bbf71a3ed_1320x1464.png
tags:
  - Dataview
draft_link: null
series_name: Obsidian Tips
series_emoji: "\U0001F48E"
series_code: obs
---


```base
filters:
  and:
    - topic == this.topic
views:
  - type: table
    name: Table
    filters:
      and:
        - topic_order <= this.topic_order
    order:
      - date_published
      - topic_order
      - file.name
    sort:
      - property: topic_order
        direction: DESC
    limit: 5
    columnSize:
      note.date_published: 155
      note.topic_order: 54

```

```dataview
LIST
WHERE series_order < this.series_order & series = this.series
SORT series_order DESC
LIMIT 5
SORT series_order ASC
```

```dataview
LIST
WHERE series_order > this.series_order & series = this.series
SORT series_order ASC
LIMIT 5
```

> [!NOTE] アイデア
> ```dataview  
>LIST  
>WHERE startswith(file.name, "ks.d")  
>SORT file.name asc  
>LIMIT 5
>```


2年くらいかけて、ようやくいい感じの仕組みがいい感じになってきました。たぶん賢い人なら3分で思いつくであろうことなんだけど、ようやく「スマートな仕組み」として確立してきました。

何がしたかったのかというと「前回のやつ」をすぐに見つけられるようにすること。

ナレッジスタックのセミナー案内記事なんかは典型的なんですが、こういう記事は半分くらいが「テンプレ」なんですよね。

そうすると「前回のノートをコピーして必要な部分を書き換える」というやり方でいろんなことがスムーズに進む場合が多いです。（もちろん、コピーが便利な理由は他にも色々ある）

それ以外にも「たしか以前こういうこと書いたはず」なんてことは多く「同じカテゴリの仕事」をする場合には、前のノートにさっと移動できると便利なことが多いです。

そのあたりの手間暇を減らすために「Dataviewで前後のページへのリンク」を作るようにしておくと、Dataview部分の中身は一切書き換えることなく「前後のページへのリンク」が作れて便利です。

これ、定型文ひとつと、基本ルールを覚えれば、あとは勝手にいい感じに関連ノートがずらっと並んでくれます。この仕組み自体は2年前くらいから使っていたんですが、ようやくちょっとだけ「スマートな仕組み」として安定してきました。

## 「ぜんぶおなじやつ」で使えるようにする

今回の「進化」は、基本ルールさえ守ればどのノートでも「全部同じコード」で運用できる、というものです。

賢い人なら3分でできることに、2年かけてようやく到達することができました。


```dataview
LIST
WHERE file.day <= this.file.day - dur(1 d) & series = this.series
SORT file.day DESC
LIMIT 5
SORT file.day ASC
```
```dataview
LIST
WHERE file.day >= this.file.day + dur(1 d) & series = this.series
SORT file.day ASC
LIMIT 5
```


このコードをノートの一番上に貼っておくと、こんな雰囲気の「リンク」が作れます。

![[スクリーンショット 2025-07-29 10.20.28.png]]


必要なのは、上記画像のように「ファイル名の先頭が年月日での日付であること」と、Propertiesのところに「series」というのが設定されていること。

これによって、同じ「series」のノートが、ファイル名の日付を基準にして、そのノートの前後5つずつが表示されるようになる、という仕組みです。

あとはこのdataviewのコードを、Obsidianのテンプレートフォルダなんかに保存しておけばいつでもサッと呼び出せるし、なんらかの定型文管理アプリなんかを使ってもいいでしょう。

ごりゅごは、超アナログに「他のノートからコピーしてくる」という技でしのいでいます。

ただ、これだと「ファイル名に日付が入っていないと並べられない」という制限が出てきます。

自分の場合はこのルールで問題ないんですが、もうちょっと別のパターンで作ったものが以下。

## series_order で前後を管理する。他

さっきの画像を見ていただくと、Propertiesのところに「series_order」というパラメーターが並んでいます。

要するにこれは「何番目の記事なのか」というもの。だから単純にこの数字を比較して並べ替えてあげれば、前後のノートを表示することも可能。

```dataview
LIST
WHERE series_order <= this.series_order AND series = this.series
SORT series_order DESC
LIMIT 5
SORT series_order ASC
```
```dataview
LIST
WHERE series_order >= this.series_order AND series = this.series
SORT series_order ASC
LIMIT 5
```

あとは、この「連番」を整備しておくと、たとえば「セミナー案内の記事」と「セミナーで使う資料」を紐付けてリンクしておくことなども可能。（これは、手動で「series」を設定してあげる必要がある）

```dataview
LIST
WHERE series = "ksセミナー" AND series_order = this.series_order
```

もうひとつ実験的に試しているのが「公開日」「締切」的なパラメーターを設定しておいて、その日付順で並び替える、というもの。

この方法でも、ファイル名に日付を入れる必要がなくなります。


```dataview
LIST
WHERE date_published < this.date_published & series = this.series
SORT date_published DESC
LIMIT 5
SORT date_published ASC
```

```dataview
LIST
WHERE date_published > this.date_published & series = this.series
SORT date_published ASC
LIMIT 5
```

## どれが便利なのか？

色々パターンを紹介しましたが、どれを選ぶかは結局「自分が何をしたいか」次第です。

*   とにかく手軽に始めたい、日々の記録を整理したいなら
    → ファイル名に日付を入れる方法がおすすめです。余計なことを考えず、ファイル名のルールさえ守ればいいので、一番シンプルです。

*   連載記事みたいに、順番をきっちり管理したいなら
    → `series_order`で連番を振る方法が確実です。手間はかかりますが、自分の意図を最も正確に反映できます。種類の違うノートを紐付けられるのも、この方法ならではの強みですね。

*   ブログ記事の管理がしたい、ファイル名は自由に付けたいなら
    → `date_published`で公開日を管理する方法がいいでしょう。「公開日」という情報が、後から見返したときに結構重要になったりします。

ごりゅごは、全部同じパターンにしたいと思いつつ、過去の遺産が色々あって、気分に応じてというか、新しいノートを作ったり、新しい記事を書いたりするたびに「ああ、これも変えておこう」という感じで逐次修正していっている状態です。

ただまあ、だいたいの人にオススメできるのは一番最初の「ファイル名に日付をつけて管理」する方法かなあ。

## メタデータは生成AIと相性がいい

また、おまけ的な話ですが、こういうパラメーターをきちんとYAML（Properties）に書いておいてあげると**生成AIが文脈を理解しやすくなる**、というメリットもあります。

ファイル名に日付があるだけでは生成AIはそれがなんの日付なのかわからないけど、`date_published`ならば「公開日」なのであろうということを推測してくれます。そうすると、今後生成AIになんらかの指示を出す時に便利になる（可能性がある）わけです。

これは「タグ付け」とは大きく意味が異なる、2020年代的なメタデータ付与の方法だと考えてます。
## 完璧を目指さないで整理する

あとは、Obsidianはこのあたりを「きちんと整理してもいいし、整理しなくてもいい」という懐の深さがあるところがいいですね。

確かにこういうパラメーターは、ほとんどの場合「あって損はない」んですが、こんなのを全部のノートできちんと管理していたら、めんどくさくて仕方ない。

生成AIで自動でパラメーターを設定できるとしてもめんどくさい。

というか「アーカイブ」にこういうパラメーターを設定しておくのは便利でも、リアルに「使ってるノート」でこんなことはやってられんのですよ。

生成AIに自動でパラメーターを任せると、あいつらはあらゆるノートに「状態：執筆中」なんてことまで全部設定しようとしてくる。

もちろん、それが便利な場面もあるんだろうけど、リアルタイムで使ってるノート全部で、そんな状態の管理なんてやってられんのですよ。

結局のところ、こういうパラメーターも「完璧な管理を目指さない」「無理ない範囲での活用」というのが重要です。

Dataviewは便利だけど、目的は結局Dataviewを使ってなにをしたいのか。プロパティを設定しておくのは便利だけど、過剰なプロパティの設定は「ブルシットジョブ」を生み出しかねない危険な思想です。

ノートの整理に振り回されて、ノートを書くのが嫌になったら意味がない。

今回紹介した方法も「これが便利」だと感じる人には役に立つけど、こんな方法はまったく必要ないという人もたくさんいるはずです。

ちょっと簡単なやつを試してみて「あ、これ便利かも」と感じたら、少しずつ自分の使い方に組み込んでいく。そんな風にちょっとずつ色々やってみる。気楽に付き合っていく、というスタイルが、Obsidianと長く付き合うコツなんじゃないかな、と考えています。


