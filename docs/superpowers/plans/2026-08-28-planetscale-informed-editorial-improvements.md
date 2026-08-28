# PlanetScale-Informed Editorial Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Separate fast project evidence from deeper article reasoning with a generated article index, compact related-writing surfaces, and two targeted enrichments.

**Architecture:** ProjectDetail.astro and PostDetail.astro remain composition roots. Three focused Astro components render heading navigation, related writing, and the multiplayer sequence; Astro heading metadata and the existing content relationships avoid new client state or schema.

**Tech Stack:** Astro 7, MDX, TypeScript 6, CSS, Vitest, Playwright.

**Spec:** docs/superpowers/specs/2026-08-28-planetscale-informed-editorial-improvements-design.md

## Global Constraints

- Preserve Italian-default bilingual routes, localized slugs, the current editorial identity, and exactly three featured homepage projects.
- Keep exactly one .project-explainer in each locale of SpinGO, Highway, Priority Queue, and Galaxy Trucker.
- Hide article navigation at 760px and prevent page-level horizontal scrolling at 390px.
- Reuse relatedPostKeys and relatedProjectKey.
- Add no project hero artwork, new articles, scroll spy, relationship schema, zoom system, deployment change, or PlanetScale visual imitation.

## File Map

- Create src/components/ArticleTableOfContents.astro: localized depth-2 heading navigation.
- Create src/components/RelatedWritingList.astro: compact project/article relationship surface.
- Create src/components/MultiplayerSequence.astro: bilingual four-step system sequence.
- Modify src/components/PostDetail.astro and src/components/ProjectDetail.astro: composition.
- Modify the localized first-game and Claude-rebuild MDX files: evidence enrichments.
- Modify src/styles/global.css and tests/e2e/home.spec.ts: responsive presentation and verification.

---

### Task 1: Generated article navigation

**Files:**
- Create: src/components/ArticleTableOfContents.astro
- Modify: src/components/PostDetail.astro
- Modify: src/styles/global.css
- Test: tests/e2e/home.spec.ts

**Interfaces:**
- Consumes: headings from render(document), shaped as depth, slug, and text.
- Produces: ArticleTableOfContents with headings and lang props; render it only for at least four depth-2 headings.

- [ ] **Step 1: Write the failing bilingual and mobile test**

~~~ts
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
~~~

- [ ] **Step 2: Run the test and confirm the navigation is missing**

~~~bash
npx playwright test tests/e2e/home.spec.ts --grep "article navigation|generated navigation"
~~~

Expected: FAIL because the named navigation does not exist.

- [ ] **Step 3: Create the navigation component**

~~~astro
---
interface Heading { depth: number; slug: string; text: string }
interface Props { headings: readonly Heading[]; lang: 'it' | 'en' }
const { headings, lang } = Astro.props;
---
<nav class="article-toc" aria-label={lang === 'it' ? "Indice dell'articolo" : 'In this article'}>
  <p>{lang === 'it' ? 'In questo articolo' : 'In this article'}</p>
  <ol>{headings.map((heading) => <li><a href={'#' + heading.slug}>{heading.text}</a></li>)}</ol>
</nav>
~~~

- [ ] **Step 4: Compose the article shell**

In PostDetail.astro import the component and use:

~~~ts
const { Content, headings } = await render(document);
const tocHeadings = headings.filter(({ depth }) => depth === 2);
const showTableOfContents = tocHeadings.length >= 4;
~~~

~~~astro
<div class:list={['article-layout', { 'has-toc': showTableOfContents }]}>
  <div class="prose article-prose"><Content /></div>
  {showTableOfContents && <ArticleTableOfContents headings={tocHeadings} lang={post.locale} />}
</div>
~~~

- [ ] **Step 5: Add the rail and mobile rules**

