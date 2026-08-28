import { defineConfig } from 'tinacms';

const branch =
	process.env.GITHUB_BRANCH ??
	process.env.CF_PAGES_BRANCH ??
	process.env.HEAD ??
	'codex/portfolio-v1';

const localizedFields = [
	{ type: 'string' as const, name: 'translationKey', label: 'Translation key', required: true },
	{
		type: 'string' as const,
		name: 'locale',
		label: 'Locale',
		required: true,
		options: [
			{ value: 'it', label: 'Italiano' },
			{ value: 'en', label: 'English' },
		],
	},
	{ type: 'string' as const, name: 'slug', label: 'Localized slug', required: true },
	{ type: 'string' as const, name: 'title', label: 'Title', required: true, isTitle: true },
	{ type: 'string' as const, name: 'excerpt', label: 'Excerpt', required: true, ui: { component: 'textarea' } },
	{ type: 'boolean' as const, name: 'draft', label: 'Draft', required: true },
	{ type: 'image' as const, name: 'coverImage', label: 'Cover image', required: true },
	{ type: 'string' as const, name: 'coverAlt', label: 'Cover alternative text', required: true },
	{ type: 'string' as const, name: 'seoTitle', label: 'SEO title' },
	{ type: 'string' as const, name: 'seoDescription', label: 'SEO description', ui: { component: 'textarea' } },
];

export default defineConfig({
	branch,
	clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? 'replace-before-cloud-build',
	token: process.env.TINA_TOKEN ?? 'replace-before-cloud-build',
	build: {
		outputFolder: 'admin',
		publicFolder: 'public',
	},
	media: {
		tina: {
			mediaRoot: 'uploads',
			publicFolder: 'public',
		},
	},
	schema: {
		collections: [
			{
				name: 'project',
				label: 'Projects',
				path: 'src/content/projects',
				format: 'mdx',
				fields: [
					...localizedFields,
					{
						type: 'string',
						name: 'kind',
						label: 'Kind',
						required: true,
						options: ['app', 'package', 'open-source', 'experiment'],
					},
					{ type: 'number', name: 'year', label: 'Year', required: true },
					{ type: 'string', name: 'role', label: 'Role', required: true },
					{ type: 'string', name: 'technologies', label: 'Technologies', list: true, required: true },
					{
						type: 'number',
						name: 'featuredRank',
						label: 'Featured rank',
					},
					{ type: 'string', name: 'repositoryURL', label: 'Repository URL' },
					{ type: 'string', name: 'liveURL', label: 'Live URL' },
					{ type: 'string', name: 'relatedPostKeys', label: 'Related post keys', list: true },
					{ type: 'rich-text', name: 'body', label: 'Body', isBody: true },
				],
			},
			{
				name: 'post',
				label: 'Articles',
				path: 'src/content/posts',
				format: 'mdx',
				fields: [
					...localizedFields,
					{ type: 'datetime', name: 'publishedAt', label: 'Published at', required: true },
					{ type: 'datetime', name: 'updatedAt', label: 'Updated at' },
					{ type: 'string', name: 'tags', label: 'Tags', list: true, required: true },
					{ type: 'string', name: 'relatedProjectKey', label: 'Related project key' },
					{ type: 'rich-text', name: 'body', label: 'Body', isBody: true },
				],
			},
			{
				name: 'page',
				label: 'About pages',
				path: 'src/content/pages',
				format: 'mdx',
				fields: [
					{ type: 'string', name: 'translationKey', label: 'Translation key', required: true },
					{
						type: 'string',
						name: 'locale',
						label: 'Locale',
						required: true,
						options: [
							{ value: 'it', label: 'Italiano' },
							{ value: 'en', label: 'English' },
						],
					},
					{ type: 'string', name: 'title', label: 'Title', required: true, isTitle: true },
					{ type: 'string', name: 'excerpt', label: 'Excerpt', required: true, ui: { component: 'textarea' } },
					{ type: 'boolean', name: 'draft', label: 'Draft', required: true },
					{ type: 'string', name: 'seoTitle', label: 'SEO title' },
					{ type: 'string', name: 'seoDescription', label: 'SEO description', ui: { component: 'textarea' } },
					{ type: 'rich-text', name: 'body', label: 'Body', isBody: true },
				],
			},
		],
	},
});
