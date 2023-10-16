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
        id: "id1",
        symbol: "mina1",
        icon: "/assets/tokens/lumina.png",
        usdPrice: "1.3",
        priceChange: 3.09,
        dayVolume: 3342156,
        liquidity: 512345673,
      },
      y: {
        id: "id2",
        symbol: "dai2",
        icon: "/assets/tokens/dai.png",
        usdPrice: "0.07",
        priceChange: 3.09,
        dayVolume: 3342156,
        liquidity: 512345673,
      },
      lqxy: {
        id: "id1id2",
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
        id: "id3",
        symbol: "mina3",
        icon: "/assets/tokens/dai.png",
        usdPrice: "0.07",
        priceChange: 3.09,
        dayVolume: 3342156,
        liquidity: 512345673,
      },
      y: {
        id: "id4",
        symbol: "mina4",
        icon: "/assets/tokens/dai.png",
        usdPrice: "0.07",
        priceChange: 3.09,
        dayVolume: 3342156,
        liquidity: 512345673,
      },
      lqxy: {
        id: "id1id2",
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
        id: "id5",
        symbol: "mina5",
        icon: "/assets/tokens/dai.png",
        usdPrice: "0.07",
        priceChange: 3.09,
        dayVolume: 3342156,
        liquidity: 512345673,
      },
      y: {
        id: "id6",
        symbol: "dai6",
        icon: "/assets/tokens/dai.png",
        usdPrice: "0.07",
        priceChange: 3.09,
        dayVolume: 3342156,
        liquidity: 512345673,
      },
      lqxy: {
        id: "id1id2",
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
