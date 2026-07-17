'use client';

import { ArrowRight, Plus } from 'lucide-react';
import { useState } from 'react';

import { education, experience } from '@/data/resume';

const eyebrowClassName =
  'mono mb-11 inline-flex items-center gap-2.5 text-[13px] uppercase tracking-[0.14em] text-[var(--text-faint)]';
const subLabelClassName = 'mono mb-2 text-xs uppercase tracking-[0.1em] text-[var(--text-dim)]';

export default function ExperienceEducation() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="scroll-mt-12">
      <div className={eyebrowClassName}>
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        Education &amp; Experience
      </div>

      <div className={subLabelClassName}>Experience</div>
      <div className="flex flex-col">
        {experience.map((job, i) => {
          const isOpen = open === i;

          return (
            <div key={job.company} className="border-t border-[rgba(255,255,255,0.09)]">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="grid w-full cursor-pointer grid-cols-[1fr_auto_auto] items-center gap-5 border-0 bg-transparent py-[26px] text-left font-[inherit] text-inherit"
              >
                <div>
                  <div className="text-2xl font-semibold">{job.role}</div>
                  <div className="mono mt-1.5 text-[13px] text-[var(--text-faint)]">{job.company}</div>
                </div>
                <div className="mono text-sm text-[var(--accent)]">{job.period}</div>
                <Plus
                  aria-hidden="true"
                  size={20}
                  strokeWidth={2.25}
                  className={`text-[var(--text-faint)] transition-transform ${isOpen ? 'rotate-45' : ''}`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <ul className="m-0 list-none pb-[26px]">
                    {job.bullets.map((b) => (
                      <li key={b} className="relative mb-2.5 pl-6 text-[15px] leading-[1.7] text-[var(--text-muted)]">
                        <ArrowRight
                          size={16}
                          strokeWidth={2.25}
                          className="absolute left-0 top-[6px] text-[var(--accent)]"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
        <div className="border-t border-[rgba(255,255,255,0.09)]" />
      </div>

      <div className={`${subLabelClassName} mt-11`}>Education</div>
      <div className="grid grid-cols-[1fr_auto] items-center gap-5 border-y border-[rgba(255,255,255,0.09)] py-[26px]">
        <div>
          <div className="text-2xl font-semibold">{education.degree}</div>
          <div className="mono mt-1.5 text-[13px] text-[var(--text-faint)]">{education.school}</div>
        </div>
        <div className="mono text-sm text-[var(--accent)]">{education.period}</div>
      </div>
    </section>
  );
}
