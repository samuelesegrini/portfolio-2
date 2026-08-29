# PlanetScale’s blog and case-study editorial system

Date: 2026-08-28
Scope: first-party inspection of the live [PlanetScale blog](https://planetscale.com/blog), [case-study index](https://planetscale.com/case-studies), representative detail pages, their public HTML and metadata, and PlanetScale’s public GitHub organization. This is an audit of the rendered, public system—not a claim about private editorial workflows.

## Bottom line

**Direct observation.** PlanetScale uses two editorial formats with different proof obligations inside a closely related visual shell:

- A technical post helps a reader understand a mechanism. Its evidence is the causal explanation, concrete examples, code, diagrams, and—in some posts—interactive sequences. [Database Transactions](https://planetscale.com/blog/database-transactions) moves from `begin`/`commit` to isolation and concurrent writes, with replayable embedded sessions placed beside the explanations.
- A case study helps a buyer trust that a decision worked in a real setting. Its evidence is the named organization, constraint, migration narrative, customer quotation, operating scale, and claimed outcome. [Cash App](https://planetscale.com/case-studies/cash-app) pairs 400+ shards and 3–4 million QPS with an account of migration, cutover, operations, and attributed testimony.

**Inference for this portfolio.** Keep project pages as compact _proof surfaces_—outcome, role, constraint, decisive design choice, and inspectable evidence. Use an article only when the reader needs the reasoning journey: alternatives, several conceptual steps, a timeline, an experiment, or a reusable lesson. That is the useful PlanetScale pattern; copying its mono typeface is not.

## Scope and source boundary

The two supplied URLs are website sections, not public source repositories. The public HTML explicitly exposes a React Router SSR context/data stream and route-level assets, which identifies the current delivery layer; it does **not** reveal PlanetScale’s CMS, authoring process, design-system source, or deployment pipeline. [Blog public HTML](https://planetscale.com/blog) and [case-study public HTML](https://planetscale.com/case-studies) are the authority for the rendered observations below.

PlanetScale’s public GitHub organization does include content-adjacent repositories—[docs](https://github.com/planetscale/docs), whose description calls it PlanetScale documentation; [vitess-website](https://github.com/planetscale/vitess-website), which identifies itself as the `vitess.io` website; and [core-prettier](https://github.com/planetscale/core-prettier), a shared formatting configuration. The organization’s current public repository listing does not identify a repository for the `planetscale.com` marketing/editorial site. [PlanetScale GitHub organization](https://github.com/planetscale)

Therefore, statements labelled **Direct observation** are supported by the live first-party pages or public response; statements labelled **Inference** are practical conclusions drawn from a repeated sample. They should not be read as declarations of PlanetScale’s internal rules.

## Research sample

| Surface                          | Representative first-party sources                                                                                                                                                                                                                                                                                             | What it establishes                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Blog discovery                   | [Blog index](https://planetscale.com/blog), [Engineering category](https://planetscale.com/blog/category/engineering)                                                                                                                                                                                                          | Filters, authorship, synopsis, RSS, pagination                          |
| Interactive explainer            | [Database Transactions](https://planetscale.com/blog/database-transactions), [Database Sharding](https://planetscale.com/blog/database-sharding)                                                                                                                                                                               | Question-led headings, embedded explanatory sequences, code             |
| Technical / operational argument | [Problems with large tables in Postgres](https://planetscale.com/blog/dealing-with-large-tables-in-postgres), [How PlanetScale makes schema changes](https://planetscale.com/blog/how-planetscale-makes-schema-changes), [Traffic Control deep dive](https://planetscale.com/blog/behind-the-scenes-how-traffic-control-works) | Causal arc, internal-process evidence, diagrams and screenshots         |
| Product announcement             | [Introducing Database Traffic Control](https://planetscale.com/blog/introducing-database-traffic-control)                                                                                                                                                                                                                      | A short launch post can use demonstrations instead of a long tutorial   |
| Case-study discovery             | [Case-study index](https://planetscale.com/case-studies)                                                                                                                                                                                                                                                                       | Company logos, platform labels, outbound stories marked `[External]`    |
| Case-study details               | [Cash App](https://planetscale.com/case-studies/cash-app), [WhyDonate](https://planetscale.com/case-studies/whydonate), [Mintify](https://planetscale.com/case-studies/mintify), [MyFitnessPal](https://planetscale.com/case-studies/myfitnesspal)                                                                             | Outcome-led title/deck, quotes, constraints, criteria, result narrative |

## Shared visual and build grammar

### Reading-first detail pages

**Direct observation.** At a 1440px viewport, inspected detail pages use a 1088px inner flex row: a 752px `ARTICLE`, 48px gap, and 288px rail. Body copy, H1, and H2 resolve to a 16px/24px system-monospace stack. The H1 carries a 2px orange left border; H2s are bold and underlined with a 48px top and 24px bottom margin. The result is hierarchy through weight, underline, colour, spacing, and a small structural mark—not a large display type scale. [Database Transactions](https://planetscale.com/blog/database-transactions) [Cash App](https://planetscale.com/case-studies/cash-app)

**Inference.** This makes diagrams, code, numbers, and quotations the visual peaks. The transferable lesson is restraint: let one piece of evidence be visually important at a time rather than making every heading, card, and image compete.

### Desktop rail versus narrow-screen composition

**Direct observation.** The blog’s public markup makes the detail-page wrapper a vertical layout by default and switches it to `lg:flex-row-reverse`; the TOC wrapper becomes sticky only at `lg`, while its tree navigation is `hidden lg:block`. [Database Transactions](https://planetscale.com/blog/database-transactions) At 390px, the inspected blog has 24px gutters (a 342px article); its aside/TOC is `display: none`, self-hosted iframes shrink to the article width, and the page has no horizontal overflow. No visible replacement TOC control appears at that inspected width. [Database Transactions](https://planetscale.com/blog/database-transactions)

The case-study wrapper likewise starts as `flex-col` and becomes `lg:flex-row-reverse`; its aside is full width by default and a fixed narrow rail at `lg`, while the outcome list is hidden below the large breakpoint. [Cash App](https://planetscale.com/case-studies/cash-app) At 390px, Cash App’s 288px desktop aside reduces to a 45px company-logo treatment before the article; its desktop outcome list is visually hidden. [Cash App](https://planetscale.com/case-studies/cash-app)

**Careful conclusion.** Desktop gives the blog a persistent navigational rail and gives the case study an outcome/identity rail. Below the large breakpoint, both structures become single-column; the blog’s static aside is removed at the inspected 390px width, while the Cash App identity remains in a much smaller form and its outcome list is hidden. This is a useful responsive rule: preserve the reading column first, and either remove or condense secondary material rather than squeezing it beside the prose.

### What public delivery output does—and does not—show

**Direct observation.** The raw responses contain the complete article/case-study content and metadata. They also expose `window.__reactRouterContext` with `ssr: true`, a streamed React Router loader payload, `modulepreload` assets such as `entry.client-*`, route chunks such as `blog._slug-*` and `case-studies._slug-*`, shared component chunks, compiled `styles-*` CSS, Tailwind-style utility classes, and self-hosted interactive scenes at `/blog/.../iframe#...`. [Blog](https://planetscale.com/blog) [Database Transactions](https://planetscale.com/blog/database-transactions) [Cash App](https://planetscale.com/case-studies/cash-app)

The public delivery pattern is therefore:

1. **Server-render the reading and discovery surface.** Titles, decks, article text, case-study copy, canonical links, and social metadata are present in the initial response.
2. **Load shared and route-specific client modules.** The shell, blog route, case-study route, and interactive affordances arrive as separate hashed assets rather than one undifferentiated page bundle.
3. **Keep complex explainers isolated.** Diagram-heavy posts use same-origin iframe documents keyed by fragments such as `#sessions1`; the prose remains ordinary document content while the replayable scene owns its timing and controls. [Database Transactions](https://planetscale.com/blog/database-transactions) [Database Sharding](https://planetscale.com/blog/database-sharding)
4. **Encode layout responsively in the compiled utility layer.** Public classes such as `lg:flex-row-reverse`, `hidden lg:block`, and fixed large-screen rail widths match the measured breakpoint behaviour.

**Not inferred.** Those artifacts identify React Router as part of the public delivery runtime, but they do not expose the private CMS, content schema, component source, editorial review process, deployment workflow, or repository. Public build output is not the authoring system.

### Enrichment follows the claim, not a quota

**Direct observation.** The inspected pages have sharply different media inventories:

| Page                                                                                                         |                                   Current rendered inventory | What the enrichment is doing                                                                                       |
| ------------------------------------------------------------------------------------------------------------ | -----------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------ |
| [Database Transactions](https://planetscale.com/blog/database-transactions)                                  |                 15 same-origin iframe scenes; no body images | Makes sequence, isolation, and concurrent sessions replayable                                                      |
| [Database Sharding](https://planetscale.com/blog/database-sharding)                                          |                 19 same-origin iframe scenes; no body images | Reuses a visual system while progressively adding proxies, shards, distribution, replication, and failure concerns |
| [Problems with large tables in Postgres](https://planetscale.com/blog/dealing-with-large-tables-in-postgres) | 7 iframe scenes, 1 comparison table, 29 inline-code elements | Mixes mechanism diagrams with one exact repeated comparison and syntax-level evidence                              |
| [Cash App](https://planetscale.com/case-studies/cash-app)                                                    |            6 blockquotes, 4 lists, no body images or iframes | Treats attributed testimony, evaluation criteria, and operating outcomes as the evidence                           |

The counts are a dated DOM inventory, not a publishing formula. Their significance is the contrast: interaction appears where time or state changes are hard to explain; a table appears where repeated criteria need alignment; screenshots appear at the step they verify in [How PlanetScale makes schema changes](https://planetscale.com/blog/how-planetscale-makes-schema-changes); and customer stories can remain visually sparse because quotations and quantified outcomes already carry the proof.

**Inference.** PlanetScale’s useful enrichment rule is not “add an image every few paragraphs.” It is “choose the least expensive medium that makes this particular claim inspectable, then place it next to the claim.”

### Site shell and semantic metadata

**Direct observation.** Both formats share global navigation, a substantial footer, canonical URLs, description metadata, and Open Graph/Twitter large-image metadata. See the public metadata on [Database Transactions](https://planetscale.com/blog/database-transactions) and [Cash App](https://planetscale.com/case-studies/cash-app). This means the detail page is designed both for in-site reading and for an identifiable shared link.

**Practical lesson.** Give every portfolio project and article a useful one-sentence description, canonical/localized URL, and intentional social image. These are discovery assets, not optional polish.

## Discovery and index design

### Blog: a filterable, text-led feed

**Direct observation.** The blog index offers All, Engineering, Vitess, Product, Tutorials, and Company filters, an RSS feed, and explicit Previous/Next pagination. Each visible entry provides a title, category, author (sometimes more than one), date, one-sentence deck, and a small arrow link; entries are separated by rules rather than thumbnail cards. [Blog index](https://planetscale.com/blog)

**Inference.** The index makes the promise of the post—not cover art—the primary discovery device. The strongest decks say what the reader will learn or solve: for example, the index describes [Making 768 servers look like 1](https://planetscale.com/blog/making-768-servers-look-like-1) as making many distinct Postgres servers appear as one database to applications.

### Case studies: a directory that makes provenance visible

**Direct observation.** The case-study index lists a company logo, title, database family (Vitess or Postgres), and outcome-oriented deck per entry. It links both PlanetScale-hosted studies and third-party stories, visibly labelling outbound entries `[External]`. [Case-study index](https://planetscale.com/case-studies)

**Inference.** That label is a modest but meaningful trust signal: external proof is welcome, but its ownership is not blurred. For the portfolio, link a live product, repository, write-up, or collaborator quote when it is useful—but label the destination and its relationship to the work clearly.

## How the blog writes and structures an explanation

### 1. Open with a concrete technical tension

**Direct observation.** The articles open with a problem or mechanism instead of a long company preamble. [Problems with large tables in Postgres](https://planetscale.com/blog/dealing-with-large-tables-in-postgres) starts from the predictable operational consequences of large tables; [Making 768 servers look like 1](https://planetscale.com/blog/making-768-servers-look-like-1) leads with the number and the scaling premise; [How PlanetScale makes schema changes](https://planetscale.com/blog/how-planetscale-makes-schema-changes) states that it will expose the company’s current process.

**Inference.** A good portfolio article should start with the precise tension: “we had a state-ordering bug,” “the route graph made the UI choice hard,” or “one observation invalidated the first interaction model”—not “this article is about my project.”

### 2. Let headings be the reader’s next question

**Direct observation.** The [Database Transactions](https://planetscale.com/blog/database-transactions) TOC progresses from “What is a database transaction?” to consistent reads, engine-specific mechanisms, isolation levels, concurrent writes, and conclusion. The body follows that ordering. [Database Sharding](https://planetscale.com/blog/database-sharding) uses the same question-led, progressive structure.

**Inference.** Write headings as a sequence of questions the previous section creates. A TOC is valuable only when it reveals that sequence; it is not a decorative requirement for a short personal post.

### 3. Establish causality before prescribing a solution

**Direct observation.** The large-tables article links workload characteristics and database behaviour to operational consequences before comparing remedies. [Problems with large tables in Postgres](https://planetscale.com/blog/dealing-with-large-tables-in-postgres) The transactions article changes one condition at a time—commit versus rollback, then two sessions, then isolation anomalies—to explain what each database guarantee means. [Database Transactions](https://planetscale.com/blog/database-transactions)

**Inference.** The recurring PlanetScale rhythm is `condition → mechanism → consequence → trade-off or action`. It is stronger than a feature list because the reader can test the logic against their own situation.

### 4. Attach claims to inspectable evidence

**Direct observation.** PlanetScale uses SQL and replay controls when sequence matters in [Database Transactions](https://planetscale.com/blog/database-transactions); progressive diagrams and SQL examples in [Database Sharding](https://planetscale.com/blog/database-sharding); and workflow screenshots placed alongside the relevant steps in [How PlanetScale makes schema changes](https://planetscale.com/blog/how-planetscale-makes-schema-changes). The Traffic Control deep dive uses diagrams for its rule and queueing explanations. [Behind the scenes: How Database Traffic Control works](https://planetscale.com/blog/behind-the-scenes-how-traffic-control-works)

**Inference.** Choose the cheapest medium that makes the specific assertion inspectable:

| If the difficult thing is… | Use…                                 | Portfolio example                                          |
| -------------------------- | ------------------------------------ | ---------------------------------------------------------- |
| Order or concurrency       | Timeline / replayable sequence       | action → server validation → state update → broadcast      |
| Structural ownership       | Small architecture slice             | the one boundary discussed in the paragraph                |
| A change over time         | Before/after pair with fixed objects | old versus new queue insertion                             |
| Exact criteria             | Comparison table                     | alternatives against the same constraints                  |
| Interface evidence         | Cropped annotated screenshot         | a workflow decision, with 2–4 callouts                     |
| A code-level decision      | Short excerpt                        | the invariant or API boundary, followed by its consequence |

### 5. Close by compressing the model and routing the reader

**Direct observation.** The Traffic Control deep dive concludes by tying the system’s parts together, while the schema-change post routes readers to the related public workflow and documentation. [Traffic Control deep dive](https://planetscale.com/blog/behind-the-scenes-how-traffic-control-works) [How PlanetScale makes schema changes](https://planetscale.com/blog/how-planetscale-makes-schema-changes)

**Inference.** End an article with the model the reader should retain and the next useful link—back to the project, a repository, a demo, or a narrower follow-up—not a generic “thanks for reading.”

## How case studies write and structure a decision

### Evidence comes before the full backstory

**Direct observation.** [Cash App](https://planetscale.com/case-studies/cash-app) leads with a scale-and-outcome title, a short result deck, an attributed customer quote, and rail outcomes before its background section. [WhyDonate](https://planetscale.com/case-studies/whydonate) likewise leads with zero downtime, cost reduction, and saved work hours in its title/deck. [Mintify](https://planetscale.com/case-studies/mintify) frames the story around 30TB and more than two trillion records.

**Inference.** A project page should lead with the result or most interesting constraint, then supply context. A recruiter should not need to read three paragraphs to discover what changed.

### The arc is semantic, not a fixed template

**Direct observation.** Cash App is organized as background, infrastructure importance, pre-migration pain points, selection, migration/cutover, current operation, support, and ongoing partnership. [Cash App](https://planetscale.com/case-studies/cash-app) Mintify makes challenges and requirements more explicit. [Mintify](https://planetscale.com/case-studies/mintify) WhyDonate is shorter and concentrates on the lean team’s database constraints and results. [WhyDonate](https://planetscale.com/case-studies/whydonate)

**Inference.** The reusable arc is:

`context → constraint → failed/insufficient status quo → criteria → decision or migration → observable outcome → what is now easier`

Use only the phases that carry evidence. Do not manufacture a “migration” section for a student project that had no migration.

### Narrator and customer voice do different work

**Direct observation.** Cash App’s narrator explains scale, operational complexity, and the cutover; attributed quotations supply the customer’s judgement about expertise, compliance, and the uneventful cutover. [Cash App](https://planetscale.com/case-studies/cash-app) The index and detail pages also distinguish PlanetScale-hosted stories from external publications. [Case-study index](https://planetscale.com/case-studies)

**Inference.** Use a quote only when it adds a perspective you cannot honestly narrate yourself—collaborator feedback, a user reaction, or a supervisor’s assessment. Do not turn a metric already shown in the body into a quotation-shaped decoration.

### The CTA is part of the format, but not necessarily transferable

**Direct observation.** The Cash App study ends with a commercial PlanetScale CTA after a back-to-index link. [Cash App](https://planetscale.com/case-studies/cash-app)

**Inference.** A portfolio’s equivalent is a quieter next step: source code, a playable build, a detailed article, or contact. Preserve the navigation function; do not imitate the sales copy.

## Direct comparison

| Dimension              | Technical blog                                                               | Case study                                                                    |
| ---------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Reader’s job           | Understand a mechanism or make a technical decision                          | Judge whether a similar decision succeeded in a real context                  |
| Opening proof          | Concrete problem, question, number, or promise                               | Outcome-led title/deck plus named organization and scale                      |
| Narrative engine       | Condition → mechanism → consequence                                          | Context → constraint → decision → outcome                                     |
| Strongest evidence     | Code, diagrams, interactive sequence, screenshot, precise comparison         | Metrics, customer quotations, stated criteria, migration/operations narrative |
| Desktop auxiliary area | Sticky, question-led TOC and contextual promotion on the inspected blog page | Outcome bullets/identity context on the inspected case-study page             |
| Enrichment density     | Can be high when each visual carries a local explanatory load                | Usually lower; the customer’s proof and quotations do more of the visual work |
| Ending                 | Synthesized model and next technical action                                  | Result/relationship and a commercial next action                              |

The comparison is based on the inspected [blog sample](https://planetscale.com/blog) and [case-study sample](https://planetscale.com/case-studies), not a claim that every historic PlanetScale page follows every row.

## Practical editorial rules for this portfolio

1. **Separate the proof surface from the reasoning surface.** Let a project page answer: what was built, what made it difficult, what you owned, the crucial decision, and what evidence supports the result. Link to an article when the explanation needs several logical moves. This follows the observed blog/case-study division. [Blog index](https://planetscale.com/blog) [Case-study index](https://planetscale.com/case-studies)
2. **Write outcome-oriented decks.** State the change or reader payoff in one sentence. Do not use a category label as the deck. PlanetScale’s blog decks and case-study summaries make the promised payoff visible before the click. [Blog index](https://planetscale.com/blog) [Case-study index](https://planetscale.com/case-studies)
3. **Use one compact visual with a sentence-level job.** A project page usually needs one clear flow, before/after, or annotated screen—not a gallery. Put deeper diagrams and timelines in the article where the reader has the surrounding explanation. [Database Transactions](https://planetscale.com/blog/database-transactions) [How PlanetScale makes schema changes](https://planetscale.com/blog/how-planetscale-makes-schema-changes)
4. **Put evidence near the claim.** Follow a statement about an algorithm, UI decision, or system boundary immediately with the small diagram, test result, demo, or code link that makes it credible. Do not collect all media in a detached “gallery.” [Database Sharding](https://planetscale.com/blog/database-sharding)
5. **Add a TOC only when it improves route-finding.** The PlanetScale blog uses it for a substantial, nested technical explanation and removes the visible rail at the inspected 390px width. A short project story benefits more from clean section names and a strong deck. [Database Transactions](https://planetscale.com/blog/database-transactions)
6. **Treat responsive composition as content editing.** At narrow widths, remove the permanently visible rail before compressing the article; then decide explicitly whether the article is short enough without a replacement control. PlanetScale’s large-breakpoint layout changes show the first half of that rule directly. [Database Transactions](https://planetscale.com/blog/database-transactions) [Cash App](https://planetscale.com/case-studies/cash-app)
7. **Show provenance.** Label external demos, sources, and customer/collaborator material clearly. PlanetScale’s `[External]` case studies demonstrate the pattern. [Case-study index](https://planetscale.com/case-studies)

## Claims intentionally not made

- The public pages do not verify PlanetScale’s CMS, repository, content model, review process, analytics, A/B testing, or deployment workflow.
- A public-repository search found no identified `planetscale.com` editorial-site repository; absence from the public organization listing is not proof that no private or differently owned repository exists. [PlanetScale GitHub organization](https://github.com/planetscale)
- The 390px and 1440px measurements describe the inspected pages on 2026-08-28. They are not a guarantee that every historic page or future deployment has identical geometry or interaction states.
- No universal target word count, H2 count, media quota, or image cadence is claimed. The sample itself ranges from short announcement to long technical explainer. [Introducing Database Traffic Control](https://planetscale.com/blog/introducing-database-traffic-control) [Database Transactions](https://planetscale.com/blog/database-transactions)

## Primary source index

- [PlanetScale blog](https://planetscale.com/blog)
- [PlanetScale case studies](https://planetscale.com/case-studies)
- [Database Transactions](https://planetscale.com/blog/database-transactions)
- [Database Sharding](https://planetscale.com/blog/database-sharding)
- [Problems with large tables in Postgres](https://planetscale.com/blog/dealing-with-large-tables-in-postgres)
- [How PlanetScale makes schema changes](https://planetscale.com/blog/how-planetscale-makes-schema-changes)
- [Behind the scenes: How Database Traffic Control works](https://planetscale.com/blog/behind-the-scenes-how-traffic-control-works)
- [Introducing Database Traffic Control](https://planetscale.com/blog/introducing-database-traffic-control)
- [Cash App case study](https://planetscale.com/case-studies/cash-app)
- [WhyDonate case study](https://planetscale.com/case-studies/whydonate)
- [Mintify case study](https://planetscale.com/case-studies/mintify)
- [MyFitnessPal case study](https://planetscale.com/case-studies/myfitnesspal)
- [PlanetScale GitHub organization](https://github.com/planetscale)
- [PlanetScale docs repository](https://github.com/planetscale/docs)
- [PlanetScale Vitess website repository](https://github.com/planetscale/vitess-website)
- [PlanetScale shared Prettier configuration](https://github.com/planetscale/core-prettier)
