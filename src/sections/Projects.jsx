import styled from 'styled-components';
import Reveal from '../components/Reveal.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import ProjectGallery from '../components/ProjectGallery.jsx';
import { GithubIcon, ExternalLinkIcon, ArrowRightIcon } from '../components/Icons.jsx';
import { GITHUB_URL } from '../config.js';

const BASE = import.meta.env.BASE_URL;

const projects = [
  {
    id: 'comparative-genomics',
    kicker: 'Comparative Genomics · HPC',
    title: 'Detecting Synonymous Accelerated Elements Across 120 Mammals',
    result: '20 to 40% more accelerated elements detected than the prior 29 species baseline',
    summary:
      'My MSc capstone: a genome scale comparative genomics pipeline searching for regions where synonymous mutations, usually assumed to be silent, are evolving unusually fast. Deeper phylogenetic sampling turned out to matter substantially.',
    bullets: [
      'Screened roughly 20,000 human protein coding genes against 120 mammalian genome alignments, over 200GB of multiple alignment data.',
      'Converted whole genome MAF alignments to gene level FASTA with MAFfilter, plus custom Python gap correction, validated at 100% BLAST accuracy.',
      'Ran 300 parallel SLURM array jobs on the Northeastern Discovery cluster, 298 completing successfully, yielding 278 high confidence gene outputs.',
      'Applied Bonferroni correction across roughly 431 sliding windows per gene to control false positives.',
      'Cut total compute time by around 70% through modular job scripts and container ready execution.',
    ],
    stack: ['Python', 'R', 'Bash', 'SLURM / HPC', 'MAFfilter', 'FRESCo', 'BEDTools'],
    figures: [
      {
        src: `${BASE}projects/comparative-genomics-tree.png`,
        alt: 'Circular phylogenetic tree of the 120 mammalian species used in the study, color coded by taxonomic group.',
        caption: 'The 120 mammalian species used in the analysis, grouped by taxonomic order.',
      },
      {
        src: `${BASE}projects/comparative-genomics-venn.png`,
        alt: 'Venn diagram comparing SAE detection between the 120 species and 29 species datasets, showing 764 novel SAEs and 1013 total for 120 species against 311 total for 29 species.',
        caption: '764 novel elements surfaced only with deeper sampling, 1,013 total against 311.',
      },
      {
        src: `${BASE}projects/sae-detection-comparison.png`,
        alt: 'Scatter plot of accelerated elements detected per gene, 120 species dataset on the vertical axis against 29 species on the horizontal, with most points falling above the diagonal.',
        caption: 'Gene by gene comparison. 137 of 152 genes showed improved detection with the larger dataset.',
      },
      {
        src: `${BASE}projects/comparative-genomics-top-genes.jpg`,
        alt: 'Horizontal bar chart of the ten genes with the greatest increase in detected accelerated elements between the 29 species and 120 species datasets.',
        caption: 'The ten genes where added phylogenetic depth revealed the most additional signal.',
      },
      {
        src: `${BASE}projects/comparative-genomics-fresco.png`,
        alt: 'Line plot of synonymous substitution rate across codon position for the gene ALDH9A1, comparing the 29 species and 120 species datasets across a sliding window.',
        caption: 'The FRESCo sliding window method itself, shown for one gene, ALDH9A1.',
      },
      {
        src: `${BASE}projects/comparative-genomics-overlap.png`,
        alt: 'Genome browser style track of the gene CASZ1 with zoomed in views comparing accelerated element regions detected in the 120 species and 29 species datasets.',
        caption: 'A real example at base pair resolution, gene CASZ1, comparing what each dataset actually detects.',
      },
    ],
    links: [{ type: 'code', url: `${GITHUB_URL}/BINF7700_Capstone_Yash` }],
  },
  {
    id: 'rnaseq-myeloma',
    kicker: 'Transcriptomics · Team Project',
    title: 'Multiple Myeloma and Adipocyte Crosstalk',
    result: 'Identified candidate biomarkers on both sides of the tumour and adipocyte interaction',
    summary:
      'A bulk RNA sequencing study of how multiple myeloma cells and bone marrow adipocytes influence each other, using Transwell co-culture data from the Regan lab at the MaineHealth Institute for Research.',
    bullets: [
      'Built the analysis pipeline end to end: FastQC and MultiQC for quality control, STAR for alignment, Salmon for quantification, DESeq2 for differential expression.',
      'In myeloma cells, SERF1A, CYP1A1 and GAREM1 were most downregulated, while DHRSX, CFH and IL10 were most upregulated.',
      'Characterised NF-kB and cytokine signalling dysregulation, pointing at immune mediated mechanisms with potential as therapeutic targets.',
      'Ran functional enrichment across KEGG and GO, and presented the work as a research poster.',
    ],
    stack: ['STAR', 'Salmon', 'DESeq2', 'FastQC / MultiQC', 'Singularity', 'R'],
    figures: [
      {
        src: `${BASE}projects/myeloma-bmat-go-network.jpg`,
        alt: 'Network plot of enriched Gene Ontology biological process terms in adipocytes, showing clusters around biological regulation and around immune and transport related processes.',
        caption: 'Gene Ontology enrichment in adipocytes, shown as a network of connected biological process terms.',
      },
      {
        src: `${BASE}projects/myeloma-bmat-disease-enrichment.jpg`,
        alt: 'Dot plot of disease ontology enrichment, with organ system cancer and disease of cellular proliferation showing the strongest gene ratio.',
        caption: 'Disease ontology enrichment for the same gene set, cancer related terms stand out clearly.',
      },
      {
        src: `${BASE}projects/myeloma-bmat-kegg-enrichment.jpg`,
        alt: 'Dot plot of KEGG pathway enrichment, led by the JAK-STAT signaling pathway.',
        caption: 'KEGG pathway enrichment, the JAK-STAT and TNF signaling pathways lead the list.',
      },
      {
        src: `${BASE}projects/myeloma-bmat-volcano.jpg`,
        alt: 'Volcano plot titled BMAT alone versus co-cultured, with genes including HYDIN, TRHDE, and CORO7-PAM16 labelled as significant.',
        caption: 'Differential expression in adipocytes, alone versus co-cultured with myeloma cells.',
      },
      {
        src: `${BASE}projects/myeloma-mm-go-network.jpg`,
        alt: 'Network plot of enriched Gene Ontology biological process terms in myeloma cells, centred on inflammatory response and immune effector process.',
        caption: 'Gene Ontology enrichment in myeloma cells, centred on inflammatory and immune response.',
      },
      {
        src: `${BASE}projects/myeloma-mm-go-enrichment-dotplot.jpg`,
        alt: 'Dot plot of the same Gene Ontology terms as the myeloma network plot, ranked by gene ratio.',
        caption: 'The same myeloma enrichment result, ranked as a dot plot rather than a network.',
      },
      {
        src: `${BASE}projects/myeloma-mm-bp-enrichment.jpg`,
        alt: 'Dot plot of additional biological process enrichment in myeloma cells, led by endocytosis and phagocytosis.',
        caption: 'A second biological process view, endocytosis and phagocytosis emerge as the top terms.',
      },
      {
        src: `${BASE}projects/myeloma-mm-volcano.jpg`,
        alt: 'Volcano plot titled MM alone versus co-cultured, with genes including SERF1A, GAREM1, IL10, and CFH labelled as significant.',
        caption: 'Differential expression in myeloma cells, alone versus co-cultured with adipocytes. SERF1A and GAREM1 fall furthest, IL10 and CFH rise furthest.',
      },
    ],
    links: [{ type: 'code', url: `${GITHUB_URL}/transcriptomics_project` }],
  },
  {
    id: 'diabetes-multiomics',
    kicker: 'Biostatistics · Team Project',
    title: 'Multiomics Analysis of Pancreatic Beta Cell Dysfunction',
    result: 'Prioritised lipidomic and transcriptomic features linked to diabetes progression',
    summary:
      'A statistical investigation of how pancreatic beta cells fail as type 2 diabetes progresses, integrating lipidomic and gene expression data rather than treating either in isolation.',
    bullets: [
      'Built an elastic net regression model with glmnet for feature selection and biomarker prioritisation across high dimensional data.',
      'Applied PCA and hierarchical clustering to surface patterns separating diabetes types.',
      'Correlated candidate molecular features against clinical traits including HbA1c and BMI.',
      'Designed normalisation, transformation and outlier removal steps to keep the statistics defensible.',
    ],
    stack: ['R', 'glmnet', 'PCA', 'Clustering', 'ggplot2'],
    figures: [
      {
        src: `${BASE}projects/diabetes-boxplot-outliers.png`,
        alt: 'Two boxplots comparing lipid concentration data before and after outlier removal, with the after version showing a tighter, cleaner spread.',
        caption: 'Lipid concentration data before and after outlier removal, part of cleaning the data for analysis.',
      },
      {
        src: `${BASE}projects/diabetes-lipid-distribution.png`,
        alt: 'Histogram with a density curve showing the distribution of lipid concentration, roughly bimodal in shape.',
        caption: 'Distribution of lipid concentration across the cohort, with a density curve overlaid.',
      },
      {
        src: `${BASE}projects/diabetes-qqplot.png`,
        alt: 'QQ plot of lipid concentration against a normal distribution, tracking the reference line closely except at the extreme tails.',
        caption: 'Checking normality of lipid concentration before choosing which statistical tests to apply.',
      },
      {
        src: `${BASE}projects/diabetes-lipid-violin.png`,
        alt: 'Violin plot of lipid concentration distribution split by diabetes level: no diabetes, impaired glucose tolerance, and two type 2 diabetes stages.',
        caption: 'Lipid concentration distribution across diabetes progression stages.',
      },
      {
        src: `${BASE}projects/diabetes-gene-expression-violin.png`,
        alt: 'Violin plot of gene expression distribution split by diabetes level, from the RNA sequencing data.',
        caption: 'Gene expression distribution across the same diabetes progression stages, from the RNA sequencing data.',
      },
      {
        src: `${BASE}projects/diabetes-correlation-lipid.png`,
        alt: 'Correlation matrix of age, BMI, OGTT, HbA1c, and lipid concentration, with age and HbA1c showing the strongest correlation.',
        caption: 'Correlating lipid concentration against clinical variables including age, BMI, OGTT, and HbA1c.',
      },
      {
        src: `${BASE}projects/diabetes-correlation-rnaseq.png`,
        alt: 'Correlation matrix of age, BMI, OGTT, HbA1c, and gene expression from the RNA sequencing data.',
        caption: 'The same clinical correlation check, run against the gene expression data instead.',
      },
    ],
    links: [{ type: 'code', url: `${GITHUB_URL}/Statistics-Project-Work` }],
  },
  {
    id: 'variant-calling',
    kicker: 'Genomics · Pipeline',
    title: 'Whole Exome Variant Calling Against hg38',
    result: 'SNP and indel detection with quality filtering and annotation',
    summary:
      'A variant calling pipeline for whole exome sequencing data aligned to the human reference genome, built to the standard GATK best practice workflow.',
    bullets: [
      'Aligned whole exome reads to the hg38 human reference genome.',
      'Detected SNPs and indels using GATK alongside bcftools.',
      'Applied quality filtering and variant annotation to produce a usable, interpretable call set.',
    ],
    stack: ['GATK', 'bcftools', 'samtools', 'hg38'],
    figures: [],
    links: [],
  },
  {
    id: 'portfolio',
    kicker: 'Web Application · AI',
    title: 'This Portfolio, and the Jarvis Assistant',
    result: 'A React front end and FastAPI backend running an AI assistant that answers questions about my work',
    summary:
      'The site you are reading. Built to be a working demonstration of the software side of my skill set rather than a template, including the floating assistant in the corner.',
    bullets: [
      'React and Vite front end, with an animated DNA helix built from raw Three.js geometry rather than an imported model.',
      'FastAPI backend that streams responses from the Claude API, keeping the API key server side since a static host cannot hold secrets.',
      'Deployed across two services, GitHub Pages for the front end and Render for the backend, with per IP rate limiting and a scheduled health ping.',
    ],
    stack: ['React', 'Vite', 'Three.js', 'GSAP', 'FastAPI', 'Python'],
    figures: [],
    links: [
      { type: 'code', url: `${GITHUB_URL}/Yashpatel_portfolio` },
      { type: 'live', url: 'https://yash22062002.github.io/Yashpatel_portfolio/' },
    ],
  },
];

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;

  @media (max-width: 860px) {
    gap: 4rem;
  }
