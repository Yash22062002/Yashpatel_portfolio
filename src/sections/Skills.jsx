import styled from 'styled-components';
import Reveal from '../components/Reveal.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import {
  CodeIcon,
  DnaIcon,
  ChartIcon,
  FileIcon,
  ServerIcon,
  DatabaseIcon,
  ShieldIcon,
} from '../components/Icons.jsx';

const groups = [
  {
    icon: CodeIcon,
    category: 'Programming and Scripting',
    description: 'Core languages for building and running analysis pipelines end to end.',
    tags: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'Bioconductor', 'R', 'SQL', 'Bash', 'Linux'],
  },
  {
    icon: DnaIcon,
    category: 'Bioinformatics and NGS Tools',
    description: 'Tools spanning quality control, alignment, quantification, and variant calling.',
    tags: ['FastQC', 'MultiQC', 'Trimmomatic', 'STAR', 'HISAT2', 'Salmon', 'kallisto', 'GATK', 'bcftools', 'BLAST', 'BEDTools', 'samtools'],
  },
  {
    icon: ChartIcon,
    category: 'Data Analysis and Machine Learning',
    description: 'Statistical and machine learning methods for extracting signal from high dimensional biological data.',
    tags: ['Differential expression', 'Variant calling', 'PCA', 'UMAP', 'Elastic net regression', 'FDR correction', 'Multiomics integration'],
  },
  {
    icon: FileIcon,
    category: 'Genomic Data Formats',
    description: 'Comfortable moving between the file formats bioinformatics pipelines actually run on.',
    tags: ['FASTA', 'FASTQ', 'BAM', 'VCF', 'BED', 'GTF/GFF', 'MAF'],
  },
  {
    icon: ServerIcon,
    category: 'Computing and Workflow Management',
    description: 'Running and scaling pipelines on shared, high performance computing clusters.',
    tags: ['HPC', 'SLURM', 'Singularity', 'Docker', 'Nextflow', 'GitHub'],
  },
  {
    icon: DatabaseIcon,
    category: 'Databases',
    description: 'Public reference databases used for annotation and validation.',
    tags: ['NCBI', 'Ensembl', 'CCDS', 'UniProt', 'GenBank'],
  },
];

const pharmacyGroup = {
  icon: ShieldIcon,
  category: 'Pharmacy Systems and Regulatory',
  description: 'Regulated dispensary operations and pharmaceutical manufacturing compliance.',
  tags: ['Kroll', 'PharmaClik', 'Fillware', 'GMP', 'GLP', 'SOP Compliance', 'ODB Billing'],
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 1.5rem;
`;

const IconBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(45, 212, 191, 0.1);
  color: ${({ theme }) => theme.colors.accentA};
  margin-bottom: 1rem;
`;

const Category = styled.h3`
  font-size: 1rem;
  margin: 0 0 0.5rem;
`;

const Description = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textDim};
  margin: 0 0 1.1rem;
  line-height: 1.5;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const Tag = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.textDim};
`;

const SecondaryWrap = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
`;

const SecondaryLabel = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textDim};
  margin: 0 0 0.75rem;
`;

const SecondaryCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 1.1rem 1.25rem;
`;

const SecondaryIcon = styled.div`
  color: ${({ theme }) => theme.colors.accentAmber};
  flex-shrink: 0;
  margin-top: 0.1rem;
`;

export default function Skills() {
  const PharmacyIcon = pharmacyGroup.icon;

  return (
    <section id="skills">
      <SectionIntro
        index="03"
        eyebrow="// skills.json"
        title="Skills"
        subtitle="A capability map spanning genomics pipelines, statistics, and machine learning, built to turn complex biological data into insight."
      />
      <Grid>
        {groups.map((g, i) => {
          const Icon = g.icon;
          return (
            <Reveal key={g.category} delay={i * 0.04}>
              <Card>
                <IconBadge>
                  <Icon size={20} />
                </IconBadge>
                <Category>{g.category}</Category>
                <Description>{g.description}</Description>
                <Tags>
                  {g.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Tags>
              </Card>
            </Reveal>
          );
        })}
      </Grid>
      <SecondaryWrap>
        <SecondaryLabel>Also brings to the table</SecondaryLabel>
        <Reveal>
          <SecondaryCard>
            <SecondaryIcon>
              <PharmacyIcon size={22} />
            </SecondaryIcon>
            <div>
              <Category>{pharmacyGroup.category}</Category>
              <Description>{pharmacyGroup.description}</Description>
              <Tags>
                {pharmacyGroup.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
            </div>
          </SecondaryCard>
        </Reveal>
      </SecondaryWrap>
    </section>
  );
}
