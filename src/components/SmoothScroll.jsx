import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Wraps the page with Lenis smooth scrolling. Children render normally,
// this component only manages the scroll behavior in the background.
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Momentum scrolling is itself motion, and it is the kind that can
    // trigger nausea for people who are sensitive to it. If the system
    // asks for reduced motion, leave the browser's native scrolling
    // completely alone.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frame;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return children;
}
