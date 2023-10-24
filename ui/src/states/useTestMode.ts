import { create } from "zustand";

interface TestMode {
  state: boolean;
}

interface LoadState extends TestMode {
  update: (value: Partial<TestMode>) => void;
}

const useLoad = create<LoadState>((set) => ({
  state: false,
  update: (value: Partial<TestMode>) => {
    set((state) => ({ ...state, ...value }));
  },
}));

export default useLoad;
