# Sticky Profile Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the left profile card sticky while the right content scrolls on desktop/tablet, and disable sticky only on narrow mobile screens.

**Architecture:** The profile card already uses inline `position: sticky`. This change removes the ancestor overflow behavior that can break sticky and narrows the responsive override that disables sticky.

**Tech Stack:** Next.js 15, React 19, SCSS.

## Global Constraints

- Keep existing redesign content and layout.
- Desktop/tablet profile card must remain sticky.
- Mobile profile card becomes static only at `max-width: 640px`.
- Verification: `npm run lint` and `npm run build`.

---

### Task 1: Sticky profile behavior

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.scss`

**Interfaces:**
- Consumes: existing `ProfileCard` inline `position: sticky; top: 40px`.
- Produces: wrapper using `overflowX: 'clip'`, and sticky override moved to `max-width: 640px`.

- [ ] **Step 1: Change root overflow**

In `app/page.tsx`, change:

```tsx
<div style={{ position: 'relative', overflowX: 'hidden' }}>
```

to:

```tsx
<div style={{ position: 'relative', overflowX: 'clip' }}>
```

- [ ] **Step 2: Move sticky disable breakpoint**

In `app/globals.scss`, remove `.page-grid aside { position: static !important; }` from the `@media (max-width: 1024px)` block and add it to the `@media (max-width: 640px)` block.

- [ ] **Step 3: Verify**

Run:

```bash
npm run lint && npm run build
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/globals.scss docs/superpowers/plans/2026-07-16-sticky-profile-card.md
git commit -m "fix: keep profile card sticky while scrolling"
```
