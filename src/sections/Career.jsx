import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Reveal from '../components/Reveal.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { MapPinIcon, ArrowRightIcon } from '../components/Icons.jsx';

const timeline = [
  {
    range: '2026 to Present',
    title: 'Pharmacy Assistant',
    org: 'Walmart Pharmacy',
    location: 'Toronto, ON',
    description:
      'Supporting a high volume Canadian dispensary, from prescription verification to patient facing service.',
    bullets: [
      'Maintain data accuracy and SOP compliance using Kroll and PharmaClik across a high volume dispensary.',
      'Apply systematic seven step verification protocols across prescription records, patient data, and inventory audits.',
      'Verify dosage instructions, allergy history, and prescriber details prior to dispensing.',
      'Provide patient facing support including POS transactions and insurance billing through ODB and third party plans.',
    ],
    tags: ['Kroll', 'PharmaClik', 'ODB Billing', 'SOP Compliance'],
  },
  {
    range: 'Jan 2026 to Jul 2026',
    title: 'Pharmacy Assistant',
    org: 'Pharmazone Pharmacy',
    location: 'Scarborough, ON',
    description:
      'Prescription intake, dispensing, and inventory management in a fast paced retail pharmacy.',
    bullets: [
      'Assisted the pharmacist with prescription intake, data verification, and dispensing using Fillware.',
      'Performed prescription filling and blister packaging following the seven step accuracy process.',
      'Managed inventory and ordering through PharmaClik, including stock checks and expiry monitoring.',
    ],
    tags: ['Fillware', 'PharmaClik', 'Inventory Audits'],
  },
  {
    range: 'Completed Dec 2025',
    title: 'Master of Science, Bioinformatics',
    org: 'Northeastern University',
    location: 'Toronto, ON',
    description:
      'Capstone work in comparative genomics, alongside coursework spanning statistics, machine learning, and pipeline development.',
    bullets: [
      'Built an HPC based comparative genomics pipeline detecting synonymous accelerated elements across 120 mammalian species.',
      'Served as a Program Advisory Committee member and student representative, and presented at the university Presidential Visit.',
    ],
    tags: ['Python', 'R', 'HPC / SLURM'],
  },
  {
    range: 'Jan 2022 to Dec 2023',
    title: 'Process Technician, GMP Manufacturing',
    org: 'Rakesh Health Care India Limited',
    location: 'Gandhinagar, India',
    description:
      'Manufacturing oral solid dosage forms in a regulated pharmaceutical environment.',
    bullets: [
      'Manufactured oral solid dosage forms across granulation, blending, compression, and coating, achieving zero critical deviations over 18 months.',
      'Performed in process quality testing including hardness, friability, disintegration, and weight variation checks, applying statistical process control that reduced errors by 15 percent.',
      'Trained 15 production associates on GMP principles and documentation standards, improving onboarding efficiency by 25 percent.',
    ],
    tags: ['GMP', 'CAPA', 'Batch Records'],
  },
  {
    range: 'Sep 2019 to May 2023',
    title: 'Bachelor of Pharmacy',
    org: 'L.M. College of Pharmacy',
    location: 'Ahmedabad, India',
    description: 'Foundational pharmaceutical sciences degree.',
    bullets: [],
    tags: [],
  },
];

const Layout = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2.5rem;
  align-items: start;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 2px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 780px) {
    flex-direction: row;
    overflow-x: auto;
    border-left: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
    padding-bottom: 0.5rem;
  }
`;

const TimelineButton = styled.button`
  position: relative;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.85rem 0 0.85rem 1.5rem;
  font-family: inherit;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textDim};

  &::before {
    content: '';
    position: absolute;
    left: -7px;
    top: 1.2rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme, $active }) =>
      $active ? theme.colors.accentA : theme.colors.border};
    transition: background 0.2s;
  }

  @media (max-width: 780px) {
    padding: 0 1.25rem 0.75rem;
    white-space: nowrap;
    flex-shrink: 0;

    &::before {
      left: 50%;
      top: auto;
      bottom: -2px;
      transform: translateX(-50%);
    }
  }
`;

const TRange = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.accentA};
`;

const TTitle = styled.span`
  display: block;
  font-size: 0.92rem;
  font-weight: 600;
  margin-top: 0.15rem;
`;

const Panel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 2rem;
`;

const PRange = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  color: ${({ theme }) => theme.colors.accentA};
  font-size: 0.85rem;
  margin: 0 0 0.75rem;
`;

const PTitle = styled.h3`
  margin: 0 0 0.3rem;
  font-size: 1.4rem;
`;

const POrg = styled.p`
  margin: 0 0 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const PLocation = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 0.88rem;
`;

const PDescription = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  margin: 0 0 1.25rem;
`;

const Bullets = styled.ul`
  margin: 0 0 1.5rem;
  padding-left: 1.1rem;
  color: ${({ theme }) => theme.colors.textDim};

  li {
    margin-bottom: 0.6rem;
    line-height: 1.55;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.accentA};
`;

const ScrollHint = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textDim};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;

  svg {
    animation: bob 1.6s ease-in-out infinite;
  }

  @keyframes bob {
    0%,
    100% {
      transform: rotate(90deg) translateX(0);
    }
    50% {
      transform: rotate(90deg) translateX(3px);
    }
  }
`;

export default function Career() {
  const [active, setActive] = useState(0);
  const entry = timeline[active];
  const panelRef = useRef(null);
  const lockRef = useRef(false);
  const timeoutRef = useRef(null);

  // Clear any pending lock-release timer only when the component itself
  // unmounts, not on every entry change.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // While the cursor is over the panel, the wheel steps through timeline
  // entries instead of scrolling the page. Once at the first or last
  // entry, scrolling in that direction is handed back to the page so
  // people never get stuck inside the box.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return undefined;

    function handleWheel(e) {
      const goingDown = e.deltaY > 0;
      const canAdvance = goingDown ? active < timeline.length - 1 : active > 0;
      if (!canAdvance) return;

      e.preventDefault();
      if (lockRef.current) return;

      lockRef.current = true;
      setActive((a) =>
        goingDown ? Math.min(a + 1, timeline.length - 1) : Math.max(a - 1, 0),
      );
      timeoutRef.current = setTimeout(() => {
        lockRef.current = false;
      }, 700);
    }

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [active]);

  return (
    <section id="career">
      <SectionIntro
        index="02"
        eyebrow="// career.log"
        title="Career"
        subtitle="Bridging pharmacy operations and computational biology, in Toronto and in India."
      />
      <Layout>
        <TimelineList>
          {timeline.map((t, i) => (
            <TimelineButton
              key={t.title + t.range}
              $active={i === active}
              onClick={() => setActive(i)}
            >
              <TRange>{t.range}</TRange>
              <TTitle>{t.org}</TTitle>
            </TimelineButton>
          ))}
        </TimelineList>
        <Reveal key={entry.title + entry.range}>
          <Panel ref={panelRef}>
            <PRange>{entry.range}</PRange>
            <PTitle>{entry.title}</PTitle>
            <POrg>{entry.org}</POrg>
            <PLocation>
              <MapPinIcon size={14} />
              {entry.location}
            </PLocation>
            <PDescription>{entry.description}</PDescription>
            {entry.bullets.length > 0 && (
              <Bullets>
                {entry.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </Bullets>
            )}
            {entry.tags.length > 0 && (
              <Tags>
                {entry.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
            )}
            {active < timeline.length - 1 && (
              <ScrollHint>
                <ArrowRightIcon size={13} />
                Scroll for next role
              </ScrollHint>
            )}
          </Panel>
        </Reveal>
      </Layout>
    </section>
  );
}
