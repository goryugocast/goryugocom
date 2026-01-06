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

// Obsidian関連の記事を抽出
const obsidianArticles = articles.filter(a => {
  const topics = Array.isArray(a.topic) ? a.topic : [a.topic];
  const titleLower = (a.title || '').toLowerCase();
  return topics.some(t => t && t.includes('Obsidian')) ||
         titleLower.includes('obsidian');
});

// キーワード別に分類
const categories = {
  '入門・初期設定': [],
  'デイリーノート': [],
  'プラグイン': [],
  'Git・同期': [],
  'タスク管理・仕事術': [],
  '読書・執筆': [],
  'Canvas': [],
  'Dataview': [],
  'Graph': [],
  'Publish': [],
  'モバイル・iOS': [],
  'その他の機能・Tips': []
};

obsidianArticles.forEach(a => {
  const title = a.title.toLowerCase();
  const desc = (a.description || '').toLowerCase();
  const text = title + ' ' + desc;

  let categorized = false;

  if (text.match(/入門|初期設定|はじめ|再入門|ゼロから|初心者/)) {
    categories['入門・初期設定'].push(a);
    categorized = true;
  }
  if (text.match(/デイリーノート|daily|日記/)) {
    categories['デイリーノート'].push(a);
    categorized = true;
  }
  if (text.match(/プラグイン|plugin/)) {
    categories['プラグイン'].push(a);
    categorized = true;
  }
  if (text.match(/git|github|同期|sync/)) {
    categories['Git・同期'].push(a);
    categorized = true;
  }
  if (text.match(/タスク|仕事|gtd|todo|予定|スケジュール/)) {
    categories['タスク管理・仕事術'].push(a);
    categorized = true;
  }
  if (text.match(/読書|本|執筆|原稿|書く|アトミック|ノート作|zettelkasten/)) {
    categories['読書・執筆'].push(a);
    categorized = true;
  }
  if (text.match(/canvas/)) {
    categories['Canvas'].push(a);
    categorized = true;
  }
  if (text.match(/dataview/)) {
    categories['Dataview'].push(a);
    categorized = true;
  }
  if (text.match(/graph|グラフ/)) {
    categories['Graph'].push(a);
    categorized = true;
  }
  if (text.match(/publish/)) {
    categories['Publish'].push(a);
    categorized = true;
  }
  if (text.match(/ios|iphone|ipad|モバイル|ショートカット/)) {
    categories['モバイル・iOS'].push(a);
    categorized = true;
  }

  if (!categorized) {
    categories['その他の機能・Tips'].push(a);
  }
});

console.log('=== Obsidian記事のカテゴリ分類提案 ===\n');

// 記事数順にソート
Object.entries(categories)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([category, articles]) => {
    if (articles.length === 0) return;

    console.log(`■ ${category} (${articles.length}件)`);

    // 最初の5件を表示
    articles.slice(0, 5).forEach(a => {
      console.log(`  - ${a.title}`);
    });

    if (articles.length > 5) {
      console.log(`  ... 他${articles.length - 5}件`);
    }
    console.log('');
  });

// 非Obsidian記事の主要トピック
const nonObsidianArticles = articles.filter(a => {
  const topics = Array.isArray(a.topic) ? a.topic : [a.topic];
  const titleLower = (a.title || '').toLowerCase();
  return !(topics.some(t => t && t.includes('Obsidian')) || titleLower.includes('obsidian'));
});

console.log('\n=== Obsidian以外の記事 ===');
console.log(`全体: ${nonObsidianArticles.length}件\n`);

const otherTopics = {};
nonObsidianArticles.forEach(a => {
  const topics = Array.isArray(a.topic) ? a.topic : [a.topic];
  topics.forEach(t => {
    if (t && !['妻の記事', '友人(jun)の記事', '友人(tks)の記事', '振り返り', 'Podcast', 'ワークシートアップデート', 'その他'].includes(t)) {
      otherTopics[t] = (otherTopics[t] || 0) + 1;
    }
  });
});

console.log('■ コンテンツトピック（著者・形式を除く）:');
Object.entries(otherTopics)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .forEach(([topic, count]) => {
    console.log(`  ${topic}: ${count}件`);
  });
