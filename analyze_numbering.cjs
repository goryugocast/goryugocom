const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = 'src/content/articles';
const numberedSeries = {};

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.md')) {
      // Extract numbering pattern from filename
      // Pattern: 日付_絵文字KS番号_タイトル.md
      const match = file.match(/(💎|📘|🔧|📖|📅|🎙|🌱|🤔)KS(\d{3})/);
      if (match) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(content);

        const emoji = match[1];
        const number = match[2];
        const seriesName = data.series_name || 'なし';
        const category = data.category || '';
        const folderPath = path.dirname(fullPath).replace(articlesDir + '/', '');

        const key = `${emoji}${seriesName}${category ? '/' + category : ''}`;
        if (!numberedSeries[key]) {
          numberedSeries[key] = [];
        }

        numberedSeries[key].push({
          number: parseInt(number),
          file,
          title: data.title,
          folder: folderPath,
          date: data.date_published
        });
      }
    }
  });
}

walkDir(articlesDir);

console.log('=== 番号付き連載の構造 ===\n');

Object.entries(numberedSeries)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([key, articles]) => {
    console.log(`■ ${key}`);
    console.log(`  記事数: ${articles.length}件`);

    // Sort by number
    articles.sort((a, b) => a.number - b.number);

    // Show first 3 and last 3
    const toShow = articles.length > 6
      ? [...articles.slice(0, 3), { separator: true }, ...articles.slice(-3)]
      : articles;

    toShow.forEach(article => {
      if (article.separator) {
        console.log('  ...');
      } else {
        console.log(`  ${article.number.toString().padStart(3, '0')}: ${article.title}`);
      }
    });

    // Check for gaps in numbering
    const numbers = articles.map(a => a.number).sort((a, b) => a - b);
    const gaps = [];
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] - numbers[i-1] > 1) {
        gaps.push(`${numbers[i-1]}→${numbers[i]}`);
      }
    }
    if (gaps.length > 0) {
      console.log(`  ⚠️  番号の飛び: ${gaps.join(', ')}`);
    }

    console.log('');
  });
