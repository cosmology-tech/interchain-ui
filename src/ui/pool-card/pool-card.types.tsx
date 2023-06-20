import { PoolNameProps } from "../pool/components/pool-name/pool-name.types";
export interface PoolCardProps extends PoolNameProps {
  id: string;
  poolLiquidity: number;
  fees: number;
  apr: number;
  yourLiquidity: number;
  bonded: number;
}
