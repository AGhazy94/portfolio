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
  title: 'Full-Stack Developer',
  seoTitle: 'Freelance Full-Stack Developer for Hire | Ahmed Ghazy',
  tagline:
    'Full-stack developer building web apps and AI products, from LLM features and agents to the product around them.',
  description:
    'Freelance full-stack developer in Egypt, working remotely. I build web apps, MVPs and AI products with LLMs and agents, and take over existing apps.',
  location: { country: 'EG', label: 'Egypt, and open to remote work' },
  email: 'info@ahmed-ghazy.com',
  linkedin: 'https://www.linkedin.com/in/ahmedhg94',
  upwork: 'https://www.upwork.com/freelancers/~01245a63e0d4efbb5a',
  contra: 'https://contra.com/ahmed_ghazy_ikfarlod',
  resume: '/ahmed-ghazy-resume.pdf',
  portrait,
  // JSON-LD ProfilePage dates as full ISO 8601 date-times (Google rejects date-only); bump `updated` whenever the copy changes.
  created: '2026-09-23T00:00:00+03:00',
  updated: '2026-10-14T00:00:00+03:00',
  knowsAbout: [
    'Full-stack development',
    'MVP development',
    'Taking over existing codebases',
    'AI product development',
    'AI agents',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'Internationalization',
    'Tailwind CSS',
    'Design systems',
    'Web performance',
    'LLM integrations',
  ],
  ogLine: 'Building web apps and AI products',
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
  'I didn’t start in engineering. Before my first frontend job, I spent almost three years as a quality analyst at _VOIS (Vodafone), on a UK telecoms account.',
  'I started on the frontend and moved down the stack from there. When a feature needs an API, a database change or an AI step, I build that part too, in Node.js, PostgreSQL and Prisma.',
  'Away from the keyboard, I’m into **perfumery** and keep adding to my collection. Now and then a good video game takes the whole weekend.',
];

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/AGhazy94' },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'Upwork', href: profile.upwork },
  { label: 'Contra', href: profile.contra },
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
      'Rebuilt the valuation and score modals so investors can see why a property got its price and score.',
      'Built our Storybook component library.',
      'Lead the frontend architecture and build it hands-on, review the team’s pull requests, and mentor newer engineers.',
    ],
    tags: ['Next.js', 'TypeScript', 'React', 'TanStack Query', 'Tailwind CSS', 'Storybook', 'PostHog', 'Grafana'],
  },
  {
    start: '2022',
    end: '2025',
    role: 'Frontend Engineer',
    company: 'caisy',
    href: 'https://caisy.io',
    summary: 'Headless CMS.',
    highlights: [
      'Rebuilt the blog category and article pages of caisy’s marketing site from styled-components to Tailwind CSS, and rewrote a class-based photo-gallery slider as a hooks component.',
      'Built features on Next.js, tRPC and Drizzle codebases: schema and migrations for Stripe billing and subscriptions, users, workspaces and chat.',
      'Added AI translation of content fields to the editor.',
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'tRPC', 'Drizzle', 'Tailwind CSS', 'styled-components'],
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
      'Built the marketing team’s emails in Arabic and English, with right-to-left layouts that held up across email apps.',
    ],
    tags: ['React', 'TypeScript', 'Sass', 'HTML email', 'Arabic RTL'],
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
    name: 'Leicht Kitchen Designer',
    kind: 'Kitchen configurator · Client work through caisy',
    href: 'https://leicht.com/',
    summary: 'Built the multi-language kitchen configurator on a headless CMS and GraphQL.',
    logo: 'leicht',
    tags: ['GraphQL', 'Headless CMS', 'i18n'],
  },
  {
    name: 'ScriptBee',
    kind: 'AI marketing platform · Client work through caisy',
    href: 'https://www.scriptbee.ai/',
    summary:
      'Built features across ScriptBee’s Next.js app: the chat interface, task widget and Trigger.dev background tasks, the Google Ads and Search Console connections, a Keyword Planner tool and the onboarding flow.',
    logo: 'scriptbee',
    tags: ['Next.js', 'Trigger.dev', 'TypeScript', 'Google Ads API'],
  },
];

export type Testimonial = { quote: string; name: string; context: string; source: 'LinkedIn' | 'Upwork' };

