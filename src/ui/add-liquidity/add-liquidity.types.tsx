type Token = {
  denom: string;
  symbol: string;
  available: number;
  imgSrc: string;
}
export interface AddLiquidityProps {
  token1: Token;
  token2: Token;
}
