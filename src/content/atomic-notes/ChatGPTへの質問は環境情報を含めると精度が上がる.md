---
project: an
title: ChatGPTへの質問は環境情報を含めると精度が上がる
prefix:
topic:
  - ChatGPT活用
  - workflow
  - principle
---

# ChatGPTへの質問は環境情報を含めると精度が上がる

ChatGPTに質問する際、自分の環境情報（Mac、Windows、Linuxなど）を含めると、より正確な答えが返ってくる。正規表現の改行コードなど、OSによって異なる仕様がある場合に特に重要。

例えば、Windows向けの正規表現で改行を指定する場合「\r\n」が必要だが、Macでは不要。最初から「Macで〜したい」と質問すれば、環境に合わせた正しいコードが得られる。

条件を絞り込むほど、ChatGPTが返す答えの精度が上がる。これは確率操作の一環で、「一番ありそうな答え」をより具体的な方向へ誘導するテクニック。

## 出典・参照

- [『アトミック・シンキング』実践セミナー8動画アーカイブ](https://knowledgestuck.substack.com/p/8)
  - [00:23:46](https://knowledgestuck.substack.com/p/8?timestamp=1426) - 環境を指定する重要性
