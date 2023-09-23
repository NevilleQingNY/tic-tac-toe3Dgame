// Create the GridLine component
import React from 'react';

function GridLine(props) {
  return (
    <mesh {...props}>
      <boxBufferGeometry args={[0.05, 7, 0.15]} />
      <meshStandardMaterial
        metalness={1}
        roughness={0.1}
        color={0x75aec4}
      />
    </mesh>
  )
}

export default React.memo(GridLine);