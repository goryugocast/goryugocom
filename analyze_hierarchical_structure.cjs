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

console.log('=== 階層構造での分類シミュレーション ===\n');

// 分類ルール
function classifyArticle(article) {
  const title = (article.title || '').toLowerCase();
  const desc = (article.description || '').toLowerCase();
  const topics = Array.isArray(article.topic) ? article.topic.join(' ').toLowerCase() : '';
  const text = title + ' ' + desc + ' ' + topics;

  // 第1階層：最上位タブ
  let topLevel = '';
  let category = '';

  // 寄稿記事
  if (topics.match(/友人|妻の記事/) || article.folder.includes('寄稿')) {
    topLevel = '寄稿記事';
    category = article.folder.split('/').pop() || '寄稿記事';
    return { topLevel, category };
  }

  // コラム
  if (topics.match(/振り返り|podcast/) || text.match(/振り返り/)) {
    topLevel = 'コラム';
    if (topics.includes('Podcast')) {
      category = 'Podcast';
    } else {
      category = '振り返り・雑記';
    }
    return { topLevel, category };
  }

  // デジタルノート関連かどうか判定
  const isDigitalNote = text.match(/obsidian|logseq|notion|roam|ノート|メモ|整理|アトミック|zettelkasten|moc|デイリーノート|gtd|para|ジョニーデシマル|読書メモ|執筆|書く/);

  if (isDigitalNote) {
    topLevel = 'デジタルノート';

    // Obsidian基礎（ツール固有の機能）
    if (text.match(/プラグイン|canvas|graph|publish|sync|vault|設定|dataview|templater/) && !text.match(/使って|活用|実践|方法|術/)) {
      category = 'Obsidian基礎';
    }
    // 読書・執筆
    else if (text.match(/読書|本|執筆|書く|原稿|文章/) && !text.match(/メモ帳|メモアプリ/)) {
      category = '読書・執筆';
    }
    // 思考術・整理術
    else {
      category = '思考術・整理術';
    }
  } else {
    // デジタルノート関連ではない
    topLevel = 'ライフスタイル・学習';

    if (text.match(/anki|学|習得|成長|大人の学び/)) {
      category = '学習・成長';
    } else if (text.match(/習慣|継続|生活|健康|運動/)) {
      category = 'ライフスタイル';
    } else {
      category = 'その他';
    }
  }

  return { topLevel, category };
}

// 全記事を分類
const classification = {
  'デジタルノート': {
    'Obsidian基礎': [],
    '思考術・整理術': [],
    '読書・執筆': []
  },
  'ライフスタイル・学習': {
    '学習・成長': [],
    'ライフスタイル': [],
    'その他': []
  },
  'コラム': {
    'Podcast': [],
    '振り返り・雑記': []
  },
  '寄稿記事': {}
};

articles.forEach(article => {
  const { topLevel, category } = classifyArticle(article);

  if (!classification[topLevel]) {
    classification[topLevel] = {};
  }
  if (!classification[topLevel][category]) {
    classification[topLevel][category] = [];
  }
  classification[topLevel][category].push(article);
});

// 結果表示
Object.entries(classification).forEach(([topLevel, categories]) => {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`■ ${topLevel}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━`);

  Object.entries(categories)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([category, arts]) => {
      console.log(`\n  ▼ ${category} (${arts.length}件)`);

      // サンプル表示
      arts.slice(0, 5).forEach(a => {
        console.log(`     - ${a.title}`);
      });
      if (arts.length > 5) {
        console.log(`     ... 他${arts.length - 5}件`);
      }
    });
});

console.log('\n\n=== 具体的な記事での検証 ===\n');

const testCases = [
  'ジョニーデシマル（Johnny.Decimal）という情報整理方法について',
  'Obsidianでジョニーデシマル（Johnny.Decimal）を試してみるときのコツ',
  'Obsidian Canvasでどんなことが出来るのか',
  'ObsidianのDataviewで前後の日付のノートへのリンクを自動で作る',
  'Obsidian_to_AnkiでObsidianのノートから簡単にAnki問題を作る',
  '10分かける価値があることは全て「Anki」する',
  'Zettelkastenの3つの重要な原則',
  'Obsidianでの読書メモの作り方',
  'プロジェクトとエリアを混同しないPARAメソッド',
  'アトミックノートを組み合わせて話の構造を組み立てていく',
  '習慣化が得意なのは性格ではなくスキルとして獲得できるのではないか？',
];

testCases.forEach(testTitle => {
  const article = articles.find(a => a.title && a.title.includes(testTitle));
  if (article) {
    const { topLevel, category } = classifyArticle(article);
    console.log(`${article.title}`);
    console.log(`  → ${topLevel} > ${category}`);
    console.log('');
  }
});

console.log('\n=== サイト構造の提案 ===\n');
console.log('【最上位タブ（メインナビゲーション）】');
console.log('');
console.log('1. デジタルノート（約250件）');
console.log('   ├─ Obsidian基礎');
console.log('   ├─ 思考術・整理術');
console.log('   └─ 読書・執筆');
console.log('');
console.log('2. ライフスタイル・学習（約50件）');
console.log('   ├─ 学習・成長');
console.log('   └─ ライフスタイル');
console.log('');
console.log('3. コラム（約60件）');
console.log('   ├─ Podcast');
console.log('   └─ 振り返り・雑記');
console.log('');
console.log('4. 寄稿記事（約50件）');
console.log('   ├─ haruna1221');
console.log('   ├─ ジュン先生');
console.log('   └─ tksさん');
