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
                background: 'rgba(16, 16, 19, 0.92)',
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
                background: on ? 'var(--accent)' : 'rgba(16, 16, 19, 0.7)',
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
