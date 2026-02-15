import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';
import matter from 'gray-matter';
import { visit } from 'unist-util-visit';

const DEFAULT_SOURCE_BASE_PATH = '/Users/goryugo/GitHub/Astro/content-source';
const DEFAULT_EXTERNAL_COLLECTIONS = ['ks', 'bc', 'iw', 'topics'];
const DEFAULT_COLLECTION_PRIORITY = ['ks', 'bc', 'iw', 'topics'];
const DEFAULT_ON_MISSING = 'text';
const DEFAULT_STRICT_URL = true;
const LOG_PREFIX = '[remark-obsidian-resolver]';

function normalizeOptions(userOptions = {}) {
  return {
    sourceBasePath: userOptions.sourceBasePath || DEFAULT_SOURCE_BASE_PATH,
    externalCollections: Array.isArray(userOptions.externalCollections)
      ? userOptions.externalCollections
      : DEFAULT_EXTERNAL_COLLECTIONS,
    collectionPriority: Array.isArray(userOptions.collectionPriority)
      ? userOptions.collectionPriority
      : DEFAULT_COLLECTION_PRIORITY,
    onMissing: userOptions.onMissing || DEFAULT_ON_MISSING,
    strictUrl: userOptions.strictUrl ?? DEFAULT_STRICT_URL,
  };
}

function replaceNode(node, nextNode) {
  Object.keys(node).forEach((key) => delete node[key]);
  Object.assign(node, nextNode);
}

function makeTextNode(value) {
  return { type: 'text', value };
}

function makeLinkNode(url, text) {
  return {
    type: 'link',
    url,
    children: [{ type: 'text', value: text }],
  };
}

function buildExternalFileIndex(options) {
  const index = new Map();

  for (const collection of options.externalCollections) {
    const collectionPath = path.resolve(options.sourceBasePath, collection);
    if (!fs.existsSync(collectionPath)) {
      continue;
    }

    const files = globSync('**/*.md', {
      cwd: collectionPath,
      absolute: true,
      nodir: true,
    }).sort();

    for (const absPath of files) {
      const basename = path.basename(absPath, path.extname(absPath));
      const raw = fs.readFileSync(absPath, 'utf8');
      const { data } = matter(raw);
      let url = typeof data.url === 'string' ? data.url.trim() : '';
      if (!url && collection === 'topics') {
        const slug = data.slug || basename;
        url = `/topics/${slug}`;
      }

      const current = index.get(basename) || [];
      current.push({ collection, absPath, url });
      index.set(basename, current);
    }
  }

  return index;
}

function pickByPriority(candidates, collectionPriority) {
  const rank = new Map(collectionPriority.map((name, i) => [name, i]));
  return [...candidates].sort((a, b) => {
    const aRank = rank.has(a.collection) ? rank.get(a.collection) : Number.MAX_SAFE_INTEGER;
    const bRank = rank.has(b.collection) ? rank.get(b.collection) : Number.MAX_SAFE_INTEGER;
    if (aRank !== bRank) return aRank - bRank;
    return a.absPath.localeCompare(b.absPath);
  })[0];
}

function formatRawWikiLink(targetName, alias) {
  if (!alias || alias === targetName) return `[[${targetName}]]`;
  return `[[${targetName}|${alias}]]`;
}

export default function remarkObsidianResolver(userOptions = {}) {
  const options = normalizeOptions(userOptions);
  const fileIndex = buildExternalFileIndex(options);

  return (tree, file) => {
    const sourceFile = file?.path || 'unknown source';

    visit(tree, 'wikiLink', (node) => {
      const targetName = typeof node.value === 'string' ? node.value.trim() : '';
      if (!targetName) {
        replaceNode(node, makeTextNode(''));
        return;
      }

      const alias = typeof node.data?.alias === 'string' && node.data.alias.length > 0
        ? node.data.alias
        : targetName;

      const candidates = fileIndex.get(targetName) || [];

      if (candidates.length === 0) {
        console.warn(`${LOG_PREFIX} Unresolved wiki link [[${targetName}]] in ${sourceFile}`);
        const text = options.onMissing === 'raw'
          ? formatRawWikiLink(targetName, alias)
          : alias;
        replaceNode(node, makeTextNode(text));
        return;
      }

      if (candidates.length > 1) {
        const listed = candidates
          .map((entry) => `${entry.collection}:${entry.absPath}`)
          .join(', ');
        console.warn(
          `${LOG_PREFIX} Multiple external targets for [[${targetName}]] in ${sourceFile}. ` +
          `Using priority ${options.collectionPriority.join(' > ')}. Candidates: ${listed}`
        );
      }

      const selected = pickByPriority(candidates, options.collectionPriority);

      if (!selected.url) {
        const message =
          `${LOG_PREFIX} Missing frontmatter url for [[${targetName}]] ` +
          `at ${selected.absPath} (collection: ${selected.collection})`;
        if (options.strictUrl) {
          throw new Error(message);
        }
        console.warn(message);
        const text = options.onMissing === 'raw'
          ? formatRawWikiLink(targetName, alias)
          : alias;
        replaceNode(node, makeTextNode(text));
        return;
      }

      replaceNode(node, makeLinkNode(selected.url, alias));
    });
  };
}
