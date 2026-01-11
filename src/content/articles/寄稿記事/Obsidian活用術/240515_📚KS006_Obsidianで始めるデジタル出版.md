---
project: ks
topic: 妻の記事
title: "\U0001F4DAObsidianで始めるデジタル出版"
subtitle: "\U0001F460006 Obsidianを使った電子書籍原稿の作り方"
description: null
url: 'https://knowledgestuck.substack.com/p/haruna006'
date_published: 2024-05-15T00:00:00.000Z
audience: only_paid
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!8Dg4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc93d5423-2458-4a39-882b-f88776baf605_1684x1191.jpeg
tags:
  - Obsidian
draft_link: null
series_name: 寄稿記事
category: haruna1221
---## メモ・原稿

# 📚Obsidianで始めるデジタル出版

### 👠006 Obsidianを使った電子書籍原稿の作り方

https://substack.com/@ipadworkershttps://substack.com/@ipadworkersMay 15, 2024∙ Paid51Share👋 こんにちは、はるなです。

普段は✉️ https://ipadworkers.substack.com/というiPad特化型のニュースレターを配信しています。五藤隆介（ごりゅご）さんの妻です。

ナレッジスタックへの6回目の寄稿記事です。前回の記事「https://knowledgestuck.substack.com/p/haruna005」で、資料ファイルを元に、パプリッシュに公開、そしてiPadアプリ図鑑の電子書籍原稿にしていると紹介しました。

今日は、もう少し具体的に「**Obsidianを使って、どのようにして電子書籍をリリースしたのか**」を紹介します。

## 📘iPadアプリ図鑑という電子書籍をリリース

持続可能な働き方戦略「SWS」に欠かせない、素材の多展開化。私たちが選んだ展開先の1つは、AmazonのKindleダイレクトパブリッシング（KDP）を活用した電子書籍のリリースです。

https://substackcdn.com/image/fetch/$s_!8Dg4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc93d5423-2458-4a39-882b-f88776baf605_1684x1191.jpeg今回、『https://goryugo.com/book_ipad_app_zukan』はObsidianを使って電子書籍用の原稿執筆を行ないました。通算5冊目の電子書籍ですが、初めてObsidianだけを使って執筆しました。

https://substackcdn.com/image/fetch/$s_!fktM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc987e6ec-dec4-4617-a630-60aa25528148_1024x768.jpeg🔍 https://ipadworkers.substack.com/p/ipadapp

最後のePubファイル作成だけはVScodeを使用しましたが、それ以外は全てObsidianでの作業です。

Obsidianを使って、どのようにしてこのプロジェクトを進めていったのか、具体的な作業の流れをみなさんに共有します。

## 📝 Obsidianを使って本を書く

Obsidianのすばらしい点は、その柔軟性と情報の再利用性にあります。

過去に執筆した原稿ファイルを簡単に複製できることや、プラグインを使うことで、簡単にパッケージ化ができることです。

### プロジェクトノート/目次ノート/下書きノート

まず最初に作成するのはプロジェクトノートです。私はファイル名の前に「P-」をつけてプロジェクトノートを作成します。

このプロジェクトノート上で、どんな内容にするのか、どういったカテゴリで分けるのかなどを考えると同時に、やったことの作業ログも記入していきます。デイリーノートには「iPadアプリ図鑑の執筆」のように書いて、プロジェクトノートの方に詳細を書き込むようにしています。

https://substackcdn.com/image/fetch/$s_!Z6Lb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa858cc93-05e7-4257-a773-5d378fe9599d_3300x2468.jpegある程度方向性が決まったら、本の目次ページを作成します。ここではどのような切り口でアプリをまとめていくのか、本にしたときにどのような順番で原稿を並べるのか、コラムをどこに挟むのかなどをリストに並べながら考えていきました。

https://substackcdn.com/image/fetch/$s_!pXOf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F75e4b602-7f91-4664-9a92-c1ae847fa377_3300x2468.jpeg今回のリリース版には含まれていませんが、今後追加したいなと考えている項目なども目次ノートに入っています。

## Keep reading with a 7-day free trial

Subscribe to ナレッジスタック to keep reading this post and get 7 days of free access to the full post archives.

https://knowledgestuck.substack.com/subscribe?simple=true&next=https%3A%2F%2Fknowledgestuck.substack.com%2Fp%2Fharuna006&utm_source=paywall-free-trial&utm_medium=web&utm_content=144576975&coupon=1d0c686bhttps://substack.com/sign-in?redirect=%2Fp%2Fharuna006&for_pub=knowledgestuck&change_user=false

---
<!-- Merged from: 240516_👠006Obsidianで始めるデジタル出版.md -->

`= this.file.frontmatter.url`

```dataview
LIST
FROM #ks/👠 
WHERE file.day <= this.file.day - dur(1 d)
SORT file.day DESC
LIMIT 1
```
```dataview
LIST
FROM #ks/👠 
WHERE file.day >= this.file.day + dur(1 d)
SORT file.day ASC
LIMIT 1
```