~~~css
.article-layout { display: grid; grid-template-columns: minmax(0,47rem); justify-content: center; gap: 3rem; padding: clamp(5rem,9vw,9rem) var(--page-padding); }
.article-layout.has-toc { grid-template-columns: minmax(0,47rem) minmax(12rem,15rem); max-width: 70rem; margin: 0 auto; }
.article-prose { min-width: 0; }
.article-toc { position: sticky; top: 2rem; align-self: start; max-height: calc(100svh - 4rem); overflow: auto; padding-left: 1.25rem; border-left: 1px solid var(--line); font-family: var(--mono); font-size: .7rem; line-height: 1.5; }
.article-toc > p { margin: 0 0 1rem; color: var(--muted); letter-spacing: .08em; text-transform: uppercase; }
.article-toc ol { display: grid; gap: .75rem; margin: 0; padding: 0; list-style: none; }
.article-toc a { text-decoration: underline; text-decoration-color: transparent; text-underline-offset: .25rem; }
.article-toc a:hover { text-decoration-color: currentColor; }
~~~

At the 760px media query add:

~~~css
.article-layout, .article-layout.has-toc { grid-template-columns: minmax(0,1fr); padding-inline: var(--page-padding); }
.article-toc { display: none; }
~~~

- [ ] **Step 6: Verify and commit**

~~~bash
npx playwright test tests/e2e/home.spec.ts --grep "article navigation|generated navigation"
npm run check
git add src/components/ArticleTableOfContents.astro src/components/PostDetail.astro src/styles/global.css tests/e2e/home.spec.ts
git commit -m "feat: add generated article navigation"
~~~

Expected: tests and Astro diagnostics PASS before commit.

---

### Task 2: Compact related writing

**Files:**
- Create: src/components/RelatedWritingList.astro
- Modify: src/components/ProjectDetail.astro
- Modify: src/styles/global.css
- Test: tests/e2e/home.spec.ts

**Interfaces:**
- Consumes: entries with title, excerpt, href, and publishedAt; lang; optional compact.
- Produces: .related-writing-list in the evidence rail and closing section.

- [ ] **Step 1: Write the failing project evidence test**

~~~ts
test('Galaxy Trucker exposes related writing as compact project evidence', async ({ page }) => {
  for (const sample of [
    { path: '/it/progetti/galaxy-trucker-progetto-java/', label: 'Approfondimenti', action: "Leggi l'articolo" },
    { path: '/en/projects/galaxy-trucker-java-project/', label: 'Go deeper', action: 'Read article' },
  ]) {
    await page.goto(sample.path);
    const rail = page.locator('.project-writing');
    await expect(rail.getByText(sample.label, { exact: true })).toBeVisible();
    await expect(rail.locator('.related-writing-list a')).toHaveCount(2);
    await expect(page.locator('.related-section .related-writing-list').getByText(sample.action, { exact: true })).toHaveCount(2);
    await expect(page.locator('.related-section .post-card')).toHaveCount(0);
  }
});
~~~

- [ ] **Step 2: Run and confirm .project-writing is missing**

~~~bash
npx playwright test tests/e2e/home.spec.ts --grep "compact project evidence"
~~~

Expected: FAIL at the rail assertion.

- [ ] **Step 3: Create RelatedWritingList.astro**

~~~astro
---
interface Entry { title: string; excerpt: string; href: string; publishedAt: Date }
interface Props { entries: readonly Entry[]; lang: 'it' | 'en'; compact?: boolean }
const { entries, lang, compact = false } = Astro.props;
const formatter = new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
---
<ul class:list={['related-writing-list', { compact }]}>
  {entries.map((entry) => <li><a href={entry.href}><div><time datetime={entry.publishedAt.toISOString()}>{formatter.format(entry.publishedAt)}</time><strong>{entry.title}</strong>{!compact && <p>{entry.excerpt}</p>}</div><span>{lang === 'it' ? "Leggi l'articolo" : 'Read article'} <span aria-hidden="true">↗</span></span></a></li>)}
</ul>
~~~

- [ ] **Step 4: Feed one relationship list into both project surfaces**

Derive in ProjectDetail.astro:

~~~ts
const relatedWriting = relatedPosts.map(({ data }) => ({
  title: data.title,
  excerpt: data.excerpt,
  href: postPath(data),
  publishedAt: data.publishedAt,
}));
~~~

Insert before .project-actions:

~~~astro
{relatedWriting.length > 0 && <div class="project-writing"><span>{isIt ? 'Approfondimenti' : 'Go deeper'}</span><RelatedWritingList entries={relatedWriting} lang={project.locale} compact /></div>}
~~~

Replace the closing PostCard grid with the default RelatedWritingList inside the existing localized heading.

