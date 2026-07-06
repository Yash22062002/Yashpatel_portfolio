import styled from 'styled-components';
import DNAHelix from '../components/DNAHelix.jsx';
import TypedRole from '../components/TypedRole.jsx';

const Wrap = styled.section`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 2rem;
  padding: 8rem 1.5rem 4rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const TextCol = styled.div`
  text-align: left;

  @media (max-width: 860px) {
    text-align: center;
    order: 2;
  }
`;

const CanvasCol = styled.div`
  position: relative;
  height: 560px;

  @media (max-width: 860px) {
    height: 320px;
    order: 1;
  }
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  color: ${({ theme }) => theme.colors.accentA};
  letter-spacing: 0.02em;
  font-size: 0.85rem;
  margin: 0 0 1rem;
`;

const Title = styled.h1`
  font-size: clamp(2.6rem, 6vw, 4.4rem);
  font-weight: 700;
  line-height: 1.05;
  margin: 0 0 1rem;
`;

const RoleLine = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 1.25rem;

  span {
    color: ${({ theme }) => theme.colors.accentA};
    font-weight: 600;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 1.05rem;
  max-width: 480px;
  margin: 0 0 1rem;

  @media (max-width: 860px) {
    max-width: none;
    margin: 0 auto 1rem;
  }
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 0.95rem;
  margin: 0 0 2rem;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 860px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled.a`
  display: inline-block;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accentA};
  color: #05100E;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
`;

const SecondaryButton = styled.a`
  display: inline-block;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
`;

export default function Hero() {
  return (
    <Wrap id="hero">
      <TextCol>
        <Eyebrow>// loading profile: yash_patel.fasta</Eyebrow>
        <Title>
          Yash
          <br />
          Patel.
        </Title>
        <RoleLine>
          I'm a <TypedRole />
        </RoleLine>
        <Subtitle>
          I build pipelines that turn raw sequencing data into biological
          insight, from comparative genomics on HPC clusters to machine
          learning models for drug discovery and precision medicine.
        </Subtitle>
        <Tagline>
          From raw reads to <strong>biological insight</strong>.
        </Tagline>
        <Actions>
          <PrimaryButton href="#projects">View my work</PrimaryButton>
          <SecondaryButton href="#contact">Get in touch</SecondaryButton>
        </Actions>
      </TextCol>
      <CanvasCol>
        <DNAHelix />
      </CanvasCol>
    </Wrap>
  );
}
