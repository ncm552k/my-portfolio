import Reveal from '@/components/modules/Reveal';
import { projects } from '@/data/resume';

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-head">
        <span className="tag">04</span>
        <h2>Projects</h2>
      </div>
      <div className="projects">
        {projects.map((p) => (
          <Reveal as="article" className="card" key={p.title}>
            <div className="card-top">
              <div>
                <h3>{p.title}</h3>
                <div className="where">{p.meta}</div>
              </div>
              {p.url && (
                <a className="link" href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.urlLabel} ↗
                </a>
              )}
            </div>
            <p>{p.description}</p>
            <ul>
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="chips">
              {p.tech.map((t) => (
                <span className="chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
