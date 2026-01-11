---
project: ks
topic:
  - Obsidian
  - Graph
  - プラグイン
title: "💎ObsidianのGraph機能を使いこなしていい感じにする設定"
subtitle: Graphに色付けができるようになったことで「つながり」がすごく見やすくなりました
description: "ObsidianのGraph機能を効果的に活用するための設定方法を解説。特にv0.11.0で追加された色付け機能を中心に、フィルタ（表示深度）、グループ（色分け）、Forces（引力）などの各設定項目の意味と、筆者の具体的な設定例を紹介。ワークスペースプラグインで設定を保存するコツも共有します。"
url: 'https://knowledgestuck.substack.com/p/obsidiangraph'
date_published: 2021-03-13T00:00:00.000Z
audience: everyone
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!f0A4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Faf49b9f3-3033-414f-8d4d-358e413248be_2464x1918.png
tags: []
draft_link: null
series_name: Obsidian Tips
---
## メモ・原稿

# 💎ObsidianのGraph機能を使いこなしていい感じにする設定

### Graphに色付けができるようになったことで「つながり」がすごく見やすくなりました

https://substack.com/@goryugohttps://substack.com/@goryugoMar 13, 20214Shareここ最近、Obsidianの「Graph機能」がかなり便利になってきています。

特に便利だったのが、Graphに色付けができるようになったこと。（v0.11.0にて追加。これまでの機能追加履歴は以下にまとめています）

https://publish.obsidian.md/knowledge-stuck/Public/PKM(Anki%2CObsidian%2C%E6%96%B0%E3%81%97%E3%81%84%E5%AD%A6%E3%81%B3%E6%96%B9%E3%81%A8%E5%83%8D%E3%81%8D%E6%96%B9)/Obsidian%E3%81%AE%E6%A9%9F%E8%83%BD%E8%BF%BD%E5%8A%A0%E5%B1%A5%E6%AD%B4

これが出来てから、見た目も楽しく、脳内の整理としてもGraphというものが便利になりました。

https://substackcdn.com/image/fetch/$s_!f0A4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Faf49b9f3-3033-414f-8d4d-358e413248be_2464x1918.png簡単に、今自分はどんな感じの設定にしているかということや、設定のコツなどをまとめてみたいと思います。

## Obsidianは英語設定のままで使う

最初に前提条件なんですが、**Obsidianは英語設定のまま**で使ってます。

理由は、Cmd+P（コマンドパレット）でなんらかのコマンドを実行するときにインクリメンタルサーチが使えるのが便利だから。ファイル名に関しても、頻繁に使うものは変換や確定が面倒なので英数を含むものにしています。（Cmd＋Oのクイックスイッチャーですぐにファイルを開ける）

https://substackcdn.com/image/fetch/$s_!aTgb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fb235c27f-9beb-4dbc-b9db-c7aed55bfd6d_5120x2880.pngインクリメンタルサーチ## 基本は「常に右下にGraphを表示させる」

普段のObsidianの画面はこんな感じです。

https://substackcdn.com/image/fetch/$s_!bl9W!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F95ed010f-7c78-43ca-89ae-07a5471cc211_5120x2880.png一番左は、<iframe>を使ってWorkflowyを表示して、その隣に「今日」のノート。

https://anchor.fm/goryugocom/episodes/626-Obsidianiframe-es90m0

Graphは横幅が広い方が使い易く感じるので、右上エリアはGraphはほぼ常時表示。（ある程度のサイズのモニタが必要）

このGraphというのはObsidianの中にあるノート全てではなく、**今あるノートと、それに繋がってるノートだけを表示してくれてるグラフです。**

https://substackcdn.com/image/fetch/$s_!VCIE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F44465025-df8d-4111-be37-11a02bd3217b_1412x868.png2つ先までのつながりを表示## Graphの設定

このGraphは設定できることが結構多くいです。

究極的には「目的に応じて使い分けると使いやすい」ってやつなんですが、とりあえず1つの例として、ごりゅごが普段どんな感じの設定で使ってるか紹介しようと思います。

Graphの設定項目は、大きく4つのカテゴリに分かれます。

### Filters

https://substackcdn.com/image/fetch/$s_!lX6-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fc86157df-6ab8-49d8-a4c1-854e143fffac_400x682.png主に「どのくらいまでGraphに表示するか」という設定。

ここで「depth」を2に設定してます。これで「2つ先の繋がってるもの」まで表示されるようになり、Scrapboxと同じ程度のつながりまでリンクを表示させられるようになります。（関連ページと、その関連ページに繋がっているページ）

