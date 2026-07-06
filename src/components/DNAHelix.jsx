import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

const TURNS = 2.2;
const POINTS_PER_TURN = 50;
const RADIUS = 1.5;
const HEIGHT = 6;
const RUNG_COUNT = 14;

// Builds one backbone strand as a list of points along a vertical helix.
// phase shifts the second strand by half a turn so the two wind around
// each other, the same way the sugar phosphate backbones do in real DNA.
function buildStrandPoints(phase) {
  const total = Math.floor(TURNS * POINTS_PER_TURN);
  const pts = [];
  for (let i = 0; i <= total; i++) {
    const t = (i / total) * TURNS * Math.PI * 2;
    const y = (i / total) * HEIGHT - HEIGHT / 2;
    const x = RADIUS * Math.cos(t + phase);
    const z = RADIUS * Math.sin(t + phase);
    pts.push(new THREE.Vector3(x, y, z));
  }
  return pts;
}

function Helix() {
  const group = useRef();
  const strandA = useMemo(() => buildStrandPoints(0), []);
  const strandB = useMemo(() => buildStrandPoints(Math.PI), []);

  // A fixed, small number of rungs, evenly spaced along the strand,
  // regardless of how many points make up the curve. Alternating colors
  // echo how real base pairs come in two flavors (A-T and G-C).
  const rungs = useMemo(() => {
    const lastIndex = strandA.length - 1;
    const pairs = [];
    for (let i = 0; i < RUNG_COUNT; i++) {
      const idx = Math.round((i / (RUNG_COUNT - 1)) * lastIndex);
      pairs.push({
        points: [strandA[idx], strandB[idx]],
        color: i % 2 === 0 ? '#2DD4BF' : '#FF6B9D',
      });
    }
    return pairs;
  }, [strandA, strandB]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.15;

    // Gentle tilt that follows the pointer, eased so it never snaps.
    const targetX = state.pointer.y * 0.15;
    const targetZ = -state.pointer.x * 0.1;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.03;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.03;
  });

  return (
    <group ref={group}>
      <Line points={strandA} color="#8FA3AE" lineWidth={2} />
      <Line points={strandB} color="#8FA3AE" lineWidth={2} />
      {rungs.map((r, i) => (
        <Line key={i} points={r.points} color={r.color} lineWidth={2} />
      ))}
    </group>
  );
}

function useWebGLSupported() {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

// Shown when WebGL is unavailable, so the hero never renders blank on
// older devices or locked down browsers. Mirrors the fallback pattern
// Arun used for his neural network hero.
function HeroFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 40%, #123028 0%, #060B10 70%)',
      }}
    />
  );
}

export default function DNAHelix() {
  const webglOk = useWebGLSupported();

  if (!webglOk) return <HeroFallback />;

  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <Helix />
    </Canvas>
  );
}
