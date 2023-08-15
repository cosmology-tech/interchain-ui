import { ResponseInfo } from "../add-liquidity/add-liquidity.types";
import {
  Coin,
  PoolDetailProps,
  PoolListItemProps,
} from "../pool-list-item/pool-list-item.types";

export interface OnRemoveLiquidityDetail {}
export interface RemoveLiquidityProps {
  unbondedBalance: PoolDetailProps["unbondedBalance"];
  unbondedShares: PoolDetailProps["unbondedShares"];
  myLiquidityCoins: Coin[];
  onRemoveLiquidity: () => ResponseInfo;
  onChange: (progress: number) => void;
}
