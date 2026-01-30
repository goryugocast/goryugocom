
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const glossary = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/glossary" }),
    schema: z.object({
        title: z.string().optional(),
        // Add other frontmatter fields if needed
    })
});

export const collections = { glossary };
