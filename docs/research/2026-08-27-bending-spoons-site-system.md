# Bending Spoons website system research

Date: 2026-08-27  
Scope: visual and structural inspection of the three confirmed core first-party routes: [Home](https://bendingspoons.com/), [Careers](https://bendingspoons.com/careers), and [Events](https://bendingspoons.com/events). The shared navigation and footer provide the route map used here.

## Executive finding

Bending Spoons does **not** repeat one page template. It repeats a restrained shell—typefaces, navigation behavior, footer, rounded geometry, and a small color vocabulary—while giving each route a different content engine. Home is cinematic and product-led; Careers is a long editorial narrative; Events is an efficient directory. That separation is the strongest idea to transfer to the portfolio.

The earlier concepts felt unlike a production website because they treated “Bending Spoons-inspired” as a visual theme. The real system is architectural: consistent foundations, route-specific hierarchy, and sections chosen to perform a job.

## Route map and layout roles

| Route | Page job | Section and layout system | Responsive behavior |
|---|---|---|---|
| [Home `/`](https://bendingspoons.com/) | Establish scale, products, and company character | Full-viewport black hero; scroll-led product panorama and business statement; white two-column product showcase; charcoal technology grid; black horizontal interview rail; acid-green proof/CTA scene; shared black footer | The 100px desktop hero becomes roughly 45px and the product grid collapses from two columns to one. Cards retain their individual colors and large media, so mobile feels like the same system rather than a reduced desktop page. |
| [Careers `/careers`](https://bendingspoons.com/careers) | Persuade through challenge, evidence, growth, and benefits | White hero with a rounded photo rail; several connected green narrative scenes; career-growth profile cards; soft-gray team-feat and benefit sections; green document directory and recruitment CTA | Centered section headings shrink from roughly 67px to 36px. Profile, proof, and document layouts become a deliberate linear sequence, with the statement appearing before the evidence. The fixed CTA remains immediately available. |
| [Events `/events`](https://bendingspoons.com/events) | Let visitors scan availability and compare events | Soft-gray directory page; headline and upcoming-status message; asymmetric event-photo composition; constrained list of white event cards; black footer | Desktop uses full navigation and compact multi-column information inside each card. Mobile swaps to a hamburger and each event becomes a tall single-column card: identity, summary, location/date, state, then link. |

## Shared visual system

Typography carries most of the identity. [All three routes](https://bendingspoons.com/) use Instrument Sans for navigation, display headings, body copy, and controls. Instrument Serif appears selectively—often italic—for one phrase inside a large sans-serif sentence or for named concepts. This creates contrast without adding ornamental components. The hierarchy is broad but disciplined: approximately 100px H1s and 67px section headings on desktop, compressing to about 45–48px and 36px on mobile.

The shared palette is similarly small: black, white, soft gray (`#f6f6f6`), charcoal (`#252525`), and a light acid green (`#c7ff9f`), with route or product imagery supplying secondary color. Background changes are full-bleed and abrupt. There are almost no decorative section dividers; the color cut **is** the transition.

Geometry is friendly but not uniformly card-like. Primary CTAs are compact pills. Content cards use generous rounded corners, while full-width narrative scenes remain unboxed. Desktop pages generally use 48–64px outer gutters and centered content bands; mobile commonly uses about 24px. The [Events list](https://bendingspoons.com/events), for example, is a narrow centered column rather than a viewport-wide grid, making dense metadata easier to scan.

Navigation adapts to page purpose. [Home](https://bendingspoons.com/) and [Careers](https://bendingspoons.com/careers) prioritize one persistent action on the right. [Events](https://bendingspoons.com/events) exposes the broader route navigation on desktop and a hamburger on mobile. Across routes, the header stays fixed and translucent while the content changes beneath it. The shared black footer is intentionally oversized: utility links occupy the upper grid, while the large wordmark and “Impossible. Maybe.” close the experience as a final brand scene.

## Section choreography

The key rhythm is not “large section after large section.” It is **statement → evidence → change of interaction**.

- Home moves from a single proposition to scale metrics, then richly illustrated product cards, abstract technical concepts, interviews, and external proof.
- Careers moves from emotional promise to an uncompromising manifesto, then individual outcomes, team outcomes, tangible benefits, working documents, and application.
- Events uses much less theater: current status, human atmosphere through photography, then a repeated comparison unit.

Media also changes with the information. Product improvements use large interface imagery; career growth uses portraits; company culture uses candid photography; technologies use abstract illustrations; event discovery uses an editorial mosaic followed by textual cards. The site does not force every asset into the same aspect ratio or component.

## Transferable principles for the portfolio

1. **Share foundations, not complete page templates.** Keep one header, footer, type system, color tokens, button language, gutters, and radius scale. Let each portfolio route choose the layout that best serves its content.
2. **Give every page one dominant job.** Home should establish positioning; Projects should support scanning and filtering; project details should explain decisions and outcomes; About should build a personal narrative.
3. **Build sections as full-width scenes with constrained inner layouts.** Alternate background fields and content modes instead of placing every block in a floating card.
4. **Pair each major claim with a specific proof form.** Use a product screenshot for implementation, a metric for impact, a diagram for architecture, and a short quote or role marker for context.
5. **Use repetition only where comparison matters.** A project directory benefits from consistent cards, like Events. A case study benefits from varied editorial sections, like Careers. Home benefits from a few memorable visual set pieces.
6. **Preserve hierarchy on mobile.** Collapse two-column evidence into one column, but keep the statement-first order, strong gutters, large media, and route-level CTA.
7. **Treat motion as emphasis, not structure.** Scroll effects may reveal or transition evidence, but the content order and meaning must remain clear without animation.

The correct portfolio-wide interpretation is therefore not to copy the green palette or reproduce the Careers page everywhere. It is to create a dependable shared shell and three or four genuinely different page compositions, each unmistakably part of the same site.
