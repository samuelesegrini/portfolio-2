export type Locale = 'it' | 'en';
export type WorkKind = 'app' | 'package' | 'open-source' | 'experiment';
export type FeaturedRank = 1 | 2 | 3;
export type ProjectLifecycle = 'verified' | 'archived' | 'prototype' | 'in-progress';
export type ProjectAuthorship = 'individual' | 'team' | 'contribution';
export type LinkRelationship =
	| 'my-repository'
	| 'team-repository'
	| 'live-demo'
	| 'write-up'
	| 'course-page';

/** A measured result, kept beside the method that produced it. */
export interface ProjectOutcome {
	value: string;
	label: string;
	method?: string;
}

export interface ProjectLink {
	url: string;
	label: string;
	relationship: LinkRelationship;
}

export interface RelatedPost {
	key: string;
	reason: string;
}

export interface Testimonial {
	quote: string;
	name: string;
	role: string;
}

export interface LocalizedEntry {
	translationKey: string;
	locale: Locale;
	slug: string;
	title: string;
	excerpt: string;
	draft: boolean;
	coverImage: string;
	coverAlt: string;
	socialImage?: string;
	seoTitle?: string;
	seoDescription?: string;
}

export interface ProjectEntry extends LocalizedEntry {
	kind: WorkKind;
	lifecycle: ProjectLifecycle;
	authorship: ProjectAuthorship;
	year: number;
	role: string;
	technologies: readonly string[];
	featuredRank?: FeaturedRank;
	outcomes: readonly ProjectOutcome[];
	startingPoint?: string;
	testimonial?: Testimonial;
	links: readonly ProjectLink[];
	relatedPosts: readonly RelatedPost[];
}

export interface PostEntry extends LocalizedEntry {
	publishedAt: Date;
	updatedAt?: Date;
	tags: readonly string[];
	relatedProjectKey?: string;
}

type ContentEntry = ProjectEntry | PostEntry;

