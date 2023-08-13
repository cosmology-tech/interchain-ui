import { ResponseInfo } from "../add-liquidity/add-liquidity.types";
import { Coin, PoolListItemProps } from "../pool-list-item/pool-list-item.types";
import { RemoveLiquidityProps } from "../remove-liquidity/remove-liquidity.types";

export interface ManageLiquidityCardProps {
  poolAssets: PoolListItemProps["poolAssets"];
  onAddLiquidity: PoolListItemProps["onAddLiquidity"]
  totalBalanceCoins: Coin[];
  totalBalance: PoolListItemProps["totalBalance"];
  totalShares: PoolListItemProps["totalShares"];
  lpTokenBalance: PoolListItemProps["lpTokenBalance"];
  lpTokenShares: PoolListItemProps["lpTokenShares"];

  //Remove liquidity
  unbondedBalance: PoolListItemProps["unbondedBalance"]; // pass to remove liquiditypage
  unbondedShares: PoolListItemProps["unbondedShares"];// pass to remove liquiditypage
  myLiquidityCoins: Coin[];// pass to remove liquiditypage
  onRemoveLiquidity: RemoveLiquidityProps["onRemoveLiquidity"]
  onStartEarning: () => ResponseInfo
}
