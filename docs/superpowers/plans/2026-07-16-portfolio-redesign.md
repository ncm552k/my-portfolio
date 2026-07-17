# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the new dark, amber-accented, two-column portfolio design (`design/Portfolio.dc.html`) into the Next.js codebase while keeping all existing real content.

**Architecture:** Server components render static content from `data/resume.ts`; small isolated `'use client'` modules handle each interactive concern (live clock, scrollspy rail, pinned tech carousels, experience accordion). `app/page.tsx` composes a two-column grid; `globals.scss` is rewritten for the dark design language; fonts swap to Space Grotesk + JetBrains Mono.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind v4 (tokens only), SCSS (`globals.scss`), `next/font/google`, `next/image` (simpleicons CDN).

## Global Constraints

- **No test suite exists.** Every task's verification gate is: `npm run lint` clean, `npm run build` succeeds, plus the manual visual check named in the task. There are no unit tests to write.
- **Content is sacred.** Real content only — `Nguyen Cong Minh`, `Front-End Developer`, `Hanoi, Vietnam`, real email `ncm552k@gmail.com`, phone `0966 845 468`, real socials, real experience/projects. NEVER introduce placeholder names (`Alex Rivera`, `San Francisco`) or fake stats from the source artifact.
- **Content lives in `data/resume.ts`.** Components import and adapt; do not hardcode content in components (except section eyebrow labels and static UI copy).
- **Theme:** bg `#08080a`, accent `#f5a524` (exposed as CSS var `--accent`), text `#ededed`. Fonts: Space Grotesk (display/body), JetBrains Mono (mono).
- **Feature structure:** homepage sections under `features/homepage/components/`, exported via `features/homepage/index.ts`. Shared icons in `components/icon/`. Reuse `components/modules/Reveal.tsx`.
- **Client components** must be marked `'use client'` and clean up listeners/intervals on unmount. All interactive effects respect `prefers-reduced-motion`.
- **Links:** `mailto:` / `tel:` / external `target="_blank"` stay plain `<a>`; hash anchors stay plain `<a>`. Next `<Link>` only for internal routes (none here).

## File Structure

**Create:**

- `features/homepage/components/ProfileCard.tsx` (client) — left sticky card + live clock
- `features/homepage/components/SectionRail.tsx` (client) — fixed right dot-rail + scrollspy
- `features/homepage/components/Introduction.tsx` (server) — intro section
- `features/homepage/components/ExperienceEducation.tsx` (client) — merged accordion section
- `features/homepage/components/TechStack.tsx` (client) — pinned-scroll carousels
- `components/icon/MailIcon.tsx` (server) — inline mail SVG
- `components/icon/PhoneIcon.tsx` (server) — inline phone SVG

**Modify:**

- `data/resume.ts` — add `availability`, `timezone` to `contact`
- `app/layout.tsx` — swap fonts
- `app/globals.scss` — full rewrite (dark design language)
- `app/page.tsx` — two-column composition
- `features/homepage/index.ts` — new exports
- `features/homepage/components/Projects.tsx` — rewrite (rows + chips, no bullets)
- `features/homepage/components/Contact.tsx` — rewrite (dark styling, footer, no form)
- `next.config.mjs` — no change needed (simpleicons already whitelisted); leave as-is
- `package.json` — remove `three` + `@types/three`

**Delete:**

- `features/homepage/components/Hero.tsx`
- `features/homepage/components/CodingBoy3D.tsx`
- `features/homepage/components/Header.tsx`
- `features/homepage/components/Skills.tsx`
- `features/homepage/components/Experience.tsx`
- `features/homepage/components/Education.tsx`

---

### Task 1: Data + fonts + theme foundation

Sets up the design tokens, fonts, and data fields everything else depends on. Grouped because none is independently shippable and they share one verification (build still compiles, page still renders with new fonts/colors even before layout changes).

**Files:**

- Modify: `data/resume.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.scss` (full rewrite)

**Interfaces:**

