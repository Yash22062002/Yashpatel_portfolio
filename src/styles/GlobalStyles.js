import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * { box-sizing: border-box; }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font.body};
    line-height: 1.6;
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.font.display};
    margin: 0 0 0.5em;
    letter-spacing: -0.01em;
  }

  a { color: inherit; }

  ::selection {
    background: ${({ theme }) => theme.colors.accentA};
    color: #05100E;
  }

  .typed-cursor {
    color: ${({ theme }) => theme.colors.accentA};
  }

  section {
    max-width: ${({ theme }) => theme.maxWidth};
    margin: 0 auto;
    padding: 6rem 1.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
