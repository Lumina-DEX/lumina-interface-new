import { Pool } from "@/types/pool";
import { create } from "zustand";

interface PoolState {
  pools: Pool[];
  update: (pools: Pool[]) => void;
}

const usePools = create<PoolState>((set) => ({
  pools: [
    {
      x: {
        tokenId: "id1",
        symbol: "mina",
        icon: "/assets/tokens/lumina.png",
        usdPrice: "1.3",
        priceChange: 1,
        dayVolume: 3.09,
        liquidity: 512345673,
      },
      y: {
        tokenId: "id2",
        symbol: "dai",
        icon: "/assets/tokens/dai.png",
        usdPrice: "0.07",
        priceChange: 1,
        dayVolume: 3.09,
        liquidity: 512345673,
      },
      lqxy: {
        tokenId: "id1id2",
        symbol: "",
        usdPrice: "0.07",
        priceChange: 1,
        dayVolume: 3.09,
        liquidity: 512345673,
      },
      liquidity: "5134567.89",
      apr: 3.09,
    },
    {
      x: {
        tokenId: "id1",
        symbol: "mina",
        icon: "/assets/tokens/lumina.png",
        usdPrice: "1.3",
        priceChange: 1,
        dayVolume: 3.09,
        liquidity: 512345673,
      },
      y: {
        tokenId: "id2",
        symbol: "dai",
        icon: "/assets/tokens/dai.png",
        usdPrice: "0.07",
        priceChange: 1,
        dayVolume: 3.09,
        liquidity: 512345673,
      },
      lqxy: {
        tokenId: "id1id2",
        symbol: "",
        usdPrice: "0.07",
        priceChange: 1,
        dayVolume: 3.09,
        liquidity: 512345673,
      },
      liquidity: "5134567.89",
      apr: 3.09,
    },
  ],
  update: (pools: Pool[]) => {
    set(() => ({ pools }));
  },
}));

export default usePools;
