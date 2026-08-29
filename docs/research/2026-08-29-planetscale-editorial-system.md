# PlanetScale's editorial system, measured against this portfolio

Date: 2026-08-29
Scope: a corpus inspection of the live [PlanetScale blog](https://planetscale.com/blog) and [case-study index](https://planetscale.com/case-studies), the [Atom feed](https://planetscale.com/blog/feed.atom) (25 posts, full body content), twelve case-study detail pages, six blog detail pages, a category page, an author page, and the raw server-rendered HTML and head metadata of each. Paired with a line-level audit of this repository's own editorial implementation on branch `codex/portfolio-v1`.

Supersedes and extends [2026-08-28-planetscale-editorial-system.md](docs/research/2026-08-28-planetscale-editorial-system.md). That note's structural and responsive observations survive re-verification and are preserved here. What is new:

- **Counted, not asserted.** Deck length, sentence count, digit frequency, second-person frequency, heading grammar, word counts, media inventory, and cross-link counts are now computed over a 25-post and 20-entry corpus rather than illustrated with examples.
- **Three corrections** to the earlier note (see the next section), including one about company logos and one about question-led headings that reversed on measurement.
- **New surfaces the earlier note did not open:** the Atom feed's structure, the author-page mechanism, the case-study rail as a typed field set, the absence of any blog→case-study link, the TOC threshold, and the fact that PlanetScale's *head metadata is weaker than this portfolio's* in two specific ways.
- **A file-and-line gap analysis** against `src/content.config.ts`, the four archive/detail components, and the real excerpt strings in `src/content/`, ending in an implementable, prioritized change list.

## Bottom line

**Direct observation.** PlanetScale runs two formats with different *field sets*, not just different tones. A blog entry carries `title, category, author(s), date, deck` and is syndicated in a full-content Atom feed. A case study carries `title, platform, deck` on the index and, on the detail page, a company logo plus a `<ul>` of outcome facts in a rail — and no date, no author, and no feed at all. [Blog index](https://planetscale.com/blog) [Case-study index](https://planetscale.com/case-studies)

**Direct observation.** The decks are measurably different instruments. Across the 25-post feed corpus a blog deck averages 21.3 words, is a single sentence only 14 times out of 25, and uses "you"/"your" 12 times out of 25. Across the 20 case-study entries a deck averages 12.9 words, is a single sentence 20 times out of 20, uses second person once, and carries a digit 8 times out of 20. [Blog feed](https://planetscale.com/blog/feed.atom) [Case-study index](https://planetscale.com/case-studies)

**Careful conclusion.** The transferable core is a rule about *who the sentence is about*. A blog deck is about the reader and promises a payoff. A case-study deck is about the subject and names a finite change: it has a working verb — cuts, saved, scaled, eliminated, migrated — and often a number. This portfolio's project excerpts do neither: all six begin with an indefinite article plus a category noun, and none names an outcome. That single rewrite is worth more than any component change proposed below.

**Careful conclusion.** Some of what PlanetScale does is sales machinery and should be refused outright: the closing commercial CTA on every case study, the stacking of six or seven quotations from one named customer, the multi-author byline apparatus, and category filter chips over a corpus of hundreds. This note marks those `Reject` explicitly rather than leaving them as unexamined "best practice".

## What this note corrects in the 2026-08-28 version

| Earlier claim | Status on 2026-08-29 | Evidence |
| --- | --- | --- |
| "The case-study index lists a company logo, title, database family… per entry." | **Wrong.** The index rows contain no image element of any kind: an `<h2>` link, a platform `<span>`, and a deck `<p>` with a trailing arrow link. The logo lives on the *detail page rail* as an SVG sprite reference with light and dark variants. | [Case-study index](https://planetscale.com/case-studies), [DAT](https://planetscale.com/case-studies/dat) |
| "Let headings be the reader's next question" presented as the blog's structural rule. | **Overstated.** Of 163 H2s across the 25-post corpus, 6 end in a question mark — 3.7%. Question-led headings are the signature of one genre (the interactive explainer), not of the blog. The dominant form is a short declarative or noun phrase. | [Blog feed](https://planetscale.com/blog/feed.atom) |
| Blog and case studies described as one "closely related shell" with cross-linking implied. | **Incomplete.** Zero of the 25 corpus posts link to `/case-studies`. The two systems meet only through outbound third-party customer URLs, which appear both as `[External]` index rows and as inline links inside announcement posts. | [Blog feed](https://planetscale.com/blog/feed.atom), [Postgres GA](https://planetscale.com/blog/planetscale-for-postgres-is-generally-available) |

Everything else in the earlier note — the 752/48/288 desktop geometry, the 16px monospace body, the `lg:flex-row-reverse` wrapper, the blog aside vanishing at 390px while the case-study rail keeps its logo and drops its outcome list, and the "enrichment follows the claim" finding — was re-measured today and holds.

## Scope and source boundary

**Direct observation.** The pages are server-rendered: `fetch()` of every URL below returns the complete article text, headings, decks, and head metadata without executing client JavaScript. The Atom feed returns roughly 1.0 MB of XML containing full post bodies. These are the authority for every claim marked **Direct observation**.

**Not inferred.** Nothing here identifies PlanetScale's CMS, content schema, editorial review process, analytics, or deployment pipeline. A field that behaves like a discrete field — a deck that appears identically in `<meta name="description">`, the index row, and the feed's `<summary>` — is evidence of a *rendered* field, not proof of a database column.

## Research sample

| Surface | Sources | n |
| --- | --- | --- |
| Blog index page 1 | [/blog](https://planetscale.com/blog) | 25 rows |
| Blog index page 2 | [/blog?page=2](https://planetscale.com/blog?page=2) | 25 rows |
| Category page | [/blog/category/company](https://planetscale.com/blog/category/company) | 16 rows |
| Author page | [/blog/author/ben](https://planetscale.com/blog/author/ben) | — |
| Full-content feed | [/blog/feed.atom](https://planetscale.com/blog/feed.atom) | 25 entries, bodies parsed |
| Blog detail pages | [Database Transactions](https://planetscale.com/blog/database-transactions), [Problems with large tables in Postgres](https://planetscale.com/blog/dealing-with-large-tables-in-postgres), [PlanetScale for Postgres is now GA](https://planetscale.com/blog/planetscale-for-postgres-is-generally-available), [Benchmarking Postgres 17 vs 18](https://planetscale.com/blog/benchmarking-postgres-17-vs-18), [PlanetScale forever](https://planetscale.com/blog/planetscale-forever), [Report on the 2025-10-20 AWS us-east-1 incident](https://planetscale.com/blog/aws-us-east-1-incident-2025-10-20) | 6 |
| TOC-threshold probes | [$5 PlanetScale](https://planetscale.com/blog/5-dollar-planetscale), [Transparency in benchmarking](https://planetscale.com/blog/transparency-in-benchmarking), [Drizzle joins PlanetScale](https://planetscale.com/blog/drizzle-joins-planetscale) | 3 |
| Case-study index | [/case-studies](https://planetscale.com/case-studies) | 21 rows |
| Case-study detail pages | [Cash App](https://planetscale.com/case-studies/cash-app), [Mintify](https://planetscale.com/case-studies/mintify), [May](https://planetscale.com/case-studies/may), [DAT](https://planetscale.com/case-studies/dat), [PropFuel](https://planetscale.com/case-studies/propfuel), [Flyclops](https://planetscale.com/case-studies/flyclops), [WhyDonate](https://planetscale.com/case-studies/whydonate), [Barstool Sports](https://planetscale.com/case-studies/barstool-sports), [MyFitnessPal](https://planetscale.com/case-studies/myfitnesspal), [Superwall](https://planetscale.com/case-studies/superwall), [Dub](https://planetscale.com/case-studies/dub), [Community](https://planetscale.com/case-studies/community) | 12 |
| This repository | `src/content.config.ts`, `src/lib/content.ts`, `src/components/*.astro`, `src/layouts/BaseLayout.astro`, `src/content/{projects,posts}/en/*.mdx`, `src/styles/global.css`, `src/pages/en/rss.xml.ts` | — |

## Discovery surfaces

### The blog index is a byline-and-promise feed

**Direct observation.** Each row is: a linked `<h2>` title; a category name in square brackets, itself a link to `/blog/category/{slug}`; an author name linking to `/blog/author/{slug}`, followed by that author's X handle in square brackets as an external link; a `<time datetime="YYYY-MM-DD">` element rendering a long-form date; a one-paragraph deck; and a trailing `→` link to the same destination. There is no thumbnail, no read-time estimate, and no tag list beyond the single category. [Blog index](https://planetscale.com/blog)

The filter row is `All | Engineering | Vitess | Product | Tutorials | Company` — five real categories, each a route, not a client-side toggle. Pagination is `Previous`/`Next` over `/blog?page=N`. A visible "Get the RSS feed" link points at `/blog/feed.atom`. [Blog index](https://planetscale.com/blog)

**Direct observation.** The first row on page 1 is dated September 22, 2025, while rows 2 onward run from August 25, 2026 backwards. The index is therefore not purely reverse-chronological; one entry occupies a pinned slot. [Blog index](https://planetscale.com/blog)

**Inference.** The index is a *promise list*. Because there is no cover art competing for attention, the deck is the only thing selling the click, which is why the decks are as carefully constructed as they are.

### The case-study index is a title-and-outcome directory

**Direct observation.** Each row is an `<h2>` link, a platform label (`Vitess` or `Postgres`) rendered as a green `<span>`, and a deck paragraph with a trailing `→`. There is no date, no author, no logo, no image, no filter control, and no pagination — all 21 studies are on one page. `GET /case-studies/feed.atom` returns 404. [Case-study index](https://planetscale.com/case-studies)

**Inference.** The absence of dates is a deliberate durability choice: a customer story does not decay the way a Postgres-19 post does, and showing "2022" would invite the reader to discount it. A portfolio project page has exactly the same property, and this repo currently does the opposite — see the gap analysis.

### Provenance: how `[External]` works

**Direct observation.** Eight of the 21 rows carry a literal `[External]` suffix *inside the link text*, and those anchors have `target="_blank"` and `rel="nofollow noopener noreferrer"` pointing at third-party domains — `intercom.com`, `news.convex.dev`, `vitalize.care`, `depot.dev`, `supermemory.ai`, `blog.opensecret.cloud`, `useautumn.com`, `magicare.ai`. Internal studies link to `/case-studies/{slug}` with no marker and no `target`. [Case-study index](https://planetscale.com/case-studies)

**Careful conclusion.** The label is in the *text*, not only in an icon or a `rel` attribute, so it survives screen readers, plain-text copies, and search snippets. That is the cheap, robust version of provenance and it transfers directly.

### Syndication: one feed, full content

**Direct observation.** `/blog/feed.atom` (and, identically, `/blog/rss.xml`) is an Atom document with `title`, `subtitle`, three `link` elements, `id`, and `updated` at the root, and 25 `<entry>` elements each containing `title`, `link`, `id`, `published`, `updated`, `author`, `category term="…"`, `content` (the complete post body as HTML, including `<iframe>` elements pointing back at same-origin interactive scenes), and `summary` (the deck, verbatim). [Blog feed](https://planetscale.com/blog/feed.atom)

**Direct observation.** The feed link is also present in the rail of every blog detail page inspected, beside the product promotion. [Database Transactions](https://planetscale.com/blog/database-transactions)

## Deck craft, measured

### The two formulas

**Direct observation.** Computed over the 25 `<summary>` values in the feed and the 20 measurable index decks:

| Property | Blog deck (n=25) | Case-study deck (n=20) |
| --- | ---: | ---: |
| Mean words | 21.3 | 12.9 |
| Range (words) | 7–34 | 8–22 |
| Exactly one sentence | 14 | 20 |
| Two or more sentences | 11 | 0 |
| Contains a digit | 3 | 8 |
| Uses "you" / "your" | 12 | 1 |
| Contains "?" | 3 | 0 |

Sources: [blog feed](https://planetscale.com/blog/feed.atom), [case-study index](https://planetscale.com/case-studies).

**Careful conclusion — the case-study deck formula.** `[Subject] [finite verb of change] [magnitude or scope] [displaced alternative or constraint]`, one sentence, third person, under about 20 words. It is the only sentence in the system that is allowed to be an outcome claim without a supporting paragraph, because the body immediately supplies one. The verbs are the tell: "cuts", "saved", "scaled", "eliminated", "migrated", "chose", "switched". Fragments, attributed to [PlanetScale's case-study index](https://planetscale.com/case-studies):

- "DAT handles ~15,000 QPS with 75% less compute" — subject, verb, two magnitudes.
- "In 15 minutes, Barstool Sports saved millions in outage avoidance" — a time bound leading the sentence.
- "How WhyDonate switched from Google Cloud, saved 80+ work hours" — displaced alternative named, then two results.

**Careful conclusion — the blog deck formula.** Either `[Statement of the trap] + [statement of the escape]` in two sentences, or a single sentence naming the mechanism plus its consequence for *your* system. The reader is the grammatical beneficiary. Fragments, attributed to [PlanetScale's blog](https://planetscale.com/blog):

- "Postgres presents pretty predictable performance problems… Sharding solves this." — trap, then escape.
- "Increasing throughput sometimes requires reducing parallelism." — a counter-intuitive inversion, standing alone.
- "Why has it taken so long to get good Postgres sharding?" — a question the second sentence then answers.

**Direct observation — counter-examples exist.** The system tolerates a deck that is purely a joke ("Yo, I heard you liked databases…", 22 words, no payoff stated) and one that is a bare restatement ("Practical patterns for leveraging Database traffic Control", 7 words — the corpus minimum, and the only deck that reads as a placeholder). [Blog feed](https://planetscale.com/blog/feed.atom) A formula with two failures in 25 is a habit, not a gate.

**Direct observation.** For every case study sampled, the index deck is byte-identical to that page's `<meta name="description">` and to its `og:description`; for every blog post, the index deck is byte-identical to the feed's `<summary>`. The deck is one authored field rendered in three or four places.

### Title craft

**Direct observation.** Case-study titles (n=20): 8 contain a digit, 6 begin with "How" or "Why", 7 contain a colon. Blog titles (n=25): 2 contain a digit. [Case-study index](https://planetscale.com/case-studies) [Blog feed](https://planetscale.com/blog/feed.atom)

**Careful conclusion.** Numbers migrate to the *title* in case studies and stay out of it in blog posts. A case-study title is a compressed result — "Cash App: Scaling to 400TiB and 4 million QPS", "DAT cuts compute 75% at 15K QPS". A blog title is a compressed *subject* — "Poisoned Postgres connection pools", "Deadlocks and downtime", "The only scalable delete in Postgres is DROP TABLE". The blog earns attention with the deck; the case study earns it with the title.

## Sectioning grammar

### Case studies: two obligatory phases, everything else optional

**Direct observation.** H2 sequences extracted from twelve detail pages. Word counts are DOM-derived and include the trailing CTA block (roughly 30 words).

| Study | Words | H2s | H2 sequence | Quotes |
| --- | ---: | ---: | --- | ---: |
| [Cash App](https://planetscale.com/case-studies/cash-app) | 1238 | 8 | Background → importance of the DB infrastructure → pain points prior to migrating → Why PlanetScale → Migration and cutover process → Cash App on PlanetScale → support and expertise → An ongoing partnership | 6 |
| [Mintify](https://planetscale.com/case-studies/mintify) | 1658 | 6 | Building the trading terminal → Challenges → Features and capabilities → Choosing PlanetScale → PlanetScale migration → Experiences and impact | 7 |
| [May](https://planetscale.com/case-studies/may) | 1370 | 6 | Challenges and goals → Features and capabilities → Choosing PlanetScale → Solution → PlanetScale installation → Experience and impact | 4 |
| [DAT](https://planetscale.com/case-studies/dat) | 745 | 6 | About DAT → A write-heavy pipeline → Why DAT left Neon → Why PlanetScale → The results after moving → Get started | 3 |
| [PropFuel](https://planetscale.com/case-studies/propfuel) | 1158 | 5 | More than a technology platform → PHP, Laravel, and PlanetScale → Improved support and less downtime → Identifying a single query out of millions → PlanetScale as an extension of the team | 2 |
| [Flyclops](https://planetscale.com/case-studies/flyclops) | 894 | 4 | Challenges and goals → Technology requirements → Solution → Outcomes | 2 |
| [Superwall](https://planetscale.com/case-studies/superwall) | 647 | 4 | PlanetScale at Superwall → Choosing a database platform → Tools to improve product development → Support when it counts | 0 |
| [Dub](https://planetscale.com/case-studies/dub) | 709 | 4 | A fast-moving company requires a powerful database platform → Startup to large scale → A positive developer experience → Documentation and support | 0 |
| [WhyDonate](https://planetscale.com/case-studies/whydonate) | 1100 | 3 | lean team needed an easier-to-use database → GCP's slow speed was affecting their bottom line → Results: increased velocity and the end of tedious DevOps | 2 |
| [MyFitnessPal](https://planetscale.com/case-studies/myfitnesspal) | 717 | 3 | Unfulfilled promises with Amazon RDS → Making the switch → Increased visibility and real-time data strategy | 1 |
| [Barstool Sports](https://planetscale.com/case-studies/barstool-sports) | 846 | 2 | Without DevOps experts, Barstool needed a more powerful database. → Results: Saved money and saved time | 1 |
| [Community](https://planetscale.com/case-studies/community) | 812 | 2 | Planning for scale and finding the limitations of NoSQL → Results: Speed and control | 0 |

**Careful conclusion.** Only two phases appear in all twelve: a **constraint** section (what was binding, and on whom) and an **outcome** section. Everything the earlier note listed as "the arc" is optional and appears at these rates in the sample: an explicit selection/criteria section in 6 of 12; a named migration or cutover section in 5 of 12; a support/relationship section in 5 of 12; a background "About X" section in 6 of 12. Two studies get to two headings and stop.

**Direct observation.** Heading voice splits with length. The short studies write headings as full claim sentences — "Without DevOps experts, Barstool needed a more powerful database." with a terminal period; "GCP's slow speed was affecting their bottom line". The long studies use flat labels — "Background", "Challenges", "Solution", "Outcomes". [Barstool Sports](https://planetscale.com/case-studies/barstool-sports) [Flyclops](https://planetscale.com/case-studies/flyclops)

**Inference.** That inversion is sensible and transferable: with two sections, the headings must carry the argument; with eight, they must be navigable. This portfolio's project pages sit at 5–8 H2s and use the label style — which is the right register for their length.

### Blog posts: statement-led, and the question heading is a genre marker

**Direct observation.** 163 H2s across 25 posts; 6 end with "?". The six are: "What is a data topology?", "What are backups used for?", "What about MySQL?", "How does it know?", "What about everything else?", "What to measure?". [Blog feed](https://planetscale.com/blog/feed.atom)

**Direct observation.** The one post whose headings are systematically question-led is the interactive explainer: [Database Transactions](https://planetscale.com/blog/database-transactions) opens "What is a database transaction?" and then descends through Consistent Reads → Multi-row versioning in Postgres → Undo log in MySQL → Isolation Levels → Concurrent writes → Conclusion, with H3s naming the anomalies. It is not in the 25-post feed window, which is why the corpus rate is so low.

**Direct observation.** Two other heading registers recur. A *narrative* register: "It started in a video game", "Why MySQL got there first", "Build it yourself, then live in it" ([The history of Postgres sharding](https://planetscale.com/blog/the-history-of-postgres-sharding)). And an *extended-metaphor* register, where each heading is a metaphor plus a gloss: "Friends and family: Managing access", "The party: Managing connections", "A large keyring: Performance Implications" ([RLS sounds great until it isn't](https://planetscale.com/blog/rls-sounds-great-until-it-isnt)).

**Careful conclusion.** The rule is not "make headings questions". It is: *the heading sequence must be readable on its own as the argument.* Question form is one way to achieve that and is reserved for pedagogy.

## The case-study rail is a typed field set

**Direct observation.** The rail markup on [DAT](https://planetscale.com/case-studies/dat) is an `<aside class="w-full shrink-0 lg:w-36">` containing two `<svg>` elements — a light-mode and a dark-mode `<use href="/assets/logos-….svg#dat">` sprite reference, each with `aria-label` set to the full study title — followed by `<section class="mt-3 hidden lg:block">` wrapping a plain `<ul>`:

- `~15,000 QPS on PlanetScale Postgres`
- `Rightsized at 75% less compute`
- `2 replicas included at no extra charge`
- `Migration done in one weekend`
- `Previous database: Neon`

**Direct observation.** Across the twelve studies the list items fall into three grammars:

| Grammar | Instances | Examples (attributed to the pages linked) |
| --- | --- | --- |
| Quantified fact | 6 of 12 studies | "30 terabytes of data volume anticipated in < 12 months" ([Mintify](https://planetscale.com/case-studies/mintify)); "3 developers on Mintify's internal team"; "Legacy data lifespan: 11 years" ([Flyclops](https://planetscale.com/case-studies/flyclops)) |
| Qualitative achievement | 7 of 12 | "Achieved power and velocity with PlanetScale" ([MyFitnessPal](https://planetscale.com/case-studies/myfitnesspal)); "Chose PlanetScale for reliability and scalability" ([Dub](https://planetscale.com/case-studies/dub)) |
| Displaced status quo | 6 of 12 | `Previous database:` followed by Neon, Google Cloud Platform, Apache Cassandra, Amazon RDS, Amazon Aurora Serverless |

**Careful conclusion.** `Previous database: X` is the single most portable idea on the page. It is one short line that establishes the baseline against which every claim in the body is measured, and it costs nothing to author. Its portfolio analogue is *the starting condition* — the team size, the deadline, the prior system, the constraint that was actually binding. This repo has no field for it and no place to put it.

**Direct observation.** The outcome `<ul>` is `hidden lg:block`; at a 390px viewport the aside is still `display: block` and 342px wide, the logo renders at ~192px, and the outcome list computes to `display: none`, with no horizontal overflow. On a blog detail page at 390px the aside itself computes to `display: none`. At 1440px both use a 752px article, a 48px gap, and a 288px rail, with 16px monospace body copy and a 16px H1. [DAT](https://planetscale.com/case-studies/dat) [Database Transactions](https://planetscale.com/blog/database-transactions)

## Quote handling

**Direct observation.** Quote counts across the twelve studies: 7, 6, 4, 3, 2, 2, 2, 1, 1, 0, 0, 0. Three studies carry none at all. [Superwall](https://planetscale.com/case-studies/superwall) [Dub](https://planetscale.com/case-studies/dub) [Community](https://planetscale.com/case-studies/community)

**Direct observation.** There are exactly two markup patterns.

1. **Attributed pull quote.** A `<blockquote>` whose final `<p>` is the attribution: `Aaron Young, Engineering Manager`; `Evan Varsamis, Technical Founder and CEO`; `Ahsan Nabi Dar, Co-founder & CTO, DAT Systems`. Every quote in a given study names the *same* person — Cash App attributes all six to Aaron Young, Mintify all seven to Evan Varsamis. [Cash App](https://planetscale.com/case-studies/cash-app) [Mintify](https://planetscale.com/case-studies/mintify) [DAT](https://planetscale.com/case-studies/dat)
2. **Unattributed lift.** A `<blockquote>` containing only the sentence, with the speaker established by the surrounding narration instead — WhyDonate's prose says "As Neils recalls…" in the paragraph immediately after the quote. [WhyDonate](https://planetscale.com/case-studies/whydonate)

**Direct observation.** Position varies. DAT places its first quote *between the H1 and the first H2*, before any narration. Cash App places its deck paragraph, then a quote, then an `<hr>`, then "Background". WhyDonate places quotes mid-section as evidence for the paragraph they interrupt. [DAT](https://planetscale.com/case-studies/dat) [Cash App](https://planetscale.com/case-studies/cash-app)

**Careful conclusion.** The quote is doing one of two jobs: certifying the *judgement* (a lead quote before any argument) or certifying a *specific claim* (a mid-section lift). It is never a decorative restatement of a number already given. And a study with a strong constraint and a clear result can carry zero quotes — three of twelve do.

## Numbers

**Direct observation.** Numbers appear in four places and are used differently in each: in the **title** (8 of 20 case studies), in the **deck** (8 of 20 case studies, 3 of 25 blog posts), in the **rail list** as bare facts, and **inline in prose**. There is no separate "stat block" component in the case-study body — the rail *is* the stat block, and it is the one thing hidden on small screens.

**Direct observation.** Qualification is inconsistent and visible. Some numbers carry a hedge — "~15,000 QPS", "30 terabytes … anticipated in < 12 months", "20-30% by switching". Others are stated flat — "400TiB and 4 million QPS", "8× cost reduction". No number in the sampled rails carries a measurement method or a date. [DAT](https://planetscale.com/case-studies/dat) [Cash App](https://planetscale.com/case-studies/cash-app) [Barstool Sports](https://planetscale.com/case-studies/barstool-sports)

**Inference.** This is the part of the system a portfolio should *improve on*, not copy. A recruiter reading "89.2 SUS score" is entitled to know it came from 7 sessions; a vendor case study can get away with an unsourced "8×" because the customer's name is the warrant. A personal portfolio has no such warrant, so it should attach the method to the number.

## Length distribution

**Direct observation.** Body word counts computed from the feed's `<content>` for the 25-post corpus: minimum 433, maximum 6692, median 2063. Two additional detail pages outside the feed window measure 324 words ([Postgres GA](https://planetscale.com/blog/planetscale-for-postgres-is-generally-available)) and 363 words ([PlanetScale forever](https://planetscale.com/blog/planetscale-forever)). Case studies: 647 to 1658, median about 870.

| Format | Min | Median | Max |
| --- | ---: | ---: | ---: |
| Blog post (25-post corpus) | 433 | 2063 | 6692 |
| Blog post incl. announcements | 324 | — | 6692 |
| Case study (12 sampled) | 647 | ~870 | 1658 |

**Careful conclusion.** The case study is deliberately about *40% the length* of the median blog post. The proof surface is short; the reasoning surface is long. This portfolio currently runs project bodies at 783–1132 words and post bodies at 1078–1482 — a ratio near 85%, meaning the projects are behaving like articles.

## Media inventory

**Direct observation.** Of the 25 corpus posts, 11 embed at least one same-origin interactive `<iframe>`; 7 of those 11 contain no raster images at all. Extremes: [Making 768 servers look like 1](https://planetscale.com/blog/making-768-servers-look-like-1) has 12 iframes and 0 images; [On benchmarking](https://planetscale.com/blog/on-benchmarking) has 14 images and 0 iframes; [Every UPDATE Leaves a Ghost](https://planetscale.com/blog/postgresql-mvcc) has 139 inline `<code>` elements and 22 `<pre>` blocks. [Transparency in benchmarking](https://planetscale.com/blog/transparency-in-benchmarking) has 433 words and zero media of any kind. Case studies in the sample contain zero body images.

**Careful conclusion.** This confirms and sharpens the earlier note: the medium is chosen per-claim, and "no media" is a legitimate outcome. The strongest evidence is that a 433-word post with nothing but prose sits in the same system as a 12-iframe explainer.

## Metadata surface — where this portfolio is already ahead, and where it is behind

**Direct observation.** Every PlanetScale detail page inspected emits: `<link rel="canonical">`, `<meta name="description">`, `og:url`, `og:type`, `og:title`, `og:image`, `og:description`, `twitter:card="summary_large_image"`, `twitter:site`, `twitter:creator`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`. It does **not** emit `article:published_time`, any author meta, or any per-page JSON-LD: the only `application/ld+json` block on a blog post or case study is the site-wide `Organization` object. `og:type` is `website` even on blog posts. [Database Transactions](https://planetscale.com/blog/database-transactions) [Cash App](https://planetscale.com/case-studies/cash-app)

**Direct observation.** `og:image` is a per-slug bespoke asset — `database-transactions-social-….png`, `dat-social-….png`, `whydonate-social-….jpg` — with the generic `social-….png` used as a fallback on the pages that lack one (Cash App, the incident report).

**Direct observation — this repository.** [BaseLayout.astro:63-79](src/layouts/BaseLayout.astro) emits canonical, `hreflang` alternates for `it`/`en`/`x-default`, `og:type`, `og:title`, `og:description`, `og:url`, `og:locale`, `twitter:card="summary"`, and a per-page JSON-LD block. A repo-wide grep for `og:image` returns nothing: **no page on this site emits a social image**, despite every project and post carrying a required `coverImage` ([content.config.ts:14](src/content.config.ts)).

| Field | PlanetScale post | PlanetScale case study | This portfolio |
| --- | --- | --- | --- |
| canonical | yes | yes | yes, [BaseLayout.astro:67](src/layouts/BaseLayout.astro) |
| `og:type` | `website` | `website` | `article` for posts, `website` for projects, [PostDetail.astro:47](src/components/PostDetail.astro) |
| `og:image` / `twitter:image` | per-slug asset | per-slug asset | **absent** |
| `twitter:card` | `summary_large_image` | `summary_large_image` | `summary`, [BaseLayout.astro:78](src/layouts/BaseLayout.astro) |
| `article:published_time` | absent | absent | absent |
| Per-page JSON-LD | absent (Organization only) | absent (Organization only) | `BlogPosting` / `CreativeWork`, [PostDetail.astro:27-36](src/components/PostDetail.astro), [ProjectDetail.astro:33-41](src/components/ProjectDetail.astro) |
| `hreflang` alternates | n/a (monolingual) | n/a | yes, [BaseLayout.astro:68-70](src/layouts/BaseLayout.astro) |
| Feed | Atom, 25 entries, full body + summary + category + author | none (404) | RSS 2.0, title + description + pubDate + link only, [rss.xml.ts:8-19](src/pages/en/rss.xml.ts) |
| Feed discoverable | visible link on index and every post rail | n/a | **no** `<link rel="alternate">`, no visible link anywhere |

**Careful conclusion.** Do not copy PlanetScale's head metadata wholesale; it is missing structured article data that this repo already gets right. Copy exactly two things: the bespoke per-entry social image with `summary_large_image`, and the discoverable, content-rich feed.

## Cross-linking is authored, not generated

**Direct observation.** Per-post outbound link counts over the 25-post corpus: links to `/case-studies` — **0 in every post**; links to `/docs` — 0 to 6, median 1; links to other blog posts — 0 to 6, median 1. [Blog feed](https://planetscale.com/blog/feed.atom)

**Direct observation.** There is no automated "related posts" component on any blog detail page inspected. Related reading is written into the body. [Problems with large tables in Postgres](https://planetscale.com/blog/dealing-with-large-tables-in-postgres) ends with a bordered callout labelled `Note` containing one sentence and one link to the sibling MySQL/Vitess article, and its closing paragraphs link inline to `/blog/what-is-a-data-topology` and to the product.

**Direct observation.** Case studies link outward to the customer's own domain, to `/docs` deep links, and to `/migrate`; all four sampled end with a back-link to `/case-studies` plus sign-up and `/contact`. The Cash App rail carries a single "Update:" line with an external short link to a newer story. [DAT](https://planetscale.com/case-studies/dat) [Superwall](https://planetscale.com/case-studies/superwall) [Cash App](https://planetscale.com/case-studies/cash-app)

**Direct observation.** The blog and the case studies meet at exactly one point: the [Postgres GA announcement](https://planetscale.com/blog/planetscale-for-postgres-is-generally-available) links inline to four third-party customer write-ups. Three of those URLs — Convex, Supermemory, OpenSecret — are byte-identical to `[External]` rows on the case-study index; the fourth (a Medium post) appears only in the announcement.

**Careful conclusion.** Cross-linking is a writing act with a sentence of justification attached, not a component that lists siblings. This portfolio does the opposite: `relatedPostKeys` / `relatedProjectKey` generate an unexplained list. Both are defensible at this scale, but the portfolio should add the *sentence* — see the proposals.

## Author identity

**Direct observation.** The byline is `<a href="/blog/author/{slug}">Name</a> [<a href="https://x.com/handle">@handle</a>] | <time datetime="…">`. Posts carry one to three authors; [Every UPDATE Leaves a Ghost](https://planetscale.com/blog/postgresql-mvcc) credits three. `/blog/author/ben` renders `<h1>Posts by Ben Dicken</h1>` followed by that author's entries in the identical index row format — no bio paragraph, no portrait, no social block beyond the handle in each row. There is no read-time estimate anywhere in the system.

**Inference.** For a single-author portfolio this entire mechanism is dead weight. The one detail worth stealing is the *absence* of a read-time estimate: PlanetScale ships 6692-word posts without one, on the theory that the heading list already tells you the size.

## Table-of-contents behaviour

**Direct observation.** A TOC renders in the rail for posts with 3 H2s ([Transparency in benchmarking](https://planetscale.com/blog/transparency-in-benchmarking), 3 headings and 3 TOC entries; [Postgres GA](https://planetscale.com/blog/planetscale-for-postgres-is-generally-available), 324 words and 3 headings) and does not render for posts with 0 H2s ([$5 PlanetScale](https://planetscale.com/blog/5-dollar-planetscale), [Drizzle joins PlanetScale](https://planetscale.com/blog/drizzle-joins-planetscale), [PlanetScale forever](https://planetscale.com/blog/planetscale-forever)). The TOC includes H3s: the [Database Transactions](https://planetscale.com/blog/database-transactions) rail lists "Phantom reads", "Non-repeatable reads", "Dirty reads" nested under "Isolation Levels".

**Not verified.** Whether the threshold is 1, 2, or 3 headings — no post with exactly 1 or 2 H2s was sampled.

**Direct observation — this repository.** [PostDetail.astro:19-20](src/components/PostDetail.astro) filters to `depth === 2` and requires `tocHeadings.length >= 4`. [global.css:203](src/styles/global.css) and [global.css:236](src/styles/global.css) set `.article-toc { display: none }` at `max-width: 1078px` and again at `max-width: 760px`, matching PlanetScale's "remove the rail rather than compress it" behaviour. Uncommitted work in [ArticleTableOfContents.astro:12-49](src/components/ArticleTableOfContents.astro) adds a `requestAnimationFrame`-throttled scroll-spy that sets `aria-current="location"` on the entry whose heading has crossed a reading line at `min(33vh, 300px)`; [global.css:174-177](src/styles/global.css) renders that state as a 3px bar and a weight change. No active-chapter indicator was observed in PlanetScale's own rail on the pages measured.

**Careful conclusion.** The uncommitted scroll-spy is a genuine improvement over the source being studied, not a copy of it. Keep it. The two things to change are the `>= 4` threshold, which excludes every current project page and two of four posts, and the depth-2-only filter, which drops the H3 layer PlanetScale includes.

## Gap analysis against this portfolio

| # | PlanetScale mechanism (evidence) | What this repo does today | Gap | Proposed change | Worth it? |
| --- | --- | --- | --- | --- | --- |
| 1 | Case-study deck is a single third-person sentence with a finite verb of change; 8 of 20 carry a digit ([index](https://planetscale.com/case-studies)) | `excerpt` is a required string, [content.config.ts:12](src/content.config.ts). All six EN project excerpts open with an indefinite article + category noun: "A C program that…", "A VHDL hardware component that…", "An HCI project that…", "A four-person Java client–server game…", "A small exploration that…", "A focused change…". Zero name an outcome; one carries a digit | The excerpt is a **category label**, not a deck. It answers "what kind of thing is this" — a question the `kind` field and the card's `App · 2023` line already answer twice over | Rewrite all six as `[subject] [verb of change] [magnitude] [constraint]`. Add a schema comment and a lint rule rejecting an excerpt that starts with `A `/`An `/`Un`/`Una ` | **Adopt** |
| 2 | Rail `<ul>` of 2–5 outcome facts, typed and reusable ([DAT](https://planetscale.com/case-studies/dat)) | A `<dl class="project-results">` hand-written as raw HTML inside MDX, present in only 2 of 6 EN projects (galaxy-trucker, spingo). Not a schema field, not on the index card, not in the rail | Outcomes are unqueryable, unvalidated, absent from 4 projects, and invisible on the archive | Add `outcomes: z.array(z.object({ value, label, method }))` to the projects schema; render in the [ProjectDetail.astro:61-72](src/components/ProjectDetail.astro) aside; drop the MDX `<dl>` | **Adopt** |
| 3 | `Previous database: Neon` — one line naming the displaced baseline, in 6 of 12 studies | Nothing. Constraints are buried in the opening blockquote prose | The reader cannot see what the work was measured *against* without reading three paragraphs | Add `startingPoint: z.string().optional()` and render it as the last rail item | **Adopt** |
| 4 | Bespoke `og:image` per slug + `twitter:card="summary_large_image"` | No `og:image` anywhere; `twitter:card="summary"`, [BaseLayout.astro:78](src/layouts/BaseLayout.astro). Every entry already has a required `coverImage`, [content.config.ts:14](src/content.config.ts) | Every shared link renders as a bare text card | Emit `og:image`/`twitter:image` from `coverImage` (absolute URL), switch the card type, add optional `socialImage` override | **Adopt** |
| 5 | Atom feed with `summary`, `category`, `author`, and full `content`; visible "Get the RSS feed" on the index and every post rail | RSS 2.0 with title/description/pubDate/link only, [rss.xml.ts:8-19](src/pages/en/rss.xml.ts); no `<link rel="alternate">` in the head; no visible link on [PostArchive.astro:26](src/components/PostArchive.astro) | The feed exists and is undiscoverable | Add `<link rel="alternate" type="application/rss+xml">` to BaseLayout, a visible link on the Writing archive, and `content` + `categories` to the feed items | **Adopt** |
| 6 | `[External]` inside the link text, plus `rel="nofollow noopener noreferrer"` | `repositoryURL` / `liveURL` render as "GitHub ↗" and "Visit project ↗", [ProjectDetail.astro:68-69](src/components/ProjectDetail.astro), with `rel="noreferrer"` only. SpinGO's links point at `github.com/milenaramosduran/hci-eco` — a teammate's account — with nothing saying so | Destination host and *relationship* are both invisible. On a team project this is the difference between "my repo" and "the team's repo" | Replace the two URL fields with `links: [{ url, label, relationship }]`, render host + relationship, add `rel="noopener noreferrer"` | **Adopt** |
| 7 | TOC renders at 3 headings; includes H3s; rail removed entirely below `lg` | `showTableOfContents = tocHeadings.length >= 4` and `depth === 2` only, [PostDetail.astro:19-20](src/components/PostDetail.astro). Project pages have **no TOC at all** despite 5–8 H2s | Two of four EN posts get no TOC; no project page can get one | Lower to `>= 3`, include depth 3, and add the TOC to [ProjectDetail.astro](src/components/ProjectDetail.astro) | **Adapt** |
| 8 | Case studies carry no date; the index is undated | Project cards render `App · 2023`, [ProjectCard.astro:44](src/components/ProjectCard.astro); `year` is required, [content.config.ts:25](src/content.config.ts) | A 2023 university project is date-stamped for a reader to discount | Keep `year` — for a graduate portfolio a chronology is genuinely informative — but demote it below the outcome in the card's visual order | **Adapt** |
| 9 | Case study ≈40% the length of the median blog post | Project bodies 783–1132 words; post bodies 1078–1482 — a ratio near 85% | Project pages are behaving like articles | Target 600–900 words per project; move the reasoning into a linked post via the existing `relatedPostKeys` | **Adapt** |
| 10 | Cross-links written inline with a sentence of justification; no generated "related" component | `relatedPostKeys` / `relatedProjectKey` generate an unexplained list, [ProjectDetail.astro:16-24,76](src/components/ProjectDetail.astro), [PostDetail.astro:63](src/components/PostDetail.astro), validated in [content.ts:210-235](src/lib/content.ts) | The generated list works; the *reason* to click is missing | Keep the mechanism, add an optional `reason` string per related key, rendered as the list item's second line | **Adapt** |
| 11 | Named, titled customer quote — but only where the narrator cannot say it | Nothing. No quote field, no attribution styling beyond a generic `.prose blockquote`; the leading blockquote is repurposed as a standfirst, [global.css:141,146-148](src/styles/global.css) | No way to carry a supervisor's, teammate's, or tester's assessment with attribution | Add an optional `testimonial: { quote, name, role }` — used at most once per project, and only where honest | **Adapt** |
| 12 | Commercial CTA `<h3>` on every case study; sign-up and `/contact` links | A `mailto:` "Let's talk" button, [ProjectDetail.astro:70](src/components/ProjectDetail.astro) | None. The existing quiet version is correct | No change. Do not add a persuasion block | **Reject** |
| 13 | Six category filter chips over a corpus of hundreds ([blog index](https://planetscale.com/blog)) | Writing archive has no filter, [PostArchive.astro:26](src/components/PostArchive.astro); `tags` exist but only render as a byline string | With four posts, filter chips would be theatre | Revisit above ~15 posts. Not now | **Reject** |
| 14 | Author byline, `/blog/author/{slug}` pages, X handles, multi-author credits | Single-author site; no byline anywhere | None | Do not build author infrastructure | **Reject** |
| 15 | One customer quoted six or seven times in a single study ([Cash App](https://planetscale.com/case-studies/cash-app), [Mintify](https://planetscale.com/case-studies/mintify)) | Nothing | None | Cap at one quote per project. Volume here is testimonial padding | **Reject** |
| 16 | A pinned announcement occupying index row 1 out of date order ([blog index](https://planetscale.com/blog)) | `featuredRank` 1–3, enforced exactly once per locale, [content.ts:196-208](src/lib/content.ts) | None — already solved, and more strictly | No change | **Reject** |
| 17 | Rail outcome list hidden below `lg`; identity kept ([DAT](https://planetscale.com/case-studies/dat)) | `.article-toc { display: none }` below 1078px, [global.css:203,236](src/styles/global.css); the project aside stacks rather than hides | The portfolio's aside is *year/type/role/technologies* — identity, not outcomes — so keeping it on mobile is right | No change to the existing aside; if outcomes are added (row 2), keep them visible on mobile, unlike PlanetScale | **Reject** (the hiding, not the rail) |

### Grading the actual excerpt strings

**Direct observation.** All six EN project excerpts, quoted from the repository:

| File | Excerpt shape | Digit? | Outcome verb? |
| --- | --- | :---: | :---: |
| [galaxy-trucker.mdx](src/content/projects/en/galaxy-trucker.mdx) | "A four-person Java client–server game, followed by…" (25 words) | no | no |
| [highway-route-planner.mdx](src/content/projects/en/highway-route-planner.mdx) | "A C program that manages… then plans the route with the fewest stops" (24 words) | no | no |
| [priority-task-queue-manager.mdx](src/content/projects/en/priority-task-queue-manager.mdx) | "A VHDL hardware component that maintains… through a 15-state FSM" (22 words) | yes | no |
| [spingo-sustainable-micromobility.mdx](src/content/projects/en/spingo-sustainable-micromobility.mdx) | "An HCI project that turns user research… into a mobile ecosystem" (22 words) | no | no |
| [interface-experiment.mdx](src/content/projects/en/interface-experiment.mdx) | "A small exploration that demonstrates visual curiosity and prototyping skill." | no | no |
| [open-source-contribution.mdx](src/content/projects/en/open-source-contribution.mdx) | "A focused change, from understanding the project to responding to review." | no | no |

**Careful conclusion.** 6 of 6 are noun phrases in the shape `A [category] that [does something]`. 0 of 6 state a result. Two are self-assessment rather than description ("demonstrates visual curiosity and prototyping skill") — the one register PlanetScale never uses, because a vendor claiming its own customer was impressive would be worthless.

The post excerpts fare better. [my-first-video-game-was-a-distributed-system.mdx](src/content/posts/en/my-first-video-game-was-a-distributed-system.mdx) — "I expected my first game project to be about rules and interfaces. It taught me instead…" — is 30 words, two sentences, and structurally identical to PlanetScale's trap-then-escape blog deck. [learning-in-public.mdx](src/content/posts/en/learning-in-public.mdx) opens "How to share what you are learning without…", which is the second-person how-to shape, 15 words. The other two revert to "A reflection on…" and "An editorial outline for…".

**Inference.** The portfolio has already discovered the blog-deck formula by instinct in two posts and has never applied the case-study formula at all. That is the sharpest single gap in the system.

### Sectioning: what the repo's own H2 sequences show

**Direct observation.** Extracted from the EN content:

| Page | H2s | Sequence |
| --- | ---: | --- |
| [priority-task-queue-manager.mdx](src/content/projects/en/priority-task-queue-manager.mdx) | 8 | The problem → Four operations, one component → Protocol and external memory → Two-process architecture → A 15-state FSM → The timing problem → Verification and results → What I would carry forward |
| [spingo-sustainable-micromobility.mdx](src/content/projects/en/spingo-sustainable-micromobility.mdx) | 8 | The starting problem → Needfinding and triangulation → From evidence to needs → Three tasks and two directions → From heuristics to high fidelity → Usability testing → The project website → What I would carry forward |
| [highway-route-planner.mdx](src/content/projects/en/highway-route-planner.mdx) | 7 | From specification to problem → Data model → Command handling → The route as an implicit graph → Tied routes → Complexity and trade-offs → What I learned and what I would improve |
| [galaxy-trucker.mdx](src/content/projects/en/galaxy-trucker.mdx) | 5 | The collaborative product → My contribution → Finished scope, archived build → A second pass with Claude → What I would carry forward |

**Careful conclusion.** These are good sequences — statement-led, argument-carrying, in the register PlanetScale uses for its longer studies. The structural gap is not the headings. It is that **the constraint and the outcome are not both surfaced above the fold**: three of four open with a problem section but none has an outcome section that a scanner can find, and "What I would carry forward" is a reflection, not a result. PlanetScale puts the outcome in the title, the deck, and the rail *before* the reader reaches a heading.

## Claims intentionally not made

- Nothing here identifies PlanetScale's CMS, content schema, authoring workflow, editorial review, analytics, or deployment pipeline. A field rendered consistently in three places is evidence of a rendered field, not of a stored one.
- The corpus is a snapshot taken on 2026-08-29: blog index pages 1–2, one category page, one author page, the 25 entries currently in the Atom feed, six blog detail pages, and twelve of the twenty-one case studies. It is not the complete archive, and PlanetScale's older posts may follow different conventions. The counted statistics describe *this* corpus.
- The TOC threshold is bounded, not determined: 3 headings render a TOC, 0 headings do not; 1 and 2 were not tested.
- No claim is made that PlanetScale's decks, titles, or rails are produced by a rule rather than by a house habit. Two of 25 blog decks visibly break the pattern.
- The absence of a `/case-studies` link in 25 posts is a fact about those 25 posts. It is not proof that no PlanetScale post anywhere links to a case study.
- The 390px and 1440px measurements describe the pages inspected on 2026-08-29 and are not a guarantee about other pages or future deploys.
- No word count, heading count, quote count, or media quota is proposed as a target. The observed ranges are wide by design and are reported as ranges.
- Nothing in the proposals section has been implemented; this note changes no code.

## Primary source index

- [PlanetScale blog index](https://planetscale.com/blog) — [page 2](https://planetscale.com/blog?page=2) — [Company category](https://planetscale.com/blog/category/company) — [Posts by Ben Dicken](https://planetscale.com/blog/author/ben)
- [PlanetScale blog Atom feed](https://planetscale.com/blog/feed.atom)
- [PlanetScale case-study index](https://planetscale.com/case-studies)
- Blog detail: [Database Transactions](https://planetscale.com/blog/database-transactions) · [Problems with large tables in Postgres](https://planetscale.com/blog/dealing-with-large-tables-in-postgres) · [PlanetScale for Postgres is now GA](https://planetscale.com/blog/planetscale-for-postgres-is-generally-available) · [Benchmarking Postgres 17 vs 18](https://planetscale.com/blog/benchmarking-postgres-17-vs-18) · [PlanetScale forever](https://planetscale.com/blog/planetscale-forever) · [AWS us-east-1 incident report](https://planetscale.com/blog/aws-us-east-1-incident-2025-10-20) · [Transparency in benchmarking](https://planetscale.com/blog/transparency-in-benchmarking) · [$5 PlanetScale](https://planetscale.com/blog/5-dollar-planetscale) · [Drizzle joins PlanetScale](https://planetscale.com/blog/drizzle-joins-planetscale) · [The history of Postgres sharding](https://planetscale.com/blog/the-history-of-postgres-sharding) · [RLS sounds great until it isn't](https://planetscale.com/blog/rls-sounds-great-until-it-isnt) · [Making 768 servers look like 1](https://planetscale.com/blog/making-768-servers-look-like-1) · [On benchmarking](https://planetscale.com/blog/on-benchmarking) · [Every UPDATE Leaves a Ghost](https://planetscale.com/blog/postgresql-mvcc)
- Case-study detail: [Cash App](https://planetscale.com/case-studies/cash-app) · [Mintify](https://planetscale.com/case-studies/mintify) · [May](https://planetscale.com/case-studies/may) · [DAT](https://planetscale.com/case-studies/dat) · [PropFuel](https://planetscale.com/case-studies/propfuel) · [Flyclops](https://planetscale.com/case-studies/flyclops) · [WhyDonate](https://planetscale.com/case-studies/whydonate) · [Barstool Sports](https://planetscale.com/case-studies/barstool-sports) · [MyFitnessPal](https://planetscale.com/case-studies/myfitnesspal) · [Superwall](https://planetscale.com/case-studies/superwall) · [Dub](https://planetscale.com/case-studies/dub) · [Community](https://planetscale.com/case-studies/community)
- Repository: [content.config.ts](src/content.config.ts) · [content.ts](src/lib/content.ts) · [portfolio.ts](src/lib/portfolio.ts) · [BaseLayout.astro](src/layouts/BaseLayout.astro) · [ProjectDetail.astro](src/components/ProjectDetail.astro) · [ProjectArchive.astro](src/components/ProjectArchive.astro) · [ProjectCard.astro](src/components/ProjectCard.astro) · [PostDetail.astro](src/components/PostDetail.astro) · [PostArchive.astro](src/components/PostArchive.astro) · [PostCard.astro](src/components/PostCard.astro) · [RelatedWritingList.astro](src/components/RelatedWritingList.astro) · [ArticleTableOfContents.astro](src/components/ArticleTableOfContents.astro) · [rss.xml.ts](src/pages/en/rss.xml.ts) · [global.css](src/styles/global.css)
- Predecessor note: [2026-08-28-planetscale-editorial-system.md](docs/research/2026-08-28-planetscale-editorial-system.md) · house-style reference: [2026-08-27-bending-spoons-site-system.md](docs/research/2026-08-27-bending-spoons-site-system.md)

## Proposed changes to this portfolio

Ordered by value per unit of work. Each is `Adopt` (copy the mechanism), `Adapt` (take the idea, change the shape), or `Reject` (named so it is not silently reconsidered). **Nothing below has been implemented.**

### 1. Rewrite all twelve project excerpts as outcome decks — `Adopt`

*Why:* 0 of 20 PlanetScale case-study decks are category nouns; 20 of 20 carry a finite verb of change and 8 carry a digit ([case-study index](https://planetscale.com/case-studies)). All 6 of this repo's EN project excerpts are category nouns and 0 state a result.

Rule to add to the content conventions in [README.md](README.md):

> A project `excerpt` is one sentence, third person, under 25 words, containing a finite verb describing a change and, where one exists, a number. It may not begin with `A `, `An `, `Un `, or `Una `. The `kind` and `year` fields already state the category; the excerpt must not repeat them.

Worked rewrites (English; the Italian pair must be rewritten to match, and [content.ts:145-167](src/lib/content.ts) already enforces shared metadata across the pair):

| File | Now | Proposed |
| --- | --- | --- |
| `priority-task-queue-manager` | "A VHDL hardware component that maintains an ordered task queue in RAM…" | "A 15-state FSM keeps a 31-task priority queue ordered in external RAM, preserving FIFO on ties through one strict comparison." |
| `highway-route-planner` | "A C program that manages service stations and electric vehicles…" | "Binary search over a distance-ordered station array plans the fewest-stop route in either direction while stations and fleets keep changing." |
| `spingo-sustainable-micromobility` | "An HCI project that turns user research, prototyping, and usability testing…" | "109 survey responses and 7 usability sessions turned into a micromobility app scoring 89.2 SUS, with riding interactions moved off the phone." |
| `galaxy-trucker` | "A four-person Java client–server game, followed by…" | "Four people shipped a Socket-and-RMI multiplayer Galaxy Trucker; a later AI-assisted rebuild against the same spec tested what actually made it slow." |

### 2. Promote outcomes from hand-written MDX into the schema — `Adopt`

*Why:* PlanetScale's rail is a typed `<ul>` present on all twelve studies ([DAT](https://planetscale.com/case-studies/dat)); this repo's equivalent is raw HTML pasted into 2 of 6 MDX files (`<dl class="project-results">` in [galaxy-trucker.mdx:32](src/content/projects/en/galaxy-trucker.mdx) and [spingo-sustainable-micromobility.mdx:33](src/content/projects/en/spingo-sustainable-micromobility.mdx)), invisible to the index and to validation.

```ts
// src/content.config.ts — inside the projects schema
outcomes: z
  .array(
    z.object({
      value: z.string().min(1),        // "89.2", "109", "8×", "zero"
      label: z.string().min(1),        // "SUS score", "survey responses"
      method: z.string().min(1).optional(), // "7 moderated sessions, Jan 2026"
    }),
  )
  .max(4)
  .default([]),
```

Render in the [ProjectDetail.astro:61-72](src/components/ProjectDetail.astro) aside above `Year`, and surface the first outcome on the archive card in [ProjectCard.astro:42-45](src/components/ProjectCard.astro). Delete the `<dl>` blocks from the four MDX files (EN and IT). Add `outcomes` to the shared-metadata equality check in [content.ts:154-160](src/lib/content.ts) so the `value` fields cannot drift between locales.

**Improve on the source:** `method` is a field PlanetScale does not have. Its numbers are unsourced because the customer's name is the warrant; a portfolio has no such warrant, and "89.2 SUS score" followed by "7 moderated sessions" is the difference between a claim and evidence. Also keep the outcome list **visible on mobile** — PlanetScale hides it (`hidden lg:block`), which is the wrong trade for a page whose entire job is the outcome.

### 3. Add a starting-point field — `Adopt`

*Why:* `Previous database: Neon` appears in 6 of 12 studies and is the cheapest baseline-setting device in the system ([DAT](https://planetscale.com/case-studies/dat), [Community](https://planetscale.com/case-studies/community)).

```ts
startingPoint: z.string().min(1).optional(), // "Four people, one semester, no prior distributed-systems work"
```

Render as the final rail item in [ProjectDetail.astro](src/components/ProjectDetail.astro), styled like `Previous database:` — a label and a value, not prose.

### 4. Emit social images — `Adopt`

*Why:* every PlanetScale detail page ships a per-slug `og:image` with `twitter:card="summary_large_image"`; this repo emits none, despite a required `coverImage` on every entry ([content.config.ts:14](src/content.config.ts), [BaseLayout.astro:73-79](src/layouts/BaseLayout.astro)).

- Add `socialImage: z.string().min(1).optional()` to `localizedFields`, defaulting to `coverImage`.
- Add an `image` prop to [BaseLayout.astro](src/layouts/BaseLayout.astro); emit `og:image`, `og:image:alt` (from `coverAlt`), and `twitter:image` as absolute URLs built with `new URL(…, siteConfig.siteURL)` exactly as `canonicalURL` already is.
- Change [BaseLayout.astro:78](src/layouts/BaseLayout.astro) to `twitter:card="summary_large_image"`.
- Do **not** copy PlanetScale's `og:type="website"` on articles, and do not drop the per-page JSON-LD in [PostDetail.astro:27-36](src/components/PostDetail.astro) — the repo is already ahead of the source on both.

### 5. Make the feed discoverable and worth subscribing to — `Adopt`

*Why:* PlanetScale's Atom feed carries `summary`, `category`, `author`, and the **full body**, and is linked from the index and from every post's rail. This repo's feeds exist at `/en/rss.xml` and `/it/rss.xml` and are linked from nowhere ([rss.xml.ts:8-19](src/pages/en/rss.xml.ts); no `rel="alternate"` in [BaseLayout.astro](src/layouts/BaseLayout.astro)).

- Add `<link rel="alternate" type="application/rss+xml" title="…" href="/en/rss.xml">` (locale-aware) to the BaseLayout head.
- Add a visible feed link to [PostArchive.astro:26](src/components/PostArchive.astro).
- Add `categories: post.tags` and rendered `content` to the feed items via `@astrojs/rss`'s `content` option.

### 6. Label external destinations and their relationship — `Adopt`

*Why:* PlanetScale writes `[External]` into the link text and pairs it with `rel="nofollow noopener noreferrer"` ([case-study index](https://planetscale.com/case-studies)). This repo renders "GitHub ↗" and "Visit project ↗" with `rel="noreferrer"` only ([ProjectDetail.astro:68-69](src/components/ProjectDetail.astro)) — and SpinGO's `repositoryURL` points at a teammate's GitHub account with nothing indicating that.

```ts
// replaces repositoryURL / liveURL
links: z
  .array(
    z.object({
      url: z.url(),
      label: z.string().min(1),
      relationship: z.enum(['my-repository', 'team-repository', 'live-demo', 'write-up', 'course-page']),
    }),
  )
  .default([]),
```

Render `label`, then the host in a muted mono span, then the relationship. Add `rel="noopener noreferrer"`. Update the URL validity check in [content.ts:135-141](src/lib/content.ts) to walk the array.

### 7. Lower the TOC threshold, include H3s, and give project pages one — `Adapt`

*Why:* PlanetScale renders a TOC on a 324-word post with 3 headings and includes H3s ([Postgres GA](https://planetscale.com/blog/planetscale-for-postgres-is-generally-available), [Database Transactions](https://planetscale.com/blog/database-transactions)). This repo requires `>= 4` depth-2 headings ([PostDetail.astro:19-20](src/components/PostDetail.astro)) and offers no TOC on project pages at all, though they run 5–8 H2s.

```ts
const tocHeadings = headings.filter(({ depth }) => depth === 2 || depth === 3);
const showTableOfContents = tocHeadings.filter((h) => h.depth === 2).length >= 3;
```

Then add `<ArticleTableOfContents />` to [ProjectDetail.astro](src/components/ProjectDetail.astro) using the same rule. **Keep the uncommitted scroll-spy** in [ArticleTableOfContents.astro:12-49](src/components/ArticleTableOfContents.astro) — no active-chapter state was observed in PlanetScale's rail, so this is already better than the source; it just needs an `indent` class for depth-3 entries and a `prefers-reduced-motion` guard on the `transition` in [global.css:175](src/styles/global.css).

### 8. Give the related-content lists a reason — `Adapt`

*Why:* PlanetScale never auto-generates a related list; it writes the link into the prose with one sentence saying why, and closes long posts with a bordered `Note` callout carrying a single sibling link ([Problems with large tables in Postgres](https://planetscale.com/blog/dealing-with-large-tables-in-postgres)).

Keep the generated mechanism — at four posts it is the right cost — but change the shape:

```ts
relatedPostKeys: z
  .array(z.object({ key: z.string().min(1), reason: z.string().min(1) }))
  .default([]),
```

Render `reason` as the second line of each item in [RelatedWritingList.astro:14](src/components/RelatedWritingList.astro) in place of the excerpt, and drop the date from the compact rail variant — a date is not a reason to click. Update the reference validation in [content.ts:218-226](src/lib/content.ts) to read `.key`.

### 9. Tighten project bodies toward 600–900 words — `Adapt`

*Why:* PlanetScale's case-study median is ~870 words against a blog median of 2063 — a ratio of 42%. This repo runs 783–1132 (projects) against 1078–1482 (posts), a ratio near 85%.

Targets: `priority-task-queue-manager` 1132 → ~850, `highway-route-planner` 1097 → ~850, `spingo` 1092 → ~850. The material removed is reasoning, and it already has a home: `relatedPostKeys` exists and is validated. `galaxy-trucker` at 783 words is already the right size and should stay.

### 10. Add an optional single testimonial — `Adapt`

*Why:* the attributed quote is the one evidence type a project author genuinely cannot self-supply, and PlanetScale's best use of it is a lead quote certifying a judgement rather than a number ([DAT](https://planetscale.com/case-studies/dat)). But three of twelve studies carry none, and Mintify's seven quotes from one person are padding.

```ts
testimonial: z.object({ quote: z.string().min(1), name: z.string().min(1), role: z.string().min(1) }).optional(),
```

Hard rule, at most one per project, used only for something the narrator cannot honestly say — a supervisor's assessment, a teammate's account of a handover, a tester's reaction. Never a restatement of a number already in `outcomes`.

### 11. Reject: sales machinery, author infrastructure, and premature taxonomy

- **The commercial CTA block.** Every case study ends with `Your business deserves a predictable database` plus sign-up and contact links. The existing quiet `mailto:` in [ProjectDetail.astro:70](src/components/ProjectDetail.astro) is the correct portfolio equivalent. Add nothing.
- **Category filter chips on Writing.** Justified over hundreds of posts ([blog index](https://planetscale.com/blog)); theatre over four. Revisit above ~15 posts; the `tags` field already exists to make that cheap later.
- **Bylines, `/author/{slug}` routes, X handles, multi-author credits.** Single-author site. Dead weight.
- **Read-time estimates.** PlanetScale ships 6692-word posts without one. Do not add one; the TOC already communicates size.
- **Hiding outcomes below the `lg` breakpoint.** PlanetScale's `hidden lg:block` on the rail list is the wrong trade for a page whose job is the outcome. Keep them visible at every width.
- **Dropping `year` from project cards.** PlanetScale's case studies are undated because age would invite discounting; a graduate portfolio's chronology is genuinely informative. Keep it — just rank it below the outcome in the card ([ProjectCard.astro:42-45](src/components/ProjectCard.astro)).
