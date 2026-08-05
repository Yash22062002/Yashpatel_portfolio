import styled from 'styled-components';
import Reveal from '../components/Reveal.jsx';
import { MailIcon, LinkedinIcon, GithubIcon, MapPinIcon, ArrowRightIcon } from '../components/Icons.jsx';
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from '../config.js';

const cards = [
  {
    icon: MailIcon,
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'in/yash-patel-network',
    href: LINKEDIN_URL,
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'Yash22062002',
    href: GITHUB_URL,
  },
  {
    icon: MapPinIcon,
    label: 'Location',
    value: 'Toronto, ON, Canada',
    href: null,
  },
];

const CenterWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem;
`;

const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: ${({ theme }) => theme.font.mono};
  color: ${({ theme }) => theme.colors.accentA};
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  margin: 0 0 0.75rem;

  &::before {
    content: '';
    width: 22px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accentA};
  }
`;

const Heading = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  margin: 0 0 0.6rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.1rem;
  margin-top: 2.5rem;
  max-width: 900px;
  margin-inline: auto;
  text-align: left;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
`;

const ClickableCard = styled.a`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentA};
  }

  &:hover svg:last-child {
    transform: translateX(2px);
  }
`;

const IconWrap = styled.div`
  color: ${({ theme }) => theme.colors.accentA};
  flex-shrink: 0;
`;

const TextWrap = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

const Label = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textDim};
`;

const Value = styled.p`
  margin: 0.2rem 0 0;
  font-size: 0.92rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  max-width: 480px;
  margin: 0.75rem auto 0;
`;

export default function Contact() {
  return (
    <section id="contact">
      <Reveal>
        <CenterWrap>
          <Eyebrow>// contact.sh</Eyebrow>
          <Heading>Let's talk</Heading>
          <Subtitle>
            Open to bioinformatics, computational biology, and health data
            roles, based in Toronto and open to remote work.
          </Subtitle>
        </CenterWrap>
      </Reveal>
      <Grid>
        {cards.map((c) => {
          const Icon = c.icon;
          const content = (
            <>
              <IconWrap>
                <Icon size={20} />
              </IconWrap>
              <TextWrap>
                <Label>{c.label}</Label>
                <Value>{c.value}</Value>
              </TextWrap>
            </>
          );

          return (
            <Reveal key={c.label}>
              {c.href ? (
                <ClickableCard href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {content}
                  <ArrowRightIcon size={15} />
                </ClickableCard>
              ) : (
                <Card>{content}</Card>
              )}
            </Reveal>
          );
        })}
      </Grid>
    </section>
  );
}
