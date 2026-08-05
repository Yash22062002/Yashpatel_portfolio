import styled from 'styled-components';
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons.jsx';
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '../config.js';

const Wrap = styled.footer`
  padding: 3rem 1.5rem 2.5rem;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const IconRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.1rem;
  margin-bottom: 1.25rem;
`;

const IconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textDim};
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.accentA};
    border-color: ${({ theme }) => theme.colors.accentA};
  }
`;

const Copyright = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textDim};
  margin: 0;
`;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Wrap>
      <IconRow>
        <IconLink href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
          <GithubIcon size={17} />
        </IconLink>
        <IconLink href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <LinkedinIcon size={17} />
        </IconLink>
        <IconLink href={`mailto:${EMAIL}`} aria-label="Email">
          <MailIcon size={17} />
        </IconLink>
      </IconRow>
      <Copyright>
        Copyright {year} Yash Patel. Built with React, Three.js and GSAP.
      </Copyright>
    </Wrap>
  );
}
