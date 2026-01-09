---
project: an
title: Advanced URIでワークスペースをリンクから切り替える
prefix: null
topic:
- obsidian
- plugin
- workspace
- workflow
note_type: method
---

# Advanced URIでワークスペースをリンクから切り替える

## 概要

Advanced URIプラグインを使うと、ワークスペースの切り替えをリンク形式で実行できる。デイリーノートに各種ワークスペースへのリンクを配置することで、マウスクリックやキーボード操作だけで、作業モードを瞬時に切り替えられる。

## 具体的な活用方法

- `obsidian://advanced-uri?vault=Vault名&workspace=ワークスペース名`の形式でリンクを作成
- Vault名は複数のVaultを使っていない場合は省略可能
- デイリーノートテンプレートに各種ワークスペースへのリンクを配置する
- 「ノート整理モード」「ホーム画面」「執筆モード」など、用途別にワークスペースを用意
- リンクをクリックするだけで、サイドバーの配置やペイン構成が一発で切り替わる

## 実践のコツ

- ワークスペースの保存リンクも作成しておくと、デイリーノートの日付更新が楽になる
- 保存リンク:`obsidian://advanced-uri?vault=Vault名&saveworkspace=true`
- 毎日、ピン止めしたデイリーノートの日付を変更した後、保存リンクをクリックすると次回から新しい日付で起動する
- ショートカットキーよりもリンククリックの方が直感的で操作ミスが少ない
- 作業の流れの中に組み込むことで、モード切替と作業開始がスムーズになる

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー7動画アーカイブ](https://knowledgestuck.substack.com/p/ks007)
  - [00:31:57](https://knowledgestuck.substack.com/p/ks007?timestamp=1917) - Advanced URIプラグインの紹介
  - [00:33:48](https://knowledgestuck.substack.com/p/ks007?timestamp=2028) - ワークスペース切り替えリンクの作成方法
  - [00:35:01](https://knowledgestuck.substack.com/p/ks007?timestamp=2101) - ワークスペース保存リンクの活用
  - [00:36:04](https://knowledgestuck.substack.com/p/ks007?timestamp=2164) - リンクによるモード切替の利点
