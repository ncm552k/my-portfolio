'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type RevealTag = 'article' | 'div' | 'section';

type RevealProps = {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
};

/** Reveals its own element when it scrolls into view. */
export default function Reveal({ as = 'div', children, className }: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const revealClassName = cn('reveal', className, isVisible && 'in');
  const setElementRef = (node: HTMLElement | null) => {
    elementRef.current = node;
  };

  useEffect(() => {
    const el = elementRef.current;

    if (!el) return;

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);

      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  if (as === 'article') {
    return (
      <article ref={setElementRef} className={revealClassName}>
        {children}
      </article>
    );
  }

  if (as === 'section') {
    return (
      <section ref={setElementRef} className={revealClassName}>
        {children}
      </section>
    );
  }

  return (
    <div ref={setElementRef} className={revealClassName}>
      {children}
    </div>
  );
}
