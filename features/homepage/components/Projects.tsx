import Reveal from '@/components/modules/Reveal';
import { projects } from '@/data/resume';

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-12">
      <Reveal>
        <div className="mono mb-11 inline-flex items-center gap-2.5 text-[13px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          Projects
        </div>
      </Reveal>

      <div className="flex flex-col">
        {projects.map((p, i) => (
          <Reveal as="article" key={p.title}>
            <div
              className={`border-t border-[rgba(255,255,255,0.09)] py-8 ${i === projects.length - 1 ? 'border-b' : ''}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-5">
                <h3 className="m-0 text-[28px] font-semibold tracking-[-0.01em]">{p.title}</h3>
                <span className="mono text-[13px] text-[var(--accent)]">{p.meta}</span>
              </div>
              <p className="mt-4 max-w-[640px] text-[15px] leading-[1.75] text-[var(--text-muted)]">{p.description}</p>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono mt-[18px] inline-flex items-center gap-2 text-[13px]"
                >
                  {p.urlLabel} ↗
                </a>
              ) : (
                <span className="mono mt-[18px] inline-flex items-center gap-2 text-[13px] text-[var(--text-dim)]">
                  Private — case study on request
                </span>
              )}
              <div className="mt-[18px] flex flex-wrap gap-[7px]">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="mono rounded-full bg-[rgba(245,165,36,0.1)] px-[11px] py-1 text-[11.5px] text-[var(--accent)]"
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
