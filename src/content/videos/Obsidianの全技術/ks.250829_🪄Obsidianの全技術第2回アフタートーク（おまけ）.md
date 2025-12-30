---
project: ks
topic: Obsidianの全技術
topic_code: obv
title: Obsidianの全技術第2回アフタートーク（おまけ）
subtitle: "\U0001FA84個人サイト作りのヒント"
description: null
url: 'https://knowledgestuck.substack.com/p/obsidian2'
date_published: 2025-08-29T00:00:00.000Z
audience: only_paid
cover_image: >-
  https://substack-video.s3.amazonaws.com/video_upload/post/171246383/7356bf9a-f24b-4c5b-b427-b353ed3ef368/transcoded-00001.png
tags:
  - Obsidian
draft_link: null
series_name: Obsidianの全技術
series_emoji: "\U0001FA84"
series_code: obv
---

## メモ・原稿

```base
filters:
  and:
    - project == "goryugocast"
views:
  - type: table
    name: Table
    filters:
      and:
        - topic_order <= this.topic_order
        - status != true
    order:
      - date_published
      - file.name
    sort:
      - property: topic_order
        direction: DESC
    limit: 5
    columnSize:
      note.date_published: 155
      note.topic_order: 54

```

```base
filters:
  and:
    - project == "goryugocast"
views:
  - type: table
    name: Table
    filters:
      and:
        - topic_order > this.topic_order
    order:
      - date_published
      - topic_order
      - file.name
    sort:
      - property: topic_order
        direction: DESC
    limit: 5
    columnSize:
      note.topic_order: 55

```

次回GeminiCLI
これをもう一回喋って、案内と、セミナー本編に使いたい。


趣味と実益がかねられる最強の方法。「よい音にすることを楽しむ」ことを目指してみる。

ご意見ご感想は、ハッシュタグ #[ごりゅごcast](https://twitter.com/search?q=%23%E3%81%94%E3%82%8A%E3%82%85%E3%81%94cast)にお送りください。
