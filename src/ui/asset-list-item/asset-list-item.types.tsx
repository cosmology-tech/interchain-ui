import { AssetItemTransferProps } from "../asset-item-transfer/asset-item-transfer.types";
export interface AssetListItemProps {
  isOtherChains?: boolean;
  imgSrc: string;
  symbol: string;
  denom: string;
  tokenAmount: string;
  tokenAmountPrice: string;
  chainName?: string;
  needChainSpace?: boolean;
  onDeposit?: () => AssetItemTransferProps;
  onWithdraw?: () => AssetItemTransferProps;
}
