import type { BaseComponentProps } from "../../models/components.model";

export interface AssetListItemProps extends BaseComponentProps {
  isOtherChains?: boolean;
  imgSrc: string;
  symbol: string;
  denom: string;
  tokenAmount: string;
  tokenAmountPrice: string;
  chainName?: string;
  needChainSpace?: boolean;
  onDeposit?: (event?: any) => void;
  onWithdraw?: (event?: any) => void;
}
