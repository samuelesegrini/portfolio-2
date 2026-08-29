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
	/**
	 * The deck. For a project this is one sentence stating a result — see the deck rules in
	 * README.md; `validateProjectDecks` in src/lib/content.ts enforces the mechanical half.
	 */
	excerpt: z.string().min(1),
	draft: z.boolean().default(true),
	coverImage: z.string().min(1),
	coverAlt: z.string().trim().min(1),
	/** Overrides `coverImage` for og:image and twitter:image when a crop reads badly at card size. */
	socialImage: z.string().min(1).optional(),
	seoTitle: z.string().min(1).optional(),
	seoDescription: z.string().min(1).optional(),
};

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		...localizedFields,
		kind: z.enum(['app', 'package', 'open-source', 'experiment']),
		lifecycle: z.enum(['verified', 'archived', 'prototype', 'in-progress']),
		authorship: z.enum(['individual', 'team', 'contribution']),
		year: z.number().int().min(1990).max(2100),
		role: z.string().min(1),
		technologies: z.array(z.string().min(1)).min(1),
		featuredRank: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
		outcomes: z
			.array(
				z.object({
					value: z.string().min(1),
					label: z.string().min(1),
					/** How the value was obtained. A portfolio has no customer name to serve as warrant. */
					method: z.string().min(1).optional(),
				}),
			)
			.max(4)
			.default([]),
		/** The displaced baseline: what the work was measured against, in one line. */
		startingPoint: z.string().min(1).optional(),
		/** At most one, and only for a judgement the narrator cannot honestly make about themselves. */
		testimonial: z
			.object({
				quote: z.string().min(1),
				name: z.string().min(1),
				role: z.string().min(1),
			})
			.optional(),
		links: z
			.array(
				z.object({
					url: z.url(),
					label: z.string().min(1),
					relationship: z.enum([
						'my-repository',
						'team-repository',
						'live-demo',
						'write-up',
						'course-page',
					]),
				}),
			)
			.default([]),
		relatedPosts: z
			.array(z.object({ key: z.string().min(1), reason: z.string().min(1) }))
			.default([]),
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
