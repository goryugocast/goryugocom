---
project: ks
topic:
  - Obsidian
  - Dataview
  - デイリーノート
  - ホーム画面
  - 読書記録
title: ObsidianのDataviewで「ホーム画面」「デイリーノート」を改善する
subtitle: "\U0001F527007 Dataviewを実際にどのように使っているかの事例"
description: 'ObsidianのDataviewプラグインを活用し、HOMEノートに「今日確認したいノート」や「今週の予定と実績」などを自動表示させ、デイリーノートには「過去の今日」のノートや読了した本のリストを自動的に表示させることで、情報整理と振り返りを効率化する方法を解説。Dataviewのクエリ例も交えながら、手間なく情報を管理する「ちょっとした便利」を実現する。'
url: 'https://knowledgestuck.substack.com/p/obsidiandataview'
date_published: 2022-11-20T00:00:00.000Z
audience: only_paid
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!F5Tp!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F40b57b0d-bb1d-4129-972f-731e36e7d123_1250x1658.jpeg
tags:
  - Obsidian
  - デイリーノート
  - Dataview
draft_link: null
series_name: その他
category: "デジタルノート/デイリーノート・記録術"
---## メモ・原稿

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

前回は、gitの設定の話をした

ショートカットの話しもした


ObsidianのDataviewを使い始めて約1ヶ月。少しずつ慣れて、なんとなく全体的に「普通」に使えるようになってきました。