- [ ] **Step 5: Add compact and closing styles**

~~~css
.related-writing-list { margin: 0; padding: 0; border-top: 1px solid rgba(255,255,255,.22); list-style: none; }
.related-writing-list li { border-bottom: 1px solid rgba(255,255,255,.22); }
.related-writing-list a { display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: end; gap: 2rem; padding: 1.5rem 0; }
.related-writing-list time { display: block; margin-bottom: .65rem; color: rgba(255,255,255,.58); font: .66rem var(--mono); text-transform: uppercase; }
.related-writing-list strong { display: block; max-width: 38rem; font: 450 clamp(1.5rem,3vw,2.5rem)/1 var(--serif); }
.related-writing-list p { max-width: 42rem; margin: .75rem 0 0; color: rgba(255,255,255,.68); }
.related-writing-list > li > a > span { font-size: .8rem; font-weight: 720; white-space: nowrap; }
.related-writing-list.compact { border-top-color: var(--line); }
.related-writing-list.compact li { border-bottom-color: var(--line); }
.related-writing-list.compact a { display: block; padding: .85rem 0; }
.related-writing-list.compact time { color: var(--muted); }
.related-writing-list.compact strong { font: 700 .9rem/1.35 var(--sans); }
.related-writing-list.compact > li > a > span { display: inline-block; margin-top: .4rem; color: var(--muted); font-size: .7rem; }
~~~

At the mobile breakpoint add a one-column related-writing-list layout.

- [ ] **Step 6: Verify and commit**

~~~bash
npx playwright test tests/e2e/home.spec.ts --grep "compact project evidence|link in both directions|second bilingual personal article"
npm run build:site
git add src/components/RelatedWritingList.astro src/components/ProjectDetail.astro src/styles/global.css tests/e2e/home.spec.ts
git commit -m "feat: surface related writing as project evidence"
~~~

Expected: selected tests and localized build PASS.

---

### Task 3: Multiplayer system sequence

**Files:**
- Create: src/components/MultiplayerSequence.astro
- Modify: both localized first-game MDX files
- Modify: src/styles/global.css
- Test: tests/e2e/home.spec.ts

**Interfaces:**
- Consumes: lang equal to it or en.
- Produces: one .multiplayer-sequence with four ordered steps and a localized caption.

- [ ] **Step 1: Write the failing semantic and responsive test**

~~~ts
test('the first-game article explains authoritative multiplayer as four steps', async ({ page }) => {
  for (const sample of [
    { path: '/it/articoli/il-mio-primo-videogioco-era-un-sistema-distribuito/', caption: 'Come un’azione diventa stato condiviso' },
    { path: '/en/writing/my-first-video-game-was-a-distributed-system/', caption: 'How one action becomes shared state' },
  ]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(sample.path);
    const figure = page.locator('.multiplayer-sequence');
    await expect(figure.locator('ol > li')).toHaveCount(4);
    await expect(figure.locator('figcaption')).toContainText(sample.caption);
    expect((await figure.boundingBox())!.width).toBeLessThanOrEqual(342);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  }
});
~~~

- [ ] **Step 2: Run and confirm the figure is missing**

~~~bash
npx playwright test tests/e2e/home.spec.ts --grep "authoritative multiplayer as four steps"
~~~

Expected: FAIL because .multiplayer-sequence does not exist.

- [ ] **Step 3: Create MultiplayerSequence.astro**

~~~astro
---
interface Props { lang: 'it' | 'en' }
const { lang } = Astro.props;
const copy = lang === 'it'
  ? {
      caption: 'Come un’azione diventa stato condiviso: il client propone, il server decide e tutti ricevono la stessa nuova realtà.',
      steps: [
        ['01', 'Azione del giocatore', 'Il client invia un’intenzione, non modifica la partita.'],
        ['02', 'Validazione del server', 'Regole, fase e permessi stabiliscono se l’azione sia ammessa.'],
        ['03', 'Aggiornamento autorevole', 'La modifica viene applicata una sola volta allo stato centrale.'],
        ['04', 'Propagazione ai client', 'TUI e GUI ricevono una nuova vista coerente della partita.'],
      ],
    }
  : {
      caption: 'How one action becomes shared state: the client proposes, the server decides, and everyone receives the same new reality.',
      steps: [
        ['01', 'Player action', 'The client sends an intention; it does not mutate the match.'],
        ['02', 'Server validation', 'Rules, phase, and permissions decide whether the action is allowed.'],
        ['03', 'Authoritative update', 'The change is applied once to the central state.'],
        ['04', 'Client propagation', 'TUI and GUI receive a coherent new view of the match.'],
      ],
    };
