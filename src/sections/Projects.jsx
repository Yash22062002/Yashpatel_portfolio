import styled from 'styled-components';
import Reveal from '../components/Reveal.jsx';

const List = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
`;

const Figure = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  color: ${({ theme }) => theme.colors.accentA};
  font-size: 0.8rem;
`;

const projects = [
  {
    figure: 'Fig. 01',
    title: 'Comparative genomics across 120 mammalian species',
    body: 'A Nextflow pipeline detecting synonymous acceleration elements, run on Northeastern Discovery HPC using roughly 20,000 CPU hours, supervised by Professor Maxim Wolf.',
  },
  {
    figure: 'Fig. 02',
    title: 'RNA sequencing in multiple myeloma',
    body: 'A bulk RNA seq pipeline built with STAR, Salmon and DESeq2 to characterize the tumour microenvironment.',
  },
  {
    figure: 'Fig. 03',
    title: 'Whole exome variant calling',
    body: 'A variant calling pipeline using GATK and bcftools for whole exome sequencing data.',
  },
];

export default function Projects() {
  return (
    <section id="projects">
      <Reveal>
        <h2>Projects</h2>
      </Reveal>
      <List>
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <Card>
              <Figure>{p.figure}</Figure>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </Card>
          </Reveal>
        ))}
      </List>
    </section>
  );
}
