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

console.log('=== 案Aでの分類シミュレーション ===\n');

// 具体的な記事で分類してみる
const testCases = [
  // ジョニーデシマル
  'ジョニーデシマル（Johnny.Decimal）という情報整理方法について',
  'Obsidianでジョニーデシマル（Johnny.Decimal）を試してみるときのコツ',
  'ジョニーデシマルindexをObsidianの右下に置く',

  // PARA
  'プロジェクトとエリアを混同しないPARAメソッド',

  // Anki
  '10分かける価値があることは全て「Anki」する',
  'Obsidian_to_AnkiでObsidianのノートから簡単にAnki問題を作る',
  'Ankiデッキのカスタマイズの基本と、普段どんなことをどのくらいやっているかという話',

  // Zettelkasten
  'Zettelkastenの3つの重要な原則',
  'ノートを「つなげて」整理するRINKシステム',
  'Zettelkastenの「デジタル系活用法」Evergreen notes',

  // GTD
  'Obsidianに破綻しないGTDインボックスの仕組みを作る',
  '「緊急ではない重要なこと」を進めるためのObsidianを使った仕事術・ノート術',

  // その他方法論
  'メール整理の3原則から学ぶ情報整理のコツ',
  'アトミックノートを組み合わせて話の構造を組み立てていく',
  'Obsidianでの読書メモの作り方',
];

testCases.forEach(testTitle => {
  const article = articles.find(a => a.title && a.title.includes(testTitle));
  if (article) {
    console.log(`■ ${article.title}`);
    console.log(`  現在のフォルダ: ${article.folder}`);

    // 案Aでの分類を提案
    const title = article.title.toLowerCase();
    const desc = (article.description || '').toLowerCase();
    const text = title + ' ' + desc;

    const suggestions = [];

    // Obsidian
    if (text.match(/obsidian/) && text.match(/プラグイン|設定|使い方|コツ|カスタマイズ|dataview|publish|canvas|graph/)) {
      suggestions.push('Obsidian');
    }

    // ノート術・整理術
    if (text.match(/ノート|整理|zettelkasten|evergreen|moc|アトミック|ジョニーデシマル|para|gtd|メモ|記録|情報整理/)) {
      suggestions.push('ノート術・整理術');
    }

    // 読書・執筆
    if (text.match(/読書|本|執筆|書く|原稿|文章/)) {
      suggestions.push('読書・執筆');
    }

    // 学習・成長（Ankiなど）
    if (text.match(/anki|学|習得|練習|成長|spaced repetition/)) {
      suggestions.push('学習・成長');
    }

    // タスク・仕事
    if (text.match(/タスク|仕事|gtd|todo|予定|効率|生産性/)) {
      suggestions.push('タスク・仕事');
    }

    console.log(`  案Aでの候補: ${suggestions.join(', ') || '分類困難'}`);
    console.log('');
  }
});

console.log('\n=== 分類の問題点 ===\n');
console.log('1. 同じ記事が複数カテゴリに該当');
console.log('   例: 「ObsidianでGTD」→ Obsidian？ ノート術？ タスク・仕事？');
console.log('');
console.log('2. ツールと方法論の境界が曖昧');
console.log('   例: 「Obsidianでジョニーデシマル」→ Obsidian？ ノート術？');
console.log('');
console.log('3. Ankiのような特殊ケース');
console.log('   例: 「Ankiの使い方」→ Obsidianじゃないけど学習ツール');
console.log('');

console.log('\n=== 改善案の提案 ===\n');

console.log('【改善案1】境界を明確に定義');
console.log('/Obsidian/');
console.log('  → Obsidian固有の機能・プラグイン・設定に限定');
console.log('  → 例: プラグイン設定、Publish、Canvas、Graph');
console.log('  → 「Obsidianで○○する」は含まない');
console.log('');
console.log('/ノート術・整理術/');
console.log('  → 全ての方法論（ツールを問わず）');
console.log('  → ジョニーデシマル、PARA、GTD、Zettelkasten、アトミックシンキング');
console.log('  → 「Obsidianで○○する」もここ');
console.log('');
console.log('/読書・執筆/');
console.log('  → 読書術、執筆術、文章の書き方');
console.log('');
console.log('/学習・成長/');
console.log('  → Anki、習慣化、大人の学び方、スキル習得');
console.log('');
console.log('/実践・ライフハック/');
console.log('  → 生活改善、具体的な実践例');
console.log('');
console.log('/コラム/');
console.log('/寄稿記事/');
console.log('');

console.log('【改善案2】Obsidianを広く取る');
console.log('/Obsidian/');
console.log('  → Obsidianに関する全て（方法論の実装も含む）');
console.log('  → 例: デイリーノート、ジョニーデシマル、GTD、読書メモ...');
console.log('');
console.log('/方法論・思想/');
console.log('  → ツール非依存の概念・理論');
console.log('  → アトミックシンキング、Zettelkasten、PARA（概念のみ）');
console.log('');
console.log('/学習・成長/');
console.log('  → Anki、習慣化、大人の学び方');
console.log('');
console.log('/読書・執筆/');
console.log('/実践・ライフハック/');
console.log('/コラム/');
console.log('/寄稿記事/');
console.log('');

console.log('【改善案3】サブフォルダなしフラット構造');
console.log('/Obsidian/（サブフォルダなし）');
console.log('/ノート術・思考法/（サブフォルダなし）');
console.log('/読書・執筆/');
console.log('/学習・ライフハック/');
console.log('/コラム/');
console.log('/寄稿記事/');
console.log('');
console.log('→ topicメタデータで細かく探せるようにする');
