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
        description: data.description
      });
    }
  });
}

walkDir(articlesDir);

console.log('=== デジタルノートカテゴリの細分化（案A） ===\n');

// デジタルノート関連の記事を抽出
const digitalNoteArticles = articles.filter(a => {
  const title = (a.title || '').toLowerCase();
  const desc = (a.description || '').toLowerCase();
  const topics = Array.isArray(a.topic) ? a.topic.join(' ').toLowerCase() : '';
  const text = title + ' ' + desc + ' ' + topics;

  // 寄稿・コラム除外
  if (topics.match(/友人|妻の記事|振り返り|podcast/)) return false;

  return text.match(/obsidian|logseq|notion|roam|ノート|メモ|整理|アトミック|zettelkasten|moc|デイリーノート|gtd|para|ジョニーデシマル|読書メモ|執筆|書く/);
});

console.log(`デジタルノート関連: ${digitalNoteArticles.length}件\n`);

// 細分化の分類
const subdivision = {
  'Obsidian基礎': [],
  'デイリーノート・記録術': [],
  'アトミックシンキング・Zettelkasten': [],
  '整理術・タスク管理': [],
  '読書・執筆': []
};

digitalNoteArticles.forEach(a => {
  const title = (a.title || '').toLowerCase();
  const desc = (a.description || '').toLowerCase();
  const text = title + ' ' + desc;

  // Obsidian基礎（プラグイン、Canvas、Graph、Publishなど固有機能）
  if (text.match(/プラグイン|canvas|graph|publish|sync|vault|web clipper|bases|templater/) &&
      !text.match(/を使って|で.*する|活用/)) {
    subdivision['Obsidian基礎'].push(a);
  }
  // デイリーノート・記録術
  else if (text.match(/デイリーノート|daily|ウィークリー|weekly|日記|記録|ホームノート|home/)) {
    subdivision['デイリーノート・記録術'].push(a);
  }
  // アトミックシンキング・Zettelkasten
  else if (text.match(/アトミック|zettelkasten|ツェッテル|evergreen|moc|linking your thinking|lyt|エバーグリーン|原子|分子/)) {
    subdivision['アトミックシンキング・Zettelkasten'].push(a);
  }
  // 読書・執筆
  else if (text.match(/読書|本|執筆|書く|原稿|文章|マーキング/) && !text.match(/メモ帳|メモアプリ|記録/)) {
    subdivision['読書・執筆'].push(a);
  }
  // 整理術・タスク管理
  else {
    subdivision['整理術・タスク管理'].push(a);
  }
});

// 結果表示
console.log('━━━━━━━━━━━━━━━━━━━━━━');
console.log('■ デジタルノート');
console.log('━━━━━━━━━━━━━━━━━━━━━━\n');

Object.entries(subdivision).forEach(([category, arts]) => {
  console.log(`▼ ${category} (${arts.length}件)`);

  // 最初の10件を表示
  arts.slice(0, 10).forEach(a => {
    console.log(`   - ${a.title}`);
  });
  if (arts.length > 10) {
    console.log(`   ... 他${arts.length - 10}件`);
  }
  console.log('');
});

// サンプル記事で検証
console.log('\n=== サンプル記事での分類確認 ===\n');

const samples = [
  'Obsidianで最初に重視するのはデイリーノート',
  'デイリーノートに追記、デイリーノートをワンタップで開く2つのショートカット',
  'ジョニーデシマル（Johnny.Decimal）という情報整理方法について',
  'プロジェクトとエリアを混同しないPARAメソッド',
  'Obsidianに破綻しないGTDインボックスの仕組みを作る',
  'やることを一つを一つのファイルで管理する',
  'Zettelkastenの3つの重要な原則',
  'アトミックノートを組み合わせて話の構造を組み立てていく',
  'MOCというものはどうやって作ったらいいのか',
  'Obsidianでの読書メモの作り方',
  '本作りの素材集めをする',
  'Obsidian Canvasでどんなことが出来るのか',
  'ObsidianのDataviewで前後の日付のノートへのリンクを自動で作る',
];

samples.forEach(sampleTitle => {
  const article = digitalNoteArticles.find(a => a.title && a.title.includes(sampleTitle));
  if (article) {
    let category = '分類困難';
    Object.entries(subdivision).forEach(([cat, arts]) => {
      if (arts.includes(article)) {
        category = cat;
      }
    });
    console.log(`${article.title}`);
    console.log(`  → ${category}\n`);
  }
});

console.log('\n=== 最終的なフォルダ構造の提案 ===\n');

console.log('articles/');
console.log('├─ デジタルノート/');
console.log('│  ├─ Obsidian基礎/');
console.log('│  ├─ デイリーノート・記録術/');
console.log('│  ├─ アトミックシンキング・Zettelkasten/');
console.log('│  ├─ 整理術・タスク管理/');
console.log('│  └─ 読書・執筆/');
console.log('├─ ライフスタイル・学習/');
console.log('│  ├─ 学習・成長/');
console.log('│  └─ ライフスタイル/');
console.log('├─ コラム/');
console.log('│  ├─ Podcast/');
console.log('│  └─ 振り返り・雑記/');
console.log('└─ 寄稿記事/');
console.log('   ├─ haruna1221/');
console.log('   ├─ ジュン先生/');
console.log('   └─ tksさん/');
