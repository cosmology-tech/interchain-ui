import {
  AddLiquidityProps,
  ResponseInfo,
  onAddLiquidityItem,
} from "../add-liquidity/add-liquidity.types";
import { BondingListItemSmProps } from "../bonding-list-item-sm/bonding-list-item-sm.types";
import { ManageLiquidityCardProps } from "../manage-liquidity-card/manage-liquidity-card.types";
import { RemoveLiquidityProps } from "../remove-liquidity/remove-liquidity.types";
import { AvailableItem } from "../transfer-item/transfer-item.types";

export type APR = {
  totalApr: string;
  swapFeeApr: {
    swapFeeValuePerDay: string;
    apr: string;
  };
  bondedShares: string | number;
  bondedValue: string | number; // unbond should be disabled when bondedValue < 0
  superfluidApr?: string;
  amount?: string;
};
export interface AprType {
  "1": APR;
  "7": APR;
  "14": APR;
}

export interface Coin {
  symbol: string;
  imgSrc: string;
  displayAmount?: string;
}
export interface PoolListItemProps {
  id: string;
  poolAssets: AvailableItem[];
  liquidity: number | string;
  myLiquidity: string; // Remove liquidity should be disabled when myLiquidty < 0
  bonded: number | string;
  apr: AprType;
  fees7D: number;
  // detail data
  swapFee: number | string;
  volume24H: number | string;
  totalBalance: string; // Your pool balance
  totalShares: string;
  lpTokenBalance: string;
  lpTokenShares: string;
  totalBalanceCoins: Coin[]; // show in pool detail
  unbondedBalance: string; // pass to remove liquiditypage
  unbondedShares: string; // pass to remove liquiditypage
  myLiquidityCoins: Coin[]; // pass to remove liquiditypage

  // function
  onAddLiquidity: AddLiquidityProps["onAddLiquidity"];
  onRemoveLiquidity: RemoveLiquidityProps["onRemoveLiquidity"];
  onBond: BondingListItemSmProps["onBond"];
  onUnbond: BondingListItemSmProps["onUnbond"];
  onStartEarning: ManageLiquidityCardProps["onStartEarning"];
}
