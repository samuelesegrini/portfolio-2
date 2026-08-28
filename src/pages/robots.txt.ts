import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	const origin = site ?? new URL('https://portfolio-placeholder.pages.dev');
	return new Response(
		`User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${new URL('/sitemap-index.xml', origin).href}\n`,
		{ headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
	);
};
