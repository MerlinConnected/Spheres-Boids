import type { SphereProps, Triplet } from '@react-three/cannon';
import { useBox, useSpring } from '@react-three/cannon';
import { forwardRef, useEffect, useRef, useState } from 'react';
import type { Mesh } from 'three';
import Tracker from './Tracker';

const SmallSpheres = forwardRef<Mesh, SphereProps>((props, fwdRef) => {
  const args: Triplet = [0.42, 0.42, 0.42];
  const [ref] = useBox(
    () => ({
      args,
      linearDamping: 0.7,
      mass: 2,
      ...props
    }),
    fwdRef
  );
  return (
    <mesh ref={ref}>
      <sphereBufferGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial />
    </mesh>
  );
});

const SmallBalls = () => {
  const [box, ball, api] = useSpring(useRef<Mesh>(null), useRef<Mesh>(null), {
    damping: 20,
    restLength: 20,
    stiffness: 300
  });
  const [isDown, setIsDown] = useState(false);

  useEffect(() => api.setRestLength(isDown ? 0 : 2), [isDown]);

  return (
    <group
      onPointerDown={() => setIsDown(true)}
      onPointerUp={() => setIsDown(false)}
    >
      <SmallSpheres ref={box} position={[1, 0, 0]} />
      <Tracker ref={ball} position={[-1, 0, 0]} />
    </group>
  );
};

export { SmallSpheres, SmallBalls };
