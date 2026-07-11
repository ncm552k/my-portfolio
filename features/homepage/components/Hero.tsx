import { GitHubIcon } from '@/components/icon/GitHubIcon';
import { LinkedInIcon } from '@/components/icon/LinkedInIcon';
import { contact } from '@/data/resume';

import CodingBoy3D from './CodingBoy3D';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-text">
        <p className="eyebrow">
          {contact.role} · {contact.location}
        </p>
        <h1>
          Nguyen Cong Minh builds <span className="accent">fast</span>, production-grade web apps.
        </h1>
        <p className="hero-sub">
          3+ years shipping responsive, high-performance interfaces with React, Next.js and TypeScript — from a full
          legacy-PHP-to-Next.js migration to white-label recruitment platforms serving thousands of users. Currently
          expanding into the backend on the road to full-stack.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href={`mailto:${contact.email}`}>
            Get in touch ↗
          </a>
          <a
            className="btn btn-icon"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            title="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            className="btn btn-icon"
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            title="GitHub"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
      <CodingBoy3D />
    </div>
  );
}
