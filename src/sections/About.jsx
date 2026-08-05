import styled from 'styled-components';
import Reveal from '../components/Reveal.jsx';
import SectionIntro from '../components/SectionIntro.jsx';

const Wrap = styled.div`
  display: grid;
  gap: 1.25rem;
  max-width: 760px;
`;

const Paragraph = styled.p`
  font-size: 1.08rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textDim};
  margin: 0;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

export default function About() {
  return (
    <section id="about">
      <SectionIntro
        index="01"
        eyebrow="// about.md"
        title="About"
      />
      <Wrap>
        <Reveal>
          <Paragraph>
            I am a <strong>computational biologist and bioinformatician</strong>{' '}
            with a Master of Science in Bioinformatics from Northeastern
            University in Toronto, and a Bachelor of Pharmacy background that
            shaped how I think about translating molecular data into
            decisions that matter for patients. My work sits at the
            intersection of biology, statistics, and high performance
            computing, using <strong>Python (scikit-learn, pandas, Bioconductor)</strong>{' '}
            and <strong>R (DESeq2, glmnet, ggplot2)</strong> to turn complex
            genomic and transcriptomic datasets into biological insight.
          </Paragraph>
        </Reveal>
        <Reveal delay={0.05}>
          <Paragraph>
            My capstone work built an HPC based comparative genomics
            pipeline to detect synonymous accelerated elements across 120
            mammalian genomes, and I have hands on experience with RNA
            sequencing, variant calling, and multi omics analysis across
            research spanning cancer biology, diabetes, and drug discovery.
          </Paragraph>
        </Reveal>
        <Reveal delay={0.1}>
          <Paragraph>
            I am actively seeking opportunities as a{' '}
            <strong>Computational Biologist, Bioinformatician, Research
            Associate, or Biostatistician</strong>, particularly in
            research driven environments where rigorous science and
            collaboration matter. I am based in Toronto, open to remote
            roles, and open to relocating.
          </Paragraph>
        </Reveal>
      </Wrap>
    </section>
  );
}
