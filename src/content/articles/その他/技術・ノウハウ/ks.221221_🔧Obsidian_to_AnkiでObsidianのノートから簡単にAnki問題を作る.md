---
project: ks
topic: ワークシートアップデート
topic_code: upd
title: Obsidian_to_AnkiでObsidianのノートから簡単にAnki問題を作る
subtitle: "\U0001F527011 ハイライトした部分を穴埋め問題にする方法"
description: null
url: 'https://knowledgestuck.substack.com/p/obsidian_to_ankiobsidiananki'
date_published: 2022-12-21T00:00:00.000Z
audience: everyone
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!snAA!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe949a07-b97e-4022-a688-201cf11eeb7e_1658x1536.jpeg
tags:
  - Obsidian
draft_link: null
series_name: その他
series_emoji: "\U0001F527"
series_code: other
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


全公開の記事にする


---



前回のセミナーで話したプラグイン「Obsidian to Anki」の設定方法などを簡単にまとめます。

このプラグインに関する詳しいことは、パダワンさんが書かれている以下の記事が最強です。

[Obsidian_to_Ankiの使い方 : ZettelkastenとSRSを組み合わせる](https://zenn.dev/estra/articles/integration-obsidian-and-anki)

Obsidian to Ankiで何ができるのかをきちんと知りたい場合はこの記事を読んだ方がいいのは間違いありません。

ただ、これを全部きっちりしっかり学ぼうとすると、けっこう大変で難しい。

なのでここではあえていろんな要素を省略して「Obsidianのノート内でハイライトするとその部分が穴埋め問題になる」ということだけを目指して、必要最低限の設定方法のみをご紹介します。

## なにができるようになるか

この記事で紹介する設定を行うと、Obsidianのノートを元にしてAnkiに穴埋め問題を作ることができるようになります。

例：`SRSは==Spaced== Repetition Systemの略`→SRSは……Repetition Systemの略

やることは、上記のように、Obsidianのノートに文章を書いて、穴埋め問題を作りたい部分を`==（イコール2つ）`で囲む。

1つの文章に複数のハイライトを作ると、ハイライトの数だけ問題が作られます。
例：`SRSは==Spaced== ==Repetition== ==System==の略`（3つの問題が作られる）

やること全体を大きくまとめると、手順は3ステップ。

「Ankiアプリ」と「Obsidian」それぞれにプラグインを導入して設定。その後「AnkiとObsidianのフィールドを一致させる」ことで設定は完了です。

一度設定をしてしまえば、以降は「同期ボタン」を押すだけで全体が更新されます（定期的に自動実行させることもできる）

## Ankiアプリの設定

Ankiアプリには[AnkiConnect - AnkiWeb](https://ankiweb.net/shared/info/2055492159)というプラグインをインストールします。

メニューから「ツール ＞ アドオン」を選択し、そこにプラグイン番号`2055492159`を入力。
（数字は、それぞれのプラグイン説明ページごとに割り振られたランダムなもの→[AnkiConnect - AnkiWeb](https://ankiweb.net/shared/info/2055492159)）
![[2022-12-20_16.30.23ss.jpeg]]



その後、プラグインの「設定」欄に以下のコードを入力。

```
"webCorsOriginList": [ "http://localhost", "app://obsidian.md" ]
```
![[2022-12-20_16.33.16ss.jpeg]]

これでAnki側での設定は完了。



## Obsidianの設定

次は、Obsidian側にプラグインをインストール。プラグインのインストール画面で`Obsidian_to_Anki`を検索してインストールします。

[Pseudonium/Obsidian_to_Anki: Script to add flashcards from text/markdown files to Anki](https://github.com/Pseudonium/Obsidian_to_Anki)

プラグインの設定画面「Note type table」 をクリックして開き「Cloze」の箇所に`((?:.+\n)*(?:.*==.*)(?:\n(?:^.{1,3}$|^.{4}(?<!<!--).*))*)`を貼り付け。（Note type tableが標準テーマだと？クリックできるように見えないので注意）
![[3E99E1EB-C93A-49F8-853A-127950DB8B48_1_201_a.jpeg]]


また、設定の Curly ClozeとCurly Cloze –HilightS to Clozesの2つをオンにしておきます。
![[C28A4E96-3FC0-4EB6-9CF6-E63B9D55DB9A_1_102_a.jpeg]]


ここに関する公式ドキュメントは以下参照。
[Cloze Paragraph style · Pseudonium/Obsidian_to_Anki Wiki](https://github.com/Pseudonium/Obsidian_to_Anki/wiki/Cloze-Paragraph-style)


これで、それぞれのプラグインの設定は完了です。

## AnkiとObsidianのフィールドを一致させる

あとは、AnkiとObsidianのフィールドを一致させたら設定は完了。

これは要するに、Obsidianで作ったノートを「Ankiのどのデッキに登録するのか」「どのフィールドにノートの中身を設定するのか」というのを決めるところ。

わかる人は自分で好きなように設定すれば全く問題ありません。

よくわからない人は、以下のように決め打ちしてしまいましょう。

### Anki側の設定

デッキを作成、から`Obsidian_to_Anki`という名前のデッキを作る。
![[A2040EDE-93A4-4C89-A006-8E8C99B15E2C_1_201_a.jpeg]]


ツール ＞ ノートタイプを管理
![[3B19E4C3-282E-4860-9ADB-CF4DDA5C60E2_1_201_a.jpeg]]

追加
![[10C68EDA-FB8A-4B9C-B4F1-D2B9D1E76FA9.png]]

「追加：基本」を選択し、名前を「Cloze」に。
![[FD34EABD-68AF-453D-AC42-246711F55B1D.png]]

次は「フィールド」
![[10C68EDA-FB8A-4B9C-B4F1-D2B9D1E76FA9.png]]

「フィールド」を以下画像と揃える。
![[696869C7-A03B-4B1D-A6CB-C098C1D85A56.png]]

そして次は「カード」
![[10C68EDA-FB8A-4B9C-B4F1-D2B9D1E76FA9.png]]

カードの「表面のテンプレート」「裏面のテンプレート」を以下のように設定。
```
<div class="CardArea">
<div class="context">{{Context}}</div>
<div class="text">{{cloze:Text}}</div>
<div class="link">{{Link}}</div>
</div>
```

見た目用に「書式」に以下を設定
```
.card {
  font-family: helvetica, Osaka;
  font-size: 20px;
  color: black;
  background-color: #fff; 
}

.cloze {
 font-weight: bold;
 color: blue;
}
.class{
	font:size: small;
	text-align:left;
}

.text{
margin:20px 0;
  font-family: helvetica, Osaka;
  font-size: 20px;
}


.CardArea {
	padding:10px;
  background: #f7f7f7;
  color: #444;/*文字色*/
  font-weight: bold;
	font-size:12px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
}

.link{
}
```

### Obsidian側の設定

最後に、Obsidian側で「どの項目をAnkiのどのフィールドにいれるのか」を設定したり、標準で保存するデッキなどを決める。（本当は一気にObsidianの設定をすませた方が効率がいいが、なにをしているのか理解するならば今回の手順の方が良いと判断した）

![[3E99E1EB-C93A-49F8-853A-127950DB8B48_1_105_c.jpeg]]

標準で登録するデッキ名を`Obsidian_to_Anki`に設定
![[96E13C94-0158-4E89-BFA0-0967121A5A96_1_201_a.jpeg]]

これだけできたら「Scan Vaultコマンド」もしくはAnkiアイコンのクリックで同期して、Anki側に問題が作成できるはず。

具体的にどんな問題を作るといいのか。どうやってObsidianでノートを作っているか、については以下の記事をご覧ください。

[『アトミック・シンキング』実践セミナー4動画アーカイブ](https://knowledgestuck.substack.com/p/4-465)



---

次回は、Obsidianの新機能「Canvas」についてまとめたいと思います。
