import styled from 'styled-components';
import Reveal from './Reveal.jsx';

const Wrap = styled.div`
  position: relative;
  margin-bottom: 3rem;
`;

const Index = styled.span`
  position: absolute;
  top: -2.4rem;
  right: 0;
  font-family: ${({ theme }) => theme.font.display};
  font-size: 6rem;
  font-weight: 700;
  color: transparent;
  -webkit-text-stroke: 1px ${({ theme }) => theme.colors.border};
  line-height: 1;
  user-select: none;
  pointer-events: none;

  @media (max-width: 720px) {
    display: none;
  }
`;

const Eyebrow = styled.p`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: ${({ theme }) => theme.font.mono};
  color: ${({ theme }) => theme.colors.accentA};
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  margin: 0 0 0.75rem;

  &::before {
    content: '';
    width: 22px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accentA};
  }
`;

const Heading = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  margin: 0 0 0.6rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  max-width: 640px;
  margin: 0;
  font-size: 1.02rem;
`;

// eyebrow: short mono label, e.g. "// career.log"
// index: two digit section number shown faintly in the background, e.g. "02"
export default function SectionIntro({ eyebrow, title, subtitle, index }) {
  return (
    <Wrap>
      {index && <Index aria-hidden="true">{index}</Index>}
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading>{title}</Heading>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Reveal>
    </Wrap>
  );
}
