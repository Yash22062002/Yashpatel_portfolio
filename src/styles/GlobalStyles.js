import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * { box-sizing: border-box; }

  :root {
    --dur-fast: ${({ theme }) => theme.motion.fast};
    --dur-normal: ${({ theme }) => theme.motion.normal};
    --ease: ${({ theme }) => theme.motion.ease};
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font.body};
    /* Light text on a dark background reads visually heavier than the
       same weight on white, so body sits just under regular to
       compensate rather than looking slightly bold throughout. */
    font-weight: 350;
    font-size: 1rem;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.font.display};
    font-weight: 600;
    margin: 0 0 0.5em;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }

  h1 {
    font-weight: 700;
    letter-spacing: -0.035em;
  }

  h3 {
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  p {
    /* Long measures are hard to track back from line to line, so body
       copy is capped near the comfortable 50 to 75 character range. */
    max-width: 68ch;
  }

  a { color: inherit; }

  ::selection {
    background: ${({ theme }) => theme.colors.accentA};
    color: #05100E;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accentA};
    outline-offset: 3px;
    border-radius: 3px;
  }

  .typed-cursor {
    color: ${({ theme }) => theme.colors.accentA};
  }

  /* Lets a keyboard user jump straight past the navigation instead of
     tabbing through every link to reach the content. Hidden until it
     receives focus. */
  .skip-link {
    position: absolute;
    left: 1rem;
    top: -3rem;
    z-index: 200;
    padding: 0.6rem 1rem;
    border-radius: ${({ theme }) => theme.radius};
    background: ${({ theme }) => theme.colors.accentA};
    color: #05100E;
    font-weight: 600;
    text-decoration: none;
    transition: top var(--dur-fast) var(--ease);
  }

  .skip-link:focus {
    top: 1rem;
  }

  section {
    max-width: ${({ theme }) => theme.maxWidth};
    margin: 0 auto;
    padding: 7rem 1.5rem;
    scroll-margin-top: 5rem;
  }

  @media (max-width: 620px) {
    section {
      padding: 4.5rem 1.35rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :root {
      --dur-fast: 0.01ms;
      --dur-normal: 0.01ms;
    }

    html {
      scroll-behavior: auto;
    }

    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
