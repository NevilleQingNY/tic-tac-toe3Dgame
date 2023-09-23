import React from 'react';
import { DoubleSide } from "three";
import SphereMesh from './SphereMesh';
import CubeMesh from './CubeMesh';

function GridBox({ shape, position, handleClick, winner }) {
  return (
    <>
      {
        shape === "Sphere" ? 
        <SphereMesh position={position} winner={winner}/>
        :  shape === "Cube" ?
        <CubeMesh position={position} winner={winner}/>
        : null
      }

      <mesh position={position} onPointerDown={e => handleClick(e)}>
        <planeBufferGeometry args={[2.5, 2.5]} />
        <meshLambertMaterial
          transparent
          opacity={0}
          depthWrite={false}
          side={DoubleSide}
        />
      </mesh>
    </>
  );
}

export default React.memo(GridBox);