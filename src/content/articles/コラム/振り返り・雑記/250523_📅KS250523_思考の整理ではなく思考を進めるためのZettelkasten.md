---
project: ks
topic: 振り返り
title: 思考の整理ではなく思考を進めるためのZettelkasten
subtitle: "\U0001F4C5ルールが上手く動かないCursorと掘り下げてみたら超楽しいZettelkastenの記録"
description: Cursorでの事務処理的な整理の現状と、新たに始めたルーマン式Zettelkastenの実践記録。デジタルテンプレートを用いた思考を進めるためのカード作成の難しさと面白さ、そして「PKMではなく思考を研ぎ澄ますもの」という洞察について。
url: 'https://knowledgestuck.substack.com/p/zettelkasten-514'
date_published: 2025-05-23T00:00:00.000Z
audience: only_paid
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!msJZ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd4844cfa-6e7d-41f9-9730-6b2e2942976e_1332x1466.png
tags:
  - Cursor
draft_link: null
series_name: その他
category: 振り返り
---## メモ・原稿

```dataview
LIST
FROM #ks/📅
WHERE file.day <= this.file.day - dur(1 d) & series = "monthly_review"
SORT file.day DESC
LIMIT 5
SORT file.day ASC
```
```dataview
LIST
WHERE file.day >= this.file.day + dur(1 d) & series = "monthly_review"
SORT file.day ASC
LIMIT 5
```


[前回のセミナー](https://knowledgestuck.substack.com/p/ks033)に続いて、Cursorのルールをどうやったらうまく機能させられるのか、いろいろと実験を重ねています。

今のところ、どうも「Cursor的に正しいルールファイルの使い方」だと上手く機能してくれません。「この場所にあるファイルなら自動適用」という設定にしているはずなのに、思ったように動いてくれないんです。

結局、未だセミナーの時と同じように、マークダウンで書いたファイルを渡して、直接「このルールで整理して」という形で進めています。

前回のセミナーでは「次回はめっちゃ使い方が変わっているかもしれない」と言っていましたが、現状ではあまり変化が見られていません。

とはいえ、Cursorでの「事務処理用のルール」は少しずつ充実してきています。思考の整理というよりは、Obsidianでやっている「仕事ファイルの整理」という観点では、いろんなことがかなり便利になってきました。

同時に、整理に関してはファイルごとにやり方が違っていたりして、そろそろこれを「ファイルごとに条件分岐する」という実験をしていってもいいのかな、と考えているところです。

---

で、それとは別に最近面白くなっているのが「Zettelkasten」です。

きっかけは、以下の記事でした。

[Obsidianで「並び」に配置する - by 倉下忠憲@rashita2](https://tadanori.substack.com/p/obsidian-f9e)

この記事に影響を受けて、ルーマンが実際にZettelkastenについてどんなことを言っていたのかを調べてみたりしました。
https://chatgpt.com/share/683022a9-1acc-800a-b435-9195d8388840

ルーマンがZettelkastenに付けていた「数字」についても考えてみたり、いろいろと試行錯誤を重ねています。
https://chatgpt.com/share/6830231e-5494-800a-9bd3-f45bd86b164c

そして、決定的に面白かったのが下記ページの「ルーマン的Zettelkastenのデジタルテンプレート雛形」でした。

[ChatGPTとZettelkastenについての対話 - 倉下忠憲の発想工房](https://scrapbox.io/rashitamemo/ChatGPT%E3%81%A8Zettelkasten%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AE%E5%AF%BE%E8%A9%B1)

試しに2〜3個、このひな形を使って考えを進めていく、というのをやってみたら、これがめっちゃ面白い。

自分が今までやろうとしていたこととはかなり方向性が違っていて、ルーマン的な意味で「正しい」かどうかはまだわからないけど、今までとは全然違った形でカードを作っている感覚を味わえています。


ルーマンのカードの先頭についていた「62b3f4c」のような接頭辞も、文字列としても意味があるし、さらにこれはDataview的にも非常に都合がいい。

ついにようやく「デジタルのZettelkasten」が分かってきたというか、「上手く使えそうな感じ」が見えてきたように思います。

現段階ではまだ「こういう感じ」というのをきちんとまとめられる段階ではないんですが、少なくとも今までできてたなかったことができるようになりつつある感じがして、めっっっっっちゃ楽しいです。

とりあえずこういう感じで10個くらいノートを作れたら改めて手法を整理しようと思っているところなんですが、1日1個ノートを作るだけでもめっっっっっっっっちゃ大変です。

どう考えたって「メモ」なんて言い方が通用するようなライトなものではなくて、めちゃくちゃいっぱい考えないと、1枚のカードは作れないです。

そして、今の今、超やる気がある状態なら1日3枚くらいカードを作れそうだけど、長く続けようと思ったら、週に2〜3枚のカードが作れたら十分、くらいにしておかないと大変そう。

とりあえずわかったのは、ルーマンのZettelkastenは「PKM」ではないな、ということかな。どちらかというと、Obsidianが掲げている「Sharpen your thinking.」を実践するためにカードを使う、という言い方が、ルーマンのZettelkastenのイメージに近そうな感じがします。

---

実は最初、[Obsidianで「並び」に配置する](https://tadanori.substack.com/p/obsidian-f9e)の記事を読んだ段階でササッと記事を書こうと思っていたんですが、これはちゃんと自分でやってみてから記事を書かないと「わからない」と思い直しました。

そして実際に自分でやってみたら「わかってないことがわかった」という流れでした。

という感じで、もう少し「わかった」ところで再びこの手法についてはまとめたいと思います。

おまけ的な感じで、うまくいかなかったZettelkastenだけ貼っておきます。

改めて修正し直して、今92.1a、まで作ったところ。（これ以降は失敗作なので順次削除＆入れ替えが行われる予定です）

![[スクリーンショット 2025-05-23 16.56.26.png]]
