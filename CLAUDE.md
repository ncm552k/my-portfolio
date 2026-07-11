# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # dev server at http://localhost:3000
npm run build         # production build
npm start             # serve production build
npm run lint          # eslint
npm run lint:fix      # eslint --fix
npm run prettier      # prettier check
npm run prettier:fix  # prettier write
```

No test suite exists.

## Architecture

Single-page personal portfolio. Next.js 15 App Router + TypeScript + React 19. `@/*` path alias maps to repo root.

**Content/component split** — all site text (contact, skills, experience, education, projects) lives in `data/resume.ts` as typed exports. Components import these and render them. To change site content, edit `data/resume.ts`, not components.

**Feature structure** — route composition is in `app/page.tsx`, but homepage sections live under `features/homepage/components/` and are exported by `features/homepage/index.ts`. Add future feature-specific components under `features/<feature-name>/` rather than putting page-specific pieces in shared `components/`.

**Shared components** — `components/basics/` holds small primitives and shadcn/ui components (this is the shadcn `ui` alias target in `components.json`). `components/modules/` is for larger shared compositions built from basics. `components/icon/` holds inline SVG icon components, one icon per file; import icons directly from their files.

**Page composition** — `app/page.tsx` renders `Header`, `Hero`, `Skills`, `Experience`, `Education`, `Projects`, and `Contact` from `@/features/homepage`. Scroll-revealed blocks wrap their content with `@/components/modules/Reveal`; there is no page-level dummy mount.

**Styling** — Tailwind v4 is enabled through `app/tailwind.css` and `postcss.config.mjs`. shadcn theme tokens live in `app/tailwind.css`. Existing custom design styles live in `app/globals.scss`; `app/layout.tsx` imports Tailwind first, then globals so custom styles win cascade. Fonts load via `next/font/google` in `app/layout.tsx` (Sora, IBM Plex Sans, IBM Plex Mono), exposed as CSS variables `--font-sora`, `--font-plex-sans`, `--font-plex-mono` on `<body>`.

**Lint/format** — ESLint flat config is in `eslint.config.mjs`, adapted from `ncm552k/my-source-base`; Next 15's legacy `next/core-web-vitals` config is loaded through `FlatCompat`. Prettier config is in `.prettierrc`; imports are sorted by `eslint-plugin-simple-import-sort`.

**Client components** (marked `'use client'`):
- `features/homepage/components/CodingBoy3D.tsx` — Three.js hero scene built from primitives (cartoon boy typing on laptop), typing animation, drag-to-rotate. Imperative Three.js in a `useEffect`. Respects `prefers-reduced-motion`.
- `components/modules/Reveal.tsx` — wrapper component (`<Reveal className="...">...</Reveal>` or `<Reveal as="article">...</Reveal>`) that observes its own element and adds `.in` when visible. Reduced-motion users get it revealed immediately.

All other components are server components.

**Images and links** — skill icons render with `next/image` from `cdn.simpleicons.org`; that host is whitelisted in `next.config.mjs`. Keep `mailto:`, external `target="_blank"`, and hash anchor links as normal `<a>` tags; use Next `<Link>` only for internal route navigation.
