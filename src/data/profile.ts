import portrait from '../assets/portrait.jpg';

export type Social = { label: string; href: string };

export type Experience = {
  start: string;
  end: string;
  role: string;
  company: string;
  href?: string;
  note?: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export type Project = {
  name: string;
  kind: string;
  href: string;
  summary: string;
  // Names a client logo in src/assets/logos.json, rendered through Icon.astro.
  logo: 'scriptbee' | 'leicht';
  tags: string[];
};

export const profile = {
  name: 'Ahmed Ghazy',
  title: 'Full-Stack Engineer',
  seoTitle: 'Ahmed Ghazy — Full-Stack Engineer',
  tagline: 'I build React and Next.js apps, including the Node.js and PostgreSQL work behind them.',
  description:
    'Ahmed Ghazy is a full-stack engineer who builds React and Next.js apps, including the Node.js and PostgreSQL work behind them.',
  location: { city: 'Alexandria', country: 'EG', label: 'Alexandria, Egypt, and open to remote work' },
  email: 'info@ahmed-ghazy.com',
  resume: '/resume.pdf',
  portrait,
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
export const statement = 'Working in quality taught me to look at software from the customer’s side.';

export const about: string[] = [
  'Most of my work is on the frontend, but I don’t stop at the UI. When a feature needs an API, a database change or an AI step, I build that part too, in Node.js, PostgreSQL and Prisma.',
  'I didn’t start in engineering. Before my first frontend job, I spent almost three years as a quality analyst at _VOIS (Vodafone), on a UK telecoms account.',
  'Away from the keyboard, I’m into **perfumery** and keep adding to my collection. Now and then a good video game takes the whole weekend.',
];

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/AGhazy94' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmedhg94' },
  { label: 'Email', href: `mailto:${profile.email}` },
];

export const experience: Experience[] = [
  {
    start: '2025',
    end: 'Present',
    role: 'Senior Frontend Engineer',
    company: 'Smart Bricks',
    href: 'https://smart-bricks.com',
    summary: 'AI platform for real-estate investing, backed by a16z speedrun.',
    highlights: [
      'Moved data fetching to the server with the Next.js App Router, reworked client caching, and split the property pages into separate server-rendered sections.',
      'Built the AI listing search, where you type what you want in plain English and the AI turns it into filters. It works across the UAE and UK markets.',
      'Lead the frontend architecture and build it hands-on. Rebuilt the valuation and score modals so investors can see why a property got its price and score, and built our Storybook component library.',
      'Review the team’s pull requests and mentor newer engineers.',
    ],
    tags: ['Next.js', 'TypeScript', 'React', 'TanStack Query', 'Tailwind CSS', 'Storybook', 'PostHog', 'Grafana'],
  },
  {
    start: '2022',
    end: '2025',
    role: 'Frontend Engineer',
    company: 'caisy',
    href: 'https://caisy.io',
    summary: 'Headless CMS. Almost three years on the frontend.',
    highlights: [
      'Fixed the re-renders that made the editor slow when typing or switching documents.',
      'Moved the app from class components to hooks, and from styled-components to Tailwind, on my own.',
      'Set up the Next.js, tRPC and Prisma base that later features were built on.',
      'Added AI content generation to the editor.',
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'tRPC', 'Prisma', 'Tailwind CSS', 'styled-components'],
  },
  {
    start: '2022',
    end: '2024',
    role: 'Frontend Engineer',
    company: 'Stake',
    href: 'https://getstake.com',
    note: 'Part-time',
    summary: 'Fractional real-estate investment platform.',
    highlights: [
      'Built features and shared components for the investor-facing web app. The product details are confidential.',
    ],
    tags: ['React', 'TypeScript', 'Sass'],
  },
  {
    start: '2022',
    end: '2023',
    role: 'Frontend Engineer',
    company: 'Independent',
    note: 'Freelance on Upwork',
    summary: 'This is where I started as an engineer.',
    highlights: [
      'Built React apps and marketing sites for e-commerce and SaaS clients.',
      'Built component libraries with styled-components and BEM.',
      'Fixed cross-browser bugs and turned designs into HTML and CSS.',
    ],
    tags: ['React', 'JavaScript', 'styled-components', 'HTML & CSS', 'BEM'],
  },
];

