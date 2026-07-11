export const contact = {
  name: 'Nguyen Cong Minh',
  role: 'Front-End Developer',
  location: 'Hanoi, Vietnam',
  email: 'ncm552k@gmail.com',
  phone: '0966 845 468',
  linkedin: 'https://www.linkedin.com/in/ncm552k',
  github: 'https://github.com/ncm552k',
};

export type SkillItem = { name: string; icon?: string; emoji?: string };
export type SkillRow = { category: string; items: SkillItem[] };

export const skills: SkillRow[] = [
  {
    category: 'Languages & Frameworks',
    items: [
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'HTML', icon: 'html5' },
      { name: 'CSS', icon: 'css' },
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'Vue.js (basic)', icon: 'vuedotjs' },
    ],
  },
  {
    category: 'State & Reactive',
    items: [
      { name: 'Redux (Thunk, Saga)', icon: 'redux' },
      { name: 'Zustand', emoji: '🐻' },
      { name: 'TanStack Query', icon: 'reactquery' },
      { name: 'SWR', icon: 'swr' },
      { name: 'Vuex', icon: 'vuedotjs' },
      { name: 'Pinia', icon: 'pinia' },
    ],
  },
  {
    category: 'UI Libraries',
    items: [
      { name: 'Material UI', icon: 'mui' },
      { name: 'Ant Design', icon: 'antdesign' },
      { name: 'KendoUI', icon: 'progress' },
      { name: 'TailwindCSS', icon: 'tailwindcss' },
      { name: 'Bootstrap', icon: 'bootstrap' },
    ],
  },
  {
    category: 'Databases & Real-time',
    items: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Socket.IO', icon: 'socketdotio' },
      { name: 'SSE', emoji: '⚡' },
    ],
  },
  {
    category: 'Tools & Workflow',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Claude', icon: 'claude' },
      { name: 'Copilot', icon: 'githubcopilot' },
    ],
  },
  {
    category: 'Languages',
    items: [
      { name: 'Vietnamese (Native)', emoji: '🇻🇳' },
      { name: 'English (Upper-Int.)', emoji: '🇬🇧' },
    ],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: 'MOR Software',
    role: 'Front-End Developer',
    period: 'Mar 2025 — Present',
    bullets: [
      "Migrated CareerViet's recruitment website from a legacy Smarty PHP stack to Next.js, leveraging SSR and static optimization to deliver a 50% speed improvement.",
      'Optimized on-page SEO through SSR, semantic HTML, and metadata strategy, improving search engine visibility.',
      'Leveraged AI coding assistants (Claude, ChatGPT, Copilot) to accelerate development of repetitive UI logic, boosting feature velocity.',
    ],
  },
  {
    company: 'AIT Corporation',
    role: 'Front-End Developer',
    period: 'Jul 2024 — Feb 2025',
    bullets: [
      'Built a Next.js furniture e-commerce platform (Nick Scali Australia) with a Contentful headless CMS and configurable product options.',
      'Independently delivered a React-based web application for Viettel Post as the sole front-end developer.',
    ],
  },
  {
    company: 'NTQ Solution',
    role: 'Front-End Developer',
    period: 'Feb 2023 — Jun 2024',
    bullets: [
      'Contributed to front-end UI and UI logic for a financial-domain web application using HTML/CSS, TypeScript, and Next.js.',
      'Implemented a new design for a high-traffic e-commerce website, enhancing user experience and engagement.',
      'Established automated testing with Cypress, improving release confidence and reducing regression bugs.',
    ],
  },
];

export const education = {
  school: 'Post and Telecommunication Institute of Technology',
  degree: "Engineer's Degree in Information Technology",
  period: 'Aug 2018 — Feb 2023',
};

export type Project = {
  title: string;
  meta: string;
  url?: string;
  urlLabel?: string;
  description: string;
  bullets: string[];
  tech: string[];
};

