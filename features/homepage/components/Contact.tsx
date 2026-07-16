import { GitHubIcon } from '@/components/icon/GitHubIcon';
import { LinkedInIcon } from '@/components/icon/LinkedInIcon';
import Reveal from '@/components/modules/Reveal';
import { contact } from '@/data/resume';

const iconBtnClassName =
  'inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line-soft)] text-[var(--text-soft)]';

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-12">
      <Reveal>
        <div className="mono mb-7 inline-flex items-center gap-2.5 text-[13px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          Contact
        </div>
      </Reveal>
      <Reveal>
        <h2 className="mb-3 mt-0 text-[46px] font-bold leading-[1.05] tracking-[-0.03em]">
          Let&apos;s build something <span className="text-[var(--accent)]">together.</span>
        </h2>
      </Reveal>
      <Reveal>
        <p className="mb-10 max-w-[560px] text-base leading-[1.75] text-[var(--text-muted)]">
          Open to front-end and full-stack opportunities. If you need someone who cares about Core Web Vitals as much as
          clean component architecture, let&apos;s talk.
        </p>
      </Reveal>
      <div className="flex flex-wrap items-center gap-3.5">
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent)] px-[22px] py-[13px] text-[15px] font-semibold text-[var(--bg)]"
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
          className={iconBtnClassName}
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
          className={iconBtnClassName}
        >
          <GitHubIcon />
        </a>
      </div>

      <div className="mono mt-[90px] flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-[26px] text-[13px] text-[var(--text-dim)]">
        <span>© 2026 {contact.name}. Built with Next.js &amp; TypeScript.</span>
        <a href="#introduction" className="text-[var(--text-soft)]">
          Back to top ↑
        </a>
      </div>
    </section>
  );
}
