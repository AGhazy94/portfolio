type Segment =
  { kind: 'text'; text: string } | { kind: 'strong'; text: string } | { kind: 'link'; text: string; href: string };

// URLs may hold one level of parentheses; links and bold don't nest.
const TOKEN = /\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\)|\*\*(.+?)\*\*/g;
const SAFE_URL = /^(?:https?:|mailto:|\/|#)/;

export function parseInline(source: string): Segment[] {
  const segments: Segment[] = [];
  let cursor = 0;
  for (const match of source.matchAll(TOKEN)) {
    const [raw, text, href, strong] = match;
    if (match.index > cursor) segments.push({ kind: 'text', text: source.slice(cursor, match.index) });
    if (text && href && SAFE_URL.test(href)) segments.push({ kind: 'link', text, href });
    else if (strong) segments.push({ kind: 'strong', text: strong });
    else segments.push({ kind: 'text', text: raw });
    cursor = match.index + raw.length;
  }
  if (cursor < source.length) segments.push({ kind: 'text', text: source.slice(cursor) });
  return segments;
}

export const toPlainText = (source: string) =>
  parseInline(source)
    .map((segment) => segment.text)
    .join('');
