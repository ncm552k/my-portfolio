import Reveal from '@/components/modules/Reveal';
import { projects } from '@/data/resume';

export default function Projects() {
  return (
    <section id="projects" style={{ scrollMarginTop: '48px' }}>
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
            marginBottom: '44px',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
          Projects
        </div>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {projects.map((p, i) => (
          <Reveal as="article" key={p.title}>
            <div
              style={{
                padding: '32px 0',
                borderTop: '1px solid rgba(255, 255, 255, 0.09)',
                borderBottom: i === projects.length - 1 ? '1px solid rgba(255, 255, 255, 0.09)' : undefined,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 600, letterSpacing: '-.01em' }}>{p.title}</h3>
                <span className="mono" style={{ fontSize: '13px', color: 'var(--accent)' }}>
                  {p.meta}
                </span>
              </div>
              <p
                style={{
                  margin: '16px 0 0',
                  fontSize: '15px',
                  lineHeight: 1.75,
                  color: 'var(--text-muted)',
                  maxWidth: '640px',
                }}
              >
                {p.description}
              </p>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '18px',
                    fontSize: '13px',
                  }}
                >
                  {p.urlLabel} ↗
                </a>
              ) : (
                <span
                  className="mono"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '18px',
                    fontSize: '13px',
                    color: 'var(--text-dim)',
                  }}
                >
                  Private — case study on request
                </span>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginTop: '18px' }}>
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="mono"
                    style={{
                      fontSize: '11.5px',
                      padding: '4px 11px',
                      borderRadius: '99px',
                      background: 'rgba(245, 165, 36, 0.1)',
                      color: 'var(--accent)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
