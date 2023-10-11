import { create } from "zustand";

export const useControls = create((set) => ({
  controls: {
    name: "",
    pressed: false,
    state: {
      forward: false,
      back: false,
      left: false,
      right: false,
      jump: false,
    },
  },
  setControls: (payload) => set((state) => ({ ...state, controls: payload })),
}));
