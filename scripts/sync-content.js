
import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// ESM compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
const SOURCE_BASE = path.join(__dirname, '../content-source');
const ARCHIVE_DIRS = ['Archives/ks', 'Archives/videos']; // Relative to SOURCE_BASE
const GLOSSARY_DIR = 'Glossary'; // Relative to SOURCE_BASE

const DEST_DATA_DIR = path.join(__dirname, '../src/data');
const DEST_CONTENT_DIR = path.join(__dirname, '../src/content/glossary');

// Ensure destination directories exist
fs.ensureDirSync(DEST_DATA_DIR);
fs.ensureDirSync(DEST_CONTENT_DIR);

function extractChapters(content) {
    const chapters = [];
    const lines = content.split('\n');
    let currentChapter = null;
    let pendingTitle = null;
    let pendingUrl = null;

    // Pattern 1: ## Title (00:00:00) - Embedded in header
    const regexEmbedded = /^(#{2,4})\s+(.+?)\s+\((\d{1,2}:\d{2}(?::\d{2})?)\)/;

    // Pattern 2: Lines separate
    // Header: ### [Title](url) OR ### Title
    // Time: **時間**: 00:00:00 ～
    const regexHeaderLink = /^(#{2,4})\s+\[(.+?)\]\((.+?)\)/; // Capture title AND url
    const regexHeaderSimple = /^(#{2,4})\s+(.+)/; // Capture simple title
    const regexTimestampLine = /^\*\*(?:時間|Time)\*\*:\s*(\d{1,2}:\d{2}(?::\d{2})?)/;

    for (const line of lines) {
        const trimmedLine = line.trim();

        // 1. Check for Embedded Timestamp (Priority)
        const matchEmbedded = line.match(regexEmbedded);
        if (matchEmbedded) {
            if (currentChapter) chapters.push(currentChapter);
            currentChapter = {
                title: matchEmbedded[2],
                timestamp: matchEmbedded[3],
                description: "",
                url: null
            };
            pendingTitle = null;
            pendingUrl = null;
            continue;
        }

        // 2. Check for Timestamp Line (often follows a header)
        const matchTime = line.match(regexTimestampLine);
        if (matchTime) {
            if (pendingTitle) {
                // We have a title waiting for a timestamp!
                if (currentChapter) chapters.push(currentChapter);
                currentChapter = {
                    title: pendingTitle,
                    timestamp: matchTime[1],
                    description: "",
                    url: pendingUrl
                };
                pendingTitle = null;
                pendingUrl = null;
            }
            continue;
        }

        // 3. Check for New Header (Potential Chapter Start)
        // Check Link Header first
        const matchLink = line.match(regexHeaderLink);
        if (matchLink) {
            pendingTitle = matchLink[2];
            pendingUrl = matchLink[3];
            // If we hit a new header, the previous chapter description is done.
            // But we don't start a NEW chapter until we find a timestamp.
            continue;
        }

        // Check Simple Header
        const matchSimple = line.match(regexHeaderSimple);
        if (matchSimple) {
            pendingTitle = matchSimple[2];
            pendingUrl = null;
            continue;
        }

        // 4. Description Content
        if (trimmedLine !== '') {
            if (pendingTitle) {
                // We had a header, but hit text without a timestamp. 
                // That header was just a regular header, not a chapter start.
                // Clear pendingTitle so we don't attach a random timestamp later.
                pendingTitle = null;
                pendingUrl = null;
            }

            // Append to current chapter description
            if (currentChapter) {
                if (currentChapter.description.length < 500) {
                    currentChapter.description += line + "\n";
                }
            }
        }
    }

    if (currentChapter) {
        chapters.push(currentChapter);
    }
    return chapters;
}

async function syncArchive() {
    console.log('🔄 Syncing Archive (ks, videos)...');
    let allItems = [];

    for (const relativeDir of ARCHIVE_DIRS) {
        const sourceDir = path.join(SOURCE_BASE, relativeDir);
        // Use glob to find all md files
        const files = await glob('*.md', { cwd: sourceDir, absolute: true });

        console.log(`  Found ${files.length} files in ${relativeDir}`);

        for (const file of files) {
            try {
                const content = fs.readFileSync(file, 'utf8');
                const { data, content: body } = matter(content);

                // Basic validation
                if (!data.title) continue;

                const type = relativeDir.includes('videos') ? 'video' : 'article';

                // Extract chapters if it is a video (or even if article, if mixed)
                let chapters = [];
                if (type === 'video') {
                    chapters = extractChapters(body);
                }

                allItems.push({
                    file: path.basename(file),
                    type: type,
                    ...data,
                    body: body.slice(0, 500),
                    chapters: chapters
                });
            } catch (e) {
                console.error(`  Error processing ${file}: ${e.message}`);
            }
        }
    }

    // Sort by date_published descending
    allItems.sort((a, b) => {
        const dateA = new Date(a.date_published || 0);
        const dateB = new Date(b.date_published || 0);
        return dateB - dateA;
    });

    const destFile = path.join(DEST_DATA_DIR, 'archive.json');
    fs.writeJsonSync(destFile, allItems, { spaces: 2 });
    console.log(`✅ Generated archive.json with ${allItems.length} items.`);
}

async function syncGlossary() {
    console.log('🔄 Syncing Glossary...');
    fs.emptyDirSync(DEST_CONTENT_DIR);

    const sourceDir = path.join(SOURCE_BASE, GLOSSARY_DIR);
    if (!fs.existsSync(sourceDir)) {
        console.warn(`  ⚠️ Glossary directory not found at ${sourceDir}`);
        return;
    }

    const files = await glob('*.md', { cwd: sourceDir, absolute: true });
    // console.log(`  Found ${files.length} glossary items.`);

    let count = 0;
    for (const file of files) {
        const filename = path.basename(file);
        const dest = path.join(DEST_CONTENT_DIR, filename);
        fs.copySync(file, dest);
        count++;
    }
    console.log(`✅ Copied ${count} glossary files.`);
}

async function main() {
    try {
        if (!fs.existsSync(SOURCE_BASE)) {
            console.warn(`⚠️ Source directory not found at ${SOURCE_BASE}. Skipping sync (assuming CI/Build environment).`);
            return;
        }

        await syncArchive();
        await syncGlossary();
        console.log('🎉 Content sync complete!');
    } catch (e) {
        console.error('❌ Sync failed:', e);
        process.exit(1);
    }
}

main();
