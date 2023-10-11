import { KeyboardControls as RDKeyboardControls } from "@react-three/drei";
import { useControls } from "../store/controls";

const controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

const map = [
  { name: controls.forward, keys: ["ArrowUp", "KeyW"] },
  { name: controls.back, keys: ["ArrowDown", "KeyS"] },
  { name: controls.left, keys: ["ArrowLeft", "KeyA"] },
  { name: controls.right, keys: ["ArrowRight", "KeyD"] },
  { name: controls.jump, keys: ["Space"] },
];

export const KeyboardControls = ({ children }) => {
  const { setControls } = useControls();

  const onChange = (name, pressed, state) => {
    setControls({ name, pressed, state });
  };

  return (
    <RDKeyboardControls map={map} onChange={onChange}>
      {children}
    </RDKeyboardControls>
  );
};