`;

const Case = styled.article`
  display: grid;
  grid-template-columns: ${({ $hasFigures }) => ($hasFigures ? '1.05fr 0.95fr' : '1fr')};
  gap: 3rem;
  align-items: start;

  /* Alternating the column order keeps a long vertical run of case
     studies from reading like a single repeated template. Only applies
     when there is a second column to reorder in the first place. */
  &:nth-child(even) > div:first-child {
    order: ${({ $hasFigures }) => ($hasFigures ? 2 : 0)};
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 1.75rem;

    &:nth-child(even) > div:first-child {
      order: 0;
    }
  }
`;

const Body = styled.div`
  min-width: 0;
  ${({ $hasFigures }) => (!$hasFigures ? 'max-width: 72ch;' : '')}
`;

/* On a wide screen the gallery holds still while the methods scroll past
   it, so the current figure stays in view exactly while it is being
   explained. */
const Aside = styled.div`
  min-width: 0;

  @media (min-width: 861px) {
    position: sticky;
    top: 7rem;
  }
`;

const Kicker = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accentA};
  margin: 0 0 0.9rem;
`;

const Title = styled.h3`
  font-size: clamp(1.35rem, 2.4vw, 1.75rem);
  margin: 0 0 1.1rem;
  max-width: 26ch;
`;

