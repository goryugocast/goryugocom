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
        date: data.date_published,
        seriesName: data.series_name,
        seriesEmoji: data.series_emoji,
        category: data.category
      });
    }
  });
}

walkDir(articlesDir);

// haruna1221の記事を抽出
const harunaArticles = articles.filter(a => {
  const topics = Array.isArray(a.topic) ? a.topic : [a.topic];
  return a.folder.includes('haruna1221') || topics.includes('友人(haruna)の記事');
});

// 時系列でソート
harunaArticles.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA - dateB;
});

console.log('=== haruna1221さんの記事（時系列） ===\n');
console.log(`全体: ${harunaArticles.length}件\n`);

harunaArticles.forEach((a, index) => {
  const date = new Date(a.date);
  const dateStr = date.toISOString().split('T')[0];
  console.log(`${index + 1}. [${dateStr}] ${a.title}`);
  if (a.description) {
    console.log(`   ${a.description.substring(0, 80)}...`);
  }
  if (a.seriesName) {
    console.log(`   シリーズ: ${a.seriesEmoji || ''} ${a.seriesName}${a.category ? ' / ' + a.category : ''}`);
  }
  console.log('');
});

console.log('\n=== タイトルパターンの分析 ===\n');

// タイトルから共通パターンを見つける
const patterns = {
  '書くことで考える': [],
  'Obsidian': [],
  '思考': [],
  'ノート': [],
  'デイリーノート': [],
  'その他': []
};

harunaArticles.forEach(a => {
  const title = a.title || '';
  if (title.includes('書くことで考える')) {
    patterns['書くことで考える'].push(a);
  } else if (title.toLowerCase().includes('obsidian')) {
    patterns['Obsidian'].push(a);
  } else if (title.includes('思考')) {
    patterns['思考'].push(a);
  } else if (title.includes('デイリーノート')) {
    patterns['デイリーノート'].push(a);
  } else if (title.includes('ノート')) {
    patterns['ノート'].push(a);
  } else {
    patterns['その他'].push(a);
  }
});

console.log('■ タイトルパターン別の分類:\n');
Object.entries(patterns).forEach(([pattern, arts]) => {
  if (arts.length > 0) {
    console.log(`${pattern}: ${arts.length}件`);
    arts.forEach(a => {
      const date = new Date(a.date).toISOString().split('T')[0];
      console.log(`  [${date}] ${a.title}`);
    });
    console.log('');
  }
});

console.log('\n=== シリーズ分類の提案 ===\n');

console.log('【提案1】時期で分ける');
console.log('- 初期（2023年）: Obsidianの基本的な使い方');
console.log('- 中期（2024年前半）: 思考整理・ノート術');
console.log('- 後期（2024年後半〜）: 「書くことで考える」シリーズ');
console.log('');

console.log('【提案2】テーマで分ける');
console.log('- 「書くことで考える」シリーズ');
console.log('- Obsidian活用術');
console.log('- その他');
console.log('');

console.log('【提案3】既存のcategoryを活用');
const categoryCount = {};
harunaArticles.forEach(a => {
  const cat = a.category || 'なし';
  categoryCount[cat] = (categoryCount[cat] || 0) + 1;
});
Object.entries(categoryCount).forEach(([cat, count]) => {
  console.log(`- ${cat}: ${count}件`);
});
