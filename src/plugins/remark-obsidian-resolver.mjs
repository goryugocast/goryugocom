import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';
import matter from 'gray-matter';
import { visit } from 'unist-util-visit';

const LOG_PREFIX = '[remark-obsidian-resolver]';

export function astroSlugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
}

export function stripPrefix(name) {
  return name.replace(/^(\d{6}_[^\w\s]?|\d{4}-\d{2}-\d{2}[-_]?)/, '').trim();
}

/**
 * ハイブリッド・インデックスの作成
 */
export function buildFileIndex(options) {
  const index = new Map();

  const addToIndex = (key, entry) => {
    if (!key) return;
    const normalizedKey = key.toLowerCase().trim();
    const current = index.get(normalizedKey) || [];
    if (!current.some(e => e.absPath === entry.absPath)) {
      current.push(entry);
      index.set(normalizedKey, current);
    }
    // 記号互換
    const compatKeys = [
      normalizedKey.replace(/（/g, '(').replace(/）/g, ')'),
      normalizedKey.replace(/\(/g, '（').replace(/\)/g, '）'),
      normalizedKey.replace(/ /g, '_'),
      normalizedKey.replace(/ /g, '-'),
      normalizedKey.replace(/_/g, ' '),
      normalizedKey.replace(/-/g, ' ')
    ];
    compatKeys.forEach(k => {
      const c = index.get(k) || [];
      if (!c.some(e => e.absPath === entry.absPath)) {
        c.push(entry);
        index.set(k, c);
      }
    });
  };

  // 1. Archives (外部ソース)
  if (options.sourceBasePath && options.collections) {
    for (const collection of options.collections) {
      const collectionPath = path.resolve(options.sourceBasePath, collection);
      if (!fs.existsSync(collectionPath)) continue;

      const files = globSync('**/*.md', { cwd: collectionPath, absolute: true });
      for (const absPath of files) {
        const basename = path.basename(absPath, '.md');
        let data = {};
        try {
          data = matter(fs.readFileSync(absPath, 'utf8')).data;
        } catch (e) {
          continue;
        }

        const entry = {
          collection,
          absPath,
          url: typeof data.url === 'string' ? data.url.trim() : null,
          title: typeof data.title === 'string' ? data.title.trim() : null,
          exists: true
        };

        addToIndex(basename, entry);
        addToIndex(stripPrefix(basename), entry);
        addToIndex(astroSlugify(basename), entry);
        if (entry.title) {
          addToIndex(entry.title, entry);
          addToIndex(astroSlugify(entry.title), entry);
        }
        if (Array.isArray(data.aliases)) data.aliases.forEach(a => addToIndex(a.trim(), entry));
      }
    }
  }

  // 2. 内部トピック
  if (options.internalTopicsPath && fs.existsSync(options.internalTopicsPath)) {
    const internalFiles = globSync('**/*.md', { cwd: options.internalTopicsPath, absolute: true });
    for (const absPath of internalFiles) {
      const basename = path.basename(absPath, '.md');
      let data = {};
      try {
        data = matter(fs.readFileSync(absPath, 'utf8')).data;
      } catch (e) {
        continue;
      }

      const entry = {
        collection: 'internal-topics',
        absPath,
        url: null,
        title: typeof data.title === 'string' ? data.title.trim() : null,
        exists: true
      };

      addToIndex(basename, entry);
      addToIndex(astroSlugify(basename), entry);
      if (entry.title) {
        addToIndex(entry.title, entry);
        addToIndex(astroSlugify(entry.title), entry);
      }
    }
  }

  return index;
}

export default function remarkObsidianResolver(userOptions = {}) {
  const fileIndex = userOptions.fileIndex || buildFileIndex(userOptions);

  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'wikiLink' || node.type === 'obsidianWikiLink') {
        const targetName = node.value?.trim() || '';
        if (!targetName) return;

        // 検索キー候補をさらに網羅的に
        const searchKeys = Array.from(new Set([
          targetName.toLowerCase(),
          astroSlugify(targetName),
          targetName.replace(/ /g, '_').toLowerCase(),
          targetName.replace(/ /g, '-').toLowerCase(),
          targetName.replace(/（/g, '(').replace(/）/g, ')').toLowerCase(),
          targetName.replace(/\(/g, '（').replace(/\)/g, '）').toLowerCase()
        ]));

        let selected = null;
        for (const key of searchKeys) {
          const candidates = fileIndex.get(key);
          if (candidates) {
            selected = candidates.find(c => c.url) ||
              candidates.find(c => c.collection === 'internal-topics') ||
              candidates[0];
            if (selected) break;
          }
        }

        if (selected) {
          const userAlias = node.data?.alias;
          const displayTitle = selected.title || userAlias || targetName;
          const finalUrl = selected.url || `/topics/${astroSlugify(targetName)}`;

          // 重要：ノードを完全に「原子的なリンク(link)」に破壊的再構築
          // 全ての古いプロパティ(node.data等)をリセットして干渉を防ぐ
          Object.keys(node).forEach(k => delete node[k]);

          Object.assign(node, {
            type: 'link',
            url: finalUrl,
            children: [{ type: 'text', value: displayTitle }],
            data: {
              hProperties: {
                href: finalUrl,
                className: selected.url ? 'external-link' : 'internal-link'
              }
            }
          });
        } else {
          // 未解決リンク
          const alias = node.data?.alias || targetName;
          Object.keys(node).forEach(k => delete node[k]);
          Object.assign(node, {
            type: 'text',
            value: `[[${alias}]]`
          });
        }
      }
    });
  };
}
