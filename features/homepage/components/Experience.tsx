import Reveal from '@/components/modules/Reveal';
import { experience } from '@/data/resume';

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-head">
        <span className="tag">02</span>
        <h2>Work experience</h2>
      </div>
      <div className="xp">
        {experience.map((job) => (
          <Reveal className="xp-item" key={job.company}>
            <span className="xp-meta">{job.period}</span>
            <h3>{job.company}</h3>
            <p className="xp-role">{job.role}</p>
            <ul>
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
