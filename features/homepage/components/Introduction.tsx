import Reveal from '@/components/modules/Reveal';

export default function Introduction() {
  return (
    <section id="introduction" className="scroll-mt-12 pt-2">
      <Reveal>
        <div className="mono mb-7 inline-flex items-center gap-2.5 text-[13px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          Introduction
        </div>
      </Reveal>
      <Reveal>
        <h1 className="m-0 text-[56px] font-bold leading-[1.05] tracking-[-0.03em]">
          Building fast, production-grade web apps, <span className="text-[var(--accent)]">end-to-end.</span>
        </h1>
      </Reveal>
      <Reveal>
        <p className="mt-6 max-w-[620px] text-[17px] leading-[1.75] text-[var(--text-muted)]">
          I&apos;m a Hanoi-based Frontend Developer with over three years of experience specializing in React, Next.js,
          and TypeScript. I currently build for CareerViet, a leading Vietnamese recruitment platform, at MOR Software,
          and have previously delivered projects at AIT Corporation and NTQ Solution — including work for Nick Scali
          (Australia) and Viettel Post. I&apos;m currently expanding into full-stack development, with a focus on clean
          architecture and end-to-end feature ownership.
        </p>
      </Reveal>
    </section>
  );
}
