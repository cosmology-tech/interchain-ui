import { ResponseInfo } from "../add-liquidity/add-liquidity.types";
import {
  Coin,
  PoolListItemProps,
} from "../pool-list-item/pool-list-item.types";

export interface OnRemoveLiquidityDetail {}
export interface RemoveLiquidityProps {
  unbondedBalance: PoolListItemProps["unbondedBalance"];
  unbondedShares: PoolListItemProps["unbondedShares"];
  myLiquidityCoins: Coin[];
  onRemoveLiquidity: (removedPercent: number) => ResponseInfo;
  onClose?: () => void;
}
