import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const ROLES = [
  'Bioinformatics Scientist',
  'Computational Biologist',
  'Genomics Pipeline Developer',
];

export default function TypedRole() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ROLES,
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 1800,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  return <span ref={el} />;
}