---
<figure class="multiplayer-sequence">
  <ol>{copy.steps.map(([number, title, description]) => <li><span>{number}</span><div><strong>{title}</strong><p>{description}</p></div></li>)}</ol>
  <figcaption>{copy.caption}</figcaption>
</figure>
~~~

- [ ] **Step 4: Embed the component**

Import ../../../components/MultiplayerSequence.astro below each frontmatter. Insert the localized component after the final paragraph of the second H2 section.

- [ ] **Step 5: Add local visual styles**

~~~css
.multiplayer-sequence { margin: 2rem 0 3rem; font-family: var(--sans); }
.multiplayer-sequence ol { display: grid; margin: 0; padding: 1px; gap: 1px; background: var(--line); list-style: none; }
.multiplayer-sequence li { display: grid; grid-template-columns: 2.5rem minmax(0,1fr); gap: 1rem; padding: 1.25rem; background: var(--white); }
.multiplayer-sequence li > span { color: var(--muted); font: .68rem var(--mono); }
.multiplayer-sequence strong { display: block; font-size: 1rem; }
.multiplayer-sequence p { margin: .35rem 0 0; color: var(--muted); font: .9rem/1.5 var(--sans); }
.multiplayer-sequence figcaption { margin-top: .75rem; color: var(--muted); font: max(.7rem,11px)/1.55 var(--mono); }
~~~

- [ ] **Step 6: Verify and commit**

~~~bash
npx playwright test tests/e2e/home.spec.ts --grep "authoritative multiplayer as four steps"
npm run check
npm run build:site
git add src/components/MultiplayerSequence.astro src/content/posts/it/il-mio-primo-videogioco-era-un-sistema-distribuito.mdx src/content/posts/en/my-first-video-game-was-a-distributed-system.mdx src/styles/global.css tests/e2e/home.spec.ts
git commit -m "feat: explain authoritative multiplayer flow"
~~~

Expected: tests, MDX imports, and build PASS.

---

### Task 4: Honest AI-reconstruction comparison

**Files:**
- Modify: both localized Claude-rebuild MDX files
- Modify: src/styles/global.css
- Test: tests/e2e/home.spec.ts

**Interfaces:**
- Consumes: claims already present in each article.
- Produces: one .evidence-comparison with three semantic headers and no invented speed metric.

- [ ] **Step 1: Write the failing evidence test**

~~~ts
test('the Claude reconstruction separates conditions from supported conclusions', async ({ page }) => {
  for (const sample of [
    { path: '/it/articoli/ricostruire-galaxy-trucker-con-claude/', headers: ['Progetto originale', 'Ricostruzione assistita', 'Conclusione sostenibile'] },
    { path: '/en/writing/rebuilding-galaxy-trucker-with-claude/', headers: ['Original project', 'AI-assisted rebuild', 'Supported conclusion'] },
  ]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(sample.path);
    const table = page.locator('.evidence-comparison');
    for (const header of sample.headers) await expect(table.getByRole('columnheader', { name: header })).toBeVisible();
    await expect(table).not.toContainText(/\d+x|percent|percento/i);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  }
});
~~~

- [ ] **Step 2: Run and confirm the table is missing**

~~~bash
npx playwright test tests/e2e/home.spec.ts --grep "supported conclusions"
~~~

Expected: FAIL because .evidence-comparison does not exist.

- [ ] **Step 3: Add localized evidence tables**

After the experimental-limit discussion, add a focusable region containing:

~~~md
| Progetto originale | Ricostruzione assistita | Conclusione sostenibile |
| --- | --- | --- |
| Quattro persone, apprendimento del dominio e scadenza accademica | Un agente, documentazione esistente e conoscenza degli errori precedenti | I tempi non sono direttamente confrontabili |
| Socket e RMI, TUI e GUI, requisiti del corso | Perimetro simile con persistenza e riconnessione più robuste | La ricostruzione non replica lo stesso esperimento |
| Decisioni integrate durante la consegna | Milestone ordinate e criteri di uscita espliciti | Claude accelera soprattutto il lavoro già reso verificabile |
~~~

