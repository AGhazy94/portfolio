import type { APIRoute } from 'astro';
import { getPosts, getServices, getWork } from '../lib/content';
import { toPlainText } from '../lib/inline';
import { about, experience, profile, projects, socials, statement } from '../data/profile';

// Follows llmstxt.org: H1, blockquote, free-form sections, then H2 sections that only hold link lists.
export const GET: APIRoute = async ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  const services = await getServices();
  const work = await getWork();
  const articles = await getPosts();
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.description}`,
    '',
    `${experience[0].role} at ${experience[0].company}. Based in ${profile.location.label}.`,
    '',
    statement,
    '',
    ...about.map(toPlainText).flatMap((paragraph) => [paragraph, '']),
    '**Experience**',
    '',
    ...experience.map((job) => {
      const company = job.href ? `[${job.company}](${job.href})` : job.company;
      const note = job.note ? ` (${job.note})` : '';
      return `- ${job.role}, ${company}${note}, ${job.start}–${job.end}: ${job.summary} ${job.highlights.join(' ')} Tech: ${job.tags.join(', ')}.`;
    }),
    '',
    '**Skills**',
    '',
    `- ${profile.knowsAbout.join(', ')}`,
    `- Languages: ${profile.languages.map((language) => `${language.name} (${language.level})`).join(', ')}`,
    `- Education: ${profile.education.degree}, ${profile.education.school}, ${profile.education.years}`,
    '',
    '## Services',
    '',
    ...services.map(({ id, data }) => `- [${data.cardTitle}](${url(`/services/${id}/`)}): ${data.description}`),
    '',
    '## Case studies',
    '',
    ...work.map(({ id, data }) => `- [${data.title}](${url(`/work/${id}/`)}): ${data.description}`),
    '',
    '## Articles',
    '',
    ...articles.map(({ id, data }) => `- [${data.title}](${url(`/blog/${id}/`)}): ${data.description}`),
    '',
    '## Projects',
    '',
    ...projects.map(
      (project) =>
        `- [${project.name}](${project.href}): ${project.kind}. ${project.summary} Tech: ${project.tags.join(', ')}.`,
    ),
    '',
    '## Links',
    '',
    `- [Portfolio](${url('/')}): this site`,
    `- [Résumé (PDF)](${url(profile.resume)}): the full résumé`,
    ...socials.map((social) => `- [${social.label}](${social.href})`),
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
