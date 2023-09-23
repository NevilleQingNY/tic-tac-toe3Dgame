import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DoubleSide } from "three";

function CubeMesh({ position, winner }) {
  const ref = useRef();

  useFrame(() => {
    if (winner === null || winner === "Cube") {
      if (ref.current) {
        ref.current.rotation.x += 0.01;
      }
    }
  });

  return (
    <>
      <mesh position={position} ref={ref}>
        <boxBufferGeometry />
        <meshStandardMaterial
          color="#40a9c9"
          side={DoubleSide}
        />
      </mesh>
    </>
  );
}

export default React.memo(CubeMesh);