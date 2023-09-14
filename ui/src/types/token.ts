export interface Token {
  tokenId: string;
  symbol: string;
  icon?: string;
  usdPrice?: string;
  priceChange: number;
  dayVolume: number;
  liquidity: number;
}
