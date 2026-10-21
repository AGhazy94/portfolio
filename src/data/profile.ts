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
    // Information at the point of collection, not a consent checkbox: replying rests on the visitor's own request.
    privacy: 'I use your details to respond to your enquiry. See the [Privacy Notice](/privacy/).',
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
    body: 'I use optional Google Analytics cookies to understand how this site is used. [Privacy Notice](/privacy/)',
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
    updated: 'Last updated: 21 October 2026.',
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
          '**Contact information:** your name, email address, message, any optional project details and the page where you sent the form.',
          '**Analytics information:** if you accept analytics cookies, Google Analytics receives information such as pages viewed, device and browser type, approximate location and referring website or campaign. Form contents are never sent to Google Analytics.',
          '**Technical information:** Netlify records standard server logs, including IP addresses, to deliver and secure the site. If you consent, the site also remembers how you first arrived so that source can accompany a later enquiry.',
        ],
      },
      {
        heading: 'How and why I use your information',
        body: [
          'I use contact information to respond to enquiries and discuss possible work; analytics information to understand which pages are useful; and technical information to operate, protect and improve the site. I may also keep records where required for legal, tax or accounting purposes.',
          'Where the GDPR or UK GDPR applies, the legal bases are steps you ask me to take before a possible contract, my legitimate interests in managing enquiries and keeping the site secure, your consent for analytics, and compliance with legal obligations. I do not use personal data for automated decisions or profiling.',
        ],
      },
      {
        heading: 'Cookies and local storage',
        body: [
          'Google Analytics loads only after you select **Accept**. If you reject cookies or make no choice, analytics does not load and no analytics data is sent to Google. Advertising personalisation is disabled.',
          'The site always stores your colour-theme preference and, after you choose, your cookie preference. You can change your analytics choice at any time through **Cookie settings** in the footer.',
        ],
        storage: {
          summary: 'Cookie and storage details',
          duration: 'Duration',
          rows: [
            {
              name: '_ga',
              provider: 'Google Analytics',
              purpose: 'Distinguishes visitors for site analytics. Set only after consent.',
              duration: 'Up to 2 years',
            },
            {
              name: '_ga_<container-id>',
              provider: 'Google Analytics',
              purpose: 'Maintains an analytics session. Set only after consent.',
              duration: 'Up to 2 years',
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
          'I use Netlify for hosting and form submissions, Akismet for spam checking, Hostinger for email and Google for analytics after consent. They receive only the information needed to provide those services. I do not sell or rent personal data.',
          `These providers may process information outside Egypt or your country. Where data-protection law requires safeguards, transfers rely on an adequacy decision or approved contractual safeguards. You can ask for more information by emailing [${profile.email}](mailto:${profile.email}). I may also disclose information where the law requires it.`,
        ],
      },
      {
        heading: 'How long I keep information',
        body: [
          'Enquiries that do not become client work are deleted within 12 months. Work-related correspondence is kept for the engagement and as long as tax or accounting rules require. Google Analytics keeps event data according to the retention setting for this site. Netlify keeps server logs under its own retention policy.',
          'The site uses HTTPS, and form submissions are available only through protected Netlify and email accounts. No online service can guarantee absolute security.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `Depending on the law that applies, you may ask to access, correct, delete or receive a copy of your personal data, restrict its use, or object to processing. Email [${profile.email}](mailto:${profile.email}) to make a request.`,
          'You can withdraw analytics consent at any time without affecting earlier processing. You may also complain to the Egyptian Personal Data Protection Center or the data-protection authority where you live, work or believe an infringement occurred.',
        ],
      },
      {
        heading: 'Information you provide',
        body: [
          'Your name, email address and message are required if you use the contact form; the other fields are optional. Without the required information, I cannot receive or respond to the enquiry. Please do not include sensitive personal information unless it is necessary.',
          'This site is intended for potential clients, collaborators and employers and is not directed at children under 16.',
        ],
      },
      {
        heading: 'Changes to this Privacy Notice',
        body: [
          'This notice may be updated from time to time. The latest revision date appears below. If a change affects your consent, the site will ask for it again.',
        ],
      },
    ],
  },
  legal: {
    title: 'Legal Notice',
    metaTitle: 'Legal Notice',
    heading: 'Legal Notice',
    description:
      'Legal Notice for ahmed-ghazy.com: website operator, hosting, disclaimers, third-party links, copyright and governing law.',
    lead: 'Information about the operator of this website and the terms that apply to its use.',
    updated: 'Last updated: 21 October 2026.',
    sections: [
      {
        heading: 'Website operator',
        body: [
          `${profile.name}, freelance software developer, Egypt.`,
          `Email: [${profile.email}](mailto:${profile.email})`,
        ],
      },
      {
        heading: 'Hosting provider',
        body: ['This website is hosted by Netlify, Inc., United States.'],
      },
      {
        heading: 'No offer or professional advice',
        body: [
          'The content of this website does not constitute a binding offer. Any engagement is subject to a separate written agreement setting out its scope and terms.',
          'Articles published on this website describe general approaches and do not constitute legal, financial or other professional advice for any particular situation.',
        ],
      },
      {
        heading: 'Disclaimer of liability for content',
        body: [
          'The content of this website has been prepared with care. However, no warranty is given that it is complete, accurate or up to date, and no liability is accepted for any loss arising from reliance on it, to the extent permitted by law.',
        ],
      },
      {
        heading: 'Links to third-party websites',
        body: [
          'This website contains links to websites operated by third parties. I have no control over their content and accept no responsibility for it. Should a linked page contain unlawful content, please notify me and the link will be removed.',
        ],
      },
      {
        heading: 'Copyright and trademarks',
        body: [
          `Unless otherwise stated, the text, design and images on this website are © ${profile.name} and may not be reproduced without prior written permission. Company names, product names and logos are the property of their respective owners and are used solely to describe work carried out for or with them. Testimonials are quoted from the public posts identified alongside them.`,
        ],
      },
      {
        heading: 'Governing law',
        body: [
          'This Legal Notice and the use of this website are governed by the laws of the Arab Republic of Egypt, without prejudice to any mandatory protections available to you under the law of your country of residence.',
        ],
      },
      {
        heading: 'Privacy',
        body: ['The processing of personal data on this website is described in the [Privacy Notice](/privacy/).'],
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
