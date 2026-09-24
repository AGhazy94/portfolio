import { h } from './render';
import { profile } from '../data/profile';

// The light theme's pinned values from global.css; satori can't read CSS variables.
const colors = {
  bg: '#fbfbfa',
  surface: '#f0f0ee',
  fg: '#111111',
  body: '#3a3a3c',
  muted: '#6a6a6f',
  divider: '#e1e1de',
};

export function monogram({ rounded }: { rounded: boolean }) {
  return h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bg,
      borderRadius: rounded ? '22%' : 0,
      color: colors.fg,
      fontFamily: 'Instrument Serif',
      fontSize: 300,
      letterSpacing: -6,
      paddingBottom: 24,
    },
    profile.name
      .split(' ')
      .map((part) => part[0])
      .join(''),
  );
}

export function ogCard(host: string) {
  return h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 80,
      backgroundColor: colors.bg,
      fontFamily: 'Geist',
    },
    [
      h('div', { display: 'flex', flexDirection: 'column' }, [
        h(
          'div',
          { fontFamily: 'Instrument Serif', fontSize: 132, lineHeight: 0.92, letterSpacing: -2.5, color: colors.fg },
          profile.name,
        ),
        h('div', { marginTop: 28, fontSize: 36, fontWeight: 500, color: colors.fg }, profile.title),
        h('div', { marginTop: 16, maxWidth: 860, fontSize: 30, lineHeight: 1.4, color: colors.body }, profile.tagline),
      ]),
      h(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 28,
          borderTop: `2px solid ${colors.divider}`,
        },
        [
          h(
            'div',
            { display: 'flex' },
            profile.ogTags.map((pill) =>
              h(
                'div',
                {
                  marginRight: 12,
                  padding: '10px 22px',
                  borderRadius: 999,
                  backgroundColor: colors.surface,
                  color: colors.body,
                  fontSize: 22,
                  fontWeight: 500,
                },
                pill,
              ),
            ),
          ),
          h('div', { fontSize: 24, fontWeight: 500, color: colors.muted }, host),
        ],
      ),
    ],
  );
}
