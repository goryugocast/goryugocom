---
project: ks
topic_code: obs
title: ジョニーデシマルindexをObsidianの右下に置く
subtitle: "\U0001F48E右下＋ピン留めで「すぐ見るノート」を常駐させられる"
description: null
url: 'https://knowledgestuck.substack.com/p/indexobsidian'
date_published: 2025-03-09T00:00:00.000Z
audience: only_paid
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!nDvp!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2cc07876-0a5a-45a6-87d3-25a2fe1d90ec_4180x2830.png
tags:
  - Obsidian
draft_link: null
series_name: Obsidian Tips
series_emoji: "\U0001F48E"
series_code: obs
---

## メモ・原稿

`= this.file.frontmatter.url`

```dataview
LIST
FROM #ks/💎 
WHERE file.day <= this.file.day - dur(1 d)
SORT file.day DESC
LIMIT 5
SORT file.day ASC
```

```dataview
LIST
FROM #ks/💎
WHERE file.day >= this.file.day + dur(1 d)
SORT file.day ASC
LIMIT 5
SORT file.day ASC
```


- [[📅ナレッジスタック 収録と配信・執筆のスケジュール]]
- [📋ナレッジスタックの記事一覧](https://goryugo.com/ks_all_post)を更新する
	- →[[💎Obsidianの基礎〜様々な使い方]]


[『アトミック・シンキング』実践セミナー031 動画アーカイブ - by goryugo - ナレッジスタック](https://knowledgestuck.substack.com/p/ks031)でもちょっと紹介したんですが、最近気に入っているObsidian的な小ネタとして「ジョニーデシマルのインデックスをObsidianの右下に置く」という技があります。

これは「Wordを愛する人間」としてPodcastに出演いただいた新田さんが実践していた方法に、ごりゅご的なアレンジを組み合わせたものです。

[Wordを愛する人間がObsidianも愛してしまった物語 - by goryugo and Junya Nitta](https://knowledgestuck.substack.com/p/pod003)

[Wordを愛する人間のObsidian運用方法の進化 - by goryugo and Junya Nitta](https://knowledgestuck.substack.com/p/pod009)

Obsidianってレイアウトの自由度が高くて、左右の「サイドバー」に相当する部分でもノート配置しておいて、そこからページを開いたりするだけでなく、ノートの中身自体を直接編集することもできてしまいます。


新田さんは、この場所にいわゆる「ホームノート」を置いていたんですが、ごりゅごはここにジョニーデシマルのindexを置いてみたら、これがとってもスッキリくる感じのものになりました。

「ホームノート」というやつは「今やること」を並べるもので、これが右下で見えてるとよくも悪くもずっと気になることが視界に入ってきてどうしても注意がそこに向けられてしまう。

対して、ジョニーデシマルのインデックスであれば、これは基本的には大きく変わらないので、だんだん当たり前になってくる。

と同時に、ジョニーデシマルのインデックスはまだまだ構築中の部分も多く、すべてを記憶しきれているわけでもない。だから、これが常に見えてると、ふと思いついた時にパッと探すことができたり、少しだけ改善したり、というのもやりやすい。

やり方はシンプルで、ノートをドラッグドロップして配置したい場所（サイドバー）にまで持っていって、離す。以上。

もう1つ小ネタとして、これは「ピン留め」しておくことで、

具体的なやり方、メリットなどの話は[動画50分くらいの場所](https://open.substack.com/pub/knowledgestuck/p/ks031?utm_campaign=post&utm_medium=web&timestamp=3018.0)でも紹介しているので、よかったらそちらもご覧ください。

実際にどんな感じかわかるスクショも貼り付けておきます

---

![[migishitaJD.png]]
