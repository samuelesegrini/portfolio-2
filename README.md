# Bilingual editorial portfolio

An employer-focused Astro portfolio with Italian as the default language, localized English routes, strict MDX content validation, and a Git-backed TinaCMS editor.

The checked-in writing, identity, profile links, project outcomes, and artwork are explicit preview fixtures. Production deployment is intentionally blocked until they are replaced with real bilingual content and both CV files.

## Local development

Requires Node 22 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:4321/it/`. To edit content with the local TinaCMS UI, run `npm run dev:cms` and open `/admin/`.

Copy `.env.example` to `.env` when configuring TinaCloud or a real canonical origin. Never commit the Tina token.

## Content model

- Projects live in `src/content/projects/{it,en}`.
- Articles live in `src/content/posts/{it,en}`.
- About pages live in `src/content/pages`.
- `translationKey` pairs independently localized slugs.
- A non-draft entry is valid only when its non-draft translation exists.
- The homepage must contain ranks 1, 2, and 3 exactly once per locale.
- Cross-language metadata and related-content keys are validated during every build.

TinaCMS exposes the same fields at `/admin/`. Saving incomplete or invalid bilingual content can fail a preview build; Cloudflare keeps the last successful production deployment.

## Verification

```sh
npm run verify
npm run build
npm run lighthouse
```

`verify` runs Astro Check, Vitest, Playwright, the static production build, and internal-link checking. The separate Lighthouse CI command enforces 90 or better for performance, accessibility, best practices, and SEO on representative pages.

## Cloudflare Pages

Connect the GitHub repository in Cloudflare Pages and configure:

- Production branch: `main`
- Build command: `npm run verify && npm run build`
- Build output: `dist`
- Node version: `22`
- Environment variables: `PUBLIC_SITE_URL`, `TINA_PUBLIC_CLIENT_ID`, `TINA_TOKEN`, and `GITHUB_BRANCH=main`

Branch deployments remain previews. On `main`, `npm run launch:check` blocks the build while placeholder mode, demonstration copy, missing Tina credentials, a placeholder origin, or either CV PDF remains.

Before public launch, replace all fixture content and profile values, set `isPlaceholder: false` in `src/config/site.ts`, add `public/cv/cv-it.pdf` and `public/cv/cv-en.pdf`, and set the real Cloudflare-provided origin.
