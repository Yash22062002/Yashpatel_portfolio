export const theme = {
  colors: {
    // Blue tinted near black rather than pure black. Pure black makes
    // shadows invisible and pushes contrast uncomfortably high, so
    // elevation here is expressed by lightening the surface instead.
    bg: '#0B0F14',
    surface: '#121821',
    surfaceAlt: '#1A222D',
    surfaceRaised: '#232E3B',
    border: 'rgba(231, 236, 242, 0.09)',
    borderStrong: 'rgba(231, 236, 242, 0.16)',

    // Off white rather than pure white. On a near black background pure
    // white haloes slightly and tires the eye over a long read.
    text: '#E6EDF3',
    textDim: '#9FB0C0',
    textFaint: '#6B7A8A',

    accentA: '#2DD4BF', // teal, the system accent, carries almost all emphasis
    accentB: '#FF7A6B', // coral, held back for rare highlights only
    accentAmber: '#F5A623',
  },
  font: {
    display: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  motion: {
    fast: '0.15s',
    normal: '0.3s',
    // Decelerating curve, movement arrives the way physical things do,
    // quickly at first and then settling.
    ease: 'cubic-bezier(0.2, 0, 0, 1)',
  },
  radius: '10px',
  radiusLg: '16px',
  maxWidth: '1120px',
};
