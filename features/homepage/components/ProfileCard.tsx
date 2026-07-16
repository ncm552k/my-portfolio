'use client';

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

const socialDotClassName =
  'flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-soft)] text-[var(--text-soft)] transition-all';

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
    <aside className="z-10 flex flex-col gap-5 max-[1024px]:w-full min-[1025px]:fixed min-[1025px]:left-[max(56px,calc((100vw-1280px)/2+56px))] min-[1025px]:top-1/2 min-[1025px]:w-[360px] min-[1025px]:-translate-y-1/2">
      <div className="flex flex-col gap-[18px] rounded-3xl border border-[var(--line)] bg-[rgba(16,16,19,0.72)] p-[22px] backdrop-blur-[14px]">
        <div className="flex items-center gap-3">
          <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] border border-[var(--accent)] font-bold text-[var(--accent)]">
            ◆
          </span>
          <span className="mono flex flex-1 items-center justify-center gap-[9px] rounded-full border border-[var(--line-soft)] px-3.5 py-[9px] text-xs text-[var(--text-soft)]">
            <span className="h-2 w-2 rounded-full bg-[#4ade80] [animation:om-pulse_2s_infinite]" />
            {contact.availability}
          </span>
        </div>

        <div className="relative flex aspect-square items-end justify-center overflow-hidden rounded-[18px] border border-[var(--line)] bg-[repeating-linear-gradient(45deg,#1b1b20,#1b1b20_8px,#151519_8px,#151519_16px)]">
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_25%,rgba(245,165,36,0.32),transparent_68%)]" />
          <div className="mono absolute left-3.5 top-3 text-[10px] text-[var(--text-dim)]">portrait.jpg</div>
          <div className="relative pb-[22px] text-[34px] font-medium italic text-[#f4f4f5] [text-shadow:0_2px_14px_rgba(0,0,0,0.65)]">
            {initials}
          </div>
        </div>

        <div className="text-center">
          <div className="text-[21px] font-bold tracking-[-0.01em]">{contact.name}</div>
          <div className="mono mt-1 text-xs text-[var(--accent)]">{contact.role}</div>
        </div>

        <div className="mono text-center text-xs leading-[1.7] text-[var(--text-dim)]">Based in {contact.location}</div>

        <div className="flex justify-center gap-2.5">
          <a
            data-social-dot
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className={socialDotClassName}
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
            className={socialDotClassName}
          >
            <LinkedInIcon />
          </a>
          <a
            data-social-dot
            href={`mailto:${contact.email}`}
            aria-label="Email"
            title="Email"
            className={socialDotClassName}
          >
            <MailIcon />
          </a>
          <a
            data-social-dot
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            aria-label="Phone"
            title="Phone"
            className={socialDotClassName}
          >
            <PhoneIcon />
          </a>
        </div>

        <a
          href={`mailto:${contact.email}`}
          className="flex items-center justify-between rounded-full bg-[var(--accent)] py-2 pl-5 pr-2 text-[15px] font-semibold text-[var(--bg)]"
        >
          Get in touch{' '}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg)] text-[#f4f4f5]">↗</span>
        </a>
      </div>

      <div className="mono px-1.5 text-xs leading-[1.9] text-[var(--text-dim)]">
        {contact.location} · {clock}
      </div>
    </aside>
  );
}