- Consumes: existing `contact` object in `data/resume.ts`.
- Produces:
  - `contact.availability: string` (= `'Available for new projects'`)
  - `contact.timezone: string` (= `'Asia/Ho_Chi_Minh'`)
  - CSS custom properties on `body`: `--font-space-grotesk`, `--font-jetbrains-mono`
  - Global CSS classes consumed by later tasks: `.mono`, `.reveal`/`.reveal.in`, `@keyframes om-pulse`, `[data-rail-*]` hover rules. Layout-specific styles are added inline in components (matching the source design's inline-style approach) OR as classes — see each task.

- [ ] **Step 1: Add fields to `contact` in `data/resume.ts`**

Modify the `contact` export (lines 1-9) to:

```ts
export const contact = {
  name: 'Nguyen Cong Minh',
  role: 'Front-End Developer',
  location: 'Hanoi, Vietnam',
  email: 'ncm552k@gmail.com',
  phone: '0966 845 468',
  linkedin: 'https://www.linkedin.com/in/ncm552k',
  github: 'https://github.com/ncm552k',
  availability: 'Available for new projects',
  timezone: 'Asia/Ho_Chi_Minh',
};
```

- [ ] **Step 2: Swap fonts in `app/layout.tsx`**

Replace the font imports/instances (lines 7-25) and the `body` className. New content for those regions:

```ts
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
});
```

Update `<body>`:

```tsx
<body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
  {children}
</body>
```

Leave the `metadata` export unchanged.

- [ ] **Step 3: Rewrite `app/globals.scss`**

Replace the ENTIRE file with the dark design language below. This ports the source design's global styles + reveal + reduced-motion, and defines the reusable rail hover / pulse keyframes. Layout and per-section styles are applied as inline styles in components (Tasks 3-9), mirroring the source artifact.

```scss
:root {
  --bg: #08080a;
  --accent: #f5a524;
  --accent-hover: #ffc46b;
  --text: #ededed;
  --text-soft: #cfcfd4;
  --text-muted: #9a9aa2;
  --text-faint: #8a8a92;
  --text-dim: #6d6d76;
  --line: rgba(255, 255, 255, 0.08);
  --line-soft: rgba(255, 255, 255, 0.12);
  --card: #101013;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-space-grotesk), sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--accent);
  text-decoration: none;
}
a:hover {
  color: var(--accent-hover);
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}

.mono {
  font-family: var(--font-jetbrains-mono), monospace;
}

::selection {
  background: var(--accent);
  color: var(--bg);
}

input,
textarea {
  font-family: var(--font-jetbrains-mono), monospace;
}
input::placeholder,
textarea::placeholder {
  color: #55555c;
}

@keyframes om-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.55);
  }
  50% {
    box-shadow: 0 0 0 7px rgba(74, 222, 128, 0);
  }
}

/* right dot-rail hover labels */
[data-rail-label] {
  opacity: 0;
  transform: translateX(10px);
  pointer-events: none;
  transition:
    opacity 0.2s,
    transform 0.2s;
}
[data-rail-item]:hover [data-rail-label] {
  opacity: 1;
  transform: translateX(0);
}
[data-rail-item]:hover [data-rail-btn] {
  border-color: var(--accent);
  color: var(--accent);
}

/* reveal on scroll */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s cubic-bezier(0.2, 0.7, 0.2, 1),
    transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.reveal.in {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  * {
    animation: none !important;
    transition: none !important;
  }
  .reveal {
    opacity: 1;
    transform: none;
  }
}
```

- [ ] **Step 4: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS. Build still references deleted-later components (Hero etc.) — those still exist at this point, so build succeeds. `three` still installed. No type errors from the `contact` additions.

- [ ] **Step 5: Commit**

```bash
git add data/resume.ts app/layout.tsx app/globals.scss
git commit -m "feat: dark theme foundation, fonts, contact meta fields"
```

---

### Task 2: Mail + Phone icons

Two tiny inline-SVG icon components the ProfileCard needs. Isolated so ProfileCard (Task 4) can consume them.

**Files:**

- Create: `components/icon/MailIcon.tsx`
- Create: `components/icon/PhoneIcon.tsx`

**Interfaces:**

- Produces: `MailIcon()` and `PhoneIcon()` — default-free named exports returning `<svg viewBox="0 0 24 24" aria-hidden="true">` with `fill="currentColor"` path(s). Consumed by `ProfileCard.tsx` (Task 4).

- [ ] **Step 1: Create `components/icon/MailIcon.tsx`**

```tsx
export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm10 8.7L3.4 6.5 3 6.8V18h18V6.8l-.4-.3L12 12.7zM12 11l7.5-5H4.5L12 11z" />
    </svg>
  );
}
```

- [ ] **Step 2: Create `components/icon/PhoneIcon.tsx`**

```tsx
export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.1 2.2z" />
    </svg>
  );
}
```

- [ ] **Step 3: Verify lint**

Run: `npm run lint`
Expected: PASS. (Components are unused so far — that's fine; ESLint config does not fail on unused exported components.)

- [ ] **Step 4: Commit**

```bash
git add components/icon/MailIcon.tsx components/icon/PhoneIcon.tsx
git commit -m "feat: add Mail and Phone inline icons"
```

---

### Task 3: SectionRail (fixed right dot-nav + scrollspy)

Fixed right-edge vertical nav with 5 dots, hover labels, and scrollspy active state. Self-contained client component; verified visually once wired into the page (Task 9), but built and lint-clean now.

**Files:**

- Create: `features/homepage/components/SectionRail.tsx`

**Interfaces:**

- Consumes: nothing from `data`. Section ids it links to (must match Tasks 5-8 + Task 4 layout): `introduction`, `experience`, `stack`, `projects`, `contact`.
- Produces: `export default function SectionRail()`. Rendered once by `app/page.tsx` (Task 9).

- [ ] **Step 1: Create `features/homepage/components/SectionRail.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';

const items = [
  { id: 'introduction', label: 'Introduction', glyph: '⌂' },
  { id: 'experience', label: 'Education & Experience', glyph: '▤' },
  { id: 'stack', label: 'Tech Stack', glyph: '◈' },
  { id: 'projects', label: 'Projects', glyph: '▦' },
  { id: 'contact', label: 'Contact', glyph: '✉' },
];

export default function SectionRail() {
  const [active, setActive] = useState('introduction');

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );

    sections.forEach((s) => spy.observe(s));

    return () => spy.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      style={{
        position: 'fixed',
        right: '22px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {items.map((it) => {
        const on = active === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            data-rail-item
            aria-label={it.label}
            aria-current={on ? 'true' : undefined}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              textDecoration: 'none',
            }}
          >
            <span
              data-rail-label
              className="mono"
              style={{
                position: 'absolute',
                right: '56px',
                whiteSpace: 'nowrap',
                background: 'rgba(16,16,19,0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--line-soft)',
                borderRadius: '9px',
                padding: '7px 12px',
                fontSize: '12px',
                color: 'var(--text)',
              }}
            >
              {it.label}
            </span>
            <span
              data-rail-btn
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: `1px solid ${on ? 'var(--accent)' : 'var(--line-soft)'}`,
                background: on ? 'var(--accent)' : 'rgba(16,16,19,0.7)',
                backdropFilter: 'blur(8px)',
                color: on ? 'var(--bg)' : 'var(--text-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                transition: 'all .2s',
              }}
            >
              {it.glyph}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS. Component unused until Task 9 — acceptable.

- [ ] **Step 3: Commit**

```bash
git add features/homepage/components/SectionRail.tsx
git commit -m "feat: add SectionRail dot-nav with scrollspy"
```

---

### Task 4: ProfileCard (left sticky card + live clock)

The left column card: portrait placeholder, availability badge, name/role, email, 4 social dots, "Get in touch" pill, location + live clock.

**Files:**

- Create: `features/homepage/components/ProfileCard.tsx`

**Interfaces:**

- Consumes: `contact` from `data/resume.ts` (incl. `availability`, `timezone` from Task 1); `GitHubIcon`, `LinkedInIcon` from `components/icon/`; `MailIcon`, `PhoneIcon` from Task 2.
- Produces: `export default function ProfileCard()`. Rendered by `app/page.tsx` (Task 9).

- [ ] **Step 1: Create `features/homepage/components/ProfileCard.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';

import { GitHubIcon } from '@/components/icon/GitHubIcon';
import { LinkedInIcon } from '@/components/icon/LinkedInIcon';
import { MailIcon } from '@/components/icon/MailIcon';
import { PhoneIcon } from '@/components/icon/PhoneIcon';
import { contact } from '@/data/resume';

function formatClock(): string {
  try {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: contact.timezone,
    });
  } catch {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }
}

const dotStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '1px solid var(--line-soft)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-soft)',
  transition: 'all .2s',
};

const iconSvgStyle: React.CSSProperties = {
  width: '17px',
  height: '17px',
  fill: 'currentColor',
};

export default function ProfileCard() {
  const [clock, setClock] = useState(formatClock());

  useEffect(() => {
    const t = setInterval(() => setClock(formatClock()), 20000);
    return () => clearInterval(t);
  }, []);

  const initials = contact.name
    .split(' ')
    .map((w) => w[0])
    .join('');

  return (
    <aside
      style={{
        position: 'sticky',
        top: '40px',
        alignSelf: 'start',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div
        style={{
          background: 'rgba(16,16,19,0.72)',
          backdropFilter: 'blur(14px)',
          border: '1px solid var(--line)',
          borderRadius: '24px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        {/* availability badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              width: '38px',
              height: '38px',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              borderRadius: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            ◆
          </span>
          <span
            className="mono"
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '9px',
              border: '1px solid var(--line-soft)',
              borderRadius: '999px',
              padding: '9px 14px',
              fontSize: '12px',
              color: 'var(--text-soft)',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#4ade80',
                animation: 'om-pulse 2s infinite',
              }}
            />
            {contact.availability}
          </span>
        </div>

        {/* portrait placeholder */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '1/1',
            borderRadius: '18px',
            overflow: 'hidden',
            border: '1px solid var(--line)',
            background:
              'repeating-linear-gradient(45deg, #1b1b20, #1b1b20 8px, #151519 8px, #151519 16px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(70% 60% at 50% 25%, rgba(245,165,36,0.32), transparent 68%)',
            }}
          />
          <div
            className="mono"
            style={{
              position: 'absolute',
              top: '12px',
              left: '14px',
              fontSize: '10px',
              color: 'var(--text-dim)',
            }}
          >
            portrait.jpg
          </div>
          <div
            style={{
              position: 'relative',
              fontStyle: 'italic',
              fontSize: '34px',
              fontWeight: 500,
              color: '#f4f4f5',
              paddingBottom: '22px',
              textShadow: '0 2px 14px rgba(0,0,0,0.65)',
            }}
          >
            {initials}
          </div>
        </div>

        {/* name + role */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '21px',
              fontWeight: 700,
              letterSpacing: '-.01em',
            }}
          >
            {contact.name}
          </div>
          <div
            className="mono"
            style={{
              fontSize: '12px',
              color: 'var(--accent)',
              marginTop: '4px',
            }}
          >
            {contact.role}
          </div>
        </div>

        {/* email + location */}
        <div
          className="mono"
          style={{
            textAlign: 'center',
            fontSize: '13px',
            color: 'var(--text-soft)',
            lineHeight: 1.7,
          }}
        >
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <br />
          <span style={{ color: 'var(--text-dim)', fontSize: '12px' }}>
            Based in {contact.location}
          </span>
        </div>

        {/* 4 social dots */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            style={dotStyle}
          >
            <svg viewBox="0 0 24 24" style={iconSvgStyle}>
              <GitHubIcon />
            </svg>
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            style={dotStyle}
          >
            <svg viewBox="0 0 24 24" style={iconSvgStyle}>
              <LinkedInIcon />
            </svg>
          </a>
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email"
            title="Email"
            style={dotStyle}
          >
            <span style={iconSvgStyle}>
              <MailIcon />
            </span>
          </a>
          <a
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            aria-label="Phone"
            title="Phone"
            style={dotStyle}
          >
            <span style={iconSvgStyle}>
              <PhoneIcon />
            </span>
          </a>
        </div>

        {/* get in touch pill */}
        <a
          href={`mailto:${contact.email}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--accent)',
            color: 'var(--bg)',
            fontWeight: 600,
            padding: '8px 8px 8px 20px',
            borderRadius: '999px',
            fontSize: '15px',
          }}
        >
          Get in touch{' '}
          <span
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--bg)',
              color: '#f4f4f5',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ↗
          </span>
        </a>
      </div>

      {/* location + live clock */}
      <div
        className="mono"
        style={{
          fontSize: '12px',
          color: 'var(--text-dim)',
          lineHeight: 1.9,
          padding: '0 6px',
        }}
      >
        {contact.location} · {clock}
      </div>
    </aside>
  );
}
```

NOTE on icons: `GitHubIcon`/`LinkedInIcon` already return a full `<svg>`. Wrapping them in another `<svg>` double-nests. Fix: do NOT wrap them — render `<GitHubIcon />` directly and size via a wrapper `<span style={iconSvgStyle}>`. Replace the two social-dot `<a>` bodies for GitHub/LinkedIn with:

```tsx
<a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" style={dotStyle}>
  <span style={iconSvgStyle}>
    <GitHubIcon />
  </span>
</a>
<a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" style={dotStyle}>
  <span style={iconSvgStyle}>
    <LinkedInIcon />
  </span>
</a>
```

And ensure `.icon svg { width:100%; height:100% }` behavior by giving the inner span `display:'flex'`. Update `iconSvgStyle` to:

```ts
const iconSvgStyle: React.CSSProperties = {
  width: '17px',
  height: '17px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
```

The `GitHubIcon`/`LinkedInIcon`/`MailIcon`/`PhoneIcon` SVGs have no explicit width/height, so add a global rule in `globals.scss` (append to Task 1's file, but do it here to keep it with the consumer):

```scss
[data-social-dot] svg {
  width: 17px;
  height: 17px;
  fill: currentColor;
}
```

Add `data-social-dot` to each of the four social `<a>` elements' `style={dotStyle}` (i.e. add the attribute `data-social-dot`), and remove per-svg sizing reliance.

- [ ] **Step 2: Append social-dot svg rule to `app/globals.scss`**

Add at end of file:

```scss
[data-social-dot] svg {
  width: 17px;
  height: 17px;
  fill: currentColor;
}
```

- [ ] **Step 3: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS. TypeScript: `React.CSSProperties` used — ensure `import type React from 'react'` is present, OR use inline object literals typed via `satisfies`. Add `import type { CSSProperties } from 'react';` and change `React.CSSProperties` → `CSSProperties`.

- [ ] **Step 4: Commit**

```bash
git add features/homepage/components/ProfileCard.tsx app/globals.scss
git commit -m "feat: add ProfileCard with live clock and social dots"
```

---

### Task 5: Introduction section

Server component: eyebrow, big headline, sub paragraph. No stat cards, no showreel.

**Files:**

- Create: `features/homepage/components/Introduction.tsx`

**Interfaces:**

- Consumes: `Reveal` from `components/modules/Reveal`. (Copy is static UI text adapted from current Hero; no data import required, but may reference `contact.role`/`contact.location` — not required.)
- Produces: `export default function Introduction()` rendering `<section id="introduction">`.

- [ ] **Step 1: Create `features/homepage/components/Introduction.tsx`**

```tsx
import Reveal from '@/components/modules/Reveal';

export default function Introduction() {
  return (
    <section
      id="introduction"
      style={{ scrollMarginTop: '48px', paddingTop: '8px' }}
    >
      <Reveal>
        <div
          className="mono"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--text-faint)',
            marginBottom: '28px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent)',
            }}
          />
          Introduction
        </div>
      </Reveal>
      <Reveal>
        <h1
          style={{
            margin: 0,
            fontSize: '56px',
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: '-.03em',
          }}
        >
          Building fast, production-grade web apps,{' '}
          <span style={{ color: 'var(--accent)' }}>
            frontend to full-stack.
          </span>
        </h1>
      </Reveal>
      <Reveal>
        <p
          style={{
            margin: '26px 0 0',
            fontSize: '17px',
            lineHeight: 1.75,
            color: 'var(--text-muted)',
            maxWidth: '620px',
          }}
        >
          I&apos;m a front-end developer with 3+ years shipping responsive,
          high-performance interfaces with React, Next.js and TypeScript — from
          a full legacy-PHP-to-Next.js migration to white-label recruitment
          platforms serving thousands of users. Currently expanding into the
          backend on the road to full-stack.
        </p>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add features/homepage/components/Introduction.tsx
git commit -m "feat: add Introduction section"
```

---

### Task 6: ExperienceEducation (merged, accordion)

Client component: merged section. Experience rows are accordions (expand to reveal bullets); Education is a static row.

**Files:**

- Create: `features/homepage/components/ExperienceEducation.tsx`

**Interfaces:**

- Consumes: `experience` (array of `{ company, role, period, bullets }`) and `education` (`{ school, degree, period }`) from `data/resume.ts`.
- Produces: `export default function ExperienceEducation()` rendering `<section id="experience">`.

- [ ] **Step 1: Create `features/homepage/components/ExperienceEducation.tsx`**

Single-open accordion (opening one closes others). Accessible `<button>` triggers with `aria-expanded`.

```tsx
'use client';

import { useState } from 'react';

import { education, experience } from '@/data/resume';

const eyebrowStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '13px',
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--text-faint)',
  marginBottom: '44px',
};

const subLabelStyle: React.CSSProperties = {
  fontSize: '12px',
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  color: 'var(--text-dim)',
  marginBottom: '8px',
};

export default function ExperienceEducation() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" style={{ scrollMarginTop: '48px' }}>
      <div className="mono" style={eyebrowStyle}>
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent)',
          }}
        />
        Education &amp; Experience
      </div>

      <div className="mono" style={subLabelStyle}>
        Experience
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {experience.map((job, i) => {
          const isOpen = open === i;
          return (
            <div
              key={job.company}
              style={{ borderTop: '1px solid rgba(255,255,255,0.09)' }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  textAlign: 'left',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto auto',
                  gap: '20px',
                  alignItems: 'center',
                  padding: '26px 0',
                  fontFamily: 'inherit',
                }}
              >
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 600 }}>
                    {job.role}
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-faint)',
                      marginTop: '6px',
                    }}
                  >
                    {job.company}
                  </div>
                </div>
                <div
                  className="mono"
                  style={{ fontSize: '14px', color: 'var(--accent)' }}
                >
                  {job.period}
                </div>
                <span
                  aria-hidden="true"
                  style={{
                    color: 'var(--text-faint)',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                    transition: 'transform .2s',
                    fontSize: '18px',
                  }}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <ul
                  style={{ listStyle: 'none', margin: 0, padding: '0 0 26px' }}
                >
                  {job.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        position: 'relative',
                        paddingLeft: '20px',
                        color: 'var(--text-muted)',
                        fontSize: '15px',
                        marginBottom: '10px',
                        lineHeight: 1.7,
                      }}
                    >
                      <span
                        className="mono"
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--accent)',
                        }}
                      >
                        →
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.09)' }} />
      </div>

      <div className="mono" style={{ ...subLabelStyle, margin: '44px 0 8px' }}>
        Education
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '20px',
          alignItems: 'center',
          padding: '26px 0',
          borderTop: '1px solid rgba(255,255,255,0.09)',
          borderBottom: '1px solid rgba(255,255,255,0.09)',
        }}
      >
        <div>
          <div style={{ fontSize: '24px', fontWeight: 600 }}>
            {education.degree}
          </div>
          <div
            className="mono"
            style={{
              fontSize: '13px',
              color: 'var(--text-faint)',
              marginTop: '6px',
            }}
          >
            {education.school}
          </div>
        </div>
        <div
          className="mono"
          style={{ fontSize: '14px', color: 'var(--accent)' }}
        >
          {education.period}
        </div>
      </div>
    </section>
  );
}
```

Add `import type { CSSProperties } from 'react';` and replace `React.CSSProperties` → `CSSProperties`.

- [ ] **Step 2: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 3: Manual check (after Task 9 wires the page, revisit): clicking a job toggles bullets; only one open at a time; keyboard Enter/Space toggles.**

- [ ] **Step 4: Commit**

```bash
git add features/homepage/components/ExperienceEducation.tsx
git commit -m "feat: add merged Experience/Education accordion section"
```

---

### Task 7: TechStack (pinned-scroll dual carousels)

Client component: tall pinned section; two horizontal carousels move opposite directions driven by scroll progress. Tech-only skill tiles.

**Files:**

- Create: `features/homepage/components/TechStack.tsx`

**Interfaces:**

- Consumes: `skills` (`{ category, items: { name, icon?, emoji? }[] }[]`) from `data/resume.ts`; `next/image`.
- Produces: `export default function TechStack()` rendering `<section id="stack">`.

- [ ] **Step 1: Create `features/homepage/components/TechStack.tsx`**

Flatten skills, exclude the spoken-language category (`category === 'Languages'`), split across two rows.

```tsx
'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import { skills } from '@/data/resume';

type Tile = { name: string; icon?: string; emoji?: string };

function useTiles(): [Tile[], Tile[]] {
  return useMemo(() => {
    const flat: Tile[] = skills
      .filter((row) => row.category !== 'Languages')
      .flatMap((row) => row.items);
    const mid = Math.ceil(flat.length / 2);
    return [flat.slice(0, mid), flat.slice(mid)];
  }, []);
}

function Card({ tile }: { tile: Tile }) {
  return (
    <div
      style={{
        width: '128px',
        height: '128px',
        borderRadius: '22px',
        background: 'var(--card)',
        border: '1px solid var(--line)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '13px',
        flexShrink: 0,
      }}
    >
      {tile.icon ? (
        <Image
          src={`https://cdn.simpleicons.org/${tile.icon}`}
          alt={tile.name}
          width={44}
          height={44}
          loading="lazy"
          unoptimized
          style={{ objectFit: 'contain' }}
        />
      ) : (
        <div
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
          }}
        >
          {tile.emoji}
        </div>
      )}
      <span
        className="mono"
        style={{ fontSize: '12px', color: 'var(--text-soft)' }}
      >
        {tile.name}
      </span>
    </div>
  );
}

