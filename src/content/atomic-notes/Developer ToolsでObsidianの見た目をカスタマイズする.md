---
project: an
title: Developer ToolsでObsidianの見た目をカスタマイズする
prefix: null
topic:
- tool
note_type: method
---

ObsidianはChromiumベースのアプリケーションなので、ブラウザと同じようにDeveloper Toolsを使って見た目をカスタマイズできる。

## Developer Toolsの開き方

コマンドパレット（Cmd+P）から「Toggle developer tools」を検索して実行する。

## 要素の検証方法

1. Developer Toolsの左上にある矢印アイコンをクリック
2. カスタマイズしたい部分（見出し、サイドバーなど）をクリック
3. 右側のパネルにその要素のCSSが表示される

## CSSクラスの特定

例：H1見出しの場合、`.HyperMD-header-1` というクラス名が見つかる。このクラス名に対してCSSを記述することで、見た目を変更できる。

## CSSスニペットへの反映

1. Settings → Appearance → CSS snippets でフォルダを開く
2. `.css`ファイルを作成し、Developer Toolsで確認したCSSを記述
3. Obsidianの設定でそのスニペットをONにする

例：H1のフォントサイズを30pxにする
```css
.HyperMD-header-1 {
  font-size: 30px;
}
```

この方法で、テーマの一部分だけを自分好みに微調整できる。

---

## 関連する概念

## 出典

- [『アトミック・シンキング』実践セミナー3動画アーカイブ](https://knowledgestuck.substack.com/p/seminar003)
  - [00:20:04](https://knowledgestuck.substack.com/p/seminar003?timestamp=1204) - Developer Toolsの使い方
  - [00:20:26](https://knowledgestuck.substack.com/p/seminar003?timestamp=1226) - CSS要素の特定方法
