export interface AssetListItemProps {
  isOtherChains?: boolean;
  imgSrc: string;
  symbol: string;
  denom: string;
  amount: string;
  dollarAmount: string;
  canDeposit: boolean;
  canWithdraw: boolean;
  chainName?: string;
  needChainSpace?: boolean;
}
