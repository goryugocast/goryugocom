
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const glossary = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/glossary" }),
    schema: z.object({
        title: z.string().optional(),
        // Add other frontmatter fields if needed
    })
});

const topics = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/topics" }),
    schema: z.object({
        title: z.string().optional(),
    })
});

export const collections = { glossary, topics };
