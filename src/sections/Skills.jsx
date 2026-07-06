import styled from 'styled-components';
import Reveal from '../components/Reveal.jsx';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 1.25rem;
`;

const Category = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.accentA};
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Tags = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

const groups = [
  { category: 'Languages', tags: 'Python, R, Bash' },
  { category: 'Pipelines', tags: 'Nextflow, SLURM, HPC, Singularity, Docker' },
  { category: 'Genomics tools', tags: 'STAR, Salmon, DESeq2, GATK, bcftools' },
  { category: 'Evolutionary analysis', tags: 'HyPhy, FRESCo' },
  { category: 'Single cell', tags: 'Seurat, Scanpy' },
];

export default function Skills() {
  return (
    <section id="skills">
      <Reveal>
        <h2>Skills</h2>
      </Reveal>
      <Grid>
        {groups.map((g, i) => (
          <Reveal key={g.category} delay={i * 0.04}>
            <Card>
              <Category>{g.category}</Category>
              <Tags>{g.tags}</Tags>
            </Card>
          </Reveal>
        ))}
      </Grid>
    </section>
  );
}
