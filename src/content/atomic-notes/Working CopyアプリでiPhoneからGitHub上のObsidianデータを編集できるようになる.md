---
project: an
title: Working CopyアプリでiPhoneからGitHub上のObsidianデータを編集できるようになる
prefix: ''
topic:
- iPhone
- GitHub
- データ同期
- モバイルワークフロー
source_article: ks.221114_🔧KS006_MacやWindowsのObsidianデータをGitHub経由でiPhoneと同期する
note_type: method
---

# iPhoneとGitHubの連携設定

## 概要
iPhoneからGitHub上のObsidianデータにアクセスし、編集するためにはWorking Copyアプリが不可欠である。Working Copyを介してGitHubリポジトリをiPhoneにクローンすることで、iA Writerなどの外部エディタから直接ファイルを読み書きし、モバイル環境でのObsidianデータの編集を可能にする。

## 重要なポイント
- **Working Copyの導入**: App Storeから「Working Copy - Git client」アプリをダウンロードする。無料版でもリポジトリのクローンは可能だが、GitHubへの変更をプッシュするには課金が必要となる。
- **リポジトリのクローン**: Working Copyアプリ内で「+」ボタンから「Clone repository」を選択し、GitHubにログインしてObsidianのデータが保存されているリポジトリをiPhoneにクローンする。
- **外部エディタとの連携**: Working CopyはiPhoneの「ファイル」アプリを通じて「外部ディスク」のように振る舞うため、iA Writerなど外部ファイルを開けるMarkdownエディタであれば、クローンしたリポジトリ内のファイルを直接編集できる。
- **iA Writerでの編集**: iA WriterのライブラリにWorking Copy内のObsidianディレクトリを追加することで、iA WriterからスムーズにObsidianのMarkdownファイルを編集することが可能になる。

## 実践のヒント / 関連する概念
- Working Copyが「ファイル」アプリの「場所」に表示されない場合は、設定から有効にする必要がある。
- iPhoneでの編集を終えたら、Working Copyアプリから忘れずにGitHubへ変更をプッシュすることで、PC側のデータと同期を保つ。

## 出典・参照
- [MacやWindowsのObsidianデータをGitHub経由でiPhoneと同期する](https://knowledgestuck.substack.com/p/macwindowsobsidiangithubiphone)
