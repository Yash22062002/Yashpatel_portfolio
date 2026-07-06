import styled from 'styled-components';
import Reveal from '../components/Reveal.jsx';

const List = styled.ol`
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
  border-left: 2px solid ${({ theme }) => theme.colors.border};
`;

const Item = styled.li`
  position: relative;
  padding: 0 0 2.5rem 2rem;

  &::before {
    content: '';
    position: absolute;
    left: -7px;
    top: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accentA};
  }
`;

const When = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.accentA};
`;

const What = styled.h3`
  margin: 0.3rem 0;
  font-size: 1.1rem;
`;

const Where = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 0.95rem;
`;

const timeline = [
  {
    when: 'Completed December 2025',
    what: 'MSc in Bioinformatics',
    where: 'Northeastern University, Toronto',
  },
  {
    when: 'August 2022 to November 2023',
    what: 'GMP Manufacturing, Solid Oral Dosage',
    where: 'Rakesh Health Care India Limited, Gandhinagar',
  },
  {
    when: 'Earlier',
    what: 'Bachelor of Pharmacy',
    where: 'L.M. College of Pharmacy, Ahmedabad',
  },
];

export default function Career() {
  return (
    <section id="career">
      <Reveal>
        <h2>Career</h2>
      </Reveal>
      <List>
        {timeline.map((entry, i) => (
          <Reveal key={entry.what} delay={i * 0.05}>
            <Item>
              <When>{entry.when}</When>
              <What>{entry.what}</What>
              <Where>{entry.where}</Where>
            </Item>
          </Reveal>
        ))}
      </List>
    </section>
  );
}