const Stack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1.4rem;
`;

const Chip = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  padding: 0.3rem 0.62rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.textDim};
`;

const Result = styled.p`
  font-size: 1.02rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  margin: 0 0 1.1rem;
  padding-left: 1rem;
  border-left: 2px solid ${({ theme }) => theme.colors.accentA};
`;

const Summary = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  margin: 0 0 1.6rem;
`;

const MethodLabel = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${({ theme }) => theme.colors.textFaint};
  margin: 0 0 0.75rem;
`;

const Bullets = styled.ul`
  list-style: none;
  margin: 0 0 1.75rem;
  padding: 0;

  li {
    position: relative;
    padding-left: 1.35rem;
    margin-bottom: 0.7rem;
    color: ${({ theme }) => theme.colors.textDim};
    font-size: 0.94rem;
    line-height: 1.6;
  }

  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.62em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accentA};
    opacity: 0.75;
  }
`;

const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  padding-bottom: 2px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderStrong};
  transition: color var(--dur-fast) var(--ease),
    border-color var(--dur-fast) var(--ease);

  &:hover {
    color: ${({ theme }) => theme.colors.accentA};
    border-bottom-color: ${({ theme }) => theme.colors.accentA};
  }

  svg:last-child {
    transition: transform var(--dur-fast) var(--ease);
  }

  &:hover svg:last-child {
    transform: translateX(3px);
  }
