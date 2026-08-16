import styled from 'styled-components';
import Reveal from '../components/Reveal.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { BadgeIcon, UsersIcon } from '../components/Icons.jsx';

const certifications = [
  {
    title: 'GLP Fundamentals',
    org: 'BioTalent Canada',
    when: 'January 2025',
  },
  {
    title: 'Unconscious Bias in Medicine',
    org: 'Stanford University School of Medicine',
    when: '2023',
  },
  {
    title: 'Python for Non-Programmers',
    org: 'LinkedIn Learning',
    when: 'July 2023',
  },
];

const leadership = [
  {
    title: 'Program Advisory Committee Member, Student Representative',
    org: 'Northeastern University',
    when: 'October 2024 to June 2026',
  },
  {
    title: 'Project Presenter, Presidential Visit',
    org: 'Northeastern University',
    when: 'October 2025',
  },
  {
    title: 'Student Volunteer',
    org: 'MaRS Discovery District, Toronto',
    when: 'May 2025',
  },
];

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ColumnHeading = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textDim};
  margin: 0 0 1.1rem;
`;

const Entry = styled.div`
  display: flex;
  gap: 0.9rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const IconWrap = styled.div`
  color: ${({ theme }) => theme.colors.accentA};
  flex-shrink: 0;
  margin-top: 0.1rem;
`;

const EntryTitle = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
`;

const EntryMeta = styled.p`
  margin: 0.2rem 0 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

export default function Certifications() {
  return (
    <section id="certifications">
      <SectionIntro
        index="05"
        eyebrow="// certifications.yaml"
        title="Certifications and Leadership"
        subtitle="Credentials and community involvement alongside the coursework and pipelines."
      />
      <Columns>
        <div>
          <ColumnHeading>Certifications</ColumnHeading>
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.03}>
              <Entry>
                <IconWrap>
                  <BadgeIcon size={18} />
                </IconWrap>
                <div>
                  <EntryTitle>{c.title}</EntryTitle>
                  <EntryMeta>{c.org} · {c.when}</EntryMeta>
                </div>
              </Entry>
            </Reveal>
          ))}
        </div>
        <div>
          <ColumnHeading>Leadership and Involvement</ColumnHeading>
          {leadership.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.03}>
              <Entry>
                <IconWrap>
                  <UsersIcon size={18} />
                </IconWrap>
                <div>
                  <EntryTitle>{l.title}</EntryTitle>
                  <EntryMeta>{l.org} · {l.when}</EntryMeta>
                </div>
              </Entry>
            </Reveal>
          ))}
        </div>
      </Columns>
    </section>
  );
}
