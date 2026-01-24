import { visit } from 'unist-util-visit';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// コンテンツディレクトリのパス
// import.meta.urlはESモジュールのURLなので、fileURLToPathで変換
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CONTENT_DIR = join(__dirname, 'src', 'content');

// コレクションのインデックスをビルド
function buildCollectionIndex() {
  const index = {
    topics: new Map(),      // title/filename -> { slug, type: 'topic' }
    articles: new Map(),    // title -> { url, type: 'article' }
    notes: new Map(),       // title -> { slug, type: 'note' }
  };

  // Topic (用語集)
  const topicDir = path.join(CONTENT_DIR, 'topic');
  if (fs.existsSync(topicDir)) {
    const files = fs.readdirSync(topicDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const filePath = path.join(topicDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);
      const slug = file.replace('.md', '');
      const title = data.title || slug;

      index.topics.set(title, { slug, type: 'topic' });
      index.topics.set(slug, { slug, type: 'topic' });
      if (data.topic_id) {
        index.topics.set(data.topic_id, { slug, type: 'topic' });
      }
      // aliasesも登録
      if (data.aliases && Array.isArray(data.aliases)) {
        for (const alias of data.aliases) {
          index.topics.set(alias, { slug, type: 'topic' });
        }
      }
    }
  }

  // Articles (記事)
  const articlesDir = path.join(CONTENT_DIR, 'articles');
  if (fs.existsSync(articlesDir)) {
    function scanArticles(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanArticles(fullPath);
        } else if (entry.name.endsWith('.md')) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const { data } = matter(content);
          if (data.title && data.url) {
            index.articles.set(data.title, { url: data.url, type: 'article' });
          }
        }
      }
    }
    scanArticles(articlesDir);
  }

  // Atomic Notes (ノート)
  const notesDir = path.join(CONTENT_DIR, 'atomic-notes');
  if (fs.existsSync(notesDir)) {
    const files = fs.readdirSync(notesDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const filePath = path.join(notesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);
      const slug = file.replace('.md', '');
      const title = data.title || slug;

      index.notes.set(title, { slug, type: 'note', data });
      index.notes.set(slug, { slug, type: 'note', data });
    }
  }

  return index;
}

// リンク先を解決
function resolveLink(linkText, index) {
  const text = linkText.trim();

  // 1. Topic (用語集) をチェック
  if (index.topics.has(text)) {
    const topic = index.topics.get(text);
    return {
      type: 'topic',
      url: `/glossary/${encodeURIComponent(topic.slug)}`,
      className: 'link-glossary',
    };
  }

  // 2. Article (記事) をチェック
  if (index.articles.has(text)) {
    const article = index.articles.get(text);
    return {
      type: 'article',
      url: article.url,
      className: 'link-external',
      external: true,
    };
  }

  // 3. Note (アトミックノート) をチェック
  if (index.notes.has(text)) {
    const note = index.notes.get(text);
    return {
      type: 'note',
      slug: note.slug,
      className: 'link-note',
      data: note.data,
    };
  }

  // 4. 見つからない場合はデフォルト（ノートとして扱う）
  return {
    type: 'unknown',
    url: `#note/${encodeURIComponent(text)}`,
    className: 'wiki-link',
  };
}

/**
 * Remark plugin to convert Obsidian-style wiki links [[Page Name]]
 * to appropriate links based on content type
 */
export function remarkWikiLink() {
  // インデックスをビルド（プラグイン初期化時に一度だけ）
  let index = null;

  return (tree) => {
    // 遅延初期化
    if (!index) {
      index = buildCollectionIndex();
    }

    visit(tree, 'text', (node, nodeIndex, parent) => {
      const text = node.value;
      const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;

      if (!wikiLinkRegex.test(text)) {
        return;
      }

      // Reset regex
      wikiLinkRegex.lastIndex = 0;

      const newNodes = [];
      let lastIndex = 0;
      let match;

      while ((match = wikiLinkRegex.exec(text)) !== null) {
        const [fullMatch, linkText] = match;
        const startIndex = match.index;

        // Add text before the link
        if (startIndex > lastIndex) {
          newNodes.push({
            type: 'text',
            value: text.slice(lastIndex, startIndex)
          });
        }

        // リンク先を解決
        const resolved = resolveLink(linkText, index);

        if (resolved.type === 'note') {
          // ノートの場合: 埋め込み用のカスタムHTML要素として出力
          newNodes.push({
            type: 'html',
            value: `<atomic-note-embed data-slug="${resolved.slug}" data-title="${linkText}"></atomic-note-embed>`
          });
        } else {
          // それ以外: リンクとして出力
          const linkNode = {
            type: 'link',
            url: resolved.url,
            data: {
              hProperties: {
                className: [resolved.className],
                'data-link-type': resolved.type,
              }
            },
            children: [
              {
                type: 'text',
                value: linkText
              }
            ]
          };

          // 外部リンクの場合はtarget="_blank"を追加
          if (resolved.external) {
            linkNode.data.hProperties.target = '_blank';
            linkNode.data.hProperties.rel = 'noopener noreferrer';
          }

          newNodes.push(linkNode);
        }

        lastIndex = startIndex + fullMatch.length;
      }

      // Add remaining text
      if (lastIndex < text.length) {
        newNodes.push({
          type: 'text',
          value: text.slice(lastIndex)
        });
      }

      // Replace the text node with new nodes
      if (newNodes.length > 0) {
        parent.children.splice(nodeIndex, 1, ...newNodes);
      }
    });
  };
}
