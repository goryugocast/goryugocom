---
project: an
title: URLエンコードでAdvanced URIに日本語を渡す
prefix: null
topic:
- obsidian
- tool
- advanced-uri
- technical
note_type: method
---

# URLエンコードでAdvanced URIに日本語を渡す

## 概要

Advanced URIで日本語や特殊文字を含むテキストを扱う場合、URLエンコードが必要になる。JavaScriptの `encodeURIComponent()` 関数を使って、クリップボードの内容をURLエンコードしてから `data` パラメータに渡すことで、日本語のメモを正しくObsidianに送信できる。

## 技術的な仕組み

**問題**:
- URLには特殊文字や日本語をそのまま含められない
- スペース、改行、日本語などが文字化けする

**解決方法**:
```javascript
encodeURIComponent("アトミックシンキング")
// → "%E3%82%A2%E3%83%88%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B7%E3%83%B3%E3%82%AD%E3%83%B3%E3%82%B0"
```

**実装例**:
```javascript
const text = clipboard.getText();
const encoded = encodeURIComponent(text);
const uri = `obsidian://advanced-uri?data=${encoded}`;
```

## 実践のコツ

- ブックマークレットやスクリプトを作る際は必ずURLエンコードを使う
- JavaScriptだけでなく、Pythonなどでも同様の関数がある（`urllib.parse.quote()`）
- ChatGPTに聞けば、URLエンコードを含む実装例を教えてくれる

## 関連する概念

## 出典・参照

- [『アトミック・シンキング』実践セミナー9動画アーカイブ](https://knowledgestuck.substack.com/p/ks009)
  - [00:40:03](https://knowledgestuck.substack.com/p/ks009?timestamp=2403) - JavaScriptでのURLエンコード実装
