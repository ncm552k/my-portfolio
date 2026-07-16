# Portfolio Redesign — Dark Amber Two-Column Layout

**Date:** 2026-07-16
**Source design:** `design/Portfolio.dc.html` (Claude artifact)
**Goal:** Port the new dark two-column design into the Next.js codebase. Keep all existing real content (name, role, Hanoi location, real email/phone/socials, real experience, real projects). Drop the design's placeholder content (Alex Rivera, San Francisco, fake stats).

## Summary

Replace the current light cobalt single-column portfolio with the new dark, amber-accented, two-column layout: a left sticky profile card, a right main content column of 5 sections, and a fixed right-edge dot-rail nav. Faithful visual port of the source design; content comes from `data/resume.ts`.

## Decisions (locked)

- **3D / showreel:** Full port — drop the Three.js `CodingBoy3D` hero and the showreel placeholder entirely. Remove the `three` dependency.
- **Stat cards:** Dropped (no "Projects shipped / Experience / Repos" counters).
- **Contact:** Keep existing mailto + social buttons; do NOT build the contact form.
- **Portrait:** Styled placeholder box (initials/name) for now; real photo swapped in later.
- **Tech stack:** Port the pinned-scroll dual carousels; flatten skills into icon tiles (tech only — drop the two spoken-language rows). Emoji-only skills render as emoji tiles.
- **Card meta:** Hanoi location + live clock (`Asia/Ho_Chi_Minh`) + "Available for new projects" availability badge.
- **Projects:** Row layout with title, year, description, link, and tech-tag chips. Drop the bullet lists from render.
- **Sections:** 5 rail items — Introduction, Education & Experience (merged), Tech Stack, Projects, Contact.
- **Profile card socials:** 4 dots — GitHub, LinkedIn, Email (mailto), Phone (tel:).
- **Experience section:** Accordion rows — each job collapses to role/company/period; expanding reveals its bullets. Education is a plain static row (no bullets).

## Architecture

Approach **A — feature-split client components.** Server components render static content from `data/resume.ts`; small isolated `'use client'` modules handle each interactive concern. Matches CLAUDE.md conventions (content in `data/`, feature components under `features/homepage/`, shared primitives reused). Keeps the tricky pinned-scroll logic isolated and testable.

### Page shell — `app/page.tsx`

Two-column CSS grid (`360px 1fr`, gap ~72px, max-width ~1280px) inside a dark root. Renders:

- `<SectionRail />` — fixed right-edge dot nav (own stacking context).
- Left column: `<ProfileCard />` (sticky).
- Right column `<main>`: `<Introduction />`, `<ExperienceEducation />`, `<TechStack />`, `<Projects />`, `<Contact />`.
- Footer line inside contact section.

Responsive: below ~900px collapse to single column; rail may hide on small screens (match source breakpoints).

## Components

All under `features/homepage/components/` unless noted. Exported via `features/homepage/index.ts`.

### `ProfileCard.tsx` (client — live clock)
Left sticky card. Contents:
- Portrait placeholder: diagonal-stripe box, radial glow, `portrait.jpg` label, initials/name overlay.
- Availability badge: pulsing green dot + `contact.availability`.
- Name (`contact.name`), role (`contact.role`).
- Email line (`mailto:`), location sub-line.
- 4 social dots: GitHub, LinkedIn, Email (mailto), Phone (tel:). Reuse `components/icon/` SVGs where available; add small inline labels/icons for email/phone as needed.
- "Get in touch" pill → `mailto:${contact.email}`.
- Footer meta: `Hanoi, Vietnam · <clock>`.
- Clock: `setInterval` updating every ~20s, formatted `en-US` `hour:'numeric', minute:'2-digit'`, `timeZone: contact.timezone`. Guard with try/catch fallback. Clear interval on unmount.

### `SectionRail.tsx` (client)
Fixed right-edge vertical nav, 5 anchor items (`#introduction`, `#experience`, `#stack`, `#projects`, `#contact`), each a circular button with a hover-revealed label. Scrollspy via `IntersectionObserver` (`rootMargin: '-45% 0px -45% 0px'`) toggles active styling (amber fill) on the button matching the section in view.

### `Introduction.tsx` (server)
`id="introduction"`. Eyebrow ("Introduction" with amber dot), big `h1` (accent span), sub paragraph. Content adapted from current Hero copy. No stat cards, no showreel. Wrap blocks in `Reveal`.

