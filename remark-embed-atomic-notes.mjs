
import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export function remarkEmbedAtomicNotes() {
    return (tree, file) => {
        // The root directory for atomic notes
        const ATOMIC_NOTES_DIR = path.resolve(process.cwd(), '../atomic-notes');

        visit(tree, 'paragraph', (node, index, parent) => {
            // Check if the paragraph contains ONLY a text node matching ![[...]]
            // or if it's an image node that Remark parsed from ![[...]] (unlikely default behavior but good to check)
            // Actually standard Remark parses ![]() as image, but ![[...]] usually stays as text or link depending on config.
            // We will look for text nodes starting with ![[ and ending with ]]

            if (node.children.length === 1 && node.children[0].type === 'text') {
                const textValue = node.children[0].value.trim();
                const match = textValue.match(/^!\[\[(.+?)\]\]$/);

                if (match) {
                    const noteName = match[1];
                    // Determine file path (assume .md extension if not present)
                    const fileName = noteName.endsWith('.md') ? noteName : `${noteName}.md`;
                    const filePath = path.join(ATOMIC_NOTES_DIR, fileName);

                    try {
                        if (fs.existsSync(filePath)) {
                            const fileContent = fs.readFileSync(filePath, 'utf-8');
                            const { data, content } = matter(fileContent);

                            // Use description from frontmatter, or fallback to a snippet of content
                            let description = data.description;
                            if (!description) {
                                // Simple fallback: take first non-empty paragraph (very rough)
                                description = content.split('\n').find(line => line.trim().length > 0 && !line.startsWith('#') && !line.startsWith('!')) || 'No description available.';
                            }

                            // Create the HTML node structure for the card
                            // We replace the entire Paragraph node with an HTML node
                            const html = `
                <div class="embedded-note">
                  <h3>${data.title || noteName}</h3>
                  <p>${description}</p>
                </div>
              `;

                            parent.children[index] = {
                                type: 'html',
                                value: html
                            };
                        } else {
                            console.warn(`[remark-embed-atomic-notes] File not found: ${filePath}`);
                        }
                    } catch (error) {
                        console.error(`[remark-embed-atomic-notes] Error processing ${noteName}:`, error);
                    }
                }
            }
        });
    };
}
