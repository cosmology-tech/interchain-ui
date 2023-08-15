import { ResponseInfo } from "../add-liquidity/add-liquidity.types";
import { Coin, PoolDetailProps, PoolListItemProps } from "../pool-list-item/pool-list-item.types";
import { RemoveLiquidityProps } from "../remove-liquidity/remove-liquidity.types";

export interface ManageLiquidityCardProps {
  totalBalanceCoins: Coin[];
  totalBalance: PoolDetailProps["totalBalance"];
  totalShares: PoolDetailProps["totalShares"];
  lpTokenBalance: PoolDetailProps["lpTokenBalance"];
  lpTokenShares: PoolDetailProps["lpTokenShares"];
  onStartEarning: () => ResponseInfo;
  onAdd: () => void;
  onRemove: () => void;

  // onAddLiquidity: PoolDetailProps["onAddLiquidity"]
  // poolAssets: PoolListItemProps["poolAssets"];
  // //Remove liquidity
  // unbondedBalance: PoolDetailProps["unbondedBalance"]; // pass to remove liquiditypage
  // unbondedShares: PoolDetailProps["unbondedShares"];// pass to remove liquiditypage
  // myLiquidityCoins: Coin[];// pass to remove liquiditypage
  // onRemoveLiquidity: RemoveLiquidityProps["onRemoveLiquidity"]
}
