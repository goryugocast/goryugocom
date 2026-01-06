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
        seriesName: data.series_name,
        category: data.category
      });
    }
  });
}

walkDir(articlesDir);

console.log('=== アトミックシンキング関連記事の詳細 ===\n');

// アトミックシンキング関連を抽出
const atomicArticles = articles.filter(a => {
  const topics = Array.isArray(a.topic) ? a.topic : [a.topic];
  const titleLower = (a.title || '').toLowerCase();
  const folder = a.folder.toLowerCase();
  return topics.some(t => t && t.toLowerCase().includes('アトミック')) ||
         titleLower.includes('アトミック') ||
         folder.includes('アトミック');
});

console.log(`全体: ${atomicArticles.length}件\n`);

atomicArticles.forEach(a => {
  console.log(`- ${a.title}`);
  console.log(`  フォルダ: ${a.folder}`);
  if (a.description) {
    console.log(`  説明: ${a.description.substring(0, 60)}...`);
  }
  console.log('');
});

console.log('\n=== 別の切り口での分類検討 ===\n');

// 切り口1: ツール vs 思考法 vs 実践
const byPurpose = {
  'ツールの使い方': [],
  '思考法・方法論': [],
  '実践・ライフハック': [],
  'コラム・振り返り': [],
  '寄稿記事': []
};

articles.forEach(a => {
  const topics = Array.isArray(a.topic) ? a.topic : [a.topic];
  const topicsStr = topics.join(',');
  const titleLower = (a.title || '').toLowerCase();

  if (topicsStr.includes('友人') || topicsStr.includes('妻の記事')) {
    byPurpose['寄稿記事'].push(a);
  } else if (topicsStr.includes('振り返り') || topicsStr.includes('Podcast')) {
    byPurpose['コラム・振り返り'].push(a);
  } else if (titleLower.match(/obsidian|logseq|anki|git|プラグイン|dataview|publish|canvas/)) {
    byPurpose['ツールの使い方'].push(a);
  } else if (titleLower.match(/アトミック|zettelkasten|ノート術|整理|pkm|思考|学び|読書|執筆/)) {
    byPurpose['思考法・方法論'].push(a);
  } else {
    byPurpose['実践・ライフハック'].push(a);
  }
});

console.log('■ 切り口1: コンテンツの性質別\n');
Object.entries(byPurpose)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([category, arts]) => {
    console.log(`${category}: ${arts.length}件`);
  });

// 切り口2: 「何をしたい人向けか」
console.log('\n■ 切り口2: 読者の目的別（タイトルから推測）\n');

const byReaderGoal = {
  'Obsidianを使いこなしたい': 0,
  '思考・学びを深めたい': 0,
  '読書・執筆を改善したい': 0,
  '習慣・生活を改善したい': 0,
  'タスク・仕事を効率化したい': 0,
  '他の人の事例を知りたい': 0
};

articles.forEach(a => {
  const topics = Array.isArray(a.topic) ? a.topic : [a.topic];
  const topicsStr = topics.join(',').toLowerCase();
  const titleLower = (a.title || '').toLowerCase();
  const text = titleLower + ' ' + topicsStr;

  if (text.match(/obsidian|プラグイン|vault|graph|dataview/)) {
    byReaderGoal['Obsidianを使いこなしたい']++;
  }
  if (text.match(/思考|学び|理解|知識|アトミック|zettelkasten|整理/)) {
    byReaderGoal['思考・学びを深めたい']++;
  }
  if (text.match(/読書|本|執筆|書く|原稿|記事/)) {
    byReaderGoal['読書・執筆を改善したい']++;
  }
  if (text.match(/習慣|生活|ライフ|健康|運動|筋トレ|睡眠/)) {
    byReaderGoal['習慣・生活を改善したい']++;
  }
  if (text.match(/タスク|仕事|効率|生産性|gtd|予定|スケジュール/)) {
    byReaderGoal['タスク・仕事を効率化したい']++;
  }
  if (topicsStr.match(/友人|妻の記事|寄稿|振り返り|podcast/)) {
    byReaderGoal['他の人の事例を知りたい']++;
  }
});

Object.entries(byReaderGoal)
  .sort((a, b) => b[1] - a[1])
  .forEach(([goal, count]) => {
    console.log(`${goal}: ${count}件`);
  });

// 主要なシリーズを確認
console.log('\n■ 既存の主要シリーズ（series_name）\n');
const seriesCounts = {};
articles.forEach(a => {
  if (a.seriesName) {
    seriesCounts[a.seriesName] = (seriesCounts[a.seriesName] || 0) + 1;
  }
});

Object.entries(seriesCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([series, count]) => {
    console.log(`${series}: ${count}件`);
  });
