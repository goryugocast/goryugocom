const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = 'src/content/articles';
const articles = [];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(content);

      articles.push({
        file,
        title: data.title,
        folder: path.dirname(fullPath).replace(articlesDir + '/', ''),
        topic: data.topic || [],
        description: data.description,
        seriesName: data.series_name
      });
    }
  });
}

walkDir(articlesDir);

// 方法論系の記事を検索
const methodologyKeywords = [
  'ジョニーデシマル',
  'johnny.decimal',
  'johnny decimal',
  'para',
  'evergreen',
  'zettelkasten',
  'ツェッテルカステン',
  'linking your thinking',
  'lyt',
  'moc',
  'gtd',
  'spaced repetition',
  'anki'
];

console.log('=== 情報整理の方法論・フレームワーク関連記事 ===\n');

methodologyKeywords.forEach(keyword => {
  const matches = articles.filter(a => {
    const title = (a.title || '').toLowerCase();
    const desc = (a.description || '').toLowerCase();
    const topics = Array.isArray(a.topic) ? a.topic.join(' ').toLowerCase() : '';
    const text = title + ' ' + desc + ' ' + topics;
    return text.includes(keyword.toLowerCase());
  });

  if (matches.length > 0) {
    console.log(`■ ${keyword} (${matches.length}件):`);
    matches.forEach(m => {
      console.log(`  - ${m.title}`);
      console.log(`    フォルダ: ${m.folder}`);
      console.log(`    シリーズ: ${m.seriesName || 'なし'}`);
      if (m.description) {
        console.log(`    説明: ${m.description.substring(0, 80)}...`);
      }
      console.log('');
    });
  }
});

// 曖昧な記事（複数カテゴリにまたがりそうなもの）を探す
console.log('\n=== 分類が難しそうな記事の例 ===\n');

const ambiguousPatterns = [
  { name: '整理術全般', pattern: /整理|分類|管理|ファイル|フォルダ/ },
  { name: 'ノート術全般', pattern: /ノート術|メモ|記録/ },
  { name: '仕事術', pattern: /仕事|作業|効率|生産性/ },
  { name: '習慣・ライフハック', pattern: /習慣|継続|ライフ|生活/ },
  { name: '学習・思考', pattern: /学|思考|理解|考え/ }
];

const ambiguousArticles = articles.filter(a => {
  const title = (a.title || '').toLowerCase();
  let matchCount = 0;
  ambiguousPatterns.forEach(p => {
    if (p.pattern.test(title)) matchCount++;
  });
  return matchCount >= 2; // 2つ以上のパターンにマッチ
});

console.log(`複数カテゴリに該当しそうな記事: ${ambiguousArticles.length}件\n`);

ambiguousArticles.slice(0, 15).forEach(a => {
  console.log(`- ${a.title}`);
  console.log(`  現在: ${a.folder}`);

  const matches = [];
  const title = (a.title || '').toLowerCase();
  ambiguousPatterns.forEach(p => {
    if (p.pattern.test(title)) matches.push(p.name);
  });
  console.log(`  該当: ${matches.join(', ')}`);
  console.log('');
});

// どのカテゴリにも明確に入らない記事
console.log('\n=== カテゴリ分けのヒント ===\n');

const uncategorizable = articles.filter(a => {
  const title = (a.title || '').toLowerCase();
  const topics = Array.isArray(a.topic) ? a.topic.join(' ').toLowerCase() : '';
  const text = title + ' ' + topics;

  // Obsidian、アトミック、読書執筆、習慣学習、振り返り、寄稿のいずれにも該当しない
  const isObsidian = text.match(/obsidian|logseq|roam|notion/);
  const isAtomic = text.match(/アトミック|zettelkasten|evergreen|moc/);
  const isReading = text.match(/読書|本|執筆|書く|原稿/);
  const isHabit = text.match(/習慣|学|成長|継続/);
  const isReview = text.match(/振り返り|podcast/);
  const isGuest = text.match(/友人|妻の記事|寄稿/);

  return !isObsidian && !isAtomic && !isReading && !isHabit && !isReview && !isGuest;
});

console.log(`どのカテゴリにも明確に該当しない記事: ${uncategorizable.length}件`);
console.log('（これらは「コラム」「その他」などの受け皿が必要）\n');

uncategorizable.slice(0, 10).forEach(a => {
  console.log(`- ${a.title}`);
});
