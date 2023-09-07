import { Coin, PoolDetailProps } from "../pool-list-item/pool-list-item.types";

export interface ManageLiquidityCardProps {
  totalBalanceCoins: Coin[];
  totalBalance: PoolDetailProps["totalBalance"];
  totalShares: PoolDetailProps["totalShares"];
  lpTokenBalance: PoolDetailProps["lpTokenBalance"];
  lpTokenShares: PoolDetailProps["lpTokenShares"];
  isEarningLoading?: boolean;
  onStartEarning: (event?: any) => void;
  onAdd: (event?: any) => void;
  onRemove: (event?: any) => void;
}
