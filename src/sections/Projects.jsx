import { useState } from 'react';
import styled from 'styled-components';
import Reveal from '../components/Reveal.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { GithubIcon, ExternalLinkIcon, LockIcon } from '../components/Icons.jsx';
import { GITHUB_URL } from '../config.js';

const filters = ['All', 'Genomics', 'HPC', 'Biostatistics', 'Web App', 'AI'];

const projects = [
  {
    title: 'Comparative Genomics: SAE Detection Across 120 Mammals',
    categories: ['Genomics', 'HPC'],
    team: false,
    description:
      'A comparative genomics pipeline detecting synonymous accelerated elements (SAEs) across 120 mammalian genomes. Screened roughly 20,000 human protein coding genes using MAFfilter and the FRESCo algorithm, ran 300 parallel SLURM array jobs on the Northeastern Discovery HPC cluster, and found a 20 to 40 percent increase in SAE detection compared to an earlier 29 species dataset, while cutting overall compute time by roughly 70 percent through workflow optimization.',
    image: `${import.meta.env.BASE_URL}projects/sae-detection-comparison.png`,
    imageCaption: 'Gene by gene SAE detection, 120 species versus 29 species.',
    tags: ['Python', 'R', 'HPC / SLURM', 'HyPhy / FRESCo', 'BEDTools'],
    link: { type: 'github', url: `${GITHUB_URL}/BINF7700_Capstone_Yash` },
  },
  {
    title: 'RNA Sequencing: Multiple Myeloma and Adipocyte Crosstalk',
    categories: ['Genomics'],
    team: true,
    description:
      'A bulk RNA sequencing pipeline (FastQC and MultiQC, STAR, Salmon, DESeq2, KEGG and GO enrichment) exploring transcriptomic crosstalk between multiple myeloma cells and bone marrow adipocytes. Identified candidate biomarkers on both sides of the interaction, including SERF1A and CYP1A1 downregulated and DHRSX and IL10 upregulated in myeloma cells, and characterized NF-kB and cytokine signalling dysregulation relevant to drug discovery. Presented as a poster.',
    tags: ['STAR', 'Salmon', 'DESeq2', 'FastQC / MultiQC'],
    link: { type: 'github', url: `${GITHUB_URL}/transcriptomics_project` },
  },
  {
    title: 'Whole Exome Sequencing: Variant Calling Pipeline (hg38)',
    categories: ['Genomics'],
    team: false,
    description:
      'A variant calling pipeline for whole exome sequencing data aligned to the human reference genome (hg38), performing SNP and indel detection with GATK and bcftools, including quality filtering and annotation.',
    tags: ['GATK', 'bcftools', 'hg38'],
    link: null,
  },
  {
    title: 'Biostatistical Analysis of Multiomics Diabetes Data',
    categories: ['Biostatistics'],
    team: true,
    description:
      'Analysis of lipidomic and gene expression data in R to investigate pancreatic beta cell dysfunction during diabetes progression. Built an elastic net regression model for biomarker prioritization, applied PCA and hierarchical clustering to find patterns across diabetes types, and correlated candidate molecular features with clinical traits including HbA1c and BMI.',
    tags: ['R', 'glmnet', 'PCA', 'Biostatistics'],
    link: { type: 'github', url: `${GITHUB_URL}/Statistics-Project-Work` },
  },
  {
    title: 'This Portfolio, and the Jarvis Chat Assistant',
    categories: ['Web App', 'AI'],
    team: false,
    description:
      'This site itself: a React and Vite front end with a Three.js and GSAP animated hero, paired with a FastAPI backend that streams responses from the Claude API to power the floating Jarvis chat widget. Deployed across GitHub Pages and Render.',
    tags: ['React', 'Vite', 'Three.js', 'FastAPI', 'Claude API'],
    link: {
      type: 'github',
      url: `${GITHUB_URL}/Yashpatel_portfolio`,
      live: 'https://yash22062002.github.io/Yashpatel_portfolio/',
    },
  },
];

const FilterRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
`;

const FilterPill = styled.button`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.8rem;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.accentA : theme.colors.border};
  background: ${({ theme, $active }) =>
    $active ? 'rgba(45, 212, 191, 0.12)' : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.accentA : theme.colors.textDim};
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.85rem;
`;

const CategoryLabel = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.accentA};
`;

const TeamBadge = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textDim};
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 0.75rem;
  line-height: 1.35;
`;

const Description = styled.p`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.textDim};
  line-height: 1.6;
  margin: 0 0 1.1rem;
  flex-grow: 1;
`;

const Figure = styled.figure`
  margin: 0 0 1.1rem;
  border-radius: 8px;
  overflow: hidden;
  background: #f4f6f8;
  border: 1px solid ${({ theme }) => theme.colors.border};

  img {
    display: block;
    width: 100%;
  }

  figcaption {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    color: #5b6472;
    background: #eef1f4;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1.25rem;
`;

const Tag = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  padding: 0.28rem 0.6rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.textDim};
`;

const LinkRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: auto;
`;

const CodeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.accentA};
  }
`;

const PrivateNote = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

function LinkFooter({ link }) {
  if (!link) return null;

  if (link.type === 'private') {
    return (
      <LinkRow>
        <PrivateNote>
          <LockIcon size={13} />
          Code not yet published
        </PrivateNote>
      </LinkRow>
    );
  }

  return (
    <LinkRow>
      <CodeLink href={link.url} target="_blank" rel="noreferrer">
        <GithubIcon size={16} />
        View on GitHub
      </CodeLink>
      {link.live && (
        <CodeLink href={link.live} target="_blank" rel="noreferrer">
          <ExternalLinkIcon size={13} />
          Live site
        </CodeLink>
      )}
    </LinkRow>
  );
}

export default function Projects() {
  const [active, setActive] = useState('All');
  const visible =
    active === 'All'
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  return (
    <section id="projects">
      <SectionIntro
        index="04"
        eyebrow="// projects/"
        title="Projects"
        subtitle="Pipelines and analyses spanning comparative genomics, transcriptomics, and biostatistics, plus the software behind this site."
      />
      <FilterRow>
        {filters.map((f) => (
          <FilterPill key={f} $active={f === active} onClick={() => setActive(f)}>
            {f}
          </FilterPill>
        ))}
      </FilterRow>
      <Grid>
        {visible.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.04}>
            <Card>
              <TopRow>
                <CategoryLabel>{p.categories[0]}</CategoryLabel>
                {p.team && <TeamBadge>Team project</TeamBadge>}
              </TopRow>
              <Title>{p.title}</Title>
              {p.image && (
                <Figure>
                  <img src={p.image} alt={p.imageCaption} loading="lazy" />
                  <figcaption>{p.imageCaption}</figcaption>
                </Figure>
              )}
              <Description>{p.description}</Description>
              <TagRow>
                {p.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagRow>
              <LinkFooter link={p.link} />
            </Card>
          </Reveal>
        ))}
      </Grid>
    </section>
  );
}
