import { Token } from "@/types/token";
import { create } from "zustand";

interface TokenState {
  tokens: Token[];
  update: (tokens: Token[]) => void;
}

const useTokens = create<TokenState>((set) => ({
  tokens: [
    {
      tokenId: "id1",
      symbol: "mina1",
      icon: "/assets/tokens/lumina.png",
      usdPrice: "1.3",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id2",
      symbol: "dai2",
      icon: "/assets/tokens/dai.png",
      usdPrice: "0.07",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id3",
      symbol: "mina3",
      icon: "/assets/tokens/dai.png",
      usdPrice: "0.07",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id4",
      symbol: "mina4",
      icon: "/assets/tokens/dai.png",
      usdPrice: "0.07",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id5",
      symbol: "mina5",
      icon: "/assets/tokens/dai.png",
      usdPrice: "0.07",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id6",
      symbol: "dai6",
      icon: "/assets/tokens/dai.png",
      usdPrice: "0.07",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id7",
      symbol: "dai7",
      icon: "/assets/tokens/dai.png",
      usdPrice: "0.07",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id8",
      symbol: "dai8",
      icon: "/assets/tokens/dai.png",
      usdPrice: "0.07",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id9",
      symbol: "dai9",
      icon: "/assets/tokens/dai.png",
      usdPrice: "0.07",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id10",
      symbol: "dai10",
      icon: "/assets/tokens/dai.png",
      usdPrice: "0.07",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id11",
      symbol: "dai11",
      icon: "/assets/tokens/dai.png",
      usdPrice: "0.07",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id12",
      symbol: "mina12",
      icon: "/assets/tokens/lumina.png",
      usdPrice: "1.3",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id13",
      symbol: "mina13",
      icon: "/assets/tokens/lumina.png",
      usdPrice: "1.3",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id14",
      symbol: "mina14",
      icon: "/assets/tokens/lumina.png",
      usdPrice: "1.3",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
    {
      tokenId: "id15",
      symbol: "mina15",
      icon: "/assets/tokens/lumina.png",
      usdPrice: "1.3",
      priceChange: 3.09,
      dayVolume: 3342156,
      liquidity: 512345673,
    },
  ],
  update: (tokens: Token[]) => {
    set(() => ({ tokens }));
  },
}));

export default useTokens;
