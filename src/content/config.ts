import 'dotenv/config';
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sharedSchema = z.object({
  title: z.string().optional(),
  permalink: z.union([z.string(), z.number()]).transform((value) => String(value)).optional(),
  date: z.coerce.date().optional(),
  tags: z.union([z.array(z.string()), z.string()]).transform((value) => {
    if (Array.isArray(value)) return value;
    return value ? [value] : [];
  }).nullable().optional(),
  description: z.string().nullable().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
  type: z.enum(['blog', 'note', 'landing']).optional(),
  affiliate: z.boolean().default(false),
  noindex: z.boolean().default(false),
  revenue_potential: z.enum(['low', 'medium', 'high']).optional(),
  related: z.union([z.array(z.string()), z.string()]).transform((value) => {
    if (Array.isArray(value)) return value;
    return value ? [value] : [];
  }).nullable().optional(),
  aliases: z.union([z.array(z.string()), z.string()]).transform((value) => {
    if (Array.isArray(value)) return value;
    return value ? [value] : [];
  }).nullable().optional(),
}).passthrough(); // Allow unknown fields

const publishPath = process.env.VAULT_PUBLISH_PATH || './content-source/Publish';
const generateContentId = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '').replace(/\\/g, '/');

// Temporarily only include 2023-2024 blogs to avoid image issues in older posts
const blog = defineCollection({
  loader: glob({
    pattern: "{2023,2024}/**/*.md",
    base: `${publishPath}/blog`,
    generateId: generateContentId,
  }),
  schema: sharedSchema,
});

const notes = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!blog/**/*.md"],
    base: publishPath,
    generateId: generateContentId,
  }),
  schema: sharedSchema,
});

export const collections = { blog, notes };
