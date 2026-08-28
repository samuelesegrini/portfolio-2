import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const locale = z.enum(['it', 'en']);
const slug = z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const localizedFields = {
	translationKey: z.string().min(1),
	locale,
	slug,
	title: z.string().min(1),
	excerpt: z.string().min(1),
	draft: z.boolean().default(true),
	coverImage: z.string().min(1),
	coverAlt: z.string().trim().min(1),
	seoTitle: z.string().min(1).optional(),
	seoDescription: z.string().min(1).optional(),
};

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		...localizedFields,
		kind: z.enum(['app', 'package', 'open-source', 'experiment']),
		year: z.number().int().min(1990).max(2100),
		role: z.string().min(1),
		technologies: z.array(z.string().min(1)).min(1),
		featuredRank: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
		repositoryURL: z.url().optional(),
		liveURL: z.url().optional(),
		relatedPostKeys: z.array(z.string().min(1)).default([]),
	}),
});

const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		...localizedFields,
		publishedAt: z.coerce.date(),
		updatedAt: z.coerce.date().optional(),
		tags: z.array(z.string().min(1)).default([]),
		relatedProjectKey: z.string().min(1).optional(),
	}),
});

const pages = defineCollection({
	loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		translationKey: z.literal('about'),
		locale,
		title: z.string().min(1),
		excerpt: z.string().min(1),
		draft: z.boolean().default(true),
		seoTitle: z.string().min(1).optional(),
		seoDescription: z.string().min(1).optional(),
	}),
});

export const collections = { projects, posts, pages };