これより多くすると、自分の場合「関連項目が多すぎる」という感じになってしまい、ちょっと使いにくい。

2個先くらいだと「同じMOCに繋がってるノート」も見やすくなって、関連ノートが見つけやすいです。

### グループによる色分け

https://substackcdn.com/image/fetch/$s_!9tJD!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F759dd140-737d-4987-bd51-87d1a158974a_436x544.pngv0.11.0にて追加されたのがこの機能。

Obsidianの検索機能を使って、その条件に当てはまるノートを色分けします。（色も自由に選べるようになりました）

検索に関しても、以前はいろんなことを覚えないといけなかったんですが、この辺りもガイドが出てくるようになったので、基本的なことならば簡単にできると思います。

ごりゅごの基本設定は、MOCというタグがついたものと、いくつかのフォルダに色をつけるくらいの感じです。（検索や、フォルダ分けなどの話はまた次の機会に）

### 見た目を変えるDisplay

https://substackcdn.com/image/fetch/$s_!5rTI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fff02051a-8069-4d2f-9d97-4e82e1f132ea_340x460.pngこれは、主につながりの見た目を変える機能。

ここはあんまり興味なくて、デフォルトのままです。

線の太さや、丸の大きさなんかを変えられます。

### 引っ張る力を決めるForces

https://substackcdn.com/image/fetch/$s_!L6V0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F029fead3-2e77-4e30-915b-47458fcda59b_316x498.png最後の設定項目が、つながり同士の引っ張る力を変えるForcesというやつ。

ここの項目をいじると、ノートの「引っ張る強さ」や「距離」が変わります。

好みだとかノートの繋がってる量などでどういう数字がちょうどいい感じなのか、結構変わります。

特に「Display」のパラメーターを変えてたりする場合、ここを調整すると見やすくなる事が多いです。

## 気に入った設定はWorkspaceとして保存しておく

注意しないといけないのは、この検索設定というのは、タブを閉じたりなんだったりで結構簡単に設定が消えてしまいます。

その対策として**「ワークスペース」というプラグイン**のを使うのがおすすめです。

「ワークスペース」というのはObsidianの「コアプラグイン」の中に入っているプラグインの1つで、ウインドウの配置などを名前をつけて覚えておける機能。

https://substackcdn.com/image/fetch/$s_!a76O!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F913f2eba-b84e-4af9-9ba6-bde5e64b42b0_5120x2880.pngworkspaceは簡単にいくつも保存できるこれもCmd+Pでコマンドパレットを呼び出して「work」くらいまでタイピングしてやると見つかると思います。

気に入ったワークスペースは幾つでも保存できるので「編集モード」「MOC作るモード」「つながり探すモード」など、目的に応じていろんなワークスペースを作るのもいいかもしれません。

## 目的次第で大きく変わるサンプル

参考までに、初期設定のままのグラフと、ごりゅご独自設定のグラフを比較するとこんな感じになります。

### サンプル1

https://substackcdn.com/image/fetch/$s_!aG3Y!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F7f960772-aa3a-4cfb-ab08-04229ff35b01_1020x838.png初期設定https://substackcdn.com/image/fetch/$s_!bcYS!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F632a7601-4dad-4d91-a42b-75e28b6b8fe5_1322x1310.png独自設定比べてみたら、標準のままでも結構別にいいじゃん、って思うんですが、これは「どんなノートなのか」によって結構変わります。

### サンプル2

別のノートで比較してみるとこんな感じ。

https://substackcdn.com/image/fetch/$s_!gw5-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F5c1ee2c8-34fc-4963-9f5d-3802389b3ae5_602x394.pnghttps://substackcdn.com/image/fetch/$s_!RtWu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F502054d9-0e29-4177-9bbc-6236c6e695da_1110x990.png独自設定「2個先までつながる」って設定にしておくと関連ノートが見つけやすい、というよいサンプルです。

こういうのが見えてる状態にしておくことで、新しくノートを書いてるときにページ内に関連ノートへのリンクを埋め込みやすくなります。

## 「つながりが常に見える」というメリットを生かす

Obsidianは、こういった感じで**レイアウトの自由度が高いことと、それらをいくらでも簡単に保存しておける**、というのが特徴の一つです。

「今日のメモ」を書いてるときにはこれらのつながりはあんまり必要ないけど、過去のメモを整理してつながりを作る、という場合にはこれが結構役に立つ。

目的に応じて、いろんなレイアウトやいろんなGraphの使い方を考えてみるのは、Obsidianをもっと便利に使うのにきっと役に立つと思います。

4Share
