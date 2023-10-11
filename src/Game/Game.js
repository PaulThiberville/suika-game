import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { KeyboardControls } from "./components/KeyboardControls";
import { useControls } from "./store/controls";

const Box = (props) => {
  const meshRef = useRef(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => (meshRef.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const Game = () => {
  const { controls } = useControls();
  const [position, setPosition] = useState([0, 0, 0]);

  useEffect(() => {
    const { left, right, forward, back } = controls.state;
    if (left)
      setPosition((position) => [position[0] - 0.1, position[1], position[2]]);
    if (right)
      setPosition((position) => [position[0] + 0.1, position[1], position[2]]);
    if (forward)
      setPosition((position) => [position[0], position[1] + 0.1, position[2]]);
    if (back)
      setPosition((position) => [position[0], position[1] - 0.1, position[2]]);
  }, [controls]);

  return (
    <>
      <KeyboardControls />
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <group position={position}>
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </group>
      </Canvas>
    </>
  );
};

export default Game;
