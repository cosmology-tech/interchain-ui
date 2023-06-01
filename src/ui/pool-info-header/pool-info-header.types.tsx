import { PoolNameProps } from "../pool/components/pool-name/pool-name.types";
export interface PoolInfoHeaderProps extends PoolNameProps {
  poolLiquidity: number;
  swapFee: number;
  volume24H: number;
}
