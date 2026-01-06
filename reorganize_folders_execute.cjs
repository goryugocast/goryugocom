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

console.log('=== フォルダ再編成（実行） ===\n');
console.log(`全記事数: ${articles.length}件\n`);

// 分類関数（dry-runと同じロジック）
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

// 必要なフォルダを作成
const folders = new Set();
articles.forEach(article => {
  const newFolder = classifyArticle(article);
  folders.add(newFolder);
});

console.log('━━━━━━━━━━━━━━━━━━━━━━');
console.log('■ フォルダ作成');
console.log('━━━━━━━━━━━━━━━━━━━━━━\n');

folders.forEach(folder => {
  const folderPath = path.join(articlesDir, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`✓ ${folder}`);
  } else {
    console.log(`- ${folder} (already exists)`);
  }
});

// ファイルを移動
console.log('\n━━━━━━━━━━━━━━━━━━━━━━');
console.log('■ ファイル移動');
console.log('━━━━━━━━━━━━━━━━━━━━━━\n');

let movedCount = 0;
let skippedCount = 0;

articles.forEach((article, index) => {
  const newFolder = classifyArticle(article);
  const newPath = path.join(articlesDir, newFolder, article.file);
  const currentFullPath = article.fullPath;

  // 現在のフォルダと新しいフォルダが同じ場合はスキップ
  const currentFolderPath = path.dirname(currentFullPath);
  const newFolderPath = path.dirname(newPath);

  if (currentFolderPath === newFolderPath) {
    skippedCount++;
    return;
  }

  // ファイルを移動
  try {
    fs.renameSync(currentFullPath, newPath);
    movedCount++;

    // 進捗表示（10件ごと）
    if (movedCount % 10 === 0) {
      console.log(`移動済み: ${movedCount}件 / スキップ: ${skippedCount}件`);
    }
  } catch (err) {
    console.error(`✗ Error moving ${article.file}:`);
    console.error(`  ${err.message}`);
  }
});

console.log(`\n最終結果: 移動 ${movedCount}件 / スキップ ${skippedCount}件`);

// 空のフォルダを削除
console.log('\n━━━━━━━━━━━━━━━━━━━━━━');
console.log('■ 空フォルダの削除');
console.log('━━━━━━━━━━━━━━━━━━━━━━\n');

function removeEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      removeEmptyDirs(fullPath);

      // 再度チェックして空なら削除
      const remainingFiles = fs.readdirSync(fullPath);
      if (remainingFiles.length === 0) {
        fs.rmdirSync(fullPath);
        console.log(`✓ Removed empty: ${fullPath.replace(articlesDir + '/', '')}`);
      }
    }
  });
}

removeEmptyDirs(articlesDir);

console.log('\n━━━━━━━━━━━━━━━━━━━━━━');
console.log('■ 完了');
console.log('━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`全${articles.length}件の記事を新しい構造に再編成しました。`);
console.log('\n次のステップ:');
console.log('1. サイトのUIを新構造に対応させます');
console.log('2. ビルドしてエラーがないか確認します');
