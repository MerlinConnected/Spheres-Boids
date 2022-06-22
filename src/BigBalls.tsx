import type { SphereProps, Triplet } from '@react-three/cannon';
import { useBox, useSpring } from '@react-three/cannon';
import { forwardRef, useEffect, useRef, useState } from 'react';
import type { Mesh } from 'three';
import Tracker from './Tracker';

const BigSpheres = forwardRef<Mesh, SphereProps>((props, fwdRef) => {
  const args: Triplet = [1, 1, 1];
  const [ref] = useBox(
    () => ({
      args,
      linearDamping: 0.99,
      mass: 3,
      ...props
    }),
    fwdRef
  );
  return (
    <mesh ref={ref}>
      <sphereBufferGeometry args={[0.55, 32, 32]} />
      <meshStandardMaterial />
    </mesh>
  );
});

const BigBalls = () => {
  const [box, ball, api] = useSpring(useRef<Mesh>(null), useRef<Mesh>(null), {
    damping: 20,
    restLength: 1,
    stiffness: 500
  });
  const [isDown, setIsDown] = useState(false);

  useEffect(() => api.setRestLength(isDown ? 0 : 2), [isDown]);

  return (
    <group
      onPointerDown={() => setIsDown(true)}
      onPointerUp={() => setIsDown(false)}
    >
      <BigSpheres ref={box} position={[1, 0, 0]} />
      <Tracker ref={ball} position={[-1, 0, 0]} />
    </group>
  );
};

export { BigBalls, BigSpheres };
