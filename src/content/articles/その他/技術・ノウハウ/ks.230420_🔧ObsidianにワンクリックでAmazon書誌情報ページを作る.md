---
project: ks
topic: ワークシートアップデート
topic_code: upd
title: ObsidianにワンクリックでAmazon書誌情報ページを作る
subtitle: "\U0001F527020 Obsidian Advanced URIは多彩な用途で役に立つ"
description: null
url: 'https://knowledgestuck.substack.com/p/obsidianamazon'
date_published: 2023-04-20T00:00:00.000Z
audience: everyone
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!odi-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcb2884af-864b-46bc-aa3a-7348ab681a69_1000x736.gif
tags:
  - Obsidian
draft_link: null
series_name: その他
series_emoji: "\U0001F527"
series_code: other
category: 技術・ノウハウ
---

## メモ・原稿

`= this.file.frontmatter.url`

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

[[2023-03-08 🔧018ChatGPTで日曜プログラミング]]
これの内容を、テーマをObsidianで自動でノートを作る、に変える
簡単な解説と、改造の仕方はセミナーを観ろ、という方向にする
これによって有料が増えないだろうか？


---


以前紹介したブックマークレットが、今でもすごく便利で役に立っていて、是非いろんな人に「自分用カスタマイズ」をして使って欲しいので、改めて記事にまとめてみようと思います。

[Amazonの書籍販売ページを開き1クリックでObsidianに書誌情報ノートを作るブックマークレット](https://knowledgestuck.substack.com/p/amazon1obsidian)

上記の設定を済ませると「Amazonで書籍ページを開いてるときにブックマークレットを起動すると自動でObsidianにノートを作る」ということが実現できるようになります。

動作イメージ
[![[67189c1e70eaed734ef0359ba23f9fe4_MD5.gif]]](https://gyazo.com/110172814f3728e3cd8b14042bd40904)
## どんな仕組みで動作するのか

この仕組みのコア要素は、Obsidianの「Advanced URI」というプラグインです。

[Vinzent03/obsidian-advanced-uri: Advanced modes for Obsidian URI](https://github.com/Vinzent03/obsidian-advanced-uri)

Obsidianを「URIを使って操作しよう」というのがコンセプトで「専用のリンクを使っていろんなことができるようになる」プラグインです。

代表的な使い方は「文字列を渡してノートを作る」だとか「Obsidianの設定を操作する」といったところ。

このAmazon書籍ページからノートを作る、というのは「文字列を渡してその内容を踏まえたノートを作る」仕組みを応用したものです。

もうちょっとだけ仕組みを解説すると、
```js
javascript:(function(d,s){s=d.createElement('script');s.src='https://scrapbox.io/api/code/goryugocast/%E6%9B%B8%E8%AA%8C%E6%83%85%E5%A0%B1%E3%82%92%E5%8F%96%E3%82%8A%E8%BE%BC%E3%82%80%E3%83%96%E3%83%83%E3%82%AF%E3%83%9E%E3%83%BC%E3%82%AF%E3%83%AC%E3%83%83%E3%83%88/ob.js';d.body.appendChild(s);})(document)
```
上記ブックマークレットで下記ページの「ob.js」を実行してね、という指令を送ります。

[書誌情報を取り込むブックマークレット - ごりゅごcast](https://scrapbox.io/goryugocast/%E6%9B%B8%E8%AA%8C%E6%83%85%E5%A0%B1%E3%82%92%E5%8F%96%E3%82%8A%E8%BE%BC%E3%82%80%E3%83%96%E3%83%83%E3%82%AF%E3%83%9E%E3%83%BC%E3%82%AF%E3%83%AC%E3%83%83%E3%83%88)

で、この↑ページにあるob.jsというプログラムが開いてるAmazonのページの中身を見て、そこからたいとるやらなんやらを取り出してObsidianの「Advanced URI」を使ってノートを作るためのリンクを作成する、という流れです。

なので、ひとまずごりゅごが使ってる仕組みと完全に同じ仕組みが使えればそれでいい、という方はひとまず以下2つの設定を済ませれば同じことが実現できるようになります。

- ブラウザに上記ブックマークレットを登録する
- Obsidianに「Advanced URI」プラグインをインストール

---

## ワークスペースの呼びだしや保存を「リンククリック」で

また、それ以外に重宝しているのが「Advanced URI」を使ってObsidianのワークスペースを操作する方法。

これまでのセミナーなんかでも何度も話してるんですが、Obsidianの標準プラグインである「Workspaces」機能は最強に素晴らしいです。

日常モード、ノート振り返りモード、執筆モードなど、開いているページや画面レイアウトなどをすぐに呼び出せる（サイドバーやウインドウの幅も覚えている）おかげで、多様な目的でObsidianを便利に使えています。

たとえばデイリーノートにいろいろなワークスペースへのリンクを貼っておくことで、上から順番に「今日やること」をワークスペースを切り替えながら実行可能。

これも今「Obsidianのデイリーノートを使う大きな理由」になっていたりします。

## いかにして自分用に改造するか

あとは、これらをいかに「自分用に改造するのか」

実は「Amazon書誌情報作成ページ」はChatGPTに頼ればちょっとした改造ならば簡単にできるし、Advanced URIならば（DeepLなどを併用して英語を読んでも）10分15分くらいでなんとなくの感覚は掴めると思います。

また、このあたりの設定の具体例、勘所みたいなやつは動画なんかも相性がいいと思うので、来月の5月6日のセミナーではこのあたりの「なにが便利か」「どうやって設定するか」などを改めて紹介したいと思っています。

もしそのあたり「こういう風にしたい」とか「ぜんぜんわからん」という方がいらっしゃれば、是非来月のセミナーにご参加ください。事前の質問なども、コメント欄などに書き込んでいただければ可能な限りお答えできるようにしたいと思います。
