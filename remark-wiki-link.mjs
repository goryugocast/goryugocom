import { visit } from 'unist-util-visit';

/**
 * Remark plugin to convert Obsidian-style wiki links [[Page Name]] to hash links
 */
export function remarkWikiLink() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      const text = node.value;
      const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;

      if (!wikiLinkRegex.test(text)) {
        return;
      }

      // Reset regex
      wikiLinkRegex.lastIndex = 0;

      const newNodes = [];
      let lastIndex = 0;
      let match;

      while ((match = wikiLinkRegex.exec(text)) !== null) {
        const [fullMatch, linkText] = match;
        const startIndex = match.index;

        // Add text before the link
        if (startIndex > lastIndex) {
          newNodes.push({
            type: 'text',
            value: text.slice(lastIndex, startIndex)
          });
        }

        // Convert link text to slug (simple version)
        const slug = linkText.trim();

        // Create a link node
        newNodes.push({
          type: 'link',
          url: `#note/${encodeURIComponent(slug)}`,
          data: {
            hProperties: {
              className: ['wiki-link'],
              'data-note-slug': slug
            }
          },
          children: [
            {
              type: 'text',
              value: linkText
            }
          ]
        });

        lastIndex = startIndex + fullMatch.length;
      }

      // Add remaining text
      if (lastIndex < text.length) {
        newNodes.push({
          type: 'text',
          value: text.slice(lastIndex)
        });
      }

      // Replace the text node with new nodes
      if (newNodes.length > 0) {
        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
}
