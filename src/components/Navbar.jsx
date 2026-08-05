import styled from 'styled-components';
import { GithubIcon, LinkedinIcon, DownloadIcon } from './Icons.jsx';
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '../config.js';

const Bar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  backdrop-filter: blur(8px);
  background: rgba(6, 11, 16, 0.6);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Logo = styled.a`
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const Links = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.textDim};
    padding-bottom: 2px;
    border-bottom: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.accentA};
    border-bottom-color: ${({ theme }) => theme.colors.accentA};
  }

  @media (max-width: 780px) {
    display: none;
  }
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding-left: 1.5rem;
  border-left: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 780px) {
    padding-left: 0;
    border-left: none;
  }
`;

const IconLink = styled.a`
  color: ${({ theme }) => theme.colors.textDim};
  display: inline-flex;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.accentA};
  }
`;

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accentA};
  color: #05100e;
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: none;

  @media (max-width: 480px) {
    padding: 0.5rem;

    .label {
      display: none;
    }
  }
`;

export default function Navbar() {
  return (
    <Bar>
      <Logo href="#hero">YP</Logo>
      <RightSide>
        <Links>
          <a href="#about">About</a>
          <a href="#career">Career</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#certifications">Certifications</a>
          <a href="#contact">Contact</a>
        </Links>
        <IconGroup>
          <IconLink href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon size={18} />
          </IconLink>
          <IconLink href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon size={18} />
          </IconLink>
          <ResumeButton href={RESUME_URL} download>
            <DownloadIcon size={14} />
            <span className="label">Resume</span>
          </ResumeButton>
        </IconGroup>
      </RightSide>
    </Bar>
  );
}
