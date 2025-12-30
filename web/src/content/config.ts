import { defineCollection, z } from 'astro:content';

// ks/ - ナレッジスタック記事
const ks = defineCollection({
  type: 'content',
  schema: z.object({
    project: z.string().optional(),
    topic: z.string().optional(),
    topic_code: z.union([z.string(), z.boolean()]).optional(),
    title: z.string(),
    subtitle: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    url: z.string(),
    date_published: z.string().or(z.date()),
    audience: z.string().optional(),
    cover_image: z.string().optional().nullable(),
    tags: z.array(z.string()).optional(),
    draft_link: z.string().optional().nullable(),
    series_name: z.string().optional().nullable(),
    series_emoji: z.string().optional().nullable(),
    series_code: z.string().optional().nullable(),
    category: z.string().optional().nullable(),
  }),
});

// topic/ - 用語集
const topic = defineCollection({
  type: 'content',
  schema: z.object({
    topic_id: z.string(),
    title: z.string(),
    category: z.string(),
    description: z.string(),
    recommended_articles: z.array(z.string()).optional(),
  }),
});

// atomic-notes/ - アトミックノート
const atomicNotes = defineCollection({
  type: 'content',
  schema: z.object({
    project: z.string(),
    title: z.string(),
    prefix: z.string().optional().nullable(),
    topic: z.array(z.string()).optional(),
  }),
});

export const collections = { ks, topic, atomicNotes };
