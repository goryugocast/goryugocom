# Book Data Spec

## Purpose

読書ログで使う書籍データは、人が編集する Obsidian ノートとは分けて管理する。

- Obsidian 側には元の読書ログと本文だけを残す
- `goryugo-com` 側には公開用の派生データを残す
- ここでいう派生データは、書籍メタデータ、補正済み書影、将来のアフィリエイト表示に使うリンク情報を指す

この方針は、計画書 [goryugo-final-instructions.md](/Users/goryugo/GitHub/goryugo-com/docs/specs/goryugo-final-instructions.md) の「Part 5: データ設計」を、この repo 向けに具体化したもの。

## Storage

保存場所は次で固定する。

- Canonical derived data: `/Users/goryugo/GitHub/goryugo-com/data/books/books.json`
- Cover image cache: `/Users/goryugo/GitHub/goryugo-com/public/images/books/`
- Sync script: `/Users/goryugo/GitHub/goryugo-com/scripts/books/sync_books_from_read_logs.py`

Obsidian 側には、repo の都合で増える画像キャッシュや正規化 JSON は置かない。

## Source Of Truth

元データの起点は Obsidian Publish 配下の読書ログノート。

- Source root: `/Users/goryugo/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian_local/Astro/Publish/`
- 対象ノート: `*読んだ本.md`
- ただし一覧ノート `📋読んだ本.md` は除外する
- 現時点の抽出対象: HTML の `book-affiliate-card` を含む読書ログ

読書ログの本文は人間が編集する一次ソース。
`books.json` と `public/images/books/` は、公開のために repo 側へ同期した二次データ。

## JSON Schema

`data/books/books.json` は次の形にする。

```json
{
  "generated_at": "2026-03-09T09:00:00+00:00",
  "source_root": "/absolute/path/to/Pub_hide",
  "image_root": "/images/books/",
  "books": [
    {
      "asin": "404110498X",
      "title": "Another エピソード S",
      "amazon_url": "https://www.amazon.co.jp/exec/obidos/ASIN/404110498X/room510-22/",
      "kindle_url": "https://www.amazon.co.jp/exec/obidos/ASIN/404110498X/room510-22/",
      "image_url": "https://m.media-amazon.com/images/I/81gzN8421uL._SL1500_.jpg",
      "local_image": "/images/books/404110498X.jpg",
      "authors": [],
      "publisher": "",
      "published_date": "",
      "source_logs": [
        {
          "permalink": "read_2025_10",
          "month_note": "2025年10月に読んだ本"
        }
      ]
    }
  ]
}
```

## Sync Rules

1. 読書ログから `book-affiliate-card` を抽出する
2. Amazon URL から ASIN を取る
3. ASIN をキーに重複をまとめる
4. 書影は `public/images/books/<ASIN>.<ext>` に保存する
5. 画像 URL が壊れている場合は、読書ログ側または API で正規 URL を補正してから同期する

補正済みの書影を repo にキャッシュする理由は次のとおり。

- Obsidian 側を画像キャッシュで汚さないため
- 特殊な Amazon URL が再び壊れても公開側は安定させるため
- 同じ本を複数記事で再利用するときに再取得を避けるため

## Operation

同期はこのコマンドで行う。

```bash
python3 scripts/books/sync_books_from_read_logs.py
```

画像ダウンロードを飛ばす確認用実行は次。

```bash
python3 scripts/books/sync_books_from_read_logs.py --skip-download
```

## Current Scope

2026年1月、2026年2月、および安全にカード化できた 2025 年の月次読書ログから抽出した書籍データを保存対象とする。

定型から外れる月やエントリは、先に読書ログ側を整えてから再同期する。