[Obsidian Dataviewを使って同じタグの前後の記事へのリンクを作る](https://knowledgestuck.substack.com/p/obsidian-dataview)

Dataviewを使う時の一番の目的は↑で書いた「同じタグのついた前後の日付のノート」へのリンクを簡単に作れるようにするところですが、それ以外の用途でもいろいろと実験をしています。

どれもまだ実験段階のもので、今後の変化の可能性は大きいですが、いまどんな用途でDataviewを使っているのかまとめてみたいと思います。

## HOMEノートに基本情報を設置

まず一つは、HOMEとなるノートに「予定や実績」「確認事項」なんかを表示すること。

具体的には「今日確認しておきたいノート」「先週の実績」「今週の予定と実績」を表示しています。

![[2022-11-19_11.39.16ss.jpeg]]

見出し「確認」に表示されているのは「今日確認したい期限付きのノート」の一覧。

具体的には、Spaced Repetitionで設定される期日「sr-due」が今日以前で、ファイル名に含まれる日付が未来（今日以降）のもの。

これらのノートを一通り確認して、やるべきことをやり、書くべきことを書ければ「今日が締め切りのもの」をきちんと終わらせられるようになる見込みです。

>```dataview
> LIST
> FROM !"Daily" AND #draft 
> WHERE file.day >= date(today)
> WHERE sr-due <= date(today)
> SORT file.day ASC
> ```

 その次が今週の予定と実績。ここは、月曜日から日曜日までの、すでに読んだ本とか公開した記事、これから公開しようと思っている記事などをまとめて表示するエリア。

今週どんなことやったかな。今週これからやろうとしていることは何があるかな？というのを確認する目的。

> ```dataview
> LIST
> FROM !"Daily"
> WHERE file.day >= date(sow) 
> WHERE file.day <= date(eow) 
> SORT file.day ASC
> ```

同じく「先週の実績」というのもついでに表示。

> ```dataview
> LIST
> FROM !"Daily"
> WHERE file.day >= date(sow) - dur(7 d)
> WHERE file.day <= date(eow) - dur(7 d)
> SORT file.day ASC
> ```

Dataviewが素晴らしいのは、このページの内容はずっとそのままでも、自動的に「やること」「今週」「来週」が適切に表示できること。

「ずっと使うノート」にするには向いていませんが、こういうテンポラリな内容を手間なく表示する方法として非常に素晴らしいです。

HOMe以外にもこういう「ビュー」をいくつか目的に合わせて作ることで、かなりいろんなことを便利に一覧できるようになることが期待できます。


## 今日のノート・去年のノート

続いて試しているのが「デイリーノート」とDataviewの組み合わせ。

デイリーノートのテンプレートを一工夫してやれば「今日の日付」が入ったDataviewのクエリを簡単に設定できます。

たとえば今は、デイリーページのテンプレートに以下のような項目を表示させています。

上のものが「日付が今日」のノート。そして下は「作成日が1年前の今日」のノート。

> 公開・読了など（自動）
> ```dataview
> LIST FROM !"Daily" WHERE file.day = date({{date:YYYY-MM-DD}})
> ```
> 去年のノート
> ```dataview
> LIST WHERE file.cday = date({{date:YYYY-MM-DD}}) - dur(1 yr)
> ``` 

デイリーノートを使いまくる人なら、テンプレートの工夫次第でかなり複雑なタスク管理も実践できると思います。

(自分は使っていないのですが)タスク関連の項目もDataviewで簡単に引っ張ってこれます。

タスクと、デイリーノートとDataview。これは人によってはかなりハマる組み合わせのはず。

自分の場合、デイリーとSpaced Repetitionを組み合わせたタスク管理という方向でもう少し掘り下げられそうなので、もうしばらく色々なやり方を試してみたいと思っています。

## 読んだ本（読んだ日付で管理）

最後に「frontmatterの実験」として、読んだ本のノートに読み終えた日付を登録する、ということをやっています。

こういうのは、やり過ぎると途端に沼にハマってしまって（買った日、値段、などと登録したい情報が増える）それならNotion使ったほうがいいとなりやすいことには注意が必要です。

ただ、本をいつ読み終えたのかは元々ノートに書いてた項目でもあったので、それをfrontmatterに記録するくらいならアリかなあ、と思ってます。

frontmatter（ハイフン三つで囲まれたエリア）の`date`という項目が読み終えた日付。（ついでに、urlのところにアマゾンリンクをいれてみる実験もしている。そうすると、下のテーブルのように簡単にリンクが作れる）
![[2022-11-19_15.51.20ss.jpeg]]

日付とURLが入っていると、たとえばこんな感じで読んだ本を並べられます。（上はただのリストで、下はテーブル）

![[2022-11-19_15.53.37ss.jpeg]]

Bookフォルダの中で、日付が以下の範囲内のリスト
> ```dataview
> LIST
> FROM "notes/Book"
> WHERE date >= date(2022-11-01)
> WHERE date <= date(2022-11-30)
> SORT file.day ASC
> ```

テーブルにして、以下の日付の範囲で書籍名と読了日を並べる
> ```dataview
> TABLE WITHOUT ID file.link AS 書籍名 ,date AS 読了日, url AS Amazon
> FROM "notes/Book"
> WHERE date >= date(2022-11-01)
> WHERE date <= date(2022-11-30)
> SORT file.day ASC
> ```

frontmatterに読んだ日付を書く、というのは、自分の場合「**日付の入力さえすれ読んだ本リストの更新を忘れても問題ない**、という理由が大きいです。

本を読み終えたら、翌日に「本を読んだ処理」をいろいろやるんですが、読んだ本リストを更新するのをしょっちゅう忘れます。

ただ、なんだかんだ「読んだ本リスト」は作っておくと便利なので、作っておいて損はない。でも、一度忘れてしまうとリストの更新に手間がかかる。

そうならないようにするためにDataviewを使っている、という感じ。

なので、やりたいこととしては[Obsidian Dataviewを使って同じタグの前後の記事へのリンクを作る](https://knowledgestuck.substack.com/p/obsidian-dataview)というのと同じなのかもしれません。

ちょっと面倒くさいけど、やっておいたほうが便利になることを「手間がかからないようにする」くらいの微妙な、ちょっとした「便利」

頼りすぎると簡単に手段が目的化してしまうので、そうならない程度の「ちょっと」が重要。

そういう意味で、やはりDataviewの力を一番発揮できるのは「デイリーページ」のテンプレートにうまく便利になるクエリをいれておくことなのではないかな、と思います。

多分これは、色々便利な面白いことができると思うので、アイデアや活用例などあれば教えてください。

こういうのやりたいけどできる？っていうのもコメント欄で聞いていただければ、できる限りお答えします（コメント欄に書いておいていただければ、ごりゅごがわからなくても、他の人が教えてくれるかもしれません）
