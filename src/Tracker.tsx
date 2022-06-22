import type { SphereProps } from '@react-three/cannon';
import { useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { forwardRef } from 'react';
import type { Mesh } from 'three';

const Tracker = forwardRef<Mesh, SphereProps>((props, fwdRef) => {
  const [ref, { position }] = useSphere(
    () => ({ args: [0.5], type: 'Dynamic', ...props }),
    fwdRef
  );
  useFrame(({ mouse: { x, y }, viewport: { height, width } }) =>
    position.set((x * width) / 2, (y * height) / 2, 0)
  );
  return (
    <mesh ref={ref}>
      <sphereBufferGeometry args={[0.5, 16, 16]} />
      <meshPhysicalMaterial transparent={true} opacity={0} />
    </mesh>
  );
});
export default Tracker;
