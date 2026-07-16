'use client';

import type { CSSProperties } from 'react';

import { useState } from 'react';

import { education, experience } from '@/data/resume';

const eyebrowStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '13px',
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--text-faint)',
  marginBottom: '44px',
};

const subLabelStyle: CSSProperties = {
  fontSize: '12px',
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  color: 'var(--text-dim)',
  marginBottom: '8px',
};

export default function ExperienceEducation() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" style={{ scrollMarginTop: '48px' }}>
      <div className="mono" style={eyebrowStyle}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
        Education &amp; Experience
      </div>

      <div className="mono" style={subLabelStyle}>
        Experience
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {experience.map((job, i) => {
          const isOpen = open === i;

          return (
            <div key={job.company} style={{ borderTop: '1px solid rgba(255, 255, 255, 0.09)' }}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  textAlign: 'left',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto auto',
                  gap: '20px',
                  alignItems: 'center',
                  padding: '26px 0',
                  fontFamily: 'inherit',
                }}
              >
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 600 }}>{job.role}</div>
                  <div className="mono" style={{ fontSize: '13px', color: 'var(--text-faint)', marginTop: '6px' }}>
                    {job.company}
                  </div>
                </div>
                <div className="mono" style={{ fontSize: '14px', color: 'var(--accent)' }}>
                  {job.period}
                </div>
                <span
                  aria-hidden="true"
                  style={{
                    color: 'var(--text-faint)',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                    transition: 'transform .2s',
                    fontSize: '18px',
                  }}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <ul style={{ listStyle: 'none', margin: 0, padding: '0 0 26px' }}>
                  {job.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        position: 'relative',
                        paddingLeft: '20px',
                        color: 'var(--text-muted)',
                        fontSize: '15px',
                        marginBottom: '10px',
                        lineHeight: 1.7,
                      }}
                    >
                      <span className="mono" style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>
                        →
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.09)' }} />
      </div>

      <div className="mono" style={{ ...subLabelStyle, margin: '44px 0 8px' }}>
        Education
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '20px',
          alignItems: 'center',
          padding: '26px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.09)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.09)',
        }}
      >
        <div>
          <div style={{ fontSize: '24px', fontWeight: 600 }}>{education.degree}</div>
          <div className="mono" style={{ fontSize: '13px', color: 'var(--text-faint)', marginTop: '6px' }}>
            {education.school}
          </div>
        </div>
        <div className="mono" style={{ fontSize: '14px', color: 'var(--accent)' }}>
          {education.period}
        </div>
      </div>
    </section>
  );
}
