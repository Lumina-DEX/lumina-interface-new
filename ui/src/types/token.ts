export interface Token {
  id: string;
  symbol: string;
  icon?: string;
  usdPrice?: string;
  priceChange: number;
  dayVolume: number;
  liquidity: number;
}
