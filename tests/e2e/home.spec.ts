import { expect, test } from '@playwright/test';

test('Italian homepage presents the editorial portfolio hierarchy', async ({ page }) => {
	await page.goto('/it/');

	await expect(page).toHaveTitle(/Software Engineer/);
	await expect(page.getByRole('link', { name: 'Samuele Segrini, home' })).toBeVisible();
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Software Engineer');
	await expect(page.getByRole('heading', { name: 'Progetti in evidenza' })).toBeVisible();
	await expect(page.locator('[data-featured-project]')).toHaveCount(3);
	await expect(page.getByRole('link', { name: 'Highway Route Planner' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Ultimi articoli' })).toBeVisible();
	await expect(page.getByRole('link', { name: /English/ })).toHaveAttribute('href', '/en/');
	await expect(page.locator('footer').getByRole('link', { name: 'Email' })).toHaveAttribute(
		'href',
		'mailto:samuele.segrini@gmail.com',
	);
	await expect(page.locator('footer').getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
		'href',
		'https://www.linkedin.com/in/samuele-segrini-221443241/',
	);
});

test('root sends visitors to the Italian default locale', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveURL(/\/it\/$/);
});

test('English routes and localized language switches remain paired', async ({ page }) => {
	await page.goto('/en/');
	await expect(page.getByRole('heading', { name: 'Featured projects' })).toBeVisible();
	await page.getByRole('link', { name: 'Highway Route Planner' }).click();
	await expect(page).toHaveURL(/\/en\/projects\/highway-route-planner\/$/);
	await expect(page.getByRole('link', { name: /Italiano/ })).toHaveAttribute(
		'href',
		'/it/progetti/pianificatore-percorsi-autostradali/',
	);
	await expect(page.getByText('Solo developer', { exact: true })).toBeVisible();
});

test('Highway Route Planner uses its dedicated route illustration in both locales', async ({ page }) => {
	for (const path of [
		'/it/progetti/pianificatore-percorsi-autostradali/',
		'/en/projects/highway-route-planner/',
	]) {
		await page.goto(path);
		const illustration = page.locator('.detail-hero > img');
		await expect(illustration).toHaveAttribute(
			'src',
			'/images/projects/highway-route-planner.svg',
		);
		expect(await illustration.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
	}
});

test('second featured project opens the paired hardware case study', async ({ page }) => {
	await page.goto('/it/');
	const secondProject = page.locator('[data-featured-project]').nth(1);
	await expect(secondProject).toContainText('Priority Task Queue Manager');
	await secondProject.getByRole('link').click();
	await expect(page).toHaveURL(/\/it\/progetti\/gestore-coda-task-priorita\/$/);
	await expect(page.getByRole('link', { name: /English/ })).toHaveAttribute(
		'href',
		'/en/projects/priority-task-queue-manager/',
	);
	await expect(page.getByText('Hardware designer e sviluppatore individuale', { exact: true })).toBeVisible();
});

test('Priority Task Queue Manager uses its dedicated queue illustration in both locales', async ({ page }) => {
	for (const path of [
		'/it/progetti/gestore-coda-task-priorita/',
		'/en/projects/priority-task-queue-manager/',
	]) {
		await page.goto(path);
		const illustration = page.locator('.detail-hero > img');
		await expect(illustration).toHaveAttribute(
			'src',
			'/images/projects/priority-task-queue-manager.svg',
		);
		expect(await illustration.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
	}
});

test('third featured project publishes the bilingual SpinGO case study', async ({ page }) => {
	await page.goto('/it/');
	const thirdProject = page.locator('[data-featured-project]').nth(2);
	await expect(thirdProject).toContainText('SpinGO');
	await thirdProject.getByRole('link').click();

	await expect(page).toHaveURL(/\/it\/progetti\/spingo-micromobilita-sostenibile\/$/);
	await expect(
		page.getByText('Frontend developer e membro del team HCI', { exact: true }),
	).toBeVisible();
	await expect(page.locator('.project-actions').getByRole('link', { name: 'GitHub' })).toHaveAttribute(
		'href',
		'https://github.com/milenaramosduran/hci-eco',
	);
	await expect(page.getByRole('link', { name: 'Visita il progetto' })).toHaveAttribute(
		'href',
		'https://milenaramosduran.github.io/hci-eco/',
	);
	await expect(page.getByRole('link', { name: /English/ })).toHaveAttribute(
		'href',
		'/en/projects/spingo-sustainable-micromobility/',
	);
	await expect(page.locator('.project-results')).toContainText('109');
	await expect(page.locator('.project-results')).toContainText('89,2');

	await page.goto('/en/projects/spingo-sustainable-micromobility/');
	await expect(
		page.getByText('Frontend developer and HCI team member', { exact: true }),
	).toBeVisible();
	await expect(page.getByRole('link', { name: /Italiano/ })).toHaveAttribute(
		'href',
		'/it/progetti/spingo-micromobilita-sostenibile/',
	);
});

test('SpinGO uses its custom illustration in both locales', async ({ page }) => {
	await page.goto('/it/');
	const italianIllustration = page.getByRole('img', {
		name: 'Illustrazione geometrica di una bicicletta collegata da un percorso verde acido a un punto sicuro',
	});
	await expect(italianIllustration).toBeVisible();
	expect(await italianIllustration.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);

	await page.goto('/en/projects/spingo-sustainable-micromobility/');
	const englishIllustration = page.getByRole('img', {
		name: 'Geometric illustration of a bicycle connected by an acid-lime route to a safe destination',
	});
	await expect(englishIllustration).toBeVisible();
	expect(await englishIllustration.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
});

test('Galaxy Trucker publishes paired localized case-study routes', async ({
	page,
}) => {
	await page.goto('/it/progetti/');
	await page.getByRole('link', { name: 'Galaxy Trucker' }).click();

	await expect(page).toHaveURL(/\/it\/progetti\/galaxy-trucker-progetto-java\/$/);
	const englishSwitch = page.getByRole('link', { name: /English/ });
	await expect(englishSwitch).toHaveAttribute(
		'href',
		'/en/projects/galaxy-trucker-java-project/',
	);
	await englishSwitch.click();

	await expect(page).toHaveURL(/\/en\/projects\/galaxy-trucker-java-project\/$/);
	await expect(page.getByRole('link', { name: /Italiano/ })).toHaveAttribute(
		'href',
		'/it/progetti/galaxy-trucker-progetto-java/',
	);
});

test('Galaxy Trucker uses its dedicated network illustration in both locales', async ({ page }) => {
	for (const path of [
		'/it/progetti/galaxy-trucker-progetto-java/',
		'/en/projects/galaxy-trucker-java-project/',
	]) {
		await page.goto(path);
		const illustration = page.locator('.detail-hero > img');
		await expect(illustration).toHaveAttribute(
			'src',
			'/images/projects/galaxy-trucker-network.png',
		);
		expect(await illustration.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
	}
});

test('technical case studies render their contextual explainer in both locales', async ({ page }) => {
	const caseStudies = [
		{
			paths: [
				'/it/progetti/pianificatore-percorsi-autostradali/',
				'/en/projects/highway-route-planner/',
			],
			asset: '/images/projects/explainers/highway-implicit-graph.svg',
		},
		{
			paths: [
				'/it/progetti/gestore-coda-task-priorita/',
				'/en/projects/priority-task-queue-manager/',
			],
			asset: '/images/projects/explainers/priority-queue-insertion.svg',
		},
		{
			paths: [
				'/it/progetti/galaxy-trucker-progetto-java/',
				'/en/projects/galaxy-trucker-java-project/',
			],
			asset: '/images/projects/explainers/galaxy-authoritative-server.svg',
		},
		{
			paths: [
				'/it/progetti/spingo-micromobilita-sostenibile/',
				'/en/projects/spingo-sustainable-micromobility/',
			],
			asset: '/images/projects/explainers/spingo-research-loop.svg',
		},
	];

	for (const { paths, asset } of caseStudies) {
		for (const path of paths) {
			await page.goto(path);
			const explainer = page.locator('.project-explainer');
			await expect(explainer).toHaveCount(1);
			expect((await explainer.boundingBox())?.width).toBeLessThanOrEqual(760);
			const verticalMargins = await explainer.evaluate((item) => {
				const style = getComputedStyle(item);
				return [Number.parseFloat(style.marginTop), Number.parseFloat(style.marginBottom)];
			});
			expect(Math.max(...verticalMargins)).toBeLessThanOrEqual(24);
			await expect(explainer.locator('figcaption')).not.toBeEmpty();
			const image = explainer.locator('img');
			await expect(image).toHaveAttribute('src', asset);
			await image.scrollIntoViewIfNeeded();
			await expect.poll(() => image.evaluate((item: HTMLImageElement) => item.naturalWidth)).toBeGreaterThan(0);
		}
	}
});

test('Galaxy Trucker and its AI reconstruction article link in both directions', async ({
	page,
}) => {
	await page.goto('/it/progetti/galaxy-trucker-progetto-java/');
	const relatedArticle = page.getByRole('link', {
		name: 'Ricostruire Galaxy Trucker con Claude: cosa è cambiato, cosa no e come misurarlo',
		exact: true,
	});
	await relatedArticle.click();

	await expect(page).toHaveURL(
		/\/it\/articoli\/ricostruire-galaxy-trucker-con-claude\/$/,
	);
	await expect(page.getByRole('link', { name: /English/ })).toHaveAttribute(
		'href',
		'/en/writing/rebuilding-galaxy-trucker-with-claude/',
	);
	await expect(page.locator('.related-work').getByRole('link')).toHaveAttribute(
		'href',
		'/it/progetti/galaxy-trucker-progetto-java/',
	);
});

test('Galaxy Trucker links a second bilingual personal article', async ({ page }) => {
	await page.goto('/it/progetti/galaxy-trucker-progetto-java/');
	const personalArticle = page.locator(
		'a[href="/it/articoli/il-mio-primo-videogioco-era-un-sistema-distribuito/"]',
	);
	await expect(personalArticle).toBeVisible();
	await personalArticle.click();

	await expect(page).toHaveURL(
		/\/it\/articoli\/il-mio-primo-videogioco-era-un-sistema-distribuito\/$/,
	);
	await expect(page.getByRole('link', { name: /English/ })).toHaveAttribute(
		'href',
		'/en/writing/my-first-video-game-was-a-distributed-system/',
	);
	await expect(page.locator('.related-work').getByRole('link')).toHaveAttribute(
		'href',
		'/it/progetti/galaxy-trucker-progetto-java/',
	);
});

test('repository evidence is the primary project action when available', async ({ page }) => {
	await page.goto('/it/progetti/spingo-micromobilita-sostenibile/');
	const repository = page.locator('.project-actions').getByRole('link', { name: 'GitHub' });
	const contact = page.getByRole('link', { name: 'Parliamone' });

	await expect(repository).toBeVisible();
	await expect(contact).toBeVisible();
	const repositoryBackground = await repository.evaluate(
		(element) => getComputedStyle(element).backgroundColor,
	);
	const contactBackground = await contact.evaluate(
		(element) => getComputedStyle(element).backgroundColor,
	);
	expect(repositoryBackground).toBe('rgb(199, 255, 159)');
	expect(contactBackground).not.toBe(repositoryBackground);
});

test('project cover remains wide while using a compact editorial crop', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto('/it/progetti/pianificatore-percorsi-autostradali/');

	const cover = page.locator('.detail-hero > img');
	await expect(cover).toBeVisible();
	const box = await cover.boundingBox();
	expect(box).not.toBeNull();
	expect(box!.height / box!.width).toBeLessThan(0.4);
});

test('project sections use an editorial heading-and-copy grid on desktop', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto('/it/progetti/pianificatore-percorsi-autostradali/');

	const heading = page.locator('.detail-grid h2').first();
	const openingParagraph = page.locator('.detail-grid h2 + p').first();
	const headingBox = await heading.boundingBox();
	const paragraphBox = await openingParagraph.boundingBox();

	expect(headingBox).not.toBeNull();
	expect(paragraphBox).not.toBeNull();
	expect(paragraphBox!.x - headingBox!.x).toBeGreaterThan(280);
	expect(Math.abs(paragraphBox!.y - headingBox!.y)).toBeLessThan(48);
});

test('project lead is integrated into the reading surface instead of a boxed callout', async ({
	page,
}) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto('/it/progetti/pianificatore-percorsi-autostradali/');

	const lead = page.locator('.detail-grid > .prose > blockquote:first-child');
	await expect(lead).toBeVisible();
	const styles = await lead.evaluate((element) => {
		const computed = getComputedStyle(element);
		return { background: computed.backgroundColor, border: computed.borderLeftWidth };
	});
	expect(styles.background).toBe('rgba(0, 0, 0, 0)');
	expect(styles.border).toBe('0px');
});

test('project metadata does not overlap section headings in the shared left rail', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto('/it/progetti/pianificatore-percorsi-autostradali/');
	await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });

	const metadata = page.locator('.detail-grid aside');
	const firstSectionHeading = page.locator('.detail-grid h2').first();
	await firstSectionHeading.evaluate((element) => {
		window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY - 32);
	});

	const metadataBox = await metadata.boundingBox();
	const headingBox = await firstSectionHeading.boundingBox();
	expect(metadataBox).not.toBeNull();
	expect(headingBox).not.toBeNull();

	const boxesOverlap =
		metadataBox!.x < headingBox!.x + headingBox!.width &&
		metadataBox!.x + metadataBox!.width > headingBox!.x &&
		metadataBox!.y < headingBox!.y + headingBox!.height &&
		metadataBox!.y + metadataBox!.height > headingBox!.y;
	expect(boxesOverlap).toBe(false);
});

