import { Token } from "@/types/token";
import { create } from "zustand";

interface TokenState {
  tokens: Token[];
  update: (tokens: Token[]) => void;
}

const useTokens = create<TokenState>((set) => ({
  tokens: [],
  update: (tokens: Token[]) => {
    set(() => ({ tokens }));
  },
}));

export default useTokens;
