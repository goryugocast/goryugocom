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

      const folderPath = path.dirname(fullPath).replace(articlesDir + '/', '');

      articles.push({
        file,
        title: data.title,
        folder: folderPath,
        topic: data.topic || [],
        seriesName: data.series_name,
        seriesEmoji: data.series_emoji,
        category: data.category
      });
    }
  });
}

walkDir(articlesDir);

// Obsidian関連の記事を抽出
const obsidianArticles = articles.filter(a => {
  const topics = Array.isArray(a.topic) ? a.topic : [a.topic];
  const titleLower = (a.title || '').toLowerCase();
  return topics.some(t => t && t.includes('Obsidian')) ||
         titleLower.includes('obsidian') ||
         a.seriesName === 'Obsidian Tips' ||
         a.seriesName === 'Obsidianの全技術';
});

console.log('=== Obsidian関連記事の分析 ===');
console.log(`全体: ${obsidianArticles.length}件\n`);

// Obsidian記事のサブトピックを集計
const obsidianSubTopics = {};
obsidianArticles.forEach(a => {
  const topics = Array.isArray(a.topic) ? a.topic : [a.topic];
  topics.forEach(t => {
    if (t && t !== 'Obsidian') {
      obsidianSubTopics[t] = (obsidianSubTopics[t] || 0) + 1;
    }
  });
});

console.log('■ Obsidian記事のサブトピック（Obsidian以外）:');
Object.entries(obsidianSubTopics)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .forEach(([topic, count]) => {
    console.log(`  ${topic}: ${count}件`);
  });

console.log('\n=== 全記事のトピック分析 ===\n');

// すべてのトピックを集計
const allTopics = {};
articles.forEach(a => {
  const topics = Array.isArray(a.topic) ? a.topic : [a.topic];
  topics.forEach(t => {
    if (t) {
      allTopics[t] = (allTopics[t] || 0) + 1;
    }
  });
});

console.log('■ よく使われるトピック（上位30件）:');
Object.entries(allTopics)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30)
  .forEach(([topic, count]) => {
    console.log(`  ${topic}: ${count}件`);
  });

// トピックの組み合わせパターンを分析
console.log('\n=== トピックの組み合わせパターン（5件以上） ===\n');
const topicCombinations = {};
articles.forEach(a => {
  const topics = Array.isArray(a.topic) ? a.topic : [a.topic];
  if (topics.length > 0 && topics[0]) {
    const key = topics.filter(t => t).sort().join(' + ');
    if (key) {
      if (!topicCombinations[key]) {
        topicCombinations[key] = [];
      }
      topicCombinations[key].push(a.title);
    }
  }
});

Object.entries(topicCombinations)
  .filter(([_, articles]) => articles.length >= 5)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([combo, titles]) => {
    console.log(`■ [${combo}] (${titles.length}件)`);
    titles.slice(0, 3).forEach(title => {
      console.log(`  - ${title}`);
    });
    if (titles.length > 3) {
      console.log(`  ... 他${titles.length - 3}件`);
    }
    console.log('');
  });

// 著者系トピックを除いた「コンテンツトピック」の分析
console.log('\n=== コンテンツ系トピック（著者・形式を除く） ===\n');
const authorTopics = ['妻の記事', '友人(jun)の記事', '友人(tks)の記事', '振り返り', 'Podcast', 'ワークシートアップデート', 'その他'];
const contentTopics = Object.entries(allTopics)
  .filter(([topic, _]) => !authorTopics.includes(topic))
  .sort((a, b) => b[1] - a[1]);

contentTopics.slice(0, 20).forEach(([topic, count]) => {
  console.log(`  ${topic}: ${count}件`);
});
