import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  GithubIcon,
  LinkedinIcon,
  DownloadIcon,
  MenuIcon,
  CloseIcon,
} from './Icons.jsx';
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '../config.js';

const NAV_LINKS = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Skills', '#skills'],
  ['Career', '#career'],
  ['Certifications', '#certifications'],
  ['Contact', '#contact'],
];

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

// The hamburger button only exists on small screens, where the inline
// links are hidden. On desktop it stays out of the way entirely.
const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.25rem;
  align-items: center;

  @media (max-width: 780px) {
    display: inline-flex;
  }
`;

const MobilePanel = styled.div`
  display: none;

  @media (max-width: 780px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(78vw, 300px);
    z-index: 60;
    padding: 5rem 1.75rem 2rem;
    background: ${({ theme }) => theme.colors.surface};
    border-left: 1px solid ${({ theme }) => theme.colors.border};
    transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
    transition: transform 0.28s ease;

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.text};
      font-size: 1.05rem;
      padding: 0.85rem 0;
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    }

    a:last-of-type {
      border-bottom: none;
    }
  }
`;

const Backdrop = styled.div`
  display: none;

  @media (max-width: 780px) {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    z-index: 55;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.4rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.25rem;
  display: inline-flex;
`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open, so the page behind
  // the panel does not drift under a swipe.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <Bar>
        <Logo href="#hero" onClick={() => setOpen(false)}>
          YP
        </Logo>
        <RightSide>
          <Links>
            {NAV_LINKS.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
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
            <MenuButton onClick={() => setOpen(true)} aria-label="Open menu">
              <MenuIcon size={22} />
            </MenuButton>
          </IconGroup>
        </RightSide>
      </Bar>

      <Backdrop $open={open} onClick={() => setOpen(false)} />
      <MobilePanel $open={open}>
        <CloseButton onClick={() => setOpen(false)} aria-label="Close menu">
          <CloseIcon size={22} />
        </CloseButton>
        {NAV_LINKS.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </MobilePanel>
    </>
  );
}