はるなが書いてくれた記事をコピペしてローカルに貼っておく
次回の原稿をコピーする



---

👋 こんにちは、はるなです。

普段は✉️ [iPad Workers](https://ipadworkers.substack.com/)というiPad特化型のニュースレターを配信しています。五藤隆介（ごりゅご）さんの妻です。

ナレッジスタックへの6回目の寄稿記事です。前回の記事「[Obsidianを使った「持続可能な働き方戦略」](https://knowledgestuck.substack.com/p/haruna005)」で、資料ファイルを元に、パプリッシュに公開、そしてiPadアプリ図鑑の電子書籍原稿にしていると紹介しました。

今日は、もう少し具体的に「**Obsidianを使って、どのようにして電子書籍をリリースしたのか**」を紹介します。

## 📘iPadアプリ図鑑という電子書籍をリリース

持続可能な働き方戦略「SWS」に欠かせない、素材の多展開化。私たちが選んだ展開先の1つは、AmazonのKindleダイレクトパブリッシング（KDP）を活用した電子書籍のリリースです。

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc93d5423-2458-4a39-882b-f88776baf605_1684x1191.jpeg)



](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc93d5423-2458-4a39-882b-f88776baf605_1684x1191.jpeg)

今回、『[iPadアプリ図鑑](https://goryugo.com/book_ipad_app_zukan)』はObsidianを使って電子書籍用の原稿執筆を行ないました。通算5冊目の電子書籍ですが、初めてObsidianだけを使って執筆しました。

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc987e6ec-dec4-4617-a630-60aa25528148_1024x768.jpeg)



](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc987e6ec-dec4-4617-a630-60aa25528148_1024x768.jpeg)

🔍 [iPadアプリ図鑑の裏側](https://ipadworkers.substack.com/p/ipadapp)

最後のePubファイル作成だけはVScodeを使用しましたが、それ以外は全てObsidianでの作業です。

Obsidianを使って、どのようにしてこのプロジェクトを進めていったのか、具体的な作業の流れをみなさんに共有します。

## 📝 Obsidianを使って本を書く

Obsidianのすばらしい点は、その柔軟性と情報の再利用性にあります。

過去に執筆した原稿ファイルを簡単に複製できることや、プラグインを使うことで、簡単にパッケージ化ができることです。

### プロジェクトノート/目次ノート/下書きノート

まず最初に作成するのはプロジェクトノートです。私はファイル名の前に「P-」をつけてプロジェクトノートを作成します。

このプロジェクトノート上で、どんな内容にするのか、どういったカテゴリで分けるのかなどを考えると同時に、やったことの作業ログも記入していきます。デイリーノートには「iPadアプリ図鑑の執筆」のように書いて、プロジェクトノートの方に詳細を書き込むようにしています。

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa858cc93-05e7-4257-a773-5d378fe9599d_3300x2468.jpeg)



](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa858cc93-05e7-4257-a773-5d378fe9599d_3300x2468.jpeg)

ある程度方向性が決まったら、本の目次ページを作成します。ここではどのような切り口でアプリをまとめていくのか、本にしたときにどのような順番で原稿を並べるのか、コラムをどこに挟むのかなどをリストに並べながら考えていきました。

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F75e4b602-7f91-4664-9a92-c1ae847fa377_3300x2468.jpeg)



](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F75e4b602-7f91-4664-9a92-c1ae847fa377_3300x2468.jpeg)

今回のリリース版には含まれていませんが、今後追加したいなと考えている項目なども目次ノートに入っています。

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F29b61e87-43d5-4d5a-8a0a-a5d6361e2149_3300x2468.jpeg)



](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F29b61e87-43d5-4d5a-8a0a-a5d6361e2149_3300x2468.jpeg)

実際に原稿を書くときに、素材や原稿の一時置き場として使用する「下書きノート」も作成します。原稿を書いていて、うまくまとまらなくなった時などは下書きノートに移動させてから書き直したりしていました。

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5a435d4d-45e2-44ae-886b-5c233f7e4653_3300x2468.jpeg)



](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5a435d4d-45e2-44ae-886b-5c233f7e4653_3300x2468.jpeg)

「下書きノート」や「目次ノート」は「プロジェクトノート」1つのノートにしてもよかったのですが、目次だけをさっと見たい、下書きノートをさっと開きたいことがあったので独立させました。

ノートは基本スクロールせずに表示できるくらいの分量が見やすく扱いやすいですね。

### ファイルを一箇所に集める

原稿の執筆が完了したら、必要なファイルを集めます。また、ePub形式に変換するために必要な正式なマークダウン記法への修正も必要です。

