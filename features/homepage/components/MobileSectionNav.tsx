'use client';

import { Briefcase, FolderGit2, House, Layers, Mail, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const items = [
  { id: 'introduction', label: 'Introduction', Icon: House },
  { id: 'experience', label: 'Education & Experience', Icon: Briefcase },
  { id: 'stack', label: 'Tech Stack', Icon: Layers },
  { id: 'projects', label: 'Projects', Icon: FolderGit2 },
  { id: 'contact', label: 'Contact', Icon: Mail },
];

export default function MobileSectionNav() {
  const [active, setActive] = useState('introduction');
  const [open, setOpen] = useState(false);

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
    <nav aria-label="Mobile section navigation" className="fixed bottom-5 right-5 z-50 min-[641px]:hidden">
      <div
        id="mobile-section-nav"
        className={`mb-3 flex flex-col items-end gap-2 transition-all ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        {items.map((it) => {
          const on = active === it.id;

          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              aria-label={it.label}
              aria-current={on ? 'true' : undefined}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-end gap-2 no-underline"
            >
              <span className="mono rounded-[9px] border border-[var(--line-soft)] bg-[rgba(16,16,19,0.92)] px-3 py-[7px] text-xs text-[var(--text)] backdrop-blur transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                {it.label}
              </span>
              <span
                className={`flex h-[46px] w-[46px] items-center justify-center rounded-full border backdrop-blur transition-all ${
                  on
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)]'
                    : 'border-[var(--line-soft)] bg-[rgba(16,16,19,0.7)] text-[var(--text-soft)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]'
                }`}
              >
                <it.Icon size={22} strokeWidth={2.25} />
              </span>
            </a>
          );
        })}
      </div>

      <button
        type="button"
        aria-controls="mobile-section-nav"
        aria-expanded={open}
        aria-label={open ? 'Close section navigation' : 'Open section navigation'}
        onClick={() => setOpen((v) => !v)}
        className="ml-auto flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)] shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-colors hover:bg-[var(--accent-hover)]"
      >
        {open ? <X size={24} strokeWidth={2.25} /> : <Menu size={24} strokeWidth={2.25} />}
      </button>
    </nav>
  );
}
