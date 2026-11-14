// For code that can't read CSS variables (satori, theme-color); tokens.test.mjs holds global.css to these values.
export const light = {
  bg: '#efede8',
  header: 'rgb(239 237 232 / 0.82)',
  surface: '#e3e1dd',
  'surface-2': '#dedcd8',
  fg: '#23211e',
  body: '#3d3b38',
  muted: '#5f5d59',
  accent: '#0b5cbf',
  divider: '#d4d1cc',
  hairline: 'rgb(31 30 27 / 0.08)',
  field: '#f6f4f2',
  'field-border': '#787571',
  error: '#a8291c',
  success: '#186a33',
};

export const dark = {
  bg: '#1b1a18',
  header: 'rgb(27 26 24 / 0.82)',
  surface: '#262422',
  'surface-2': '#2e2c29',
  fg: '#e6e4df',
  body: '#c6c3bd',
  muted: '#9d9992',
  accent: '#6aa7f8',
  divider: '#3b3936',
  hairline: 'rgb(255 250 240 / 0.08)',
  field: '#151513',
  'field-border': '#807d76',
  error: '#ff8a7e',
  success: '#6fd39a',
};

// One value for both themes: ::backdrop doesn't reliably inherit color-scheme.
export const scrim = 'rgb(20 19 17 / 0.6)';