export const projects: Project[] = [
  {
    title: 'CareerViet Recruitment Platform',
    meta: 'MOR Software · Team of 20 · Mar 2025 — Present',
    url: 'https://careerviet.vn',
    urlLabel: 'careerviet.vn',
    description:
      'A comprehensive recruitment ecosystem: the main job platform connecting candidates with employers across Vietnam, plus Talent Solution — a white-label module that lets recruiters build their own branded recruitment sites from pre-built templates.',
    bullets: [
      'Re-architected page templates with Next.js SSR/SSG; optimized on-page SEO via semantic HTML, structured data, and metadata strategy — boosting search visibility and organic traffic.',
      'Built configurable, template-driven UI components letting recruiters customize branding, layout, and content without engineering support.',
      'Optimized Core Web Vitals (LCP, CLS, INP) via image optimization, code-splitting, lazy loading, and font strategy — improving Lighthouse scores and perceived performance.',
    ],
    tech: [
      'Next.js',
      'TypeScript',
      'SWR',
      'Material UI',
      'Radix UI',
      'i18n',
      'ChartJS',
      'HighCharts',
      'SSE',
      'React Hook Form',
    ],
  },
  {
    title: 'Viettel Post Staff Evaluation',
    meta: 'AIT Corporation · Team of 4 · Nov 2024 — Feb 2025',
    description: 'Web application for evaluating employees based on performance and corporate policy compliance.',
    bullets: [
      'Created the code base and shared component library for consistency and efficiency across the application.',
      'Implemented UI from Figma specs with precise adherence to visual and functional requirements.',
      "Integrated SSO authentication with the company's identity provider to streamline login and access control.",
      'Worked closely with back-end developers and QC throughout the development cycle to deliver stable, fully-tested features.',
    ],
    tech: ['React', 'TypeScript', 'TanStack Query', 'Zustand', 'Ant Design', 'SCSS', 'TailwindCSS'],
  },
  {
    title: 'Nick Scali Australia',
    meta: 'AIT Corporation · Team of 6 · Jul 2024 — Nov 2024',
    url: 'http://nickscali.com.au',
    urlLabel: 'nickscali.com.au',
    description:
      'A premium furniture e-commerce platform inspired by Nick Scali, featuring a product catalogue, configurable sofas/recliners, and a showroom locator — content managed via Contentful headless CMS.',
    bullets: [
      'Established the project code base and a reusable component library to accelerate feature development.',
      'Modelled products, categories, and campaigns in Contentful, fetched via a typed API layer using SSR, ISR, and streaming to improve SEO and deliver fast page loads.',
      'Implemented responsive UI for a seamless experience across desktop, tablet, and mobile.',
      'Animated UI with GSAP/ScrollTrigger (scroll effects) and Framer Motion (micro-interactions).',
    ],
    tech: ['Next.js', 'TypeScript', 'Contentful', 'Radix UI', 'Zustand', 'TailwindCSS', 'Framer Motion', 'GSAP'],
  },
  {
    title: 'Pronexus Fund Document System',
    meta: 'NTQ Solution · Team of 40 · May 2023 — Jun 2024',
    description:
      'Web application for managing and authoring financial report documents, modernizing an existing .NET Framework application.',
    bullets: [
      'Delivered document management, HTML/PDF/Word/Excel exports, data-driven charting, an embedded PDF viewer, and inline editing.',
      "Built a custom rich-text editor on SlateReact tailored to the client's authoring requirements.",
      'Migrated state management from Redux Toolkit to a hybrid React Query + Context architecture, reducing boilerplate and simplifying server-state handling.',
      'Created Cypress automation tests and collaborated with QC to identify and resolve defects across the application.',
    ],
    tech: ['Next.js', 'TanStack Query', 'Redux Toolkit', 'KendoReact', 'SlateReact', 'SpreadJS', 'Cypress', 'ChartJS'],
  },
  {
    title: '247 Blinds E-commerce',
    meta: 'NTQ Solution · Team of 6 · Feb 2023 — Apr 2023',
    url: 'http://247blinds.co.uk',
    urlLabel: '247blinds.co.uk',
    description: 'Applied a full redesign to a UK e-commerce website built on Magento.',
    bullets: [
      'Collaborated with Magento developers to implement pixel-accurate UI aligned with design specifications.',
      'Implemented responsive design for seamless functionality across devices.',
    ],
    tech: ['Magento', 'LESS', 'jQuery'],
  },
];
