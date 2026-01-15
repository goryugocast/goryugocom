---
project: an
title: GitHub DesktopでObsidianのフォルダをリポジトリ化すると簡単にバージョン管理できる
prefix: ''
topic:
- GitHub
- Obsidian
- 設定
- データ同期
source_article: ks.221114_🔧KS006_MacやWindowsのObsidianデータをGitHub経由でiPhoneと同期する
note_type: method
---

# Mac/WindowsとGitHubの連携設定

## 概要
MacやWindows環境でObsidianのデータをGitHubで管理するための初期設定手順。GitHubアカウントの作成からGitHub Desktopの導入、そしてObsidianのフォルダをリポジトリとして設定し、不要な設定ファイルを同期対象外にする`.gitignore`の活用までを解説する。

## 重要なポイント
- **GitHubアカウントとGitHub Desktop**: GitHubアカウントを作成し、GitHub Desktopアプリをインストールする。GitHub DesktopはGitHub専用アプリであるため、設定が簡単で連携しやすい。
- **リポジトリの作成**: GitHub Desktopの「Create Repository」機能を使って、ObsidianのフォルダをGitHubと連携するローカルリポジトリとして設定する。
- **Obsidian設定ファイルの除外**: Obsidianの隠しフォルダ`.obsidian`には、ユーザー固有の設定ファイルが含まれるため、これをGitで同期する必要はない。VS Codeなどで`.gitignore`ファイルを作成し、`.obsidian`と記述することで同期対象から除外する。
- **コミットとプッシュ**: 変更が行われたファイルを「コミット」し、GitHubに変更履歴を記録する。その後「プッシュ」することで、ローカルの変更がGitHub上のリポジトリに同期される。

## 実践のヒント / 関連する概念
- VS Codeは`.gitignore`ファイルの編集だけでなく、ディレクトリ内の一括置換やターミナル利用など、Obsidianと併用することで多くの場面で作業効率を向上させる。
- コミットメッセージは「何をしたのか」を簡潔に記録する重要な要素であり、後に作業を振り返る際の助けとなる。

## 出典・参照
- [MacやWindowsのObsidianデータをGitHub経由でiPhoneと同期する](https://knowledgestuck.substack.com/p/macwindowsobsidiangithubiphone)
