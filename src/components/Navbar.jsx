import styled from 'styled-components';

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

  @media (max-width: 640px) {
    display: none;
  }
`;

export default function Navbar() {
  return (
    <Bar>
      <Logo href="#hero">YP</Logo>
      <Links>
        <a href="#about">About</a>
        <a href="#career">Career</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </Links>
    </Bar>
  );
}