Add this equivalent English table:

~~~md
| Original project | AI-assisted rebuild | Supported conclusion |
| --- | --- | --- |
| Four people, domain learning, and an academic deadline | One agent, existing documentation, and my knowledge of earlier failures | The timelines are not directly comparable |
| Socket and RMI, TUI and GUI, and the course requirements | Similar scope with more robust persistence and reconnection | The rebuild does not repeat the same experiment |
| Decisions integrated while approaching submission | Ordered milestones and explicit exit criteria | Claude accelerates work most where verification is already cheap |
~~~

- [ ] **Step 4: Style local table scrolling**

~~~css
.evidence-comparison { max-width: 100%; margin: 2rem 0 3rem; overflow-x: auto; border: 1px solid var(--line); background: var(--white); }
.evidence-comparison table { width: 100%; min-width: 38rem; border-collapse: collapse; font: .82rem/1.45 var(--sans); }
.evidence-comparison th, .evidence-comparison td { min-width: 12rem; padding: 1rem; vertical-align: top; text-align: left; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.evidence-comparison th:last-child, .evidence-comparison td:last-child { border-right: 0; }
.evidence-comparison tr:last-child td { border-bottom: 0; }
.evidence-comparison th { background: var(--acid); font-size: .72rem; letter-spacing: .025em; }
~~~

- [ ] **Step 5: Verify and commit**

~~~bash
npx playwright test tests/e2e/home.spec.ts --grep "supported conclusions"
npm run check
npm run build:site
git add src/content/posts/it/ricostruire-galaxy-trucker-con-claude.mdx src/content/posts/en/rebuilding-galaxy-trucker-with-claude.mdx src/styles/global.css tests/e2e/home.spec.ts
git commit -m "feat: clarify AI reconstruction evidence"
~~~

Expected: both localized tables render and all commands PASS.

---

### Task 5: Explainer rhythm and final gate

**Files:**
- Modify: src/styles/global.css
- Modify: tests/e2e/home.spec.ts
- Verify: all localized routes, metadata, and links

**Interfaces:**
- Consumes: the new editorial surfaces and existing project explainers.
- Produces: a coherent responsive system without new schema or runtime JavaScript.

- [ ] **Step 1: Extend the existing explainer test**

At 390x844 assert each .project-explainer is at most 342px wide, its caption is at least 11px, and document scroll width remains 390px.

~~~ts
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(path);
const mobileExplainer = page.locator('.project-explainer');
expect((await mobileExplainer.boundingBox())!.width).toBeLessThanOrEqual(342);
expect(Number.parseFloat(await mobileExplainer.locator('figcaption').evaluate((item) => getComputedStyle(item).fontSize))).toBeGreaterThanOrEqual(11);
expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
~~~

- [ ] **Step 2: Make the readability floor explicit**

Keep the 1rem vertical margins and 42rem cap. Set caption font-size to max(.7rem,11px) and image radius to calc(var(--radius) * .7). Do not edit the eight project MDX files because their captions are already localized and claim-specific.

- [ ] **Step 3: Run focused regressions**

~~~bash
npm test
npx playwright test tests/e2e/home.spec.ts --grep "contextual explainer|generated navigation|article navigation|compact project evidence|authoritative multiplayer|supported conclusions"
~~~

Expected: Vitest and selected Playwright tests PASS.

- [ ] **Step 4: Run the complete gate**

~~~bash
npm run verify
~~~

Expected: Astro check, Vitest, full Playwright, production build, and link validation PASS.

- [ ] **Step 5: Inspect scope and commit**

~~~bash
git status --short
git diff --check
git add src/styles/global.css tests/e2e/home.spec.ts
git commit -m "test: verify editorial evidence layouts"
~~~

Expected: no generated output, homepage, schema, or deployment file is staged.

- [ ] **Step 6: Re-run after the last commit**

~~~bash
npm run verify
git status --short
~~~

Expected: verification PASSes; unrelated pre-existing untracked files remain untouched.
