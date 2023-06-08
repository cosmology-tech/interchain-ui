export interface ManageLiquidityCardProps {
  token1: {
    name: string;
    imgSrc: string;
    asset: number;
  };
  token2: {
    name: string;
    imgSrc: string;
    asset: number;
  };
  pollBalance: number;
  poolShares: number;
  lpTokens: number;
  tokenShares: number;
}
