import {
  Contact,
  ExperienceEducation,
  Introduction,
  MobileSectionNav,
  ProfileCard,
  Projects,
  SectionRail,
  TechStack,
} from '@/features/homepage';

export default function Home() {
  return (
    <div className="relative overflow-x-clip">
      <SectionRail />
      <MobileSectionNav />
      <div className="mx-auto grid max-w-[1280px] grid-cols-[360px_1fr] items-start gap-[72px] px-14 pb-[60px] pt-12 max-[1024px]:grid-cols-1 max-[1024px]:gap-10 max-[1024px]:px-6 max-[1024px]:pb-12 max-[1024px]:pt-8">
        <ProfileCard />
        <main className="flex min-w-0 flex-col gap-[130px] min-[1025px]:col-start-2 max-[640px]:gap-[90px]">
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