この2つの作業を同時にできるプラグインが、[Markdown Exportプラグイン](https://github.com/bingryan/obsidian-markdown-export-plugin)です。

普段、Newsletterや本の原稿を執筆する際wikiリンク記法で画像を挿入しています。ダブルカッコでファイル名を囲み、ダブルカッコの前に！をつけた形式です。

```
![[240513_14.43.24ss.jpg]]
```

ObsidianやiA WriterなどWikiリンクに対応したアプリであれば、プレビューしてくれますが、非対応のアプリでは表示できない形式です。このままではうまくePub変換できないため、マークダウン形式に変換します。

そして、原稿の中に読み込んでいる画像ファイルを一箇所に集める作業も同時に行います。

Markdown ExportプラグインをインストールしたObsidianなら「…」から「Export to markdown」を選択するだけで、マークダウンファイルの書き出し、およびファイル内の画像を指定フォルダに書き出ししてくれます。

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdb2544fe-ec49-4e7e-8c6c-154ca36de380_3288x2470.jpeg)



](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdb2544fe-ec49-4e7e-8c6c-154ca36de380_3288x2470.jpeg)

プラグインの設定画面で、あらかじめ書き出すファイルの保存先を指定しておきます。

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd46bb676-d748-4e4e-aef0-28276c95704c_3300x2468.jpeg)



](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd46bb676-d748-4e4e-aef0-28276c95704c_3300x2468.jpeg)

この方法で、手軽に電子書籍用のファイル変換および、画像を一箇所に集める作業が完了です。

私の原稿は画像ファイルがたくさん含まれているので、必要な画像ファイルを探し出して集めるだけでもかなりの作業時間が必要です。今回、Obsidianのプラグインが使えたことで、かなり作業時間を短縮できました。もちろんフォルダ内のファイルを一括処理というわけにはいきませんでしたが、執筆完了した原稿から順にエクスポートしてファイルを集めるといった手順で、そこまで手間をかけずにできました。

今回、Obsidian上には書籍原稿の元になりそうな原稿ファイル、本の目次ファイル、実際の原稿ファイルが入っていたことで、ツールの切り替えなしに原稿執筆を勧められたので、精神的な作業ハードルも低くなってよかったです。

Obsidian内で文章を書き、章や節の整理や、原稿の順番入れ替えもObsidian上で簡単にできました。

## 🫐電子書籍販売で収入を得る

最終的にePubファイルを作成するためにPandocを使用しています。何度かKDPプロジェクトを繰り返す中で、Pandocの利用が一番早くてよかったからです。Pandocというドキュメント変換ツールを使うことで、今ではコマンド1つで簡単にePubファイルを生成できるようになりました。

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5f96d3b4-9888-4ad9-8b70-ea27d2f5715f_3220x1898.jpeg)



](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5f96d3b4-9888-4ad9-8b70-ea27d2f5715f_3220x1898.jpeg)

電子書籍制作に興味のある方は、こちらの記事が参考になります。

- [Markdown + Pandoc でお手軽に電子書籍を書く - Qiita](https://qiita.com/sta/items/c88093b1b9da9c77b577)
    
- [Obsidianでの本の作り方（ナレッジスタック）](https://knowledgestuck.substack.com/p/obsidian-4e7?utm_source=publication-search)
    

ePubファイルを作成するだけなら「[でんでんコンバーター](https://conv.denshochan.com/)」というWebサービスを使って作成することもできます。

■ [電書ちゃんのでんでんコンバーター](https://conv.denshochan.com/)

Pandocを導入して使うメリットは、細かい設定が自分でできるという点です。たとえば、「見出しレベル2までを目次に表示させる」や「見出しの色や背景色」といったところを自分で簡単に調整できます。

ただし、Pandocを使用するのは年に1-2回なので、すぐ使い方を忘れてしまいます。その辺りも回数を重ねるうちに学習し、Obsidian上に手順書を残すことで「見ながらやればできる」ようになりました。

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd28c1cf7-1920-4bf8-80f4-437a416e2259_3434x2000.jpeg)



](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd28c1cf7-1920-4bf8-80f4-437a416e2259_3434x2000.jpeg)

Pandocを使うために必要な手順はChatGPTが教えてくれるので、電子書籍制作に興味のある人はぜひ試してみてください。

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F42cb8e08-6fbd-4f91-8795-559185c1a93c_2364x1943.jpeg)



](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F42cb8e08-6fbd-4f91-8795-559185c1a93c_2364x1943.jpeg)

今までObsidianにためていたデータを有効に使えて、さらにアイデア出しの段階から実際の原稿執筆まで1つのツールで完結できることがObsidianを使っていて一番よかったことです。このObsidianを使ったエコシステムには非常に助けられています。

Obsidianは、自分の中の知識や考えを整理するツールとしてはもちろんのこと、自分のコンテンツをお金に変換するためのアウトプットツールとしても非常に優れたツールだと言えるでしょう。うまくいけば、自分のコンテンツをお金に変換できます。

ということで今日は「**ObsidianでiPadアプリ図鑑の原稿作成を行なった**」というお話でした。
