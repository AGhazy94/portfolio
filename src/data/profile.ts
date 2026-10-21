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
  caseStudy: string;
  summary: string;
  // Names a client logo in src/assets/logos.json, rendered through Icon.astro.
  logo: 'scriptbee' | 'leicht';
  tags: string[];
};

export const profile = {
  name: 'Ahmed Ghazy',
  title: 'Full-Stack Developer',
  seoTitle: 'Freelance Full-Stack Developer for Hire | Ahmed Ghazy',
  tagline: 'Full-stack developer. I build web apps, MVPs and AI features, and take over existing apps.',
  description:
    'Freelance full-stack developer in Egypt, working remotely. I build web apps, MVPs and AI products with LLMs and agents, and take over existing apps.',
  location: { country: 'EG', label: 'Egypt, and open to remote work' },
  email: 'info@ahmed-ghazy.com',
  linkedin: 'https://www.linkedin.com/in/ahmedhg94',
  upwork: 'https://www.upwork.com/freelancers/~01245a63e0d4efbb5a',
  contra: 'https://contra.com/ahmed_ghazy',
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
    name: 'ScriptBee',
    kind: 'AI marketing platform · Client work through caisy',
    href: 'https://www.scriptbee.ai/',
    caseStudy: '/work/scriptbee/',
    summary:
      'Built the chat experience, agent tools and background tasks that let users return to long-running work, plus Google Ads connections and onboarding.',
    logo: 'scriptbee',
    tags: ['Next.js', 'Trigger.dev', 'TypeScript', 'Google Ads API'],
  },
  {
    name: 'LEICHT',
    kind: 'Kitchen configurator and brand site · Through caisy',
    href: 'https://leicht.com/',
    caseStudy: '/work/leicht/',
    summary: 'Built a multilingual kitchen configurator and brand-site features with CMS content and GraphQL.',
    logo: 'leicht',
    tags: ['GraphQL', 'Headless CMS', 'i18n', 'Qwik'],
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
  navLabel: 'Main navigation',
  menu: 'Navigation menu',
  socialLabel: 'Social media',
  tagsLabel: 'Technologies used',
  sections: [
    { id: 'services', title: 'How I can help' },
    { id: 'projects', title: 'Selected work' },
    { id: 'testimonials', title: 'Clients and colleagues' },
    { id: 'experience', title: 'Experience' },
    { id: 'writing', title: 'Notes for founders' },
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
    metaTitle: 'Freelance Full-Stack Development Services',
    indexHeading: 'Web apps, AI features, and ongoing development',
    indexLead: 'A first product, a feature your team needs, or an app that needs a new developer.',
    indexDescription:
      'Freelance full-stack development services: AI features and agents, taking over an existing web app, MVPs, web apps and Arabic RTL web apps.',
    provider: 'Service provider',
  },
  work: {
    indexTitle: 'Work',
    metaTitle: 'Case Studies: Next.js and AI Projects',
    indexHeading: 'Selected work',
    indexLead: 'Projects, my role, and the decisions behind the work.',
    indexDescription:
      'Case studies by Ahmed Ghazy, freelance full-stack developer: what was built, which parts were his and the stack.',
    visit: 'Visit the live site',
    more: 'Read the case study',
  },
  blog: {
    indexTitle: 'Blog',
    metaTitle: 'Articles on Hiring a Developer',
    indexHeading: 'Practical notes for founders',
    indexLead: 'Guides to scoping a product, taking over an app, and choosing a developer.',
    indexDescription:
      'Articles for founders and teams hiring a developer: adding AI to a product, taking over a codebase, MVP costs, fix or rebuild, and Arabic RTL.',
    published: 'Published',
    updated: 'Updated',
    by: 'By',
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
    otherServices: 'Other services',
    relatedArticles: 'Related articles',
    breadcrumbLabel: 'Breadcrumb',
    home: 'Home',
    onThisPage: 'On this page',
  },
  theme: 'Dark theme',
  hero: {
    portraitAlt: 'Portrait of Ahmed Ghazy',
    availability: 'Open to client projects and retainers',
    contact: 'Get in touch',
    work: 'View selected work',
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
    intro: `Tell me what you are building or what needs fixing. You can also email [${profile.email}](mailto:${profile.email}) or find me on [LinkedIn](${profile.linkedin}).`,
    subject: 'New message from %{formName}',
    honeypot: 'Leave this empty if you’re human',
    optional: 'Optional',
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
  consent: {
    label: 'Cookie consent',
    title: 'This site uses cookies',
    body: 'I use Google Analytics cookies to understand how visitors use the site and which pages and campaigns bring enquiries. They are set only if you accept. [Privacy notice](/privacy/)',
    allow: 'Accept',
    decline: 'Reject',
  },
  privacy: {
    title: 'Privacy',
    metaTitle: 'Privacy Notice',
    heading: 'Privacy notice',
    description:
      'How ahmed-ghazy.com collects and uses personal data: the contact form, cookies and Google Analytics, who receives the data, how long it is kept and your rights.',
    lead: 'How this site collects and uses personal data, and the choices you have.',
    updated: 'Last updated 21 October 2026.',
    change: 'Change cookie settings',
    sections: [
      {
        heading: 'Who I am',
        body: [
          `This site is run by ${profile.name}, a freelance developer based in Egypt, who is responsible for the personal data it collects. Contact: [${profile.email}](mailto:${profile.email}).`,
        ],
      },
      {
        heading: 'What I collect',
        body: [
          '**Contact form.** Your name, email address and message, the optional answers you choose (project type, budget, timeline) and the page you sent the form from.',
          '**How you found the site.** With the form, the campaign tags of the link you first arrived through (utm_source, utm_medium, utm_campaign, utm_content, utm_term), the first page you opened and the domain of the site that referred you. These are kept between pages only if you accept cookies; otherwise they are sent only when you use the form on the page you arrived on.',
          '**Analytics, if you accept cookies.** Pages viewed, time on the site, browser, device type, approximate location, the site or campaign that referred you, and a record that a message was sent. Analytics never receives the content of the form.',
          '**Server logs.** Netlify, the host, records page requests to count visits. This uses no cookies.',
        ],
      },
      {
        heading: 'Why I use it and the legal basis',
        body: [
          'I use contact form data to reply to your enquiry and to discuss any work that follows, because you asked me to (steps taken at your request before a contract) and because I have a legitimate interest in answering messages.',
          'I use analytics and first-visit data to understand which pages and campaigns bring enquiries, based on your consent. You can withdraw consent at any time.',
        ],
      },
      {
        heading: 'Cookies and similar technologies',
        body: [
          'Google Analytics cookies are set only after you click **Accept**. If you click **Reject** or ignore the banner, Google Analytics does not load and nothing is sent to Google. Google signals and ad personalisation are turned off. The site also uses your browser’s local storage for the items below.',
        ],
        table: true,
      },
      {
        heading: 'Who receives the data',
        body: [
          '**Netlify, Inc.** hosts the site, stores contact form submissions and keeps server logs.',
          '**Google LLC** provides Google Analytics, only if you accept cookies.',
          'Both may process data outside your country, including in the United States, under the safeguards in their data processing terms. I do not sell your data or share it with anyone else.',
        ],
      },
      {
        heading: 'How long I keep it',
        body: [
          'Contact form messages are kept for as long as needed to handle your enquiry and any work that follows, and deleted sooner if you ask. Google Analytics data is kept for 14 months. The first-visit record in your browser expires after 90 days. Server logs follow Netlify’s retention.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You can ask to access, correct or delete your personal data, to restrict or object to its use, and to receive a copy of it. You can withdraw cookie consent at any time with the button below. To make a request, email me. You can also complain to the data protection authority where you live.',
        ],
      },
      {
        heading: 'Changes to this notice',
        body: ['If this notice changes, the date below is updated.'],
      },
    ],
    cookies: {
      caption: 'Cookies and local storage used on this site',
      columns: ['Name and provider', 'Purpose', 'Duration'],
      rows: [
        ['_ga', 'Google Analytics', 'Distinguishes visitors (only after you accept)', '2 years'],
        ['_ga_<ID>', 'Google Analytics', 'Keeps the current session (only after you accept)', '2 years'],
        ['first-touch (local storage)', 'This site', 'How you first arrived (only after you accept)', '90 days'],
        ['analytics-consent (local storage)', 'This site', 'Remembers your cookie choice', 'Until you clear it'],
        ['theme (local storage)', 'This site', 'Remembers light or dark theme', 'Until you clear it'],
      ],
    },
  },
  footer: {
    place: 'Egypt',
    resume: 'Résumé',
    privacy: 'Privacy',
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
