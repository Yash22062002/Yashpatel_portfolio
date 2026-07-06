import styled from 'styled-components';

const Wrap = styled.footer`
  padding: 2.5rem 1.5rem;
  text-align: center;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textDim};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Wrap>
      Copyright {year} Yash Patel. Built with React, Three.js and GSAP.
    </Wrap>
  );
}
