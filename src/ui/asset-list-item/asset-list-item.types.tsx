export interface AssetListItemProps {
  isOtherChains?: boolean;
  imgSrc: string;
  symbol: string;
  denom: string;
  tokenAmount: string;
  tokenAmountPrice: string;
  chainName?: string;
  needChainSpace?: boolean;
  onDeposit?: () => void;
  onWithdraw?: () => void;
}
