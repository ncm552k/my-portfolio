'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';

import { skills } from '@/data/resume';

type Tile = { name: string; icon?: string; emoji?: string };

function useTiles(): [Tile[], Tile[]] {
  return useMemo(() => {
    const flat: Tile[] = skills.filter((row) => row.category !== 'Languages').flatMap((row) => row.items);
    const mid = Math.ceil(flat.length / 2);

    return [flat.slice(0, mid), flat.slice(mid)];
  }, []);
}

function Card({ tile }: { tile: Tile }) {
  return (
    <div className="flex h-32 w-32 shrink-0 flex-col items-center justify-center gap-[13px] rounded-[22px] border border-[var(--line)] bg-[var(--card)]">
      {tile.icon ? (
        <Image
          src={`https://cdn.simpleicons.org/${tile.icon}`}
          alt={tile.name}
          width={44}
          height={44}
          loading="lazy"
          unoptimized
          className="object-contain"
        />
      ) : (
        <div className="flex h-11 w-11 items-center justify-center text-3xl">{tile.emoji}</div>
      )}
      <span className="mono text-xs text-[var(--text-soft)]">{tile.name}</span>
    </div>
  );
}

export default function TechStack() {
  const [rowA, rowB] = useTiles();
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackARef = useRef<HTMLDivElement | null>(null);
  const trackBRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <section id="stack">
      <div ref={pinRef} className="relative h-[140vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center gap-6">
          <div className="mono inline-flex items-center gap-2.5 text-[13px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Tech Stack
          </div>
          <h2 className="m-0 max-w-[640px] text-[40px] font-bold leading-[1.1] tracking-[-0.03em]">
            Tools I reach for, <span className="text-[var(--accent)]">front to back.</span>
          </h2>
          <div className="mt-2.5 flex flex-col gap-[18px]">
            <div className="relative overflow-hidden [-webkit-mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
              <div ref={trackARef} className="flex w-max gap-4 will-change-transform">
                {rowA.map((t) => (
                  <Card key={t.name} tile={t} />
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden [-webkit-mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
              <div ref={trackBRef} className="flex w-max gap-4 will-change-transform">
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
