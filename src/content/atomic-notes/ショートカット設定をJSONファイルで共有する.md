---
project: an
title: ショートカット設定をJSONファイルで共有する
prefix: null
topic:
- tool
note_type: method
---

Obsidianのキーボードショートカット設定は、`.obsidian/hotkeys.json`というファイルに保存されている。このファイルをコピーすれば、別の環境でも同じショートカット設定を再現できる。

## ファイルの場所

Vault内の`.obsidian`フォルダ（隠しフォルダ）の中に`hotkeys.json`がある。

VS Codeなどのエディタで開くと、設定内容を確認・編集できる。

## 活用方法

### バックアップ

設定を失う前に`hotkeys.json`をコピーしておく。

### 他の人の設定を参考にする

誰かのショートカット設定を見たいときは、JSONファイルを共有してもらえば、どのコマンドにどのキーが割り当てられているか一目瞭然。

### 複数デバイスでの同期

メインPCの設定を、サブPCやタブレットにコピーして統一できる。

## 直接編集の注意点

JSONファイルを手動編集する場合、フォーマットを間違えると設定が壊れる可能性がある。編集前にバックアップを取ることが重要。

---

## 関連する概念

## 出典

- [『アトミック・シンキング』実践セミナー3動画アーカイブ](https://knowledgestuck.substack.com/p/seminar003)
  - [00:47:26](https://knowledgestuck.substack.com/p/seminar003?timestamp=2846) - JSONファイルで設定を共有
  - [00:48:29](https://knowledgestuck.substack.com/p/seminar003?timestamp=2909) - .obsidianフォルダ内のhotkeys.json
