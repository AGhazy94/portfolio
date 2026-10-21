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
    privacy:
      'By submitting this form, you acknowledge that your personal data will be processed in accordance with the [Privacy Notice](/privacy/). Your details are used solely to respond to your enquiry.',
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
    title: 'This website uses cookies',
    body: 'This website uses analytics cookies provided by Google Analytics to understand how visitors use the site and to measure which pages and campaigns lead to enquiries. These cookies are set only with your consent, and you can change your choice at any time under Cookie settings. For more information, please see the [Privacy Notice](/privacy/).',
    allow: 'Accept',
    decline: 'Reject',
  },
  privacy: {
    title: 'Privacy Notice',
    metaTitle: 'Privacy Notice',
    heading: 'Privacy Notice',
    description:
      'Privacy Notice for ahmed-ghazy.com: personal data collected, purposes and legal bases, cookies, recipients, international transfers, retention and your rights.',
    lead: 'This Privacy Notice explains how personal data is collected and used when you visit ahmed-ghazy.com or contact me through it.',
    updated: 'Last updated: 21 October 2026.',
    change: 'Cookie settings',
    sections: [
      {
        heading: 'Introduction',
        body: [
          'This Privacy Notice applies to the website ahmed-ghazy.com (the “Website”). It describes the personal data collected through the Website, the purposes and legal bases for processing it, who receives it, how long it is kept and the rights available to you. In this notice, “I”, “me” and “my” refer to Ahmed Ghazy.',
        ],
      },
      {
        heading: 'Data controller',
        body: [
          `The controller responsible for the processing of personal data on this Website is ${profile.name}, freelance software developer, Egypt. For any question or request relating to your personal data, please contact [${profile.email}](mailto:${profile.email}).`,
        ],
      },
      {
        heading: 'Personal data collected',
        body: [
          '**Contact form.** Your name, email address and message, any optional information you select (project type, budget and timeline), and the page from which the form was submitted.',
          '**Source of your visit.** Submitted with the contact form: the campaign parameters of the link through which you first arrived (utm_source, utm_medium, utm_campaign, utm_content and utm_term), the first page you visited and the domain of the referring website. These are retained between pages only where you have accepted cookies; otherwise they are submitted only when you use the form on the page on which you arrived.',
          '**Analytics data, where you have given consent.** Pages viewed, time spent on the Website, browser, device type, approximate location, the referring website or campaign, and the fact that an enquiry was submitted. The content of the contact form is never sent to Google Analytics.',
          '**Server logs.** Netlify, the hosting provider, records requests made to the Website, including IP addresses, to deliver the Website, keep it secure and count visits. No cookies are used for this purpose.',
        ],
      },
      {
        heading: 'Purposes and legal bases',
        body: [
          '**Responding to enquiries.** Contact form data is processed to respond to your enquiry and to take steps at your request before entering into a contract (Article 6(1)(b) GDPR), and on the basis of my legitimate interest in answering messages sent to me (Article 6(1)(f) GDPR).',
          '**Analytics and attribution.** Analytics data and the record of your first visit are processed to understand how the Website is used and which pages and campaigns lead to enquiries, on the basis of your consent (Article 6(1)(a) GDPR).',
          '**Operating the Website.** Server logs are processed on the basis of my legitimate interest in operating a secure and reliable website (Article 6(1)(f) GDPR).',
          '**Legal obligations.** Where we enter into a contract, certain records are kept to comply with tax and accounting obligations (Article 6(1)(c) GDPR).',
        ],
      },
      {
        heading: 'Cookies and similar technologies',
        body: [
          'Google Analytics cookies are placed only after you select **Accept** in the cookie banner. If you select **Reject**, or make no choice, Google Analytics is not loaded and no data is sent to Google. Google signals and advertising personalisation are disabled. The Website also uses your browser’s local storage, which is not shared with any third party, for the purposes listed below. Your choice is kept for 12 months, after which you are asked again. You can change it at any time through **Cookie settings** in the footer of every page.',
        ],
        table: true,
      },
      {
        heading: 'Recipients of personal data',
        body: [
          '**Netlify, Inc.** (United States) hosts the Website, stores contact form submissions and keeps server logs. Netlify screens form submissions for spam using **Akismet**, a service of Automattic Inc. (United States).',
          '**Hostinger International Ltd.** provides the email service that receives notifications of new form submissions and any correspondence that follows.',
          '**Google LLC** (United States) provides Google Analytics, only where you have given consent.',
          'Personal data is not sold, rented or otherwise disclosed to any other party, except where required by law.',
        ],
      },
      {
        heading: 'International data transfers',
        body: [
          'Netlify, Automattic and Google process personal data in the United States. Such transfers rely on the safeguards these providers offer, including the EU-U.S. Data Privacy Framework, under which Google LLC is certified, and the European Commission’s Standard Contractual Clauses incorporated in Netlify’s Data Processing Agreement.',
        ],
      },
      {
        heading: 'Data retention',
        body: [
          'Enquiries that do not lead to an engagement are deleted within 12 months of receipt. Where we work together, correspondence is retained for the duration of the engagement and thereafter for as long as required by tax and accounting law. Personal data is deleted earlier on request, unless its retention is required by law.',
          'Google Analytics data is retained for 14 months. The record of your first visit is deleted from your browser after 90 days. Server logs are retained in accordance with Netlify’s policies.',
        ],
      },
      {
        heading: 'Data security',
        body: [
          'The Website is served exclusively over HTTPS. Contact form submissions are accessible only to me, through my Netlify and email accounts.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'Subject to applicable law, you have the right to access your personal data, to have it rectified or erased, to restrict or object to its processing, and to receive it in a portable format. Where processing is based on consent, you may withdraw your consent at any time without affecting the lawfulness of processing carried out before its withdrawal.',
          `To exercise any of these rights, please contact [${profile.email}](mailto:${profile.email}). I may ask you to confirm your identity before acting on a request, and I will respond within one month. You also have the right to lodge a complaint with the data protection authority of your country of residence.`,
          'No decisions are made about you solely by automated means, and your personal data is not used for profiling.',
        ],
      },
      {
        heading: 'Children',
        body: [
          'The Website is intended for businesses and is not directed at children under the age of 16. I do not knowingly collect personal data from children.',
        ],
      },
      {
        heading: 'Changes to this Privacy Notice',
        body: [
          'This Privacy Notice may be updated from time to time. The date of the latest revision is shown below. Where a change affects what you have consented to, your consent will be requested again.',
        ],
      },
    ],
    cookies: {
      caption: 'Cookies and local storage used on this website',
      columns: ['Name and provider', 'Purpose', 'Duration'],
      rows: [
        ['_ga', 'Google Analytics', 'Distinguishes unique visitors. Set only with consent.', '2 years'],
        ['_ga_<ID>', 'Google Analytics', 'Maintains the session state. Set only with consent.', '2 years'],
        [
          'first-touch (local storage)',
          'This website',
          'Records the campaign, first page and referring domain of your first visit. Stored only with consent.',
          '90 days',
        ],
        ['analytics-consent (local storage)', 'This website', 'Stores your cookie choice.', '12 months'],
        ['theme (local storage)', 'This website', 'Stores your preferred colour theme.', 'Until cleared'],
      ],
    },
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
