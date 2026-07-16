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
    const sections = items.map((it) => document.getElementById(it.id)).filter((el): el is HTMLElement => el !== null);

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
      data-rail
      aria-label="Section navigation"
      className="fixed right-[22px] top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3"
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
            className="relative flex items-center justify-end no-underline"
          >
            <span
              data-rail-label
              className="mono absolute right-14 whitespace-nowrap rounded-[9px] border border-[var(--line-soft)] bg-[rgba(16,16,19,0.92)] px-3 py-[7px] text-xs text-[var(--text)] backdrop-blur"
            >
              {it.label}
            </span>
            <span
              data-rail-btn
              className={`flex h-[46px] w-[46px] items-center justify-center rounded-full border text-base backdrop-blur transition-all ${
                on
                  ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)]'
                  : 'border-[var(--line-soft)] bg-[rgba(16,16,19,0.7)] text-[var(--text-soft)]'
              }`}
            >
              {it.glyph}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
