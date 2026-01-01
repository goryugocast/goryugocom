---
project: ks
topic: 本
topic_code: hon
title: Obsidianに最初にインストールしたいプラグイン2つ
subtitle: "\U0001F4D8✍️003 アトミックシンキング実践用の初期設定その2"
description: null
url: 'https://knowledgestuck.substack.com/p/howto-atomic-003'
date_published: 2023-11-17T00:00:00.000Z
audience: everyone
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!Qhnf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F400b6417-e53e-42af-9e78-3711ab1c69a4_2048x1600.jpeg
tags:
  - Obsidian
draft_link: null
series_name: Obsidianの全技術
series_emoji: "\U0001F4D8"
series_code: obv
category: 実践編
---

## メモ・原稿

#ks/📘✍️ 
`= this.file.frontmatter.url`

```dataview
LIST
FROM #ks/📘✍️ 
WHERE file.day <= this.file.day - dur(1 d)
SORT file.day DESC
LIMIT 1
```
```dataview
LIST
FROM #ks/📘✍️ 
WHERE file.day >= this.file.day + dur(1 d)
SORT file.day ASC
LIMIT 1
```

フリーライティングをしよう、に続いてどういうことを書くか。

セミナーの内容で2回くらい
フリーライティングをすること
プラグインを入れて、読書メモをアトミックにすること

その後、Dataiewの話とかにも進んでいけいるんだ
デイリーノート仕事術と合体できる。

---

Obsidianの超基本的な設定を順番に進めながら、Obsidianでアトミックシンキングを実践していこうシリーズ。

今回は、[Obsidianのデイリーノートを使ってフリーライティングする](https://knowledgestuck.substack.com/p/howto-atomic-002)の続きです。

Obsidianのデイリーノートを使ったフリーライティングに慣れてきたら、次はもう少しだけObsidianの設定を進めていきます。

具体的には、ごりゅごが「これだけはインストールしておいた方がいい」と考えているObsidianのコミュニティプラグインを2つだけインストールします。

そもそも、新しくデジタルツールを使い始める時は「あまり初期設定を頑張らない」というのはとても重要です。（設定に懲りすぎると簡単に当初の目的を見失う）

なので、こうした記事などでObsidianの使い方を提案をする時も、あまり深掘りしすぎないことを心がけてはいるんですが、同時に、ユーザーが作った便利なプラグインが多数存在することもObsidianの魅力の1つであるのもまた事実なのです。実際、プラグインを一つインストールしたらObsidianがめちゃくちゃ便利で使いやすくなる、ということもよくあります。

そんなわけで、今回の記事はそうやってとても悩んだ上で、それでもやっぱりこれはインストールしておいて損はないと思ったものです。

## Note Refactor

1つは「ノートを簡単にアトミックにするためのプラグイン」

超簡単に言うと、Obsidianのノートにある文章を範囲選択して、ショートカットキーを入力すると「新しいノートを作りつつ同時にそのノートへのリンクが残る」というもの。

一言でいうと「簡単にノートを分割できるプラグイン」です。

ノートを作っていて、あるひとかたまりの文章を別のノートに分けたくなった時。1行目をタイトルにして超簡単に別のノートを作る（元のノートにはリンクが残る）ということができるようになるプラグインです。

以下の2項目を設定することで、新しいノートが「notes」フォルダの中に作られるようになります。
![[74ABA6DD-2439-4B33-BFFF-E22806829A02_1_201_a.jpeg]]

また、以下のショートカットキーを設定することで、範囲選択した部分が全部「1行目をタイトルにした新しいノートを作る」機能として動作するようになります。
![[DB58211F-A9C7-4933-A95D-D77F987FA0A3_1_201_a.jpeg]]

[Obsidianでプラグインを見る](obsidian://show-plugin?id=note-refactor-obsidian)
## Advanced URI

もう1つは、Obsidianを今後使っていく上で非常に便利な「ワークスペース」を上手く操作するためのプラグイン。（それ以外のことにも使える）

Obsidianの標準のプラグインには「Workspaces」というものが存在します。

Obsidianはメニュー項目やノートを上下左右、いろんなところにかなり自由に並べることがでますが、この並べ方を「ワークスペース」として複数記憶しておくことができるようになります。

標準のプラグインではこのワークスペースは画面左のボタンからどのワークスペースを開くか、というのを選択する必要があるんですが、Advanced URIを使って「リンク」を設定しておいてあげると、ノートの中のリンクをクリックすることでワークスペースを変える、ということができるようになります。

リンクの作り方の例：
`[home](obsidian://advanced-uri?workspace=home)`
（これで、home、というワークスペースを開くことができる。）

このリンクを、よく使うノートだとかデイリーノートのテンプレートに置いておくことで、モードごとにObsidianのレイアウトを変えて、目的ごとに最適化した使い方が簡単にできるようになります。

[Obsidianでプラグインを見る](obsidian://show-plugin?id=obsidian-advanced-uri)


---


これらの設定について、より詳細な説明、動いてるところが見たい方は、以前のセミナーの動画アーカイブをご覧ください。

→[『アトミック・シンキング』実践セミナー014 動画アーカイブ](https://knowledgestuck.substack.com/p/ks014)


また、このシリーズは、ニュースレターでの配信と共に、Obsidian Publishを使って[💎Obsidianを使ったアトミックシンキングの実践](https://publish.obsidian.md/knowledgestack/atomic-thinking-with-obsidian)というページにも同時進行的に内容をまとめています。
