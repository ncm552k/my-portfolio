'use client';

import type { CSSProperties } from 'react';

import { useEffect, useState } from 'react';

import { GitHubIcon } from '@/components/icon/GitHubIcon';
import { LinkedInIcon } from '@/components/icon/LinkedInIcon';
import { MailIcon } from '@/components/icon/MailIcon';
import { PhoneIcon } from '@/components/icon/PhoneIcon';
import { contact } from '@/data/resume';

function formatClock(): string {
  try {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: contact.timezone,
    });
  } catch {
    return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }
}

const dotStyle: CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '1px solid var(--line-soft)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-soft)',
  transition: 'all .2s',
};

export default function ProfileCard() {
  const [clock, setClock] = useState(formatClock());

  useEffect(() => {
    const t = setInterval(() => setClock(formatClock()), 20000);

    return () => clearInterval(t);
  }, []);

  const initials = contact.name
    .split(' ')
    .map((w) => w[0])
    .join('');

  return (
    <aside
      style={{
        position: 'sticky',
        top: '40px',
        alignSelf: 'start',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div
        style={{
          background: 'rgba(16, 16, 19, 0.72)',
          backdropFilter: 'blur(14px)',
          border: '1px solid var(--line)',
          borderRadius: '24px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              width: '38px',
              height: '38px',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              borderRadius: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            ◆
          </span>
          <span
            className="mono"
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '9px',
              border: '1px solid var(--line-soft)',
              borderRadius: '999px',
              padding: '9px 14px',
              fontSize: '12px',
              color: 'var(--text-soft)',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#4ade80',
                animation: 'om-pulse 2s infinite',
              }}
            />
            {contact.availability}
          </span>
        </div>

        <div
          style={{
            position: 'relative',
            aspectRatio: '1/1',
            borderRadius: '18px',
            overflow: 'hidden',
            border: '1px solid var(--line)',
            background: 'repeating-linear-gradient(45deg, #1b1b20, #1b1b20 8px, #151519 8px, #151519 16px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(70% 60% at 50% 25%, rgba(245, 165, 36, 0.32), transparent 68%)',
            }}
          />
          <div
            className="mono"
            style={{ position: 'absolute', top: '12px', left: '14px', fontSize: '10px', color: 'var(--text-dim)' }}
          >
            portrait.jpg
          </div>
          <div
            style={{
              position: 'relative',
              fontStyle: 'italic',
              fontSize: '34px',
              fontWeight: 500,
              color: '#f4f4f5',
              paddingBottom: '22px',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.65)',
            }}
          >
            {initials}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '21px', fontWeight: 700, letterSpacing: '-.01em' }}>{contact.name}</div>
          <div className="mono" style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '4px' }}>
            {contact.role}
          </div>
        </div>

        <div
          className="mono"
          style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-soft)', lineHeight: 1.7 }}
        >
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <br />
          <span style={{ color: 'var(--text-dim)', fontSize: '12px' }}>Based in {contact.location}</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <a
            data-social-dot
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            style={dotStyle}
          >
            <GitHubIcon />
          </a>
          <a
            data-social-dot
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            style={dotStyle}
          >
            <LinkedInIcon />
          </a>
          <a data-social-dot href={`mailto:${contact.email}`} aria-label="Email" title="Email" style={dotStyle}>
            <MailIcon />
          </a>
          <a
            data-social-dot
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            aria-label="Phone"
            title="Phone"
            style={dotStyle}
          >
            <PhoneIcon />
          </a>
        </div>

        <a
          href={`mailto:${contact.email}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--accent)',
            color: 'var(--bg)',
            fontWeight: 600,
            padding: '8px 8px 8px 20px',
            borderRadius: '999px',
            fontSize: '15px',
          }}
        >
          Get in touch{' '}
          <span
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--bg)',
              color: '#f4f4f5',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ↗
          </span>
        </a>
      </div>

      <div className="mono" style={{ fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.9, padding: '0 6px' }}>
        {contact.location} · {clock}
      </div>
    </aside>
  );
}
