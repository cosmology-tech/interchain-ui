type Token = {
  imgUrl: string;
  amount: number | string;
  symbol: string;
}
export interface RemoveLiquidityProps{
  myLiquidity: number;
  unbondedShares: string;
  token1: Token;
  token2: Token
}
