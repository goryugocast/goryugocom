import { defineCollection, z } from 'astro:content';

// videos/ - 動画ベースのコンテンツ（セミナー、Obsidianの全技術）
const videos = defineCollection({
  type: 'content',
  schema: z.object({
    project: z.string().optional(),
    topic: z.union([z.string(), z.array(z.string())]).transform(val => typeof val === 'string' ? [val] : val).optional(),
    topic_code: z.union([z.string(), z.boolean()]).optional(),
    title: z.string(),
    subtitle: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    url: z.string().optional().nullable(),
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

// articles/ - 通常の記事コンテンツ
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    project: z.string().optional(),
    topic: z.union([z.string(), z.array(z.string())]).transform(val => typeof val === 'string' ? [val] : val).optional(),
    topic_code: z.union([z.string(), z.boolean()]).optional(),
    title: z.string(),
    subtitle: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    url: z.string().optional().nullable(),
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
    project: z.string().optional(),
    title: z.string().optional(),
    prefix: z.string().optional().nullable(),
    topic: z.union([z.string(), z.array(z.string())]).transform(val => typeof val === 'string' ? [val] : val).optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    related: z.array(z.string()).optional(),
    created: z.string().or(z.date()).optional(),
    note_type: z.enum(['principle', 'method', 'insight', 'technique', 'definition']).optional(),
  }),
});

export const collections = { videos, articles, topic, 'atomic-notes': atomicNotes };
