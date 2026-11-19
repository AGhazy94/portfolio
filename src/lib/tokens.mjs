// For code that can't read CSS variables (satori, theme-color); tokens.test.mjs holds global.css to these values.

// The brand split: midnight fills 60% of the page, electric blue 30%, sunset orange 10%.
export const brand = {
  midnight: '#090a10',
  electric: '#2f6bff',
  sunset: '#ff7a1a',
};

export const colors = {
  bg: brand.midnight,
  header: 'rgb(9 10 16 / 0.82)',
  surface: '#101b3b',
  'surface-2': '#13234e',
  fg: '#f5f7fc',
  body: '#c5ccdc',
  muted: '#9ea7bd',
  accent: '#6d97ff',
  divider: '#212c4c',
  hairline: 'rgb(255 255 255 / 0.08)',
  field: '#0b0f1f',
  'field-border': '#6b79a1',
  error: '#ff8593',
  success: '#5fd39a',
  brand: brand.electric,
  // Services and Contact sit on deep navy, not the bright blue: only white passed on that, and it flattened the text.
  band: '#0f1a3a',
  loud: brand.sunset,
};

export const scrim = 'rgb(4 5 10 / 0.72)';
