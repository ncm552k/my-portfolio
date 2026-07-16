'use client';

import type { CSSProperties } from 'react';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

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
      <span className="mono" style={{ fontSize: '12px', color: 'var(--text-soft)' }}>
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

  const maskStyle: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
    maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
  };

  const trackStyle: CSSProperties = {
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
              Tech Stack
            </div>
            <div className="mono" style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
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
            Tools I reach for, <span style={{ color: 'var(--accent)' }}>front to back.</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '10px' }}>
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
