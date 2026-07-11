import Image from 'next/image';

import Reveal from '@/components/modules/Reveal';
import { skills } from '@/data/resume';

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-head">
        <span className="tag">01</span>
        <h2>Skills</h2>
      </div>
      <div className="skill-list">
        {skills.map((row) => (
          <Reveal className="skill-row" key={row.category}>
            <h3>{row.category}</h3>
            <div className="skill-icons">
              {row.items.map((item) => (
                <div className="skill" key={item.name}>
                  {item.icon ? (
                    <Image
                      src={`https://cdn.simpleicons.org/${item.icon}`}
                      alt={item.name}
                      loading="lazy"
                      width={38}
                      height={38}
                      unoptimized
                    />
                  ) : (
                    <div className="emoji">{item.emoji}</div>
                  )}
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