// Quoted word for word; an ellipsis marks a cut. Each one is public on the source profile.
export const testimonials: Testimonial[] = [
  {
    quote:
      'Ahmed is a great engineer who was conscious of my team’s deadlines to deliver even when we had given him last minute tasks. He was reliable and available to us at any time we needed to introduce something new or make a change.',
    name: 'Haya Doughan',
    context: 'Stake marketing team · 2022 to 2024',
    source: 'LinkedIn',
  },
  {
    quote: 'He’s met my expectations and even went beyond. I would definitely hire him again.',
    name: 'Upwork client',
    context: 'Convert two design screens into HTML · 2022',
    source: 'Upwork',
  },
  {
    quote:
      'Ahmed was great! Highly attentive and will do what it takes to get the job done. I will definitely rehire Ahmed whenever I have another project.',
    name: 'Upwork client',
    context: 'Modify a media player · 2022',
    source: 'Upwork',
  },
  {
    quote:
      'Ahmed is the kind of senior engineer who makes everyone around him better without making a big deal of it. … he hands over challenging work instead of holding onto it, and he makes sure people have the support to grow through it.',
    name: 'Mohammed Ahmed Abdus',
    context: 'Full-stack engineer at Smart Bricks · 2026',
    source: 'LinkedIn',
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
    { id: 'services', title: 'How I can help' },
    { id: 'projects', title: 'Selected projects' },
    { id: 'testimonials', title: 'What clients and colleagues say' },
    { id: 'experience', title: 'Experience' },
    { id: 'writing', title: 'Writing for people who hire' },
    { id: 'about', title: 'About' },
    { id: 'contact', title: 'Let’s work together.' },
  ],
  // `section` marks links that scroll to a home-page section; the rest are pages.
  nav: [
    { label: 'Services', href: '/services/', section: undefined },
    { label: 'Work', href: '/work/', section: undefined },
    { label: 'Blog', href: '/blog/', section: undefined },
    { label: 'About', href: '/#about', section: 'about' },
    { label: 'Contact', href: '/#contact', section: 'contact' },
  ],
  services: {
    more: 'Read more',
    indexTitle: 'Services',
    indexHeading: 'Five ways to work with me',
    indexLead: 'Each page below covers one situation: what I do, what the first two weeks look like and how to start.',
    indexDescription:
      'Freelance full-stack development services: AI features and agents, taking over an existing web app, MVPs, web apps and Arabic RTL web apps.',
    provider: 'Service provider',
  },
  work: {
    indexTitle: 'Work',
    indexHeading: 'Projects and what I did on them',
    indexLead: 'Each case study lists only what I built and what the repository history backs.',
    indexDescription:
      'Case studies by Ahmed Ghazy, freelance full-stack developer: what was built, which parts were his and the stack.',
    visit: 'Visit the live site',
    more: 'Read the case study',
  },
  blog: {
    indexTitle: 'Blog',
    indexHeading: 'Articles for people deciding who to hire',
    indexLead: 'Plain answers to the questions founders ask before they hire a developer.',
    indexDescription:
      'Articles for founders and teams hiring a developer: adding AI to a product, taking over a codebase, MVP costs, fix or rebuild, and Arabic RTL.',
    published: 'Published',
    updated: 'Updated',
    more: 'Read the article',
    homeMore: 'All articles',
  },
  service: {
    fit: 'Is this for you?',
    gets: 'What you get',
    steps: 'What the first two weeks look like',
    week: 'Week',
    experience: 'Relevant experience',
    terms: 'How we work and what it costs',
  },
  page: {
    faq: 'Questions people ask',
    relatedServices: 'Related services',
    relatedArticles: 'Related articles',
    breadcrumbLabel: 'Breadcrumb',
    home: 'Home',
  },
  theme: 'Dark theme',
  hero: {
    portraitAlt: 'Portrait of Ahmed Ghazy',
    availability: 'Open to client projects, retainers and remote full-time roles',
    contact: 'Get in touch',
    resume: 'View résumé',
  },
  experience: { resume: 'Full résumé', details: 'What I built' },
  resume: {
    eyebrow: 'Résumé',
    download: 'Download PDF',
    open: 'Open in a new tab',
    close: 'Close résumé',
    frameTitle: 'Résumé PDF preview',
  },
  projects: { visit: 'Visit site' },
  testimonials: { via: 'Posted on' },
  contact: {
    intro: `Open to client projects, retainers and remote full-time roles. Write to me below, email [${profile.email}](mailto:${profile.email}) or find me on [LinkedIn](${profile.linkedin}).`,
    subject: 'New message from %{formName}',
    honeypot: 'Leave this empty if you’re human',
    fields: {
      name: { label: 'Name', placeholder: 'Jane Smith' },
      email: { label: 'Email', placeholder: 'jane@company.com' },
      message: { label: 'Message', placeholder: 'What are you building, or what needs fixing?' },
    },
    // Optional selects: they help me answer with a real plan, and a visitor can skip them.
    choices: [
      {
        name: 'project-type',
        label: 'What do you need?',
        placeholder: 'Choose one',
        options: [
          'AI feature, agent or product',
          'Take over an existing web app',
          'Build an MVP',
          'Build a web app or website',
          'Arabic or RTL web app',
          'A full-time role',
          'Something else',
        ],
      },
      {
        name: 'budget',
        label: 'Budget',
        placeholder: 'Choose a range',
        options: ['Under $2,000', '$2,000 to $5,000', '$5,000 to $15,000', '$15,000 or more', 'Not sure yet'],
      },
      {
        name: 'timeline',
        label: 'Timeline',
        placeholder: 'Choose a timeline',
        options: ['As soon as possible', 'Within a month', 'In 1 to 3 months', 'Just exploring'],
      },
    ],
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
    place: 'Egypt',
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
