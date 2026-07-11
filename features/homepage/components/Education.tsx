import Reveal from '@/components/modules/Reveal';
import { education } from '@/data/resume';

export default function Education() {
  return (
    <section id="education">
      <div className="section-head">
        <span className="tag">03</span>
        <h2>Education</h2>
      </div>
      <Reveal className="edu-card">
        <div>
          <h3>{education.school}</h3>
          <p className="degree">{education.degree}</p>
        </div>
        <span className="xp-meta">{education.period}</span>
      </Reveal>
    </section>
  );
}
