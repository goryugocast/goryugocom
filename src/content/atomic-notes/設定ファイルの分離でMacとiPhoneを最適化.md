---
project: an
title: 設定ファイルの分離でMacとiPhoneを最適化
topic:
- Obsidian
- モバイル
- 設定
note_type: method
---

# 設定ファイルの分離でMacとiPhoneを最適化

## 概要

MacとiPhoneでは必要なプラグインや設定が異なるため、Obsidianの設定ファイルを分離することで、それぞれのデバイスに最適な環境を維持できる。`設定 > Files & Links > Override config folder`に`.iPhone`を設定することで、iCloudで同期しつつも、デバイスごとに異なるプラグインや画面レイアウトを保持できるようになる。

## 重要なポイント

**設定の分離が必要な理由**:
- MacとiPhoneでは画面サイズや操作方法が大きく異なる
- 必要なプラグインがデバイスによって異なる
- iCloudで同期すると設定が混在してカオスになる

**設定方法**:
- `設定 > Files & Links > Override config folder`を開く
- `.iPhone`という名前を入力して設定
- これでMacは`.obsidian`、iPhoneは`.iPhone`という別の設定フォルダを使用

**隠しフォルダの確認**:
- 先頭にドット(.)がついたファイルは隠しファイル
- VS Codeを使うと隠しフォルダを簡単に確認できる
- Macでは直接見るのが面倒

## 実践のコツ

- 最初にこの設定をしておけば、あとは各デバイスで自由に設定可能
- `.iPhone`という名前は決め打ちでOK
- PC版とスマホ版で全く異なる使い方ができるようになる

## 出典・参照

- [Obsidianを「スマホで上手く使う」ための設定のコツ](https://knowledgestuck.substack.com/p/obv10)
  - [00:00:54](https://knowledgestuck.substack.com/p/obv10?timestamp=54) - MacとiPhoneで設定ファイルを分離する方法
  - [00:02:12](https://knowledgestuck.substack.com/p/obv10?timestamp=132) - 隠しフォルダの仕組みと設定ファイルの保存場所
