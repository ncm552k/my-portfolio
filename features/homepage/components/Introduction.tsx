import Reveal from '@/components/modules/Reveal';

export default function Introduction() {
  return (
    <section id="introduction" style={{ scrollMarginTop: '48px', paddingTop: '8px' }}>
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
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
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
          <span style={{ color: 'var(--accent)' }}>frontend to full-stack.</span>
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
          I&apos;m a front-end developer with 3+ years shipping responsive, high-performance interfaces with React,
          Next.js and TypeScript — from a full legacy-PHP-to-Next.js migration to white-label recruitment platforms
          serving thousands of users. Currently expanding into the backend on the road to full-stack.
        </p>
      </Reveal>
    </section>
  );
}
