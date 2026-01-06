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
        fullPath,
        currentPath: fullPath.replace(articlesDir + '/', ''),
        title: data.title,
        topic: data.topic || [],
        description: data.description,
        date: data.date_published
      });
    }
  });
}

walkDir(articlesDir);

console.log('=== フォルダ再編成計画（ドライラン） ===\n');
console.log(`全記事数: ${articles.length}件\n`);

// 分類関数
function classifyArticle(article) {
  const title = (article.title || '').toLowerCase();
  const desc = (article.description || '').toLowerCase();
  const topics = Array.isArray(article.topic) ? article.topic : [article.topic];
  const topicsStr = topics.join(' ').toLowerCase();
  const text = title + ' ' + desc + ' ' + topicsStr;

  // 寄稿記事（フォルダパスで判定）
  const currentFolder = article.currentPath;

  if (currentFolder.includes('寄稿記事/ジュン先生') || topicsStr.includes('友人(jun)の記事')) {
    return '寄稿記事/ジュン先生';
  }
  if (currentFolder.includes('寄稿記事/tksさん') || topicsStr.includes('友人(tks)の記事')) {
    return '寄稿記事/tksさん';
  }
  if (currentFolder.includes('寄稿記事/haruna1221') || topicsStr.includes('友人(haruna)の記事')) {
    // harunaさんの記事をシリーズ別に分類
    if (title.includes('書くことで考える') || title.includes('書いて考える')) {
      return '寄稿記事/書くことで考える';
    } else if (title.includes('生成ai') || title.includes('問いの精度')) {
      return '寄稿記事/生成AIと考える技術';
    } else {
      return '寄稿記事/Obsidian活用術';
    }
  }

  // コラム
  if (topicsStr.includes('podcast')) {
    return 'コラム/Podcast';
  }
  if (topicsStr.includes('振り返り')) {
    return 'コラム/振り返り・雑記';
  }

  // デジタルノート関連かどうか判定
  const isDigitalNote = text.match(/obsidian|logseq|notion|roam|ノート|メモ|整理|アトミック|zettelkasten|moc|デイリーノート|gtd|para|ジョニーデシマル|読書メモ|執筆|書く/);

  if (isDigitalNote) {
    // Obsidian基礎
    if (text.match(/プラグイン|canvas|graph|publish|sync|vault|web clipper|bases|templater/) &&
        !text.match(/を使って|で.*する|活用/)) {
      return 'デジタルノート/Obsidian基礎';
    }
    // デイリーノート・記録術
    else if (text.match(/デイリーノート|daily|ウィークリー|weekly|日記|記録|ホームノート|home/)) {
      return 'デジタルノート/デイリーノート・記録術';
    }
    // アトミックシンキング・Zettelkasten
    else if (text.match(/アトミック|zettelkasten|ツェッテル|evergreen|moc|linking your thinking|lyt|エバーグリーン|原子|分子/)) {
      return 'デジタルノート/アトミックシンキング・Zettelkasten';
    }
    // 読書・執筆
    else if (text.match(/読書|本|執筆|書く|原稿|文章|マーキング/) && !text.match(/メモ帳|メモアプリ|記録/)) {
      return 'デジタルノート/読書・執筆';
    }
    // 整理術・タスク管理
    else {
      return 'デジタルノート/整理術・タスク管理';
    }
  } else {
    // デジタルノート関連ではない
    if (text.match(/anki|学|習得|成長|大人の学び/)) {
      return 'ライフスタイル・学習/学習・成長';
    } else if (text.match(/習慣|継続|生活|健康|運動/)) {
      return 'ライフスタイル・学習/ライフスタイル';
    } else {
      return 'コラム/振り返り・雑記';
    }
  }
}

// すべての記事を分類
const moveMap = {};
const stats = {};

articles.forEach(article => {
  const newFolder = classifyArticle(article);
  const newPath = `${newFolder}/${article.file}`;

  if (!moveMap[newFolder]) {
    moveMap[newFolder] = [];
  }
  moveMap[newFolder].push({
    current: article.currentPath,
    new: newPath,
    title: article.title
  });

  stats[newFolder] = (stats[newFolder] || 0) + 1;
});

// 統計情報
console.log('━━━━━━━━━━━━━━━━━━━━━━');
console.log('■ 移動後のフォルダ別記事数');
console.log('━━━━━━━━━━━━━━━━━━━━━━\n');

const sortedStats = Object.entries(stats).sort((a, b) => {
  const orderMap = {
    'デジタルノート': 1,
    'ライフスタイル・学習': 2,
    'コラム': 3,
    '寄稿記事': 4
  };
  const topA = a[0].split('/')[0];
  const topB = b[0].split('/')[0];
  if (orderMap[topA] !== orderMap[topB]) {
    return orderMap[topA] - orderMap[topB];
  }
  return a[0].localeCompare(b[0]);
});

let currentTopLevel = '';
sortedStats.forEach(([folder, count]) => {
  const topLevel = folder.split('/')[0];
  if (topLevel !== currentTopLevel) {
    if (currentTopLevel) console.log('');
    console.log(`【${topLevel}】`);
    currentTopLevel = topLevel;
  }
  console.log(`  ${folder}: ${count}件`);
});

// 移動計画の詳細（最初の3件ずつ表示）
console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━');
console.log('■ 移動計画の詳細（各フォルダ最初の3件）');
console.log('━━━━━━━━━━━━━━━━━━━━━━\n');

sortedStats.forEach(([folder, count]) => {
  console.log(`\n▼ ${folder} (${count}件)`);
  const moves = moveMap[folder].slice(0, 3);
  moves.forEach(move => {
    console.log(`  ${move.title}`);
    console.log(`    現在: ${move.current}`);
    console.log(`    移動先: ${move.new}`);
  });
  if (count > 3) {
    console.log(`  ... 他${count - 3}件`);
  }
});

// 移動が必要なファイルと不要なファイルの集計
let needMove = 0;
let noMove = 0;

articles.forEach(article => {
  const newFolder = classifyArticle(article);
  const newPath = `${newFolder}/${article.file}`;
  const currentFolder = path.dirname(article.currentPath);

  if (currentFolder === newFolder) {
    noMove++;
  } else {
    needMove++;
  }
});

console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━');
console.log('■ サマリー');
console.log('━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`全記事数: ${articles.length}件`);
console.log(`移動が必要: ${needMove}件`);
console.log(`移動不要（すでに正しい位置）: ${noMove}件`);

console.log('\n次のステップ:');
console.log('1. この計画を確認してください');
console.log('2. 問題なければ、実際の移動スクリプトを実行します');
console.log('3. 移動後、サイトのUIを新構造に対応させます');
