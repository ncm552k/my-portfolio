import type { CSSProperties } from 'react';

import { GitHubIcon } from '@/components/icon/GitHubIcon';
import { LinkedInIcon } from '@/components/icon/LinkedInIcon';
import Reveal from '@/components/modules/Reveal';
import { contact } from '@/data/resume';

const iconBtnStyle: CSSProperties = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  border: '1px solid var(--line-soft)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-soft)',
};

export default function Contact() {
  return (
    <section id="contact" style={{ scrollMarginTop: '48px' }}>
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
          Contact
        </div>
      </Reveal>
      <Reveal>
        <h2
          style={{ margin: '0 0 12px', fontSize: '46px', lineHeight: 1.05, fontWeight: 700, letterSpacing: '-.03em' }}
        >
          Let&apos;s build something <span style={{ color: 'var(--accent)' }}>together.</span>
        </h2>
      </Reveal>
      <Reveal>
        <p
          style={{
            margin: '0 0 40px',
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'var(--text-muted)',
            maxWidth: '560px',
          }}
        >
          Open to front-end and full-stack opportunities. If you need someone who cares about Core Web Vitals as much as
          clean component architecture, let&apos;s talk.
        </p>
      </Reveal>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
        <a
          href={`mailto:${contact.email}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--accent)',
            color: 'var(--bg)',
            fontWeight: 600,
            padding: '13px 22px',
            borderRadius: '999px',
            fontSize: '15px',
          }}
        >
          {contact.email} ↗
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          data-social-dot
          style={iconBtnStyle}
        >
          <LinkedInIcon />
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
          data-social-dot
          style={iconBtnStyle}
        >
          <GitHubIcon />
        </a>
      </div>

      <div
        className="mono"
        style={{
          marginTop: '90px',
          borderTop: '1px solid var(--line)',
          paddingTop: '26px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px',
          color: 'var(--text-dim)',
        }}
      >
        <span>© 2026 {contact.name}. Built with Next.js &amp; TypeScript.</span>
        <a href="#introduction" style={{ color: 'var(--text-soft)' }}>
          Back to top ↑
        </a>
      </div>
    </section>
  );
}
