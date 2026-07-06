import styled from 'styled-components';
import Reveal from '../components/Reveal.jsx';

const Wrap = styled.div`
  text-align: center;
`;

const Email = styled.a`
  display: inline-block;
  margin-top: 1rem;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.accentA};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
`;

export default function Contact() {
  return (
    <section id="contact">
      <Reveal>
        <Wrap>
          <h2>Get in touch</h2>
          <p>Open to bioinformatics and computational biology roles.</p>
          <Email href="mailto:patel.yashm@northeastern.edu">
            patel.yashm@northeastern.edu
          </Email>
        </Wrap>
      </Reveal>
    </section>
  );
}