test('project details expose a localized contact call to action', async ({ page }) => {
	await page.goto('/it/progetti/pianificatore-percorsi-autostradali/');
	await expect(page.getByRole('link', { name: 'Parliamone' })).toHaveAttribute(
		'href',
		'mailto:samuele.segrini@gmail.com',
	);

	await page.goto('/en/projects/highway-route-planner/');
	await expect(page.getByRole('link', { name: "Let's talk" })).toHaveAttribute(
		'href',
		'mailto:samuele.segrini@gmail.com',
	);
});

test('project archive offers only represented filters and works without hiding content by default', async ({
	page,
}) => {
	await page.goto('/it/progetti/');
	await expect(page.locator('[data-project-item]')).toHaveCount(6);
	await expect(page.getByRole('button', { name: 'App' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Pacchetti' })).toHaveCount(0);
	await expect(page.getByRole('button', { name: 'Open source' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Esperimenti' })).toBeVisible();
	await page.getByRole('button', { name: 'Esperimenti' }).click();
	await expect(page.locator('[data-project-item]:visible')).toHaveCount(2);
});

test('project filters stay three rem below the hero at every viewport size', async ({ page }) => {
	for (const viewport of [
		{ width: 1280, height: 800 },
		{ width: 390, height: 844 },
	]) {
		await page.setViewportSize(viewport);
		await page.goto('/it/progetti/');

		const topPadding = await page.locator('[data-project-archive]').evaluate(
			(element) => Number.parseFloat(getComputedStyle(element).paddingTop),
		);
		expect(topPadding).toBe(48);
	}
});

test('draft content is absent from public archives', async ({ page }) => {
	await page.goto('/en/writing/');
	await expect(page.getByText('Unpublished draft')).toHaveCount(0);
	await expect(page.locator('[data-post-item]')).toHaveCount(4);
});

test('long articles expose bilingual generated navigation', async ({ page }) => {
	for (const sample of [
		{ path: '/it/articoli/il-mio-primo-videogioco-era-un-sistema-distribuito/', label: "Indice dell'articolo", first: 'Il gioco che immaginavo', count: 8 },
		{ path: '/en/writing/my-first-video-game-was-a-distributed-system/', label: 'In this article', first: 'The game I imagined', count: 8 },
	]) {
		await page.setViewportSize({ width: 1280, height: 900 });
		await page.goto(sample.path);
		const toc = page.getByRole('navigation', { name: sample.label });
		await expect(toc).toBeVisible();
		await expect(toc.getByRole('link')).toHaveCount(sample.count);
		const href = await toc.getByRole('link', { name: sample.first }).getAttribute('href');
		expect(href).toMatch(/^#[a-z0-9-]+$/);
		await expect(page.locator('h2' + href)).toHaveText(sample.first);
	}
});

test('article navigation yields the full width to prose on mobile', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/it/articoli/il-mio-primo-videogioco-era-un-sistema-distribuito/');
	await expect(page.getByRole('navigation', { name: "Indice dell'articolo" })).toBeHidden();
	expect((await page.locator('.article-prose').boundingBox())!.width).toBeLessThanOrEqual(342);
	expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});
