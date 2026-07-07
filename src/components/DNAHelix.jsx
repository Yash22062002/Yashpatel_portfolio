import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TURNS = 2.3;
const POINTS_PER_STRAND = 160;
const RADIUS = 1.5;
const HEIGHT = 6;
const RUNG_COUNT = 16;
const BASE_TILT_Z = THREE.MathUtils.degToRad(11); // the "leans slightly right" tilt

// Colors read bottom to top, matching the reference image: cyan at the
// base, through purple, to pink at the top.
const GRADIENT_STOPS = [
  new THREE.Color('#22d3ee'),
  new THREE.Color('#8b5cf6'),
  new THREE.Color('#d946ef'),
  new THREE.Color('#f472b6'),
];

const RUNG_COLOR = new THREE.Color('#fb7185');

function colorAtHeight(t) {
  const segments = GRADIENT_STOPS.length - 1;
  const scaled = Math.min(Math.max(t, 0), 1) * segments;
  const idx = Math.min(Math.floor(scaled), segments - 1);
  const localT = scaled - idx;
  return GRADIENT_STOPS[idx].clone().lerp(GRADIENT_STOPS[idx + 1], localT);
}

function buildStrandPoints(phase) {
  const pts = [];
  for (let i = 0; i <= POINTS_PER_STRAND; i++) {
    const frac = i / POINTS_PER_STRAND;
    const t = frac * TURNS * Math.PI * 2;
    const y = frac * HEIGHT - HEIGHT / 2;
    pts.push({
      position: new THREE.Vector3(RADIUS * Math.cos(t + phase), y, RADIUS * Math.sin(t + phase)),
      t: frac,
    });
  }
  return pts;
}

// A ball-cluster strand: two InstancedMesh spheres per curve point, one
// exactly on the path and one slightly jittered off it, to read as a
// clustered molecular surface rather than a smooth clean tube.
function Strand({ phase }) {
  const meshRef = useRef();
  const points = useMemo(() => buildStrandPoints(phase), [phase]);
  const geometry = useMemo(() => new THREE.SphereGeometry(0.055, 8, 8), []);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.15 }),
    [],
  );
  const count = points.length * 2;

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    let i = 0;

    points.forEach(({ position, t }) => {
      const color = colorAtHeight(t);

      dummy.position.copy(position);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color);
      i += 1;

      // A jittered companion ball for a clustered, organic look.
      dummy.position.set(
        position.x + (Math.random() - 0.5) * 0.09,
        position.y + (Math.random() - 0.5) * 0.09,
        position.z + (Math.random() - 0.5) * 0.09,
      );
      dummy.scale.setScalar(0.7);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color);
      i += 1;
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [points]);

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} frustumCulled={false} />
  );
}

// Base pair rungs, small ball bridges connecting the two strands at
// regular heights, colored in the coral tone from the reference image.
function Rungs({ strandA, strandB }) {
  const meshRef = useRef();
  const geometry = useMemo(() => new THREE.SphereGeometry(0.05, 8, 8), []);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.15 }),
    [],
  );
  const ballsPerRung = 5;
  const count = RUNG_COUNT * ballsPerRung;

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    const lastIndex = strandA.length - 1;
    let i = 0;

    for (let r = 0; r < RUNG_COUNT; r++) {
      const idx = Math.round((r / (RUNG_COUNT - 1)) * lastIndex);
      const a = strandA[idx].position;
      const b = strandB[idx].position;

      for (let k = 0; k < ballsPerRung; k++) {
        const localT = k / (ballsPerRung - 1);
        dummy.position.lerpVectors(a, b, localT);
        dummy.scale.setScalar(0.85);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, RUNG_COLOR);
        i += 1;
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [strandA, strandB]);

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} frustumCulled={false} />
  );
}

function Helix({ dragState }) {
  const group = useRef();
  const strandA = useMemo(() => buildStrandPoints(0), []);
  const strandB = useMemo(() => buildStrandPoints(Math.PI), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const drag = dragState.current;

    if (drag.dragging) {
      group.current.rotation.y += drag.deltaX * 0.006;
      group.current.rotation.x += drag.deltaY * 0.006;
      drag.deltaX = 0;
      drag.deltaY = 0;
    } else {
      group.current.rotation.y += delta * 0.15;
    }

    group.current.rotation.x = THREE.MathUtils.clamp(group.current.rotation.x, -0.6, 0.6);
  });

  return (
    <group ref={group} rotation={[0, 0, BASE_TILT_Z]}>
      <Strand phase={0} />
      <Strand phase={Math.PI} />
      <Rungs strandA={strandA} strandB={strandB} />
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
// older devices or locked down browsers.
function HeroFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 40%, #3b1f4d 0%, #060B10 70%)',
      }}
    />
  );
}

export default function DNAHelix() {
  const webglOk = useWebGLSupported();
  const containerRef = useRef(null);
  const dragState = useRef({ dragging: false, lastX: 0, lastY: 0, deltaX: 0, deltaY: 0 });

  // Click and drag support, tracked with plain DOM pointer events so the
  // drag keeps working even if the cursor slides off the canvas mid-drag.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handlePointerDown(e) {
      dragState.current.dragging = true;
      dragState.current.lastX = e.clientX;
      dragState.current.lastY = e.clientY;
    }
    function handlePointerMove(e) {
      const drag = dragState.current;
      if (!drag.dragging) return;
      drag.deltaX = e.clientX - drag.lastX;
      drag.deltaY = e.clientY - drag.lastY;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
    }
    function handlePointerUp() {
      dragState.current.dragging = false;
    }

    el.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      el.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  if (!webglOk) return <HeroFallback />;

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={1.1} />
        <pointLight position={[-5, -3, 4]} intensity={0.5} color="#a855f7" />
        <Helix dragState={dragState} />
      </Canvas>
    </div>
  );
}
