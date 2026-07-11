# Minh — Portfolio (Next.js)

Personal portfolio of Nguyen Cong Minh, Front-End Developer (Hanoi, Vietnam).

## Stack

- Next.js 15 (App Router) + TypeScript
- Three.js — interactive 3D "coding boy" hero (client component, typing animation, drag to rotate)
- next/font (Sora, IBM Plex Sans, IBM Plex Mono)
- Plain CSS in `app/globals.css` (no CSS framework)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
app/            layout (fonts + metadata), page, global styles
components/     Header, Hero, CodingBoy3D (client), Skills, Experience,
                Education, Projects, Contact, Reveal (client, scroll animation)
data/resume.ts  all resume content — edit this file to update the site
```

## Editing content

All text content (experience, projects, skills, contact info) lives in
`data/resume.ts` as typed objects — no need to touch the components.

## Deploy

Push to GitHub and import into Vercel (zero config), or `npm run build && npm start` on any Node host.
