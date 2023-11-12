import { create } from "zustand";

export const useCount = create((set) => ({
  count: 0,
  setCount: (payload) => set((state) => ({ ...state, count: payload })),
  increment: () => set((state) => ({ ...state, count: state.count + 1 })),
  decrement: () => set((state) => ({ ...state, count: state.count - 1 })),
}));