const locales: readonly Locale[] = ['it', 'en'];
const maximumDeckWords = 25;
/** "A ", "An ", "Un ", "Uno ", "Una ", "Un'" — the category-noun opening a deck must avoid. */
const indefiniteArticle = /^(?:an?|un[oa]?)\s|^un['’]/i;

export function getTranslationPair<T extends ContentEntry>(
	entries: readonly T[],
	translationKey: string,
	locale: Locale,
): T | undefined {
	return entries.find(
		(entry) =>
			!entry.draft && entry.translationKey === translationKey && entry.locale === locale,
	);
}

export function getFeaturedProjects(
	projects: readonly ProjectEntry[],
	locale: Locale,
): ProjectEntry[] {
	return projects
		.filter(
			(project) =>
				!project.draft && project.locale === locale && project.featuredRank !== undefined,
		)
		.toSorted((left, right) => left.featuredRank! - right.featuredRank!);
}

export function getPublishedPosts(posts: readonly PostEntry[], locale: Locale): PostEntry[] {
	return posts
		.filter((post) => !post.draft && post.locale === locale)
		.toSorted((left, right) => right.publishedAt.getTime() - left.publishedAt.getTime());
}

export function getProjectKinds(
	projects: readonly ProjectEntry[],
	locale: Locale,
): WorkKind[] {
	return [
		...new Set(
			projects
				.filter((project) => !project.draft && project.locale === locale)
				.map((project) => project.kind),
		),
	];
}

export function validateContentSet(
	projects: readonly ProjectEntry[],
	posts: readonly PostEntry[],
): string[] {
	const errors: string[] = [];
	validatePairs('Project', projects, errors);
	validatePairs('Post', posts, errors);
	validateSharedProjectMetadata(projects, errors);
	validateSharedPostMetadata(posts, errors);
	validateEntries('Project', projects, errors);
	validateEntries('Post', posts, errors);
	validateProjectDecks(projects, errors);
	validateFeaturedRanks(projects, errors);
	validateRelationships(projects, posts, errors);
	return errors;
}

function validatePairs<T extends ContentEntry>(
	label: 'Project' | 'Post',
	entries: readonly T[],
	errors: string[],
) {
	const published = entries.filter((entry) => !entry.draft);
	const keys = new Set(published.map((entry) => entry.translationKey));

	for (const key of keys) {
		const entryLocales = new Set(
			published.filter((entry) => entry.translationKey === key).map((entry) => entry.locale),
		);
		if (!locales.every((locale) => entryLocales.has(locale))) {
			errors.push(`${label} "${key}" must have published it and en translations.`);
		}
	}
}

function validateEntries<T extends ContentEntry>(
	label: 'Project' | 'Post',
	entries: readonly T[],
	errors: string[],
) {
	const published = entries.filter((entry) => !entry.draft);
	const paths = new Set<string>();

	for (const entry of published) {
		const path = `${entry.locale}/${entry.slug}`;
		if (paths.has(path)) {
			errors.push(`${label} slug "${path}" must be unique.`);
		}
		paths.add(path);

		if (!entry.coverAlt.trim()) {
			errors.push(`${label} "${entry.translationKey}" requires cover alternative text.`);
		}

		if ('kind' in entry) {
			for (const { url } of entry.links) {
				if (!isValidHttpURL(url)) {
					errors.push(`${label} "${entry.translationKey}" contains an invalid external URL.`);
				}
			}
		}
	}
}

/**
 * A project deck states a result, not a category. The category is already carried by `kind`
 * and repeated on every card, so an excerpt that opens with an indefinite article spends its
 * only sentence saying what the reader can already see.
 */
function validateProjectDecks(projects: readonly ProjectEntry[], errors: string[]) {
	for (const project of projects.filter((entry) => !entry.draft)) {
		const label = `Project "${project.translationKey}" (${project.locale}) excerpt`;

		if (indefiniteArticle.test(project.excerpt.trimStart())) {
			errors.push(`${label} must not open with an indefinite article.`);
		}

		if (countWords(project.excerpt) > maximumDeckWords) {
			errors.push(`${label} must stay within ${maximumDeckWords} words.`);
		}
	}
}

function countWords(value: string): number {
	return value.split(/\s+/).filter(Boolean).length;
}

function validateSharedProjectMetadata(projects: readonly ProjectEntry[], errors: string[]) {
	const published = projects.filter((project) => !project.draft);
	const keys = new Set(published.map((project) => project.translationKey));

	for (const key of keys) {
		const pair = published.filter((project) => project.translationKey === key);
		if (pair.length !== locales.length) continue;

		const [first, second] = pair;
		const sharedValuesMatch =
			first.kind === second.kind &&
			first.lifecycle === second.lifecycle &&
			first.authorship === second.authorship &&
			first.year === second.year &&
			first.featuredRank === second.featuredRank &&
			arraysEqual(first.technologies, second.technologies) &&
			arraysEqual(destinations(first), destinations(second)) &&
			arraysEqual(
				first.relatedPosts.map(({ key: postKey }) => postKey),
				second.relatedPosts.map(({ key: postKey }) => postKey),
			);

		if (!sharedValuesMatch) {
			errors.push(
				`Project "${key}" must share kind, lifecycle, authorship, year, technologies, rank, and relationships.`,
			);
		}

		// Outcome values carry locale-specific number formatting ("89.2" against "89,2"), so the
		// pair is held to the same count rather than the same strings.
		if (first.outcomes.length !== second.outcomes.length) {
			errors.push(`Project "${key}" must report the same number of outcomes in each locale.`);
		}

		if (!arraysEqual(first.outcomes.map(({ value }) => value), second.outcomes.map(({ value }) => value))) {
			errors.push(`Project "${key}" must report the same outcome values in each locale.`);
		}
	}
}

function destinations(project: ProjectEntry): string[] {
	return project.links.map(({ url, relationship }) => `${relationship} ${url}`);
}

function validateSharedPostMetadata(posts: readonly PostEntry[], errors: string[]) {
	const published = posts.filter((post) => !post.draft);
	const keys = new Set(published.map((post) => post.translationKey));

	for (const key of keys) {
		const pair = published.filter((post) => post.translationKey === key);
		if (pair.length !== locales.length) continue;

		const [first, second] = pair;
		const sharedValuesMatch =
			first.publishedAt.getTime() === second.publishedAt.getTime() &&
			first.updatedAt?.getTime() === second.updatedAt?.getTime() &&
			arraysEqual(first.tags, second.tags) &&
			first.relatedProjectKey === second.relatedProjectKey;

		if (!sharedValuesMatch) {
			errors.push(
				`Post "${key}" must share publication dates, tags, and project relationship.`,
			);
		}
	}
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
	return left.length === right.length && left.every((value, index) => value === right[index]);
}

function validateFeaturedRanks(projects: readonly ProjectEntry[], errors: string[]) {
	for (const locale of locales) {
		const ranks = projects
			.filter((project) => !project.draft && project.locale === locale)
			.map((project) => project.featuredRank)
			.filter((rank): rank is FeaturedRank => rank !== undefined)
			.toSorted();

		if (ranks.join(',') !== '1,2,3') {
			errors.push(`Locale "${locale}" must contain featured project ranks 1, 2, and 3 exactly once.`);
		}
	}
}

function validateRelationships(
	projects: readonly ProjectEntry[],
	posts: readonly PostEntry[],
	errors: string[],
) {
	const projectKeys = completePublishedKeys(projects);
	const postKeys = completePublishedKeys(posts);

	for (const project of projects.filter((entry) => !entry.draft)) {
		for (const { key: postKey } of project.relatedPosts) {
			if (!postKeys.has(postKey)) {
				errors.push(
					`Project "${project.translationKey}" references missing published post "${postKey}".`,
				);
			}
		}
	}

	for (const post of posts.filter((entry) => !entry.draft)) {
		if (post.relatedProjectKey && !projectKeys.has(post.relatedProjectKey)) {
			errors.push(
				`Post "${post.translationKey}" references missing published project "${post.relatedProjectKey}".`,
			);
		}
	}
}

function completePublishedKeys<T extends ContentEntry>(entries: readonly T[]): Set<string> {
	return new Set(
		[...new Set(entries.filter((entry) => !entry.draft).map((entry) => entry.translationKey))]
			.filter((key) =>
				locales.every((locale) =>
					entries.some(
						(entry) => !entry.draft && entry.translationKey === key && entry.locale === locale,
					),
				),
		),
	);
}

function isValidHttpURL(value: string): boolean {
	try {
		const url = new URL(value);
		return url.protocol === 'https:' || url.protocol === 'http:';
	} catch {
		return false;
	}
}
