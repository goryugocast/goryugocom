const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = 'src/content/articles';
const seriesData = {};

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

      const seriesName = data.series_name || 'なし';
      const seriesEmoji = data.series_emoji || '';
      const category = data.category || '';
      const folderPath = path.dirname(fullPath).replace(articlesDir + '/', '');

      const key = `${seriesName}|${seriesEmoji}|${category}`;
      if (!seriesData[key]) {
        seriesData[key] = {
          seriesName,
          seriesEmoji,
          category,
          folders: new Set(),
          count: 0,
          files: []
        };
      }
      seriesData[key].folders.add(folderPath);
      seriesData[key].count++;
      seriesData[key].files.push({
        name: file,
        folder: folderPath,
        title: data.title,
        date: data.date_published
      });
    }
  });
}

walkDir(articlesDir);

console.log('=== シリーズ別の記事構造 ===\n');

Object.entries(seriesData)
  .sort((a, b) => b[1].count - a[1].count)
  .forEach(([key, data]) => {
    const { seriesName, seriesEmoji, category, folders, count, files } = data;
    console.log(`■ ${seriesEmoji} ${seriesName}${category ? ' / ' + category : ''}`);
    console.log(`  記事数: ${count}件`);
    console.log(`  フォルダ: ${Array.from(folders).join(', ')}`);

    // Check if numbered series
    const numberedFiles = files.filter(f => /KS\d{3}|💎\d{3}|📘\d{3}|🔧\d{3}|📖\d{3}|📅\d{3}/.test(f.name));
    if (numberedFiles.length > 0) {
      console.log(`  📊 番号付き記事: ${numberedFiles.length}件 (連載の可能性)`);
    }
    console.log('');
  });
