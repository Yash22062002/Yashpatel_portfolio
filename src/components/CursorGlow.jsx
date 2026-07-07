import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Glow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 360px;
  height: 360px;
  margin-left: -180px;
  margin-top: -180px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(45, 212, 191, 0.18) 0%,
    rgba(45, 212, 191, 0) 70%
  );
  pointer-events: none;
  z-index: 1;
  will-change: transform;

  /* Skip this on touch devices, there's no cursor to follow there. */
  @media (hover: none), (pointer: coarse) {
    display: none;
  }
`;

export default function CursorGlow() {
  const ref = useRef(null);
  const target = useRef({ x: -500, y: -500 });
  const current = useRef({ x: -500, y: -500 });

  useEffect(() => {
    function handleMove(e) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    }
    window.addEventListener('mousemove', handleMove);

    let frame;
    function animate() {
      // Ease the glow toward the real cursor position each frame, rather
      // than snapping to it, so it reads as a soft trail instead of a
      // rigid pointer clone.
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <Glow ref={ref} />;
}
