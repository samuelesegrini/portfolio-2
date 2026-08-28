import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts } from '../../lib/content';
import { getPortfolioContent, postPath } from '../../lib/portfolio';

export async function GET(context: APIContext) {
	const { posts } = await getPortfolioContent();
	return rss({
		title: 'Writing — Software Engineer',
		description: 'Technical decisions, process, and lessons from building.',
		site: context.site!,
		items: getPublishedPosts(posts, 'en').map((post) => ({
			title: post.title,
			description: post.excerpt,
			pubDate: post.publishedAt,
			link: postPath(post),
		})),
		customData: '<language>en</language>',
	});
}
