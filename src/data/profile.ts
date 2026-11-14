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
  href?: string;
  caseStudy: string;
  summary: string;
  // Names a client logo in src/assets/logos.json, rendered through Icon.astro.
  logo?: 'scriptbee' | 'leicht';
  // A third card spans its row, so two columns never leave an empty cell.
  featured?: boolean;
  tags: string[];
};

export const profile = {
  name: 'Ahmed Ghazy',
  title: 'Full-Stack Developer',
  seoTitle: 'Freelance Full-Stack Developer for Hire | Ahmed Ghazy',
  offer: 'I take over web apps that are stuck and ship the next release.',
  // Says no more than `description` below.
  offerLead: 'Including apps built with Lovable or Bolt. I also build MVPs and AI features.',
  description:
    'Freelance full-stack developer in Egypt, working remotely. I take over stuck web apps, including ones built with Lovable or Bolt, and build MVPs and AI features.',
  location: { country: 'EG', label: 'Egypt, and open to remote work' },
  email: 'info@ahmed-ghazy.com',
  linkedin: 'https://www.linkedin.com/in/ahmedhg94',
  upwork: 'https://www.upwork.com/freelancers/~01245a63e0d4efbb5a',
  contra: 'https://contra.com/ahmed_ghazy',
  resume: '/ahmed-ghazy-resume.pdf',
  portrait,
  // JSON-LD ProfilePage dates as full ISO 8601 date-times (Google rejects date-only); bump `updated` whenever the copy changes.
  created: '2026-09-23T00:00:00+03:00',
  updated: '2026-11-14T00:00:00+02:00',
  knowsAbout: [
    'Full-stack development',
    'Taking over existing codebases',
    'MVP development',
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
  ogLine: 'Getting stuck web apps shipped',
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
  'Before my first frontend job, I spent almost three years as a quality analyst at _VOIS (Vodafone), on a UK telecoms account. That’s where I learned to look for what breaks before I change anything, and I still work that way.',
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
    role: 'Senior Full-Stack Engineer',
    company: 'Smart Bricks',
    href: 'https://smart-bricks.com',
    summary: 'AI platform for real-estate investing, backed by a16z speedrun.',
    highlights: [
      'Lead the frontend team: I own the architecture and build it hands-on, review the team’s pull requests and mentor newer engineers.',
      'Moved data fetching to the server with the Next.js App Router and split the property pages into server-rendered sections.',
      'Rebuilt the valuation and score modals so investors can see why a property got its price and score.',
      'On the backend, built Next.js API routes such as the Clerk sign-up webhook and the health check, and cut the API’s Docker image from about 9 GB to about 2 GB.',
      'Set up observability with OpenTelemetry, Prometheus, Loki, Tempo and Grafana, plus PostHog feature flags, and built the Storybook component library.',
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
    kind: 'Kitchen brand site · Through caisy',
    href: 'https://leicht.com/',
    caseStudy: '/work/leicht/',
    summary:
      'Built the multi-language leicht.com site in Qwik with CMS content and GraphQL, plus an internal kitchen configurator.',
    logo: 'leicht',
    tags: ['GraphQL', 'Headless CMS', 'i18n', 'Qwik'],
  },
  {
    name: 'AI real-estate platform: an audit, then the fixes in order',
    kind: 'AI platform for real-estate investors · Frontend lead',
    caseStudy: '/work/real-estate-platform-audit/',
    summary:
      'Audited the live frontend before changing anything, ranked the problems by how much they hurt users and fixed them in that order, inside the existing app with no rewrite. Error reports went down, and more property pages got indexed by Google.',
    featured: true,
    tags: ['Next.js', 'TypeScript', 'React', 'App Router'],
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
    quote:
      'Ahmed is the kind of senior engineer who makes everyone around him better without making a big deal of it. … he hands over challenging work instead of holding onto it, and he makes sure people have the support to grow through it.',
    name: 'Mohammed Ahmed Abdus',
    context: 'Full-stack engineer at Smart Bricks · 2026',
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
    indexHeading: 'Stuck web apps, MVPs and AI features',
    indexLead: 'An app that is stuck or needs a new developer, a first product, or a feature your team needs.',
    indexDescription:
      'Freelance full-stack development services: taking over a stuck web app, AI features and agents, MVPs, web apps and Arabic RTL web apps.',
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
    homeMore: 'All case studies',
    facts: { role: 'Role', period: 'When', stack: 'Stack' },
    next: 'Next case study',
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
    role: 'Full-stack developer',
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
    // WebMCP: lets a visitor's browser agent fill the form; the visitor still reviews it and presses Send.
    tool: {
      name: 'send_enquiry_to_ahmed',
      description:
        'Fills in the contact form to send Ahmed Ghazy, a freelance full-stack developer, an enquiry about a web app, AI feature, MVP or taking over an existing app. The visitor reviews the form and presses Send; Ahmed replies by email.',
      params: {
        name: 'Full name of the person sending the enquiry.',
        email: 'Email address Ahmed should reply to.',
        message: 'What the visitor is building or what needs fixing, in their own words. At least 10 characters.',
        'bot-field': 'Spam trap. Always leave empty.',
      },
    },
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
        tool: 'Kind of help needed. Optional.',
        options: [
          'Take over an existing web app',
          'AI feature, agent or product',
          'Build an MVP',
          'Build a web app or website',
          'Arabic or RTL web app',
          'Something else',
        ],
      },
      {
        name: 'budget',
        label: 'Budget',
        placeholder: 'Choose a range',
        tool: 'Budget range in US dollars. Optional.',
        options: ['Under $2,000', '$2,000 to $5,000', '$5,000 to $15,000', '$15,000 or more', 'Not sure yet'],
      },
      {
        name: 'timeline',
        label: 'Timeline',
        placeholder: 'Choose a timeline',
        tool: 'When the work should start. Optional.',
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
    // Information at the point of collection, not a consent checkbox: replying rests on the visitor's own request.
    privacy: 'I use your details to respond to your enquiry. See the [Privacy Notice](/privacy/).',
    // Each step is backed by the services' terms; no reply time until Ahmed commits to one.
    next: {
      heading: 'What happens next',
      steps: [
        'I read it and reply by email.',
        'If it helps, we have a short call.',
        'A fixed price for a clear scope, or a monthly one for ongoing work.',
      ],
    },
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
    title: 'Cookies on this site',
    body: 'I use optional analytics cookies to understand how visitors use this site and improve it. [Privacy Notice](/privacy/)',
    allow: 'Accept',
    decline: 'Reject',
  },
  privacy: {
    title: 'Privacy Notice',
    metaTitle: 'Privacy Notice',
    heading: 'Privacy Notice',
    description:
      'How ahmed-ghazy.com collects, uses and protects personal data from contact forms, analytics and essential website services.',
    lead: 'This notice explains what information this website collects, why it is used and the choices available to you.',
    updated: 'Last updated: 14 November 2026.',
    change: 'Cookie settings',
    sections: [
      {
        heading: 'Who I am',
        body: [
          `This website is operated by ${profile.name}, a freelance software developer in Egypt. For privacy questions or requests, email [${profile.email}](mailto:${profile.email}).`,
        ],
      },
      {
        heading: 'What information I collect',
        body: [
          '**Information you give me:** your name, email address and message, any optional project details, and the page you sent the form from.',
          '**Usage information:** like most websites, this site measures how it is used, such as pages visited, the website or campaign that referred you, browser and device type, and approximate location. Basic visit counts are collected without cookies and do not identify you. Analytics cookies are used only if you accept them.',
          '**Technical information:** standard server logs, including IP addresses, are kept to deliver and secure the site. If you accept cookies, the site also remembers how you first found it, so that source can accompany a later enquiry.',
        ],
      },
      {
        heading: 'How and why I use your information',
        body: [
          'I use this information to reply to enquiries and discuss possible work, to understand which pages are useful and improve the site, and to keep it running securely. I may also keep records where the law requires, for example for tax or accounting.',
          'Where the GDPR or UK GDPR applies, I rely on the steps you ask me to take before a possible contract; my legitimate interests in managing enquiries, measuring site use and keeping the site secure; your consent for analytics cookies; and compliance with legal obligations. I do not use personal data for automated decisions or profiling.',
        ],
      },
      {
        heading: 'Cookies',
        body: [
          'Cookies are small files that websites store on your device, and this site also uses similar browser storage. It always stores what it needs to work, such as your colour theme and cookie choice. Analytics cookies are optional and set only if you select **Accept**. No advertising cookies are used.',
          'You can change your choice at any time through **Cookie settings** in the footer, or block and delete cookies in your browser settings.',
        ],
        storage: {
          summary: 'Cookie and storage details',
          duration: 'Duration',
          rows: [
            {
              name: '_ga',
              provider: 'Google Analytics',
              purpose: 'Distinguishes visitors for site analytics. Set only after consent.',
              duration: 'Up to 2 years; deleted when you withdraw consent, or on your next visit after it ends',
            },
            {
              name: '_ga_<container-id>',
              provider: 'Google Analytics',
              purpose: 'Maintains an analytics session. Set only after consent.',
              duration: 'Up to 2 years; deleted when you withdraw consent, or on your next visit after it ends',
            },
            {
              name: 'first-touch',
              provider: 'This website',
              purpose: 'Remembers the first campaign, landing page and referring domain. Stored only after consent.',
              duration: '90 days',
            },
            {
              name: 'analytics-consent',
              provider: 'This website',
              purpose: 'Remembers whether analytics was accepted or rejected.',
              duration: '12 months',
            },
            {
              name: 'theme',
              provider: 'This website',
              purpose: 'Remembers the colour theme you selected.',
              duration: 'Until cleared',
            },
          ],
        },
      },
      {
        heading: 'Who I share information with',
        body: [
          'I use trusted service providers for hosting, form handling, spam filtering, email and analytics. They receive only the information they need to provide their services. I do not sell or rent personal data.',
          `Some providers may process information outside Egypt or your country. Where the law requires, these transfers are protected by appropriate safeguards; email [${profile.email}](mailto:${profile.email}) for details. I may also disclose information where the law requires it.`,
        ],
      },
      {
        heading: 'How long I keep information',
        body: [
          'I delete enquiries that do not lead to work within 12 months, and keep client correspondence for as long as the work and tax or accounting rules require. Analytics data and server logs are kept for limited periods.',
          'I take reasonable steps to protect your information, but no online service can guarantee complete security.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `Depending on the law that applies, you may ask to access, correct, delete or receive a copy of your personal data, restrict its use, or object to processing. Email [${profile.email}](mailto:${profile.email}) to make a request.`,
          'You can withdraw your consent to analytics cookies at any time; this does not affect earlier processing. You may also complain to the Egyptian Personal Data Protection Center or the data-protection authority where you live or work.',
        ],
      },
      {
        heading: 'Information you provide',
        body: [
          'Your name, email address and message are needed to reply to your enquiry; the other fields are optional. Please do not send sensitive personal information unless it is necessary.',
          'This site is not intended for children under 16.',
        ],
      },
      {
        heading: 'Changes to this notice',
        body: [
          'I may update this notice from time to time. The date below shows the latest version. If a change affects your consent, the site will ask you again.',
        ],
      },
    ],
  },
  legal: {
    title: 'Legal Notice',
    metaTitle: 'Legal Notice',
    heading: 'Legal Notice',
    description:
      'Legal Notice for ahmed-ghazy.com: website operator, disclaimers, third-party links, copyright and governing law.',
    lead: 'Information about the operator of this website and the terms that apply to its use.',
    updated: 'Last updated: 14 November 2026.',
    sections: [
      {
        heading: 'Website operator',
        body: [
          `${profile.name}, freelance software developer, Egypt.`,
          `Email: [${profile.email}](mailto:${profile.email})`,
        ],
      },
      {
        heading: 'No offer or professional advice',
        body: [
          'Nothing on this website is a binding offer. Any work is agreed separately in writing.',
          'Articles on this website are general information, not legal, financial or other professional advice.',
        ],
      },
      {
        heading: 'Liability for content',
        body: [
          'I take care to keep this website accurate and up to date, but I cannot guarantee that its content is complete or correct. To the extent permitted by law, I accept no liability for any loss arising from its use.',
        ],
      },
      {
        heading: 'Links to other websites',
        body: [
          'This website links to websites run by others. I am not responsible for their content. If a linked page contains unlawful content, please let me know and I will remove the link.',
        ],
      },
      {
        heading: 'Copyright and trademarks',
        body: [
          `Unless stated otherwise, the content of this website is © ${profile.name} and may not be reproduced without permission. Other company names and logos belong to their owners and are used only to describe work done for or with them.`,
        ],
      },
      {
        heading: 'Governing law',
        body: [
          'This website and this notice are governed by the laws of Egypt, without affecting any mandatory protections you have under the law of your country.',
        ],
      },
      {
        heading: 'Privacy',
        body: ['How this website handles personal data is described in the [Privacy Notice](/privacy/).'],
      },
    ],
  },
  footer: {
    place: 'Egypt',
    resume: 'Résumé',
    privacy: 'Privacy Notice',
    legal: 'Legal Notice',
    cookies: 'Cookie settings',
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
