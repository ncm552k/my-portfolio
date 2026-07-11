import { Contact, Education, Experience, Header, Hero, Projects, Skills } from '@/features/homepage';

export default function Home() {
  return (
    <>
      <Header />
      <main className="wrap">
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <footer>© 2026 Nguyen Cong Minh — built with Next.js, TypeScript &amp; Three.js.</footer>
    </>
  );
}
