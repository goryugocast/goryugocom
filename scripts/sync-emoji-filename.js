
import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
const SOURCE_BASE = path.join(__dirname, '../content-source');
const VIDEOS_DIR = path.join(SOURCE_BASE, 'Archives/videos');
const KS_DIR = path.join(SOURCE_BASE, 'Archives/ks');

async function main() {
    console.log('🔄 Syncing Emojis from Videos to Articles...');

    if (!fs.existsSync(VIDEOS_DIR) || !fs.existsSync(KS_DIR)) {
        console.error('❌ Source directories not found.');
        return;
    }

    // 1. Build Map: URL -> Emoji from Videos
    const urlToEmojiMap = new Map();
    const videoFiles = await glob('*.md', { cwd: VIDEOS_DIR, absolute: true });

    console.log(`  📂 Found ${videoFiles.length} video files.`);

    for (const file of videoFiles) {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const { data } = matter(content);
            const filename = path.basename(file); // e.g., 260129_🧑‍🏫001_...md

            if (data.url) {
                // Extract Emoji: Assumes format "DATE_EMOJI_TITLE" or similar
                // Strategy: Split by underscore. 
                // Index 0: Date
                // Index 1: Emoji (or Emoji+Prefix)
                // We will try to be smart.
                // Actually, often it is YYMMDD_Emoji_Title.
                // Let's take the segment between the first and second underscore.

                const parts = filename.split('_');
                if (parts.length >= 3) {
                    const emojiPart = parts[1]; // e.g. "🎥", "🧑‍🏫001"
                    // If the emoji part contains text/numbers, we might want to be careful?
                    // User said "filename's emoji part", so we take the whole chunk between underscores.

                    // Normalize URL (trim slash)
                    const cleanUrl = data.url.replace(/\/$/, '');
                    urlToEmojiMap.set(cleanUrl, emojiPart);
                    // console.log(`    Mapping: ${cleanUrl} -> ${emojiPart}`);
                }
            }
        } catch (e) {
            console.error(`    Skipping ${file}: ${e.message}`);
        }
    }

    console.log(`  🗺️  Mapped ${urlToEmojiMap.size} URLs to emojis.`);

    // 2. Iterate KS files and Rename
    const ksFiles = await glob('*.md', { cwd: KS_DIR, absolute: true });
    let renameCount = 0;

    for (const file of ksFiles) {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const { data } = matter(content);
            const filename = path.basename(file);

            if (!data.url) continue;

            const cleanUrl = data.url.replace(/\/$/, '');
            const targetEmoji = urlToEmojiMap.get(cleanUrl);

            if (targetEmoji) {
                // Check if current filename already has this emoji
                const parts = filename.split('_');
                if (parts.length >= 3) {
                    const currentEmoji = parts[1];

                    // Specific logic for 260129_🧑‍🏫001_...
                    // If targetEmoji is "🧑‍🏫001", we replace current "📄" with it.

                    if (currentEmoji !== targetEmoji) {
                        const newFilenameParts = [...parts];
                        newFilenameParts[1] = targetEmoji;
                        const newFilename = newFilenameParts.join('_');
                        const newPath = path.join(path.dirname(file), newFilename);

                        console.log(`  ✏️  Renaming: ${filename} -> ${newFilename}`);
                        fs.renameSync(file, newPath);
                        renameCount++;
                    }
                }
            }
        } catch (e) {
            console.error(`    Error processing ${file}: ${e.message}`);
        }
    }

    console.log(`🎉 Complete. Renamed ${renameCount} files.`);
}

main();
