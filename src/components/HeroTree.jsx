import { useEffect, useRef, useState } from 'react';

// A small seeded pseudo random generator. Given the same seed it always
// produces the same sequence, so the shape below is genuinely built by
// this recursive algorithm, but every visitor sees the identical tree,
// the same reasoning a signature mark needs consistency to be
// recognized rather than reshuffled on every visit.
function mulberry32(seed) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SEED = 20260816; // fixed on purpose, do not randomize per load
const CENTER = 200;
const ROOT_COUNT = 7;
const MAX_DEPTH = 5;

function buildTree() {
  const rand = mulberry32(SEED);
  const branches = [];

  function grow(x, y, angle, len, depth) {
    const x2 = x + len * Math.cos(angle);
    const y2 = y + len * Math.sin(angle);
    const isTip = depth === MAX_DEPTH;
    branches.push({ x1: x, y1: y, x2, y2, depth, isTip });
    if (isTip) return;
    const kids = depth < 2 ? 3 : rand() < 0.5 ? 2 : 3;
    const spread = 0.85;
    for (let i = 0; i < kids; i++) {
      const offset = (i - (kids - 1) / 2) * (spread / kids) + (rand() - 0.5) * 0.18;
      grow(x2, y2, angle + offset, len * 0.74, depth + 1);
    }
  }

  for (let r = 0; r < ROOT_COUNT; r++) {
    const angle = (r / ROOT_COUNT) * Math.PI * 2 + (rand() - 0.5) * 0.12;
    grow(CENTER, CENTER, angle, 44, 0);
  }

  branches.sort((a, b) => a.depth - b.depth);
  return branches;
}

// Computed once at module load, not on every render, since it is a pure
// function of a fixed seed, so this never changes between visits.
const BRANCHES = buildTree();
const TIPS = BRANCHES.filter((b) => b.isTip);

const TEAL = '#2DD4BF';
const CORAL = '#FF7A6B';
const DIM_TEAL = 'rgba(45, 212, 191, 0.35)';

function segmentLength(b) {
  return Math.hypot(b.x2 - b.x1, b.y2 - b.y1);
}

// Grows in once on mount, then settles and stays still. No perpetual
// looping motion, and no animation at all if the visitor's system asks
// for reduced motion, in which case the finished tree simply appears.
export default function HeroTree() {
  const [grown, setGrown] = useState(false);
  const instantRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    instantRef.current = reduced;
    if (reduced) {
      setGrown(true);
      return undefined;
    }
    const timer = setTimeout(() => setGrown(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const instant = instantRef.current;
  const show = grown || instant;

  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400" aria-hidden="true">
      {BRANCHES.map((b, i) => {
        const len = segmentLength(b);
        const delay = instant ? 0 : b.depth * 90;
        return (
          <line
            key={`b-${i}`}
            x1={b.x1}
            y1={b.y1}
            x2={b.x2}
            y2={b.y2}
            stroke={b.depth < 2 ? TEAL : DIM_TEAL}
            strokeWidth={Math.max(0.6, 2.2 - b.depth * 0.35)}
            strokeLinecap="round"
            style={{
              strokeDasharray: len,
              strokeDashoffset: show ? 0 : len,
              transition: instant ? 'none' : `stroke-dashoffset 0.6s ease-out ${delay}ms`,
            }}
          />
        );
      })}
      {TIPS.map((b, i) => {
        const isCoral = i % 6 === 0;
        const delay = instant ? 0 : b.depth * 90 + 500;
        return (
          <circle
            key={`t-${i}`}
            cx={b.x2}
            cy={b.y2}
            r={show ? (isCoral ? 4.5 : 3.2) : 0}
            fill={isCoral ? CORAL : TEAL}
            opacity={show ? (isCoral ? 0.95 : 0.85) : 0}
            style={{
              transition: instant
                ? 'none'
                : `r 0.35s ease-out ${delay}ms, opacity 0.35s ease-out ${delay}ms`,
            }}
          />
        );
      })}
    </svg>
  );
}
