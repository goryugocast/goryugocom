---
project: ks
topic: Obsidian Tips
topic_code: obs
title: Obsidian Web ClipperをカスタマイズしてAmazonから書誌情報を簡単に作る
subtitle: "\U0001F48Eどんなページも自分が好きな形でクリップできるのはとても便利"
description: null
url: 'https://knowledgestuck.substack.com/p/obsidian-035'
date_published: 2024-11-25T00:00:00.000Z
audience: only_paid
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!Z5AK!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F51ca6d10-b68d-46ea-8408-55432b110c74_1000x634.gif
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


Obsidianに「ウェブクリッパー」という機能が公式に追加されたのをご存知でしょうか？

[Obsidian Web Clipper](https://obsidian.md/clipper)

リリースされたのは少し前で、リリース当初から存在を知っていたのですが、ごりゅごはウェブクリッパー挫折歴10年を超える猛者です。今更ウェブクリッパーなんて使ったって、Obsidianの中にゴミが増えるだけ。記事を集めて、役に立った気がするだけで、実際にはなんにもうれしいことなんてないんだ。そう決めつけて、無視を決め込んでいました。

それとは別に、最近はObsidianを「ジョニーデシマル的に整理する」ということも試しています。

[ジョニーデシマル（Johnny.Decimal）という情報整理方法について](https://knowledgestuck.substack.com/p/johnnydecimal)

そんな中で、先日これまでに購入した音楽機材を整理したいという欲求が発生しました。

その際に、どうやったら簡単に自分が買った機材などを整理できるのか。そこでふとObsidianのウェブクリッパーのことを思い出していろいろ実験しているうちに、このツールの秘めたる可能性に気がつくことができたのです。

## サイトに応じて「好きな部分」をクリップできる


これまで自分が使ってきたウェブクリッパーというやつは、保存できるウェブページは基本的に「ウェブクリッパー任せ」です。たまに自分で保存する範囲を選ぶことができるツールは存在していました（Evernoteのウェブクリッパーはある時期以降はとても優秀だった）が、一手間以上必要になることは間違いありません。

世の中がイメージする普通のウェブクリッパーなら、それが当然というか、まあそんなもんだろ、と思います。

ただ、Obsidianのウェブクリッパーは違う。一度設定さえ済ませしてしまえば、基本的にクリップボタンを押すだけで「ウェブページの自分の好きな部分だけを保存する」というのが超簡単に完了してしまうのです。

たとえば以下の画面は、ごりゅごが作ったウェブクリッパーでAmazonのページから本の情報を保存した場合。

[![Image from Gyazo](https://i.gyazo.com/6dd62ede67f807320f736e188a0df7fd.gif)](https://gyazo.com/6dd62ede67f807320f736e188a0df7fd)
ウェブクリップによって、本のタイトル、著者や出版年月などが一発でObsidianのノートとして保存されます。

他にも、元々自分がやりたいと思ったサウンドハウスで楽器のページをウェブクリップした場合。ここではちょっと挙動を変えていて、ウェブクリップするとデイリーノートに画像やら価格情報といったものが保存されるようにしています。

[![Image from Gyazo](https://i.gyazo.com/104f94003a1feb49373f3310d425ba89.gif)](https://gyazo.com/104f94003a1feb49373f3310d425ba89)
大抵のウェブクリッパーは、さっきも言ったように基本的には「自動」でページの一部が保存されます。

どんなに優秀なウェブクリッパーでも、あらゆるページで「自分が欲しい情報を自分が好きなように保存する」なんてことは実質不可能なんですが、Obsidianのウェブクリッパーはそこが圧倒的に自由！

もちろんそのために多少の「設定」は必要なんですが、それさえできればあとは自由自在。ウェブページの好きな部分を好きなように集めてきて、好きな順番で、自分好みのマークダウンとして簡単に保存ができる。

少し技術的な話をすると、このWeb Clipperはウェブページの一般的なメタ情報の他にも、CSS Selectorでページの好きな要素を取り出したり、schema.orgで定義されてる情報の取得も可能。

詳しいことを知りたい人は、以下のヘルプをご覧いただくのが早いです。
[Introduction to Obsidian Web Clipper - Obsidian Help](https://help.obsidian.md/web-clipper)

実は、これと似たような方法は以前から自分で作っていて、このニュースレターでも紹介していたことがあるんです。

[Amazonの書誌情報をObsidianのmd形式でコピペできるようにするブックマークレット - ごりゅご.com](https://goryugo.com/20220316/amazon-to-obsidian/)

[Amazonの書籍販売ページを開き1クリックでObsidianに書誌情報ノートを作るブックマークレット](https://knowledgestuck.substack.com/p/amazon1obsidian)

ObsidianのWeb Clipperでやってることは、この方法とほとんど同じものです。

ただ、大きく違うのは「これまでの方法」は、準備も複雑で、カスタマイズも面倒田ったのです。それに比べると今回の方法は、そうした手順がかなり簡略化され、多くの人が「自分なりの方法」を試しやすくなりました。

たとえば、Amazonのページから本の情報を保存するときに作ったテンプレートはこんな感じ。
```
[{{selector:#productTitle}}](https://www.amazon.co.jp/exec/obidos/ASIN/{{selector:#ASIN?value}})

![|100]({{selector:img#landingImage?src}})
著者：{{selector:.author .a-link-normal | join}}
出版社：{{selector:#rpi-attribute-book_details-publisher .rpi-attribute-value}}
出版日：{{selector:#rpi-attribute-book_details-publication_date .rpi-attribute-value}}


# 関連・思い出した本 

# 読書メモ
```

これを見て、ああそうか、この部分を変えれば自分なりにある程度カスタマイズできそうだな、というのがイメージできる人ならば、試してみる価値はあります。

今回は、その他2種類の設定を作りました。

サウンドハウスの場合
```
---

[{{selector:h1}}]({{url}})
![|200](https://www.soundhouse.co.jp/{{selector:#item_photo_box p img?src|first}})
{{selector:#detail_pp .price|first}}
{{selector:#detail_pp .point|slice:0,-2}}

---

{{selector:.inner_box_spec|join:"\n"}}

{{selector:.insertDetail}}

```

YouTube（タイトル、チャンネル名、動画の埋め込み、を行う）
```
# {{selector:h1.ytd-watch-metadata}}
{{selector:#owner ytd-video-owner-renderer #upload-info #container #text-container}}
![{{title}}]({{url}})
```


細かい設定方法、設定ファイルなどは、時間に余裕が出来たら書けたらいいな、という感じです。

設定方法が気になる方は、コメントやいいねボタンなどでお知らせください。


---
追記：ざっと設定方法をまとめました。わからないところはコメントいただければ、できる限り解説に加えていきます。

# 手順

## 1.拡張機能のダウンロード
まず、下記ページからブラウザの拡張機能をダウンロード。
[Obsidian Web Clipper](https://obsidian.md/clipper)

iPhoneの場合は、App StoreからObsidian Web Clipperというアプリ（Obsidianと同じアイコン）を探す。

## 2.設定ファイルのダウンロードと解凍

そして、以下のZipファイルをダウンロードして解凍。（ファイルが2つあります。モバイル用と、スマホ用で使うものが違います）

## 3.設定ファイルの読み込み

PCの場合、拡張機能のアイコンをクリックして、歯車をクリック。これで設定画面が開く。

![[057BB14E-6B78-44A9-9E80-9E736432230D_1_201_a.jpeg]]


iPhoneの場合、アプリをインストールしたあとにSafari（Obsidianではない）を開いて、以下の場所をクリック。

![[6B9ABF62-B54D-4DE5-8941-CB55B3FED993_1_102_o.jpeg]]


その後、設定の「新規テンプレート」で、インポートを選択して、ダウンロードしたファイルを開く。
![[08A698AF-FC31-4D89-AAB2-7A69D52BA1A8_1_201_a.jpeg]]



注意：Amazonのページ構造に依存しているので、構造が変わった場合（ウェブページの内容がリニューアルされた場合）うまく機能しなくなる可能性があります。

（自分も使っている限りは）可能な範囲で修正をしていきますが、基本的には自己責任での管理をお願いいたします。
