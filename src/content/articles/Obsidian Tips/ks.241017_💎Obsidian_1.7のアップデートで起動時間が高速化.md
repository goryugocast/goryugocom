---
project: ks
topic: Obsidian Tips
topic_code: obs
title: Obsidian 1.7のアップデートで起動時間が高速化
subtitle: "\U0001F48E起動時間が遅い原因を自分で見つけることも可能になった"
description: null
url: 'https://knowledgestuck.substack.com/p/obsidian-032'
date_published: 2024-10-17T00:00:00.000Z
audience: everyone
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!dp3q!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe9c52b9f-a64b-4969-9bad-c5b3d6e51b08_1142x688.jpeg
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



- [[Cloude3で文章校正する時に役立つスクリプト]]→ChatGPTのリンクに変える
- [[📅ナレッジスタック 収録と配信・執筆のスケジュール]]
- [📋ナレッジスタックの記事一覧](https://goryugo.com/ks_all_post)を更新する
	- →[[💎Obsidianの基礎〜様々な使い方]]


Obsidianの新しいバージョンが1.7がリリースされました。

アプデ内容はこちら
[Obsidian 1.7 Desktop (Public) - Obsidian](https://obsidian.md/changelog/2024-10-16-desktop-v1.7.4/)
[Obsidian 1.7 Mobile (Public) - Obsidian](https://obsidian.md/changelog/2024-10-16-mobile-v1.7.4/)


個人的に気に入っているのは、Obsidian Syncの履歴が見えるようになって、これがついでに「最近編集したファイル」としても使えるってこと。

なんですが、たぶんより多くの人に影響を与えるのは、Obsidianの「起動時間」に関連する2つのアップデートかと思います。

ひとつは、Obsidianモバイル(iOS、Android)の起動時間が早くなったということ。これは単純に、やったねよかったね、ということで、何もできることはありません。

大事なのはもう一つの、自分で起動時間が遅い原因を見つけられるようになった、ということ。

具体的には、設定の中に新しく「いつもより起動が遅い場合に警告する」という設定が加わり、そこにあるボタンから、Obsidianが起動する際に、どんなことにどれだけ時間がかかってるか、が確認できるようになりました。

具体的には、設定を開いて、一般の、一番下にある「時計」のアイコンをクリック。





こんな感じで、Obsidianが起動する時にどんなことに時間がかかってるかが分かります。

特にこれ、モバイル端末でObsidianを使う場合に影響が大きいです。

たとえば、Obsidianにプラグインをたくさんインストールすればするほど起動に時間がかかるわけですが、その中でもどのプラグインの起動に苦労してるのかがわかれば、自分で取捨選択が可能です。。

実はそのプラグインって、コンピュータでは必要でも、モバイル端末ではオフにしてしまっても問題ないのかもしれない。

そういうことを判断する材料になるわけです。


特に、iPhoneでiCloudを使ってObsidianのデータを同期すると、それが明確にボトルネックになってることがよくわかります。起動に時間がかかる原因のほとんどは、iCloud。



環境は異なりますが、Obsidian Syncを使うと、その時間が不要になり、明確に起動時間が早くなります。（1.5秒が15秒になっている、とも言える）



とは言え、Obsidian SyncはObsidianが起動してから同期を始める上に、マークダウンファイル以外の同期にはけっこう時間がかかります。画像をいくつか追加したりすると、同期が終わるの、けっこう待たされる小鳥なります。

そして、同期が終る前にアプリを閉じちゃったりすると、ファイルを移動してた場合なんかにデータの重複が起こるなんてこともあったりして、100％手放しでObsidian Syncをオススメできるわけではありません。

とは言え、iCloudの同期で場合によっては10秒待たされることを考えると、その10秒にお金を払ってもいい、と考える人もわりといるんじゃないかな、とも思うし、長くObsidianが続いてくれるためには、公式のサービスを使って応援する、という姿勢も大事なので、この機会にObsidian Syncの加入を検討してもよいかもしれません。

P.S



最近はふと思い立ってかつて使っていた「横スライドのタブ」を復活させてみました。

複数のページを連続的に操作する、なんて場合に、けっこういい感じです。

場面によって使いやすい使いにくいが分かれるので、ワークスペースを使ってうまく使い分けてあげると便利かもです。

切り替えは、分かりにくいけど左上の矢印




---



ホームノートの場合、これをたとえば「半年に1回作り直す」とかにすると、長すぎて前になにをやったのか忘れてしまう。慣れないうちは少なくとも1ケ月に1回くらいは式年遷宮を実施してやることが重要なのではないか、と考えています。

## 古いノートも記録としてそのまま役に立つ

また、デジタルノートの式年遷宮は、現実の式年遷宮とは違い、古いノートをそのまま残しておくことが簡単です。

この「前のやつを残しておける」というのも重要です。単純に記録として残ってたら楽しいし、前のやつがあるから、と思えば思い切って以前と大きく構造が違うものも作りやすい。

記録を残すのが楽しそうだから、という理由で簡易的な「今週の予定」みたいなセクションを新しく作ることにつながったりという変化も表れてます。（そして、これまた今週の予定セクションは試してみたら想像以上に便利だった）




---

[Obsidianセミナーの新しい形 - by goryugo - ナレッジスタック](https://knowledgestuck.substack.com/p/w027)のアンケート投票ありがとうございました。どれも同じくらいの数の得票数で、それってつまり全部読みたいってことやん、と喜んでこの記事を書いています。

そんな中で今回は、（アンケート期間が終わったら当初の印象よりばらつきが生まれたんですが）僅差で3位だった「Gitを使ったロギング仕事術」の話です。

振り返ってみると、ごりゅごはこれまでにけっこうたくさん「Git x Obsidian」の記事を書いています。

[Obsidianのデータをgitで管理する方法とそのメリット - by goryugo - ナレッジスタック](https://knowledgestuck.substack.com/p/obsidiangit)

[個人でGitを使うことでなにが得られるのか - by goryugo - ナレッジスタック](https://knowledgestuck.substack.com/p/git)

[MacやWindowsのObsidianデータをGitHub経由でiPhoneと同期する - by goryugo](https://knowledgestuck.substack.com/p/macwindowsobsidiangithubiphone)

[GitHubを使って複数人での原稿管理するときのコツ - by goryugo - ナレッジスタック](https://knowledgestuck.substack.com/p/github)


色々なことをやってきましたが、今現在gitは以下のようなことで使っています。






# もう一回gitで仕事ログを残すことをやる


最近改めて

同時に、最近はさらに「ゆっくり」になりました。

何やったか記録を残すのに1個につき2〜3分使ってもいいわ、というイメージ。間間に隙間を設けて、ゆっくりやっている。

効率ではなく、健全に長く仕事を続けるには、これが重要ではないか、と感じている。




ゆっくりしか、やれなくなった。gitで、きちんと記録を残そう、という意識。
で、普段はその1分を「惜しまない」ことが重要なのではないか。
時間の節約よりも、気力、疲労の対策。

わざわざ変更があったファイルを確認して、これはこういうことをやったんだな、と思いだして記録が出来る。

で、少しずつこまめに記録を残すようになる。

githubのログが、こういう感じで見られるの、けっこういいと思うんだ。
もちろん、コンピュータがわかる人は、コマンドで全部見られるし、それはローカルだけで完結させることも出来る。
![[github_lob.jpeg]]



ついでに言うと、gitの場合強制的に変更があったファイルすべてを必然的に管理することになる。

気になる人は、ローカルで使うことも出来るわけです。
