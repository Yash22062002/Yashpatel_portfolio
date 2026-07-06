import styled from 'styled-components';
import Reveal from '../components/Reveal.jsx';

const Lead = styled.p`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.text};
  max-width: 720px;
`;

export default function About() {
  return (
    <section id="about">
      <Reveal>
        <h2>About</h2>
        <Lead>
          I am a bioinformatics scientist with a Master of Science in
          Bioinformatics from Northeastern University and a Bachelor of
          Pharmacy background that shaped how I think about translating
          molecular data into decisions that matter for patients. My work
          spans comparative genomics, RNA sequencing analysis, and applying
          machine learning to problems in drug discovery and precision
          medicine.
        </Lead>
      </Reveal>
    </section>
  );
}