export const projects: Project[] = [
  {
    name: 'ScriptBee',
    kind: 'AI marketing platform · Client work through caisy',
    href: 'https://www.scriptbee.ai/',
    summary:
      'Built the AI workflows for SEO and content generation, with integrations for Google Analytics, Google Search Console, Semrush, Bright Data and several LLM providers. Mastra AI and Trigger.dev run each workflow and retry failed steps.',
    logo: 'scriptbee',
    tags: ['Mastra AI', 'Trigger.dev', 'TypeScript', 'LLM integrations'],
  },
  {
    name: 'Leicht Kitchen Designer',
    kind: 'Kitchen configurator · Client work through caisy',
    href: 'https://leicht.com/',
    summary: 'Built the multi-language kitchen configurator on a headless CMS and GraphQL.',
    logo: 'leicht',
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
    { id: 'projects', title: 'Selected projects', nav: 'Projects' },
    { id: 'experience', title: 'Experience', nav: 'Work' },
    { id: 'about', title: 'About', nav: 'About' },
    { id: 'contact', title: 'Let’s work together.', nav: 'Contact' },
  ],
  theme: 'Dark theme',
  hero: {
    portraitAlt: 'Portrait of Ahmed Ghazy',
    role: 'Full-Stack Engineer (frontend-heavy)',
    at: 'at',
    location: 'Based in Alexandria, Egypt',
    availability: 'Open to remote full-time roles and contract work',
    contact: 'Get in touch',
    resume: 'View résumé',
  },
  experience: { resume: 'Full résumé' },
  resume: {
    eyebrow: 'Résumé',
    download: 'Download PDF',
    open: 'Open in a new tab',
    close: 'Close résumé',
    frameTitle: 'Résumé PDF preview',
  },
  projects: { visit: 'Visit site' },
  contact: {
    intro: `Open to full-time roles and contract work. Or email [${profile.email}](mailto:${profile.email}).`,
    subject: 'New message from %{formName}',
    honeypot: 'Leave this empty if you’re human',
    fields: {
      name: { label: 'Name', placeholder: 'Jane Smith' },
      email: { label: 'Email', placeholder: 'jane@company.com' },
      message: { label: 'Message', placeholder: 'What’s the role or project?' },
    },
    errors: {
      nameRequired: 'Enter your name.',
      emailRequired: 'Enter your email address.',
      emailInvalid: 'Enter an email address like name@company.com.',
      messageRequired: 'Write a message.',
      messageShort: 'Add a bit more detail, at least 10 characters.',
    },
    submit: 'Send message',
    sending: 'Sending…',
    failure: `Your message didn’t send. Check your connection and try again, or email [${profile.email}](mailto:${profile.email}).`,
    success: {
      title: 'Thanks, your message is on its way.',
      body: 'I’ll reply to {email} as soon as I can.',
      again: 'Send another message',
    },
  },
  thanks: {
    title: 'Message sent',
    heading: 'Thanks, your message is on its way.',
    body: 'I’ll reply to the email you gave as soon as I can.',
    back: 'Back to the home page',
  },
  about: {
    education: 'Education',
    languages: 'Languages',
  },
  footer: {
    place: 'Alexandria, Egypt',
    credit:
      'Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) and [GSAP](https://gsap.com), set in [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) and [Geist](https://vercel.com/font), and hosted on [Netlify](https://www.netlify.com).',
  },
  notFound: {
    code: '404',
    title: 'Page not found',
    body: 'The page you’re looking for doesn’t exist or has moved.',
    back: 'Back to the home page',
  },
};
