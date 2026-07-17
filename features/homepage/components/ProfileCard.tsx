'use client';

import { FileUser } from 'lucide-react';
import Image from 'next/image';

import { GitHubIcon } from '@/components/icon/GitHubIcon';
import { LinkedInIcon } from '@/components/icon/LinkedInIcon';
import { MailIcon } from '@/components/icon/MailIcon';
import { PhoneIcon } from '@/components/icon/PhoneIcon';
import { contact } from '@/data/resume';

const socialDotClassName =
  'flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-soft)] text-[var(--text-soft)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]';

export default function ProfileCard() {
  return (
    <aside className="z-10 flex flex-col gap-5 max-[1024px]:w-full min-[1025px]:fixed min-[1025px]:left-[max(56px,calc((100vw-1280px)/2+56px))] min-[1025px]:top-1/2 min-[1025px]:w-[360px] min-[1025px]:-translate-y-1/2">
      <div className="flex flex-col gap-[18px] rounded-3xl border border-[var(--line)] bg-[rgba(16,16,19,0.72)] p-[22px] backdrop-blur-[14px]">
        <div className="flex items-center gap-3">
          <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] border border-[var(--line-soft)]">
            <Image src="/image/logo.png" alt={`${contact.name} logo`} width={26} height={26} priority />
          </span>
          <span className="mono flex flex-1 items-center justify-center gap-[9px] rounded-full border border-[var(--line-soft)] px-3.5 py-[9px] text-xs text-[var(--text-soft)]">
            <span className="h-2 w-2 rounded-full bg-[#4ade80] [animation:om-pulse_2s_infinite]" />
            {contact.availability}
          </span>
        </div>

        <div className="relative flex aspect-square items-end justify-center overflow-hidden rounded-[18px] border border-[var(--line)]">
          <Image
            src="/image/avatar.jpg"
            alt={`${contact.name} portrait`}
            fill
            sizes="360px"
            className="object-cover"
            priority
          />
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
          <a href={contact.resume} download aria-label="Download CV" title="Download CV" className={socialDotClassName}>
            <FileUser size={17} strokeWidth={2.25} />
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
    </aside>
  );
}