### `ExperienceEducation.tsx` (client — accordion)
`id="experience"`. "Education & Experience" eyebrow. Two groups:
- **Experience** sub-label, then accordion rows from `experience[]`. Collapsed row: role, company, period. Expanded: bullets (`bullets[]`). Local `useState` for open index (allow multiple open or single — single-open acceptable). Accessible: `<button>` trigger, `aria-expanded`, keyboard-operable, respects reduced-motion for expand animation.
- **Education** sub-label, then a static row from `education` (school, degree, period). No accordion (no bullets in data).

### `TechStack.tsx` (client — pinned scroll)
`id="stack"`. Pinned section: tall `data-pinwrap` (~240vh) with a `position: sticky` inner pinned viewport. Two horizontal carousel tracks moving in opposite directions driven by scroll progress `p` (0→1) computed from the pinwrap's `getBoundingClientRect`. "keep scrolling N%" indicator. Edge mask gradients.
- Data: flatten `skills[].items`, exclude the two spoken-language categories ("Languages" spoken row — the `🇻🇳`/`🇬🇧` items). Split remaining items across 2 rows. Icon items → `next/image` from `https://cdn.simpleicons.org/${icon}` (host already whitelisted). Emoji items → emoji tile.
- Reduced motion: unpin (height auto, static inner), no transform.
- Scroll/resize listeners `passive`, removed on unmount.

### `Projects.tsx` (server — rewrite)
`id="projects"`. "Projects" eyebrow. Rows from `projects[]`: title (`h3`), period (from `meta` or year), description, link (`url`/`urlLabel`, external `<a target="_blank">`) or "Private — case study on request" when no url, and tech chips (`tech[]`). Bullets not rendered. Wrap rows in `Reveal`.

### `Contact.tsx` (server — rewrite)
`id="contact"`. "Contact" eyebrow, heading, paragraph. Existing action buttons: mailto primary + LinkedIn/GitHub icon buttons (keep current `Contact` behavior, restyled). Footer bar: `© 2026 Nguyen Cong Minh` + "Back to top". No form.

## Data changes — `data/resume.ts`

- Add to `contact`: `availability: 'Available for new projects'`, `timezone: 'Asia/Ho_Chi_Minh'`.
- No other content changes. Skills/experience/education/projects data untouched; components filter/adapt at render.

## Styling — `app/globals.scss` + `app/layout.tsx`

- Rewrite `globals.scss` for the dark design language: bg `#08080a`, accent `#f5a524` (as `--accent` CSS var), text `#ededed`, mono/soft grays from source. Port keyframes (`om-pulse`), rail hover rules, reveal `.reveal/.in`, reduced-motion block.
- `layout.tsx`: swap fonts to **Space Grotesk** (display/body) + **JetBrains Mono** (mono) via `next/font/google`, exposing `--font-space-grotesk` / `--font-jetbrains-mono`. Update `body` font. Keep Tailwind-first import order.
- Keep shadcn tokens in `app/tailwind.css` intact (unused by this page but part of setup).

## Removals

- Delete `Hero.tsx`, `CodingBoy3D.tsx`, `Header.tsx`, `Skills.tsx`, `Experience.tsx`, `Education.tsx`.
- Remove `three` (and `@types/three` if present) from `package.json`.
- Update `features/homepage/index.ts` exports to the new component set.
- Update `app/page.tsx` composition; remove old `<Header>`/`<footer>` wrapper (footer moves into Contact).
- Remove now-unused light-theme CSS.

## Reuse

- `components/modules/Reveal.tsx` — as-is, for scroll-fade blocks.
- `components/icon/GitHubIcon.tsx`, `LinkedInIcon.tsx` — in profile card + contact.
- `next/image` with `cdn.simpleicons.org` (whitelisted in `next.config.mjs`).

## Accessibility & motion

- `prefers-reduced-motion`: reveals shown immediately, carousels static/unpinned, accordion expands without animation, clock still updates.
- Accordion: real `<button>`, `aria-expanded`, focus-visible outline (accent).
- Rail links: keyboard-focusable, discernible names.

## Verification

- `npm run lint`, `npm run prettier` clean.
- `npm run build` succeeds (no `three` import errors).
- Manual: dark layout renders, sticky card, rail scrollspy active states, pinned tech carousels move on scroll, accordion opens/closes, reduced-motion path, mobile single-column, mailto/tel/external links correct, real content throughout (no placeholder names).

## Out of scope

- Real contact-form submission / backend.
- Real portrait image (placeholder only).
- Stat counters, showreel video.
- Any new content in `data/resume.ts` beyond `availability`/`timezone`.
