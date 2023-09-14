import { Token } from "./token";

export interface Pool {
  x: Token;
  y: Token;
  lqxy: Token;
  liquidity: string;
  apr: number;
}