`;

const LINK_LABEL = {
  code: 'View the code',
  live: 'Open the live site',
};

export default function Projects() {
  return (
    <section id="projects">
      <SectionIntro
        index="03"
        eyebrow="// selected_work"
        title="Projects"
        subtitle="Five pieces of work, from a genome scale comparative analysis run on an HPC cluster to the application serving this page."
      />
      <List>
        {projects.map((p) => {
          const hasFigures = p.figures.length > 0;
          return (
            <Case key={p.id} $hasFigures={hasFigures} aria-labelledby={`${p.id}-title`}>
              <Body $hasFigures={hasFigures}>
                <Reveal>
                  <Kicker>{p.kicker}</Kicker>
                  <Title id={`${p.id}-title`}>{p.title}</Title>
                  <Stack>
                    {p.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </Stack>
                  <Result>{p.result}</Result>
                  <Summary>{p.summary}</Summary>
                  <MethodLabel>What I did</MethodLabel>
                  <Bullets>
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </Bullets>
                  {p.links.length > 0 && (
                    <LinkRow>
                      {p.links.map((l) => (
                        <ProjectLink
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {l.type === 'code' ? (
                            <GithubIcon size={16} />
                          ) : (
                            <ExternalLinkIcon size={15} />
                          )}
                          {LINK_LABEL[l.type]}
                          <ArrowRightIcon size={14} />
                        </ProjectLink>
                      ))}
                    </LinkRow>
                  )}
                </Reveal>
              </Body>
              {hasFigures && (
                <Aside>
                  <Reveal delay={0.08}>
                    <ProjectGallery images={p.figures} />
                  </Reveal>
                </Aside>
              )}
            </Case>
          );
        })}
      </List>
    </section>
  );
}
