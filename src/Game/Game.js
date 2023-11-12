import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCount } from "./store/count";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";

const Box = (props) => {
  const meshRef = useRef(null);
  return (
    <RigidBody colliders={"hull"} restitution={0.1}>
      <mesh position={props.position} ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};

const Floor = (props) => {
  const meshRef = useRef(null);
  return (
    <>
      <mesh position={props.position} ref={meshRef}>
        <boxGeometry args={props.args} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <CuboidCollider position={props.position} args={props.args} />
    </>
  );
};

const Spawner = ({ position, setPosition }) => {
  const { viewport } = useThree();
  const meshRef = useRef(null);

  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    setPosition([x, 2, 0]);
  });

  return (
    <mesh position={position} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

const Game = () => {
  const { count, increment } = useCount();
  const [position, setPosition] = useState([0, 2, 0]);
  const [cubes, setCubes] = useState([]);

  const handleClick = () => {
    increment();
    setCubes([...cubes, { position }]);
  };

  return (
    <>
      <Canvas onClick={handleClick}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Spawner position={position} setPosition={setPosition} />
        <Suspense>
          <Physics debug>
            {cubes.map((cube, index) => {
              return <Box key={index} {...cube} />;
            })}
            <Floor position={[0, -2, 0]} args={[20, 0.5, 20]} />
          </Physics>
        </Suspense>
      </Canvas>
      <p
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          fontSize: 20,
          padding: 10,
        }}
      >
        {count}
      </p>
    </>
  );
};

export default Game;
