---
project: an
title: Override config folderによる設定分離
topic:
- Obsidian
- デバイス管理
note_type: insight
---

PCとモバイルでObsidianの挙動を変えたい場合、`Override config folder`設定を使うことで、デバイスごとに異なる設定フォルダを指定できる。例えば、iPhoneでは`.iPhone`、iPadでは`.iPad`、Macでは`.Mac`といった名前を設定することで、それぞれ独立した設定を維持できる。

Obsidianの設定は通常`.obsidian`という隠しフォルダに保存されるが、複数デバイスでiCloudなどを使って同期している場合、この設定フォルダも同期されてしまう。その結果、iPhoneで無効にしたプラグインがMacでも無効になってしまうといった問題が発生する。

Override config folderを使うことで、各デバイスに最適化された設定（プラグインの有無、画面レイアウト、ショートカットキーなど）を独立して管理でき、デバイス間での設定の衝突を防げる。

## 出典・参照

- [Spaced Repetitionプラグインで実現する「常時レビュー」について](https://knowledgestuck.substack.com/p/spaced-repetition)
  - [00:31:22](https://knowledgestuck.substack.com/p/spaced-repetition?timestamp=1882) - Override config folderの説明
  - [00:32:47](https://knowledgestuck.substack.com/p/spaced-repetition?timestamp=1967) - デバイスごとの設定分離の重要性
