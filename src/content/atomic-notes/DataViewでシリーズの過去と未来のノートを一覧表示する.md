---
title: DataViewでシリーズの過去と未来のノートを一覧表示する
source: 250821_実例を見ながらデイリーノートの基本を学ぶ
source_url: https://knowledgestuck.substack.com/p/b10
timestamp: 00:23:38
---

# DataViewでシリーズの過去と未来のノートを一覧表示する

## 概要
Obsidianの DataView プラグインを使って、フロントマターの「series」キーを活用し、同じシリーズに属する過去5個と未来5個のノートを自動的に一覧表示するシステム。繰り返しタスクの文脈把握が格段に効率化される。

## DataViewとは

### 機能概要
- 条件に基づいてノートを自動抽出・表示する機能
- SQLのようなクエリ言語で柔軟に指定可能
- ノート自体は変更せず、表示方法をカスタマイズ

### 必要な準備
- DataView プラグインをインストール
- フロントマターに「series」キーを設定

## 実装方法

### 1. フロントマターにseriesを設定

```yaml
---
title: 250826 セミナーアーカイブ配信
series: seminar-archive
order: 15
---
```

### 2. DataViewクエリを書く

```
TABLE order, title FROM #review OR "series:seminar-archive"
WHERE series = "seminar-archive"
SORT order DESC
LIMIT 10
```

このクエリで：
- 同じシリーズの過去5個と未来5個を表示
- 実行順序が一目瞭然
- 前後の文脈を簡単に確認

## メリット

### 文脈の保全
- 同じシリーズのノートを一覧表示
- 「前回はどうだったか」「次回の予定は」が一画面で分かる
- バックリンクを開く手間がない

### 改善の追跡
- シリーズの歴史を辿ることで、プロセスの改善が見える
- 「3回目で気づいた工夫」「5回目での失敗」などが把握できる

### 実行順序の明確化
- order フィールドで順序付けされているため、次のステップが明白
- スキップしたり、逆順になることを防ぐ

## 実例：セミナー配信シリーズ

### ノートの構成
```
250819 セミナーアーカイブ配信（series: seminar-archive, order: 13）
250826 セミナーアーカイブ配信（series: seminar-archive, order: 14）
250902 セミナーアーカイブ配信（series: seminar-archive, order: 15）
250909 セミナーアーカイブ配信（series: seminar-archive, order: 16）
250916 セミナーアーカイブ配信（series: seminar-archive, order: 17）
```

### DataViewでの表示
| order | title | 内容 |
|-------|-------|------|
| 13 | 250819 セミナーアーカイブ配信 | 前々回 |
| 14 | 250826 セミナーアーカイブ配信 | 前回 |
| **15** | **250902 セミナーアーカイブ配信** | **今回** |
| 16 | 250909 セミナーアーカイブ配信 | 次回 |
| 17 | 250916 セミナーアーカイブ配信 | 次々回 |

### メリット
- ノートを開くと、同じシリーズの全体像が見える
- 前回のやり方を参考にする際、ワンクリック
- 次回のタスク予定も確認できる

## DataViewクエリの書き方

### 基本形
```
TABLE order, title
FROM "series:seminar-archive"
SORT order DESC
```

### より詳細な指定
```
TABLE order, title, created
FROM #review OR "series:seminar-archive"
WHERE series = "seminar-archive"
SORT order DESC
LIMIT 15
```

### 複数シリーズの追跡
```
TABLE series, order, title
WHERE series != null
SORT series, order DESC
```

## 応用例

### 複数のシリーズを管理
- セミナー配信シリーズ
- 月次記事シリーズ
- ポッドキャスト制作シリーズ
- 各シリーズごとに異なる series キーを設定

### 進捗状況の可視化
- done フィールドを追加
- 完了状況を一覧で確認
- 遅れているシリーズを特定

## 注意点

### DataViewはPublishで表示されない
- Obsidian Publish（公開時）には DataView は表示されない
- 人に見せるページは手動で整理する必要がある
- ただし個人使用時は、この制限は気にならない

### クエリの複雑化の回避
- 最初はシンプルなクエリから始める
- 必要に応じて機能を追加
- ChatGPT などで「DataViewクエリの書き方」を聞くと参考になる

### 定期的なメンテナンス
- series や order が正しく設定されているか定期確認
- 古いシリーズの order を大きい値で指定（新規の order と競合しない）

## 関連概念
- [[テンプレート機能ではなくDuplicate機能を使う理由]]
- [[ファイル名に日付を入れて自動的に締め切り順に並べる]]
- [[繰り返しタスクで前回の改善点を引き継ぐ]]
