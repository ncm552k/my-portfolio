import {
  Contact,
  ExperienceEducation,
  Introduction,
  ProfileCard,
  Projects,
  SectionRail,
  TechStack,
} from '@/features/homepage';

export default function Home() {
  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      <SectionRail />
      <div className="page-grid">
        <ProfileCard />
        <main className="page-main">
          <Introduction />
          <ExperienceEducation />
          <TechStack />
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  );
}
