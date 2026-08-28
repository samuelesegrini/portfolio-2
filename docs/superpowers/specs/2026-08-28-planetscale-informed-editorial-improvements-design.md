# PlanetScale-informed editorial improvements

Date: 2026-08-28

## Goal

Make project pages establish evidence quickly and let articles carry the deeper personal or technical reasoning. Adopt PlanetScale's editorial discipline without copying its monospaced visual identity or adding decorative media.

The work must preserve the portfolio's existing bilingual structure, Italian-default navigation, localized slugs, balanced editorial identity, and exactly three featured homepage projects.

## Scope

This iteration changes the shared project and article presentation plus the four substantive project stories:

- SpinGO;
- Highway Route Planner;
- Priority Task Queue Manager;
- Galaxy Trucker;
- “Il mio primo videogioco era un sistema distribuito” and its English translation;
- “Ricostruire Galaxy Trucker con Claude” and its English translation.

It does not redesign the homepage, create new articles, add more project hero artwork, alter project ordering, or publish the site.

## Editorial model

### Project pages

Project pages remain the proof surface. They retain one compact explainer each and make these facts easy to scan:

1. what was built;
2. Samuele's role;
3. the central constraint;
4. the decisive technical or product decision;
5. the evidence or lesson;
6. the available code and deeper writing.

The existing desktop sidebar becomes an evidence rail. It continues to show year, type, role, technologies, repository, live project, and contact actions. When related articles exist, it also exposes compact contextual links near those facts, so readers do not have to reach the end of a long case study before discovering the personal or technical story.

The large related-article card section at the bottom becomes a quieter text-first list. It must show title, payoff-oriented synopsis, date, and an explicit reading action without competing with the project itself.

### Articles

Articles remain the reasoning surface. Posts with at least four meaningful level-two sections receive a generated table of contents. On wide screens it occupies a sticky secondary rail; at narrow widths it disappears rather than moving ahead of the article. Every item links to a stable heading anchor and the current section is not required to update dynamically in this iteration.

The body retains the existing serif/sans editorial identity and readable measure. The new rail must not shrink the prose below its current useful width.

The related project remains available after the article, but its presentation should not obscure the conclusion.

## Targeted enrichments

No additional visual is added to SpinGO, Highway Route Planner, or Priority Task Queue Manager. Their existing single explainers already cover the highest-cost concepts. Their spacing, caption hierarchy, and mobile fit may be adjusted as part of the shared styles.

The personal Galaxy Trucker article receives one accessible HTML/CSS sequence beside the section explaining the invisible multiplayer system:

`player action -> server validation -> authoritative state update -> propagation to clients`

The same four objects and ordering are used in Italian and English. The visual must remain understandable at 390px, include a textual caption, and avoid tiny labels or horizontal scrolling.

The Claude reconstruction article receives one compact comparison table. Its columns distinguish the original team project, the AI-assisted reconstruction, and what can honestly be concluded. The table must only restate claims already supported by the article; it must not invent productivity measurements.

## Components and content

The implementation may introduce small focused components for:

- a generated article table of contents;
- a compact related-writing list;
- the four-step multiplayer sequence.

`ProjectDetail.astro` remains responsible for project composition. `PostDetail.astro` remains responsible for article composition and heading extraction. Content relationships continue to use `relatedPostKeys` and `relatedProjectKey`; no duplicate linking model is introduced.

Both locales must receive equivalent structure and meaning. Copy may be idiomatic rather than literal.

## Responsive and accessibility behaviour

- Desktop articles use a main reading column and a secondary sticky rail.
- The article table of contents is hidden at the existing mobile breakpoint.
- Project evidence remains before the prose on narrow screens.
- Figures and tables fit the text column at 390px without page-level horizontal scrolling.
- Generated heading links are keyboard reachable and preserve visible focus styles.
- The multiplayer sequence exposes its meaning as text, not through color alone.
- Existing alt text and captions remain localized.

## Verification

Implementation is complete when:

1. Astro content validation and production build pass;
2. unit tests preserve bilingual relationship and slug guarantees;
3. representative Italian and English articles expose identical table-of-contents structure;
4. project pages with related posts expose contextual links in the evidence rail;
5. SpinGO, Highway, Priority Queue, and Galaxy Trucker still render exactly one project explainer each;
6. the Galaxy sequence and Claude comparison remain usable at desktop and 390px widths;
7. no homepage featured-project count, slug, route, or social metadata regresses;
8. the existing full verification command passes.

## Deliberate exclusions

- no wholesale PlanetScale visual imitation;
- no decorative article heroes or image cadence;
- no JavaScript scroll spy;
- no new CMS schema for proof points;
- no zoom/lightbox system without interface screenshots that require it;
- no deployment in this iteration.
