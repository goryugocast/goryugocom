import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

const ARTICLES_DIR = 'src/content/articles';
const MIN_CONTENT_LENGTH = 500;
const BATCH_SIZE = 5;

async function run() {
    console.log('--- Article Maintenance Check Start ---');

    const files = await glob(`${ARTICLES_DIR}/**/*.md`);
    console.log(`Found ${files.length} articles.`);

    const toProcess = [];
    let reviewCount = 0;

    for (const file of files) {
        const rawContent = fs.readFileSync(file, 'utf8');
        const { data, content } = matter(rawContent);

        // 1. すでに review タグがあるものはスキップ
        if (data.tags && data.tags.includes('review')) {
            continue;
        }

        // 2. 本文が少なすぎる or 空のものを判定して review タグを付与
        const cleanContent = content.replace(/## メモ・原稿/g, '').trim();
        if (cleanContent.length < MIN_CONTENT_LENGTH) {
            console.log(`[FLAG] Too short (${cleanContent.length} chars): ${file}`);
            const newTags = data.tags ? [...new Set([...data.tags, 'review'])] : ['review'];
            const newContent = matter.stringify(content, { ...data, tags: newTags });
            fs.writeFileSync(file, newContent);
            reviewCount++;
            continue;
        }

        // 3. description がない、または未整備のものを AI 処理対象とする
        if (!data.description || data.description.trim() === '') {
            toProcess.push(file);
        }

        if (toProcess.length >= BATCH_SIZE) break;
    }

    console.log('--- Result ---');
    console.log(`Newly flagged for review: ${reviewCount}`);
    if (toProcess.length > 0) {
        console.log('Next AI Batch (Copy these paths to process):');
        toProcess.forEach(f => console.log(`- ${path.resolve(f)}`));
    } else {
        console.log('No articles found that need AI processing.');
    }
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
