---
project: ks
topic: Obsidian Tips
topic_code: obs
title: ショートカットアプリでグラフィカルなアプリリンクを作る
subtitle: "\U0001F48E009 再びショートカットアプリに様々な活用可能性が見えてきた"
description: null
url: 'https://knowledgestuck.substack.com/p/obsidian009'
date_published: 2023-08-04T00:00:00.000Z
audience: everyone
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!fKLD!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feabfec56-d34e-4cc7-82b7-9c627747e376_1518x1760.jpeg
draft_link: null
series_name: Obsidian Tips
series_emoji: "\U0001F48E"
series_code: obs
---

## メモ・原稿

#ks/💎 
`= this.file.frontmatter.url`

```dataview
LIST
FROM #ks/💎
WHERE file.day <= this.file.day - dur(1 d)
SORT file.day DESC
LIMIT 1
```
```dataview
LIST
FROM #ks/💎
WHERE file.day >= this.file.day + dur(1 d)
SORT file.day ASC
LIMIT 1
```

[💎ゼロから始めるObsidian ](https://publish.obsidian.md/knowledgestack/obsidian_restart)シリーズ第9回です。

前回はあえて「Obsidianを使わないメモの残し方」についてまとめました。

そして、その大きな理由の1つが「メモ帳」アプリの方がグラフィカルなノートを残せるから。

と同時に、一定以上長いメモになってしまうと、メモ帳アプリでは不便が生じてきて、Obsidianで整理したくなってくる、というところまで話が進んでいます。

Obsidianで情報を整理するにあたって、いろいろと重要なポイントは存在するんですが、今回はあえて「メモ帳に負けないようにObsidianもグラフィカルにする」という方向を考えてみます。

## Obsidianで見た目がグラフィカルなリンクを作る

Obsidianでリンクの「見た目」をグラフィカルにするにはどうしたらいいか。いちばん一般的なのは、自分の目的に合ったプラグインを見つけてくることです。ざっと探して、たとえば以下二つのプラグインが見つかりました。

[FHachez/obsidian-convert-url-to-iframe: Plugin for Obsidian.md to convert a selected URL to an iframe.](https://github.com/FHachez/obsidian-convert-url-to-iframe)

[dhamaniasad/obsidian-rich-links](https://github.com/dhamaniasad/obsidian-rich-links)

（こういうプラグインをさくっと簡単に見つけられて、こういうのが簡単に見つかるくらいObsidianのコミュニティは大きくなってきているんだなあ、としみじみしていました）


上のプラグインは、リンクを作るとそれをiframeに変換する、というもの。大雑把に言うとObsidianの中でYouTubeを見られるようにするプラグインです。ただ、これはすでにObsidian本体が普通のリンクの形でYouTubeにリンクをするだけで埋め込みができるようになっているので、わざわざプラグインをインストールする意味はありません。

もう一つが、URLを選択して「rich link」をしてやると、リンクの見た目を変えてくれる、というプラグイン。

こんなデザインのリンクが簡単に作れます。

![[2023-08-03_16.06.38ss.jpeg]]

ただ、このプラグインはURLを元にして、中身を（割と長ったらしい）HTMLに書き換えてしまいます。

アプリリンク一個で、こんな長いHTMLになってしまいます。
```HTML
<div class="rich-link-card-container"><a class="rich-link-card" href="https://apps.apple.com/jp/app/funk-drummer/id1051262865" target="_blank">
	<div class="rich-link-image-container">
		<div class="rich-link-image" style="background-image: url('https://is1-ssl.mzstatic.com/image/thumb/Purple115/v4/1a/64/8c/1a648cee-e417-a7ce-83c4-df7c2350f994/AppIcon-0-0-1x_U007emarketing-0-0-0-8-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png')">
	</div>
	</div>
	<div class="rich-link-card-text">
		<h1 class="rich-link-card-title">‎Funk Drummer</h1>
		<p class="rich-link-card-description">
		‎Funk Drummer is the grooviest drum machine with the ability to improvise like a proper human drummer. Now with even more possibilities with the new 2d control for Jam / Intensity parameters.  The new Live Pads lets to play live sessions on the way with 8 assignable pads and buttons for fills, intro,…
		</p>
		<p class="rich-link-href">
		https://apps.apple.com/jp/app/funk-drummer/id1051262865
		</p>
	</div>
</a></div>
```

このデザインを自分でいじるのも面倒だし、リンクが超長くせいで矢印キーでスクロールするときも時間がかかって面倒なんですよね。

このプラグイン、悪くはないんだけどちょっと面倒だよなあ、と悩んでいたところで思い出したのが、Appleの「ショートカット」アプリの存在。
## ショートカットアプリでアプリリンクを作る

ショートカットアプリについては今回あまり詳しく掘り下げませんが、Appleのショートカットアプリは「App Storeのアプリを検索してそのデータを持ってくる」ということが、かなり簡単に実行可能です。

そして、よく考えてみたら自分がいい感じの見た目のリンクを作りたいものってiPadのアプリだけ。他のいわゆる「普通のリンク」はどうでもいい。強いて言うならYouTubeのリンクなども残したくなるかもしれないけど、それは簡単にいい感じのリンクに出来る。

ということで、さくっとショートカットを作って、以下のような見た目のノートを簡単に作ることができました。

![[2023-08-03_16.19.41ss.jpeg]]

リンクを作るショートカットはこんな感じ。
![[2023-08-03_16.13.27ss.jpeg]]

ショートカットはダウンロードできるようにしておきました。
https://www.icloud.com/shortcuts/67f5f2d98a2e498792ae5163d5d3e86d

これなら、データはシンプルなマークダウンなので「テキストの見た目」的にもきれいだし、必要十分にグラフィカルな見た目でこれなら満足できます。自分の場合、アプリのアイコンさえわかれば、どんなアプリなのかは大抵すぐわかるのでこんなもんでオッケー。

このショートカットをさっと呼び出すショートカットキーも設定したので、アプリリンク作りはかなり簡単になりました。（ショートカットアプリとショートカットキーを組み合わせると、最近不便だったことがかなり解決できるかも、とライフハック的にもいろいろな活用の可能性を見出すことができました）

わかる人は上記画像を見て自分なりのショートカットを作ってもいいし、よくわからなければこの記事のコメント欄に質問していただければできる範囲でサポートいたします。（有料購読者の権利）


これで、メモ帳からObsidianに移行する際の「見た目的な問題」は解決。次回は「長すぎるメモをいかにObsidianで使いやすくするか」「数が増えたものをどう整理するか」などを考えてみたいと思います。

---

なお、Obsidianへの移行は便利になったのは間違いないんですが、今後も「とりあえずメモ」という場合にはメモ帳を使い続けると思います。（なんなら、今後Obsidianのデイリーノートは「日誌オンリー」にして、メモに関してはメモ帳を使った方がいいかもしれない、と思い始めてます）
