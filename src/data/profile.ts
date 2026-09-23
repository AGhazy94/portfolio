import type { ImageMetadata } from 'astro';
import leicht from '../assets/projects/leicht.webp';
import scriptbee from '../assets/projects/scriptbee.png';

export type Social = { label: string; href: string; icon: 'github' | 'linkedin' | 'mail' };

export type Experience = {
  start: string;
  end: string;
  role: string;
  company: string;
  href?: string;
  note?: string;
  summary: string;
  tags: string[];
};

export type Project = {
  name: string;
  href: string;
  summary: string;
  image: ImageMetadata;
  imageAlt: string;
  tags: string[];
};

export const profile = {
  name: 'Ahmed Ghazy',
  title: 'Full-Stack Engineer',
  seoTitle: 'Ahmed Ghazy — Full-Stack Engineer',
  tagline: 'I build LLM-native web apps end to end. Most of my work is on the frontend.',
  description:
    'Ahmed Ghazy is a full-stack engineer who works mostly on the frontend. He builds LLM-native web apps with React, Next.js, TypeScript and Node.js.',
  location: { city: 'Alexandria', country: 'EG', label: 'Alexandria, Egypt, and open to remote work' },
  email: 'info@ahmed-ghazy.com',
  resume: '/resume.pdf',
  // JSON-LD ProfilePage dates; bump `updated` whenever the copy changes.
  created: '2026-09-23',
  updated: '2026-09-24',
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Tailwind CSS',
    'Design systems',
    'Web performance',
    'LLM integrations',
  ],
  ogTags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
  languages: [
    { name: 'Arabic', code: 'ar', level: 'Native' },
    { name: 'English', code: 'en', level: 'Fluent' },
  ],
  education: {
    degree: 'BSc Computer & Information Systems (MIS)',
    school: 'Higher Institute of Computer and Information Systems, Abu Qir',
    years: '2015–2020',
  },
};

// Inline syntax: [text](url) for links, **text** for emphasis; rendered on the page and in llms.txt.
export const about: string[] = [
  'I’m a full-stack engineer who cares about pixel-perfect web apps and the small details that make a product feel right. I don’t stop at the UI, though. I also do product engineering and backend work in Node.js, PostgreSQL and Prisma, and lately a lot of my work is on **LLM-native apps**.',
  'Right now I’m a Senior Frontend Engineer at [Smart Bricks](https://smart-bricks.com), an AI platform for real-estate investing, backed by a16z speedrun. I lead the frontend architecture. I built the listing search, where you type what you want in plain English and the AI turns it into filters. I also set up our analytics and feature flags, so new features now ship behind a flag.',
  'Before that, I spent almost three years on the frontend of [caisy](https://caisy.io), a headless CMS. I started out freelancing, building React apps, component libraries and marketing sites for e-commerce and SaaS clients.',
  'Away from the keyboard, I’m into **perfumery** and keep adding to my collection. Now and then a good video game takes the whole weekend.',
];

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/AGhazy94', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmedhg94', icon: 'linkedin' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
];

export const experience: Experience[] = [
  {
    start: '2025',
    end: 'Present',
    role: 'Senior Frontend Engineer',
    company: 'Smart Bricks',
    href: 'https://smart-bricks.com',
    summary:
      'Lead the frontend architecture of an AI platform for real-estate investing, backed by a16z speedrun. Built the listing search, where you type what you want in plain English and the AI turns it into filters. It works across the UAE and UK markets. Rebuilt the valuation and score modals. Moved data fetching to the server with the App Router and reworked client caching, and duplicate API calls dropped by about 30%. Built our Storybook component library. Review the team’s pull requests and mentor newer engineers.',
    tags: ['Next.js', 'TypeScript', 'React', 'TanStack Query', 'Tailwind CSS', 'Storybook', 'PostHog', 'Grafana'],
  },
  {
    start: '2022',
    end: '2025',
    role: 'Frontend Engineer',
    company: 'caisy',
    href: 'https://caisy.io',
    summary:
      'Worked on the frontend of a headless CMS for almost three years. Moved the app from class components to hooks, and from styled-components to Tailwind. Fixed the re-renders that made the editor slow when typing or switching documents. Set up the Next.js, tRPC and Prisma base that later features were built on, and added AI content generation to the editor.',
    tags: ['React', 'Next.js', 'TypeScript', 'tRPC', 'Prisma', 'Tailwind CSS', 'styled-components'],
  },
  {
    start: '2022',
    end: '2024',
    role: 'Frontend Engineer',
    company: 'Stake',
    href: 'https://getstake.com',
    note: 'Part-time',
    summary:
      'Built UI for the investor-facing web app of a fractional real-estate investment platform, and added shared components the rest of the frontend team reused.',
    tags: ['React', 'TypeScript', 'Sass'],
  },
  {
    start: '2022',
    end: '2023',
    role: 'Frontend Engineer',
    company: 'Independent',
    note: 'Freelance on Upwork',
    summary:
      'This is where I started as an engineer. Built React apps and marketing sites for e-commerce and SaaS clients, plus component libraries with styled-components and BEM. Fixed cross-browser bugs and turned designs into pixel-perfect HTML and CSS.',
    tags: ['React', 'JavaScript', 'styled-components', 'HTML & CSS', 'BEM'],
  },
];

export const projects: Project[] = [
  {
    name: 'ScriptBee',
    href: 'https://www.scriptbee.ai/',
    summary:
      'AI marketing platform. Built the AI workflows for SEO and content generation and connected about 15 third-party APIs. Mastra AI and Trigger.dev run the workflows and retry them.',
    image: scriptbee,
    imageAlt: 'Screenshot of the ScriptBee home page',
    tags: ['Mastra AI', 'Trigger.dev', 'TypeScript', 'LLM integrations'],
  },
  {
    name: 'Leicht Kitchen Designer',
    href: 'https://leicht.com/',
    summary: 'Multi-language kitchen configurator for Leicht, built on a headless CMS and GraphQL.',
    image: leicht,
    imageAlt: 'Screenshot of the Leicht home page',
    tags: ['GraphQL', 'Headless CMS', 'i18n'],
  },
];

export const ui = {
  skipLink: 'Skip to Content',
  newTab: ' (opens in a new tab)',
  dateTo: 'to',
  navLabel: 'In-page jump links',
  socialLabel: 'Social media',
  tagsLabel: 'Technologies used',
  sections: [
    { id: 'about', title: 'About' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
  ],
  resume: { lead: 'View Full', last: 'Résumé' },
  footer:
    'Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), hosted on [Netlify](https://www.netlify.com) and set in [Inter](https://rsms.me/inter/). Layout inspired by [Brittany Chiang](https://brittanychiang.com)’s portfolio.',
  notFound: {
    code: '404',
    title: 'Page not found',
    body: 'The page you’re looking for doesn’t exist or has moved.',
    back: 'Back to the home page',
  },
};
