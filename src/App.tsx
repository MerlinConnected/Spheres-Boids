import { Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, SSAO, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { BigBalls } from './BigBalls';
import { SmallBalls } from './SmallBalls';

export default () => {
  return (
    <>
      <Canvas camera={{ fov: 20, position: [0, 0, 20] }}>
        <color attach='background' args={['#171720']} />
        <Physics gravity={[0, 0, 0]} allowSleep={false}>
          <BigBalls />
          <BigBalls />
          <BigBalls />
          <BigBalls />
          <BigBalls />
          <BigBalls />
          <BigBalls />
          <BigBalls />
          <BigBalls />
          <BigBalls />
          <BigBalls />
          <SmallBalls />
          <SmallBalls />
          <SmallBalls />
          <SmallBalls />
          <SmallBalls />
          <SmallBalls />
          <SmallBalls />
          <SmallBalls />
          <SmallBalls />
          <SmallBalls />
          <SmallBalls />
          <SmallBalls />
        </Physics>
        {/* Begin Lights */}
        <directionalLight position={[0, 5, -4]} intensity={1} />
        <directionalLight position={[0, -15, -0]} intensity={1} color='white' />
        <Environment preset='dawn' />
        {/* End Lights */}
        <EffectComposer multisampling={0}>
          <SSAO
            samples={5}
            radius={5}
            intensity={30}
            luminanceInfluence={0.5}
            color='darkblue'
          />
          <SSAO
            samples={5}
            radius={5}
            intensity={20}
            luminanceInfluence={0.5}
            color='darkblue'
          />
          <Noise premultiply blendFunction={BlendFunction.SCREEN} />
        </EffectComposer>
      </Canvas>
    </>
  );
};
