---
project: ks
topic: ワークシートアップデート
topic_code: upd
title: MacやWindowsのObsidianデータをGitHub経由でiPhoneと同期する
subtitle: "\U0001F527006 WorkingCopy経由でiA Writerをメインエディタにする"
description: null
url: 'https://knowledgestuck.substack.com/p/macwindowsobsidiangithubiphone'
date_published: 2022-11-14T00:00:00.000Z
audience: everyone
cover_image: >-
  https://substackcdn.com/image/fetch/$s_!v9ob!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F29723e8b-52c0-4346-acc6-746f3c512ecf_1238x580.png
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



[デイリーノートに追記、デイリーノートをワンタップで開く2つのショートカット](https://knowledgestuck.substack.com/p/2)で少し書いた、gitの設定についてをまとめます。

現在ごりゅごは以下の図のようにObsidianのデータをgitで同期しています。

![[graph.png]]


なぜこう言う使い方をしているのか、は[Obsidianのデータをgitで管理する方法とそのメリット](https://knowledgestuck.substack.com/p/obsidiangit)にまとめているので、今回は具体的に「どうやって設定したらいいのか」というのをリクエストいただいたので、それをまとめてみようと思います。

## Mac→GitHubの設定

まず前提として必要なのは、Mac（or Windows）のObsidianアプリと、GitHubのアカウント。

[GitHub](https://github.com/)でアカウントを作り、ついでにMac（or Windows）で使うGitHub Desktopアプリをダウンロードします。

[GitHub Desktop | Simple collaboration from your desktop](https://desktop.github.com/)

Git関連のアプリはいろいろありますが、GitHubデスクトップを進める理由は「GitHub専用アプリなのでGitHubと連携する設定が超簡単」だから。

アプリをダウンロードして開いたら、画面左上の方の「Add」からCreate Repositoryを選択。（GitHubのログインや認証などを求められます）

![[E687A43A-9074-4574-A2AC-362F42A99E30_1_105_c.jpeg]]

Create Repositoryを選ぶと、ローカルの「どのフォルダをGitHubと連携するか」を聞かれ、その名前と説明を決めます。

「Local Path」のところから自分のObsidianフォルダを選択。
![[BA854128-7CAA-4918-A989-423E4DA16424_1_105_c.jpeg]]

また、ついでにGitHub Desktopではデータのコンフリクト（変更箇所がバッティングすること）を起こしたときにVS codeを使わせたがるので、ついでにVS codeもダウンロードしておくのがオススメ。

[Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/)

VSコードは、ディレクトリ内全部の文字を一括で置換できたり（正規表現対応）、そのままターミナルも使えて便利なことが多いので、Obsidianを使いながらでも役に立つことが多いです。後述する`.gitignore`などの隠しファイルの編集もVS codeがあると楽チンです。

## Obsidian設定ファイルを同期リストから除外

ここまで設定できたらほとんど設定は完了なんですが、Obsidianは見えないところでいろんな設定ファイルを残しています。

このデータをGitHubで同期する必要はないと考えている（意図しない変更が含まれて邪魔）ので、Obsidianの設定ファイルは「gitで同期しない」ようにします。

VS CodeでObsidianのフォルダを開いて、`.gitignore`というファイルを作成。そこの最初の1行に`.obsidian`と書いて保存すれば完成です。

![[2022-11-14_16.19.22ss.jpeg]]

## ファイルの同期

その後、基本的にやることは変更が行われたファイルを「コミット」すること。

画面左が変更されたファイルの一覧。そして、ファイルを選ぶと「前回から何が変わったのか」が確認できます。

![[2022-11-14_16.21.59ss.jpeg]]

個人が使っているObsidianのファイルであればあまり難しいことを考えず「一区切りごと」にファイルをまとめて選んでコミットすれば問題ないと思います。（一区切りごとに何をしたのか名前を付けて記録できる）

ファイルを「コミット」して「プッシュ」してあげるとデータがGitHubと同期できる。それを理解しておけばひとまずはなんとかなります。（細かいことは追々理解すればいいが、ある程度理解してないとハマる可能性はある）

ファイルを選んで、コミットボタンの上に「コメントを書いて」コミットボタンを押す。その後、プッシュして完成。（コミットのメッセージは必須。空欄ではボタンが押せない）
![[4AFED2C8-D6C0-46C1-9F9B-A61AECFF1942_1_201_a.jpeg]]

とりあえず入門としてやることはMac側ではこれだけ。

## iPhoneでGitHubのデータを同期する

iPhoneからGitHubのデータを読み書きするにはWorking Copyというアプリを使います。（無料でダウンロードできるが、プッシュをできるようにするためには課金が必要）

[「Working Copy - Git client」をApp Storeで](https://apps.apple.com/jp/app/working-copy-git-client/id896694807)

こっちは、GitHubアカウントが準備できてたらやることは簡単です。

「+」ボタンのあとで「Clone repository」を選んで（GitHubにログインして）読み込みたいレポジトリを選んだら完了。

![[741D3AC2-FC89-47E2-88F5-CA8103180FB3_1_201_a.jpeg|200]]


## Working CopyのファイルをiA Writerで開く

最後は、iA WriteでWorking Copyのファイルを直接読み書きできるようにします。

ライブラリの編集ボタンを押してから「場所を追加」のあと「Working Copy」の中にあるObsidianのディレクトリを選んであげれば完了です。
![[CB9D8DB0-EADD-472A-83D2-F5F7AC4D99EE_1_102_o.jpeg]]

たまに「Working Copyがないぞ！」ってことになりますが、その時は右上の「…」から編集を選んであげます。
![[FB29FB04-4EAF-4450-8D8F-E173FB4202C9_1_102_o.jpeg]]

これで、iA WriterからWorking Copyのファイルが直接編集できます。

## なにがよいのか

この方法、たとえば有料のObsidian Syncを使う方法と比べて明らかに手間がかかるし、gitなどという難しい仕組みを覚えなければなりません。

それでもあえてこういうめんどくさいことを選んでいる理由は、大きく2つ。

一つは、自分の場合は「モバイル環境でのObsidian」が必要なかったから。iPhoneやiPadでは「ファイルを開く」「ちょっと検索する」ことができれば十分で、その場合に機能が少ないiA Writerの方がやりたいことがすぐにできて便利でした。そしてMacのObsidianとiPhoneのiA Writerを「自分が最も快適に扱える方法」がこの方法だった、ということ。

もう一つは、あえて「手間をかけてコミットする」ことでここまで何をやったのか、記録を付けて区切りをつける、ということを意識的に行うようにするため。一区切りごとになにをしたのか記録するのは間違いなく「手間がかかること」ですが、記録というものの偉大さを認識している人であればそのくらいの手間はかけてもええやろ、と思ってくれる人も多いはず。

自分の場合、たとえばObsidianのノートを人に見せるときに「こうやって変わった」とノートが変化していった経過などを、gitのログを使うとそれなりに簡単に人に見せられたりするのは明確なメリットで、その点では「仕事で役立つ」とも言えます。

なによりも、同期という「自動でやってくれる仕組み」がなくなることで「意図しないファイルの競合」が起こりえなくなる。これが思っている以上に大きいです。

Obsidian Syncは簡単なんだけど、長期間触ってないと同期にすごい時間がかかったり、移動させたファイルが復活してしまったりするんですよねえ。

ファイルの重複に関しては近いうちに修正される可能性が高いですが、それでも変更点が多いと「同期に時間がかかる」ことはおそらく変わらないはず。一番厄介なのが「Mac側の変更が反映される前にiPhoneでデータを触ってしまったとき」

こういうときに「どうなったかわからん」「確認に手間がかかる」というのが思った以上の大きなストレスでした。

GitHubでのデータ同期なら「手元の古いやつをそのまま触ってもあとで帳尻を合わせる（コンフリクトの解決）」ことができる。どのノートを触るときも、とにかくローカルにあるファイルをすぐに編集できる。いっさい同期が終わるのを待たなくていい）

もちろんそのために1日複数回「同期」を自分で操作しているんですが、それでも「すぐ触れる」ことが保証されているほうが重要だと思うので、こういうことをやっている。

どうやら「ローカルで素早く」「自分でデータを管理できている感じ」というのが好みに合っているのかもしれません。

ちなみに最近は、1日1つブランチを作って、1日で何をやったか振り返ってプルリクするという運用をしています。そこに関してはまた機会があれば詳しく紹介します。
