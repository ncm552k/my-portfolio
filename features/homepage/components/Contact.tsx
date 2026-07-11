import { GitHubIcon } from '@/components/icon/GitHubIcon';
import { LinkedInIcon } from '@/components/icon/LinkedInIcon';
import Reveal from '@/components/modules/Reveal';
import { contact } from '@/data/resume';

export default function Contact() {
  return (
    <section id="contact">
      <Reveal className="contact">
        <h2>Let&apos;s build something fast.</h2>
        <p>
          Open to front-end and full-stack opportunities. If you need someone who cares about Core Web Vitals as much as
          clean component architecture, let&apos;s talk.
        </p>
        <div className="hero-cta" style={{ justifyContent: 'center', marginTop: 0 }}>
          <a className="btn btn-primary" href={`mailto:${contact.email}`}>
            {contact.email}
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
        <div className="contact-meta">
          <span>📍 {contact.location}</span>
          <span>📞 {contact.phone}</span>
        </div>
      </Reveal>
    </section>
  );
}