export default function TechStack() {
  const [rowA, rowB] = useTiles();
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackARef = useRef<HTMLDivElement | null>(null);
  const trackBRef = useRef<HTMLDivElement | null>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const pinwrap = pinRef.current;
    if (!pinwrap) return;

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pinwrap.style.height = 'auto';
      const pin = pinwrap.firstElementChild as HTMLElement | null;
      if (pin) {
        pin.style.position = 'static';
        pin.style.height = 'auto';
      }
      return;
    }

    const update = () => {
      const rect = pinwrap.getBoundingClientRect();
      const dist = pinwrap.offsetHeight - window.innerHeight;
      let p = dist > 0 ? -rect.top / dist : 0;
      p = Math.max(0, Math.min(1, p));
      setPct(Math.round(p * 100));

      [
        { track: trackARef.current, dir: 1 },
        { track: trackBRef.current, dir: -1 },
      ].forEach(({ track, dir }) => {
        if (!track) return;
        const mask = track.parentElement;
        if (!mask) return;
        const overflow = Math.max(0, track.scrollWidth - mask.clientWidth);
        const x = dir > 0 ? -overflow * p : -overflow * (1 - p);
        track.style.transform = `translateX(${x}px)`;
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const maskStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    WebkitMaskImage:
      'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
    maskImage:
      'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
  };

  const trackStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    width: 'max-content',
    willChange: 'transform',
  };

  return (
    <section id="stack">
      <div ref={pinRef} style={{ position: 'relative', height: '240vh' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              className="mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '13px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--text-faint)',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                }}
              />
              Tech Stack
            </div>
            <div
              className="mono"
              style={{ fontSize: '12px', color: 'var(--text-dim)' }}
            >
              keep scrolling {pct}%
            </div>
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: '40px',
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: '-.03em',
              maxWidth: '640px',
            }}
          >
            Tools I reach for,{' '}
            <span style={{ color: 'var(--accent)' }}>front to back.</span>
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              marginTop: '10px',
            }}
          >
            <div style={maskStyle}>
              <div ref={trackARef} style={trackStyle}>
                {rowA.map((t) => (
                  <Card key={t.name} tile={t} />
                ))}
              </div>
            </div>
            <div style={maskStyle}>
              <div ref={trackBRef} style={trackStyle}>
                {rowB.map((t) => (
                  <Card key={t.name} tile={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

Add `import type { CSSProperties } from 'react';` and change `React.CSSProperties` → `CSSProperties`.

NOTE: `skills` includes duplicate skill names across categories? Check — keys use `t.name`; if duplicates exist across the flattened list React warns. The current data has unique names within the tech categories (Zustand, SSE emoji items included). If a duplicate key warning appears in build, change key to `` `${t.name}-${i}` `` with the map index.

- [ ] **Step 2: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS. No duplicate-key warnings (flattened tech names are unique).

- [ ] **Step 3: Commit**

```bash
git add features/homepage/components/TechStack.tsx
git commit -m "feat: add pinned-scroll TechStack carousels"
```

---

### Task 8: Projects + Contact rewrite

Rewrite both to dark design. Projects = rows (title/year/description/link + chips, no bullets). Contact = heading + paragraph + mailto/social buttons + footer bar, no form.

**Files:**

- Modify (rewrite): `features/homepage/components/Projects.tsx`
- Modify (rewrite): `features/homepage/components/Contact.tsx`

**Interfaces:**

- Consumes: `projects` (`{ title, meta, url?, urlLabel?, description, bullets, tech }[]`), `contact` from `data/resume.ts`; `Reveal`; `GitHubIcon`, `LinkedInIcon`.
- Produces: `export default function Projects()` (`<section id="projects">`), `export default function Contact()` (`<section id="contact">`).

- [ ] **Step 1: Rewrite `features/homepage/components/Projects.tsx`**

```tsx
import Reveal from '@/components/modules/Reveal';
import { projects } from '@/data/resume';

export default function Projects() {
  return (
    <section id="projects" style={{ scrollMarginTop: '48px' }}>
      <Reveal>
        <div
          className="mono"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--text-faint)',
            marginBottom: '44px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent)',
            }}
          />
          Projects
        </div>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {projects.map((p, i) => (
          <Reveal as="article" key={p.title}>
            <div
              style={{
                padding: '32px 0',
                borderTop: '1px solid rgba(255,255,255,0.09)',
                borderBottom:
                  i === projects.length - 1
                    ? '1px solid rgba(255,255,255,0.09)'
                    : undefined,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: '28px',
                    fontWeight: 600,
                    letterSpacing: '-.01em',
                  }}
                >
                  {p.title}
                </h3>
                <span
                  className="mono"
                  style={{ fontSize: '13px', color: 'var(--accent)' }}
                >
                  {p.meta}
                </span>
              </div>
              <p
                style={{
                  margin: '16px 0 0',
                  fontSize: '15px',
                  lineHeight: 1.75,
                  color: 'var(--text-muted)',
                  maxWidth: '640px',
                }}
              >
                {p.description}
              </p>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '18px',
                    fontSize: '13px',
                  }}
                >
                  {p.urlLabel} ↗
                </a>
              ) : (
                <span
                  className="mono"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '18px',
                    fontSize: '13px',
                    color: 'var(--text-dim)',
                  }}
                >
                  Private — case study on request
                </span>
              )}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '7px',
                  marginTop: '18px',
                }}
              >
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="mono"
                    style={{
                      fontSize: '11.5px',
                      padding: '4px 11px',
                      borderRadius: '99px',
                      background: 'rgba(245,165,36,0.1)',
                      color: 'var(--accent)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite `features/homepage/components/Contact.tsx`**

```tsx
import { GitHubIcon } from '@/components/icon/GitHubIcon';
import { LinkedInIcon } from '@/components/icon/LinkedInIcon';
import Reveal from '@/components/modules/Reveal';
import { contact } from '@/data/resume';

const iconBtnStyle: React.CSSProperties = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  border: '1px solid var(--line-soft)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-soft)',
};

export default function Contact() {
  return (
    <section id="contact" style={{ scrollMarginTop: '48px' }}>
      <Reveal>
        <div
          className="mono"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--text-faint)',
            marginBottom: '28px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent)',
            }}
          />
          Contact
        </div>
      </Reveal>
      <Reveal>
        <h2
          style={{
            margin: '0 0 12px',
            fontSize: '46px',
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: '-.03em',
          }}
        >
          Let&apos;s build something{' '}
          <span style={{ color: 'var(--accent)' }}>together.</span>
        </h2>
      </Reveal>
      <Reveal>
        <p
          style={{
            margin: '0 0 40px',
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'var(--text-muted)',
            maxWidth: '560px',
          }}
        >
          Open to front-end and full-stack opportunities. If you need someone
          who cares about Core Web Vitals as much as clean component
          architecture, let&apos;s talk.
        </p>
      </Reveal>
      <div
        style={{
          display: 'flex',
          gap: '14px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <a
          href={`mailto:${contact.email}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--accent)',
            color: 'var(--bg)',
            fontWeight: 600,
            padding: '13px 22px',
            borderRadius: '999px',
            fontSize: '15px',
          }}
        >
          {contact.email} ↗
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          data-social-dot
          style={iconBtnStyle}
        >
          <LinkedInIcon />
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
          data-social-dot
          style={iconBtnStyle}
        >
          <GitHubIcon />
        </a>
      </div>

      <div
        className="mono"
        style={{
          marginTop: '90px',
          borderTop: '1px solid var(--line)',
          paddingTop: '26px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px',
          color: 'var(--text-dim)',
        }}
      >
        <span>© 2026 {contact.name}. Built with Next.js &amp; TypeScript.</span>
        <a href="#introduction" style={{ color: 'var(--text-soft)' }}>
          Back to top ↑
        </a>
      </div>
    </section>
  );
}
```

Add `import type { CSSProperties } from 'react';` and change `React.CSSProperties` → `CSSProperties`. (`data-social-dot` reuses the svg-sizing rule from Task 4.)

- [ ] **Step 3: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add features/homepage/components/Projects.tsx features/homepage/components/Contact.tsx
git commit -m "feat: rewrite Projects and Contact for dark design"
```

---

### Task 9: Compose page, update exports, delete old components, drop three

The integration task: wire everything into the two-column layout, update barrel exports, delete obsolete components, remove the `three` dependency. This is where the whole page first renders end-to-end.

**Files:**

- Modify: `app/page.tsx`
- Modify: `features/homepage/index.ts`
- Delete: `features/homepage/components/Hero.tsx`, `CodingBoy3D.tsx`, `Header.tsx`, `Skills.tsx`, `Experience.tsx`, `Education.tsx`
- Modify: `package.json` (remove `three`, `@types/three`)

**Interfaces:**

- Consumes: all components from Tasks 3-8.
- Produces: final rendered homepage.

- [ ] **Step 1: Rewrite `features/homepage/index.ts`**

```ts
export { default as Contact } from './components/Contact';
export { default as ExperienceEducation } from './components/ExperienceEducation';
export { default as Introduction } from './components/Introduction';
export { default as ProfileCard } from './components/ProfileCard';
export { default as Projects } from './components/Projects';
export { default as SectionRail } from './components/SectionRail';
export { default as TechStack } from './components/TechStack';
```

- [ ] **Step 2: Rewrite `app/page.tsx`**

```tsx
import {
  Contact,
  ExperienceEducation,
  Introduction,
  ProfileCard,
  Projects,
  SectionRail,
  TechStack,
} from '@/features/homepage';

export default function Home() {
  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      <SectionRail />
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 84px 60px 56px',
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: '72px',
          alignItems: 'start',
        }}
      >
        <ProfileCard />
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '130px',
            minWidth: 0,
          }}
        >
          <Introduction />
          <ExperienceEducation />
          <TechStack />
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Delete obsolete components**

```bash
git rm features/homepage/components/Hero.tsx \
  features/homepage/components/CodingBoy3D.tsx \
  features/homepage/components/Header.tsx \
  features/homepage/components/Skills.tsx \
  features/homepage/components/Experience.tsx \
  features/homepage/components/Education.tsx
```

- [ ] **Step 4: Remove `three` from dependencies**

Run:

```bash
npm uninstall three @types/three
```

Expected: `package.json` no longer lists `three` or `@types/three`; `package-lock.json` updated.

- [ ] **Step 5: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS. No import errors for deleted components (nothing references them). No `three` references remain (grep to confirm): `grep -rn "three" features app components` → only incidental words, no imports.

- [ ] **Step 6: Manual visual verification**

Run: `npm run dev`, open http://localhost:3000. Confirm:

- Dark two-column layout; left card sticky on scroll.
- Right dot-rail visible; active dot follows scroll (scrollspy).
- Live clock renders in card footer (Hanoi time).
- Introduction headline + paragraph, real content.
- Experience rows expand/collapse on click (accordion), Education static row.
- Tech Stack pins and carousels slide as you scroll through it; "keep scrolling N%" updates.
- Projects show title/period/description/link + tech chips, no bullets.
- Contact mailto + social buttons; footer "© 2026 Nguyen Cong Minh".
- No "Alex Rivera" / "San Francisco" / fake stats anywhere.
- Toggle OS reduced-motion → reveals shown immediately, tech section unpinned/static, clock still ticks.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx features/homepage/index.ts package.json package-lock.json
git commit -m "feat: compose dark two-column homepage, remove three and legacy components"
```

---

### Task 10: Responsive + polish pass

Add mobile breakpoints (single column, hide/adjust rail) and final visual reconciliation against the source design.

**Files:**

- Modify: `app/globals.scss` (append responsive rules + helper classes)
- Modify: `app/page.tsx` (apply a wrapper class for responsive grid) — OR use a CSS class instead of inline grid for the outer layout so media queries can override it.

**Interfaces:**

- Consumes: existing layout from Task 9.
- Produces: responsive homepage.

- [ ] **Step 1: Convert outer grid to a class so media queries can target it**

In `app/page.tsx`, replace the inline-styled grid `<div>` with `className="page-grid"` and move its style into `globals.scss`. New `page.tsx` grid wrapper:

```tsx
<div className="page-grid">
  <ProfileCard />
  <main className="page-main">...</main>
</div>
```

- [ ] **Step 2: Append layout + responsive rules to `app/globals.scss`**

```scss
.page-grid {
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 84px 60px 56px;
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 72px;
  align-items: start;
}
.page-main {
  display: flex;
  flex-direction: column;
  gap: 130px;
  min-width: 0;
}

@media (max-width: 1024px) {
  .page-grid {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 32px 24px 48px;
  }
  .page-grid aside {
    position: static;
  }
}

@media (max-width: 640px) {
  [data-rail] {
    display: none;
  }
  .page-main {
    gap: 90px;
  }
}
```

- [ ] **Step 3: Add `data-rail` attribute to the SectionRail `<nav>`**

In `SectionRail.tsx`, add `data-rail` to the `<nav>` element so the `@media (max-width:640px)` rule can hide it.

- [ ] **Step 4: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 5: Manual responsive check**

`npm run dev`; resize browser to <1024px (single column, card not sticky) and <640px (rail hidden). Confirm no horizontal overflow; tech carousels still behave.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/globals.scss features/homepage/components/SectionRail.tsx
git commit -m "feat: responsive layout for portfolio redesign"
```

---

## Self-Review Notes

- **Spec coverage:** shell/theme (T1, T9, T10), ProfileCard incl. clock/badge/socials (T4), SectionRail scrollspy (T3), Introduction no stats/showreel (T5), merged Experience+Education accordion (T6), TechStack pinned carousels tech-only (T7), Projects rows+chips no bullets (T8), Contact mailto+footer no form (T8), data fields (T1), removals incl. three (T9), reduced-motion (in T3/T4/T6/T7 + globals T1), responsive (T10). All spec sections mapped.
- **Type consistency:** `contact.timezone`/`availability` defined T1, consumed T4. `formatClock` local to T4. Section ids consistent (`introduction`/`experience`/`stack`/`projects`/`contact`) across T3, T5-T8, T9. `data-social-dot` rule defined T4, reused T8.
- **Known nuance:** `GitHubIcon`/`LinkedInIcon` return bare `<svg>` with no size — sized via `[data-social-dot] svg` rule (T4). ProfileCard step includes an explicit correction note to avoid double-nesting `<svg>`.
- **No unit tests** by design (no framework in repo); gates are lint + build + manual visual checks, stated per task.
