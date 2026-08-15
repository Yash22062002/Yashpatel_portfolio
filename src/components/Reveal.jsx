import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fades and lifts its children into view as they enter the viewport.
export default function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // GSAP writes inline styles, so the global reduced motion CSS rule
    // cannot hold it back. The check has to happen here, otherwise
    // someone who asked their system for less movement still gets the
    // full fade and lift on every block.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}
